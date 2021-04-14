import { Link } from "react-router-dom";
import styled from 'styled-components';
import logo from 'assets/logo.png';

function LogoHeader() {
  return (
  <LogoContainer>
    <Link to="/">
      <img src={logo} alt="logo" width={75} height={75}/>
    </Link>
  </LogoContainer>
  )
}

const LogoContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 16px 0;
background-color: white;
border-bottom: 2px solid rgba(0, 0, 0, 0.25);
`;

export default LogoHeader;
