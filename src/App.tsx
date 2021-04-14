import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import styled from 'styled-components';

import HomePage from 'pages/HomePage';
import SensorPage from 'pages/SensorPage';
import GroupPage from 'pages/GroupPage';

import ScrollToTop from 'components/ScrollToTop';

import logo from 'assets/logo.png';

function App() {
  return (
    <AppContainer>
      <Router>
        <LogoHeader>
          <Link to="/">
            <img src={logo} alt="logo" width={100} height={100}/>
          </Link>
        </LogoHeader>
        <ScrollToTop />
        <Switch>
          <Route path="/groups/:id">
            <GroupPage />
          </Route>
          <Route path="/sensors/:id">
            <SensorPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  );
}

const LogoHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const AppContainer = styled.div`
  margin: 32px 128px 128px 128px;
`;

export default App;
