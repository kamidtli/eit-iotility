import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styled from 'styled-components';
import { Container } from '@material-ui/core';

import HomePage from 'pages/HomePage';
import SensorPage from 'pages/SensorPage';
import GroupPage from 'pages/GroupPage';
import LogoHeader from 'components/LogoHeader';
import ScrollToTop from 'components/ScrollToTop';


function App() {
  return (
    <AppContainer>
      <Router>
        <LogoHeader />
        <ScrollToTop />
        <ContentContainer maxWidth="lg">
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
        </ContentContainer>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-color: #F5F5F5;
`;

const ContentContainer = styled(Container)`
  padding: 16px 0 128px 0;
`;

export default App;
