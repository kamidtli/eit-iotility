import json
import uuid
import numpy as np
import random
import time

class Globals:
  def __init__(self):
    self.MIN_COORD = (63.275016451033615, 10.221439450323036)
    self.MAX_COORD = (63.44769100020921, 10.76015154742039)
    self.TEMP_RANGE = (5, 15) # Source: https://no.climate-data.org/europa/norge/s%C3%B8r-tr%C3%B8ndelag-fylke/trondheim-707/
    self.START_DATE = "1/1/2021 1:00 AM"
    self.END_DATE = "3/1/2021 11:59 PM"
    self.CONDUCTIVITIY_RANGE = (200, 800) # Source: https://en.wikipedia.org/wiki/Conductivity_(electrolytic)
    self.TURBIDITY_SHAPE, self.TURBIDITY_SCALE = 1, 1.5  # Source for value range: https://www.lenntech.com/turbidity.htm

class Sensor:
  def __init__(self, sensor_id, latitude, longitude):
    self.id = sensor_id
    self.latitude = latitude
    self.longitude = longitude
    self.GLOBALS = Globals()
  
  def take_measurement(self):
    measurement = {
      "id": self.id,
      "latitude": self.latitude,
      "longitude": self.longitude,
      "timestamp": self.get_random_date(self.GLOBALS.START_DATE, self.GLOBALS.END_DATE, random.random()),
      "pH": round(self.get_random_pH(), 2),
      "temperature": round(self.get_random_temperature(self.GLOBALS.TEMP_RANGE), 2),
      "conductivity": round(self.get_random_conductivity(self.GLOBALS.CONDUCTIVITIY_RANGE), 2),
      "turbidity": round(self.get_random_turbidity(self.GLOBALS.TURBIDITY_SHAPE, self.GLOBALS.TURBIDITY_SCALE), 2)
    }
    return measurement

  def get_random_pH(self):
    return np.random.normal(7, 3.5/3, 1)[0]

  def get_random_temperature(self, temp_range):
    return np.random.uniform(temp_range[0], temp_range[-1])

  def get_random_date(self, start, end, proportion, str_format='%m/%d/%Y %I:%M %p'):
    # Code from: https://stackoverflow.com/questions/553303/generate-a-random-date-between-two-other-dates
    stime = time.mktime(time.strptime(start, str_format))
    etime = time.mktime(time.strptime(end, str_format))
    ptime = stime + proportion * (etime - stime)
    return time.strftime(str_format, time.localtime(ptime))

  def get_random_conductivity(self, conductivity_range):
    mean = np.mean(conductivity_range)
    stdev = (np.max(conductivity_range) - mean) / 3
    return np.random.normal(mean, stdev, 1)[0]

  def get_random_turbidity(self, shape, scale):
    # Visualize gamma plot: https://homepage.divms.uiowa.edu/~mbognar/applets/gamma.html
    return np.random.gamma(shape, scale, 1)[0]


########## Helper functions ##########
def get_random_id():
  return uuid.uuid4().hex

def get_random_latitude(min_coord, max_coord):
  return np.random.uniform(min_coord[0], max_coord[0])

def get_random_longitude(min_coord, max_coord):
  return np.random.uniform(min_coord[-1], max_coord[-1])


if __name__ == "__main__":
  g = Globals()

  data = {"data": []}
  sensors = {"data": []}

  num_of_sensors = 5
  num_of_measurements = 20
  for i in range(num_of_sensors):
    sensor_id = get_random_id()
    lat = get_random_latitude(g.MIN_COORD, g.MAX_COORD)
    lon = get_random_longitude(g.MIN_COORD, g.MAX_COORD)

    sensors["data"].append({"id": sensor_id, "latitude": lat, "longitude": lon})

    s = Sensor(sensor_id=sensor_id, latitude=lat, longitude=lon)
    for i in range(num_of_measurements):
      measurement = s.take_measurement()
      data["data"].append(measurement)

  with open("iotility/src/data.json", "w") as f:
    json.dump(data, f, indent=2)

  with open("iotility/src/sensors.json", "w") as f:
    json.dump(sensors, f, indent=2)
