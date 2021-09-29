import React from "react";
import styled from "styled-components";

import Logo from "../assets/LogoMakr-8XfQrq.png";
import LogoName from "../assets/Walk-4.png";
import LogoInfo from "../assets/LogoMakr-5nV5yy.png";

const Nav = styled.div`
  /* background: #15171c; */
  /*   background: #15171c;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center; */
  // z-index: 100;
  width: 100%;
  height: 100px;
  display: flex;
  //box-shadow: 0px 15px 10px -15px rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid green;

  justify-content: space-between;
  align-items: center;
  //position: fixed;
  transition: transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(rgba(0, 0, 0, 0)),
    to(rgba(0, 0, 0, 0.8))
  );
  background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
`;

const NavOne = styled.div`
  /* background: #15171c; */
  //background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavTwo = styled.div`
  /* background: #15171c; */
  //background: #15171c;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    margin-right: 50px;
  }
`;

const NavThree = styled.div`
  /* background: #15171c; */
  //background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 50px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoIm = styled.img`
  height: 80px;
  justify-items: center;
  margin-left: -40px;

  /* transform: translate(-50%, -50%); */
`;

const LogoImD = styled.img`
  height: 30px;
  justify-items: center;
  margin-left: 40px;

  /* transform: translate(-50%, -50%); */
`;

const Sidebar = () => {
  return (
    <>
      <Nav>
        <NavOne>
          {/*   <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} /> 
          </NavIcon> */}
          <LogoImD src={LogoName} alt="logo2" />
        </NavOne>
        <NavTwo>
          <LogoIm src={Logo} alt="logo" />
        </NavTwo>
        <NavThree>
          <LogoImD src={LogoInfo} alt="logo2" style={{ height: "40px" }} />
          {/* <NavIcon to="#"><FaIcons.FaInfoCircle /> </NavIcon> */}
        </NavThree>
      </Nav>
    </>
  );
};

export default Sidebar;
