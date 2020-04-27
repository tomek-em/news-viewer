import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import NewsContext from '../context/newsContext'


const Nav = styled.nav`
  margin: 0;
  padding: 12px 0;
  width: 100%;
  min-height: 8vh;
  background-color: #033F42;
`;

const Wrapped = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const Logo = styled.h3`
  margin: 0;
  font-family: 'Lato', snas-serif;
  font-size: 2.0em;
  color: #fff;
  font-weight: 900;

  .red {
    color: #d55;
  }
`;

const Ul = styled.ul`
  padding: 0;
  min-width: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.0em;

   @media (max-width: 768px) {
     flex-direction: column;
     justify-content: space-around;
     position: fixed;
     z-index: 2;
     top: 6vh;
     left:0;
     height: 26vh;
     width: 100%;
     text-align: center;;
     background-color: #033F42;

     display: ${props => props.toggle ? 'flex' : 'none' }
   }
`;

const Li = styled.li`
  padding: 0 12px;
  list-style-type: none;
  a {
    color: #fff;
    text-transform : uppercase;
    letter-spacing: 4px;
    outline: 0;
  }
  a:hover {
    color: #d55;
    transition: all 0.2s ease-out;
  }
`;


const Burger = styled.div`
  display: none;
  cursor: pointer;
  float: right;
  margin-right: 28px;

  div {
    width: 30px;
    height: 4px;
    background-color: #ddd;
    margin: 5px;
  }

  @media (max-width: 768px) {
    display: inline-block;
  }
`;


const Navbar = (props) => {
  const newsContext = useContext(NewsContext);
  const [ menuToggleOn, setMenuToggleOn ] = useState(false);

  const toggleMenu = () => {
    setMenuToggleOn(menuToggleOn => !menuToggleOn);
  }


  const { date, loading } = newsContext;

  return (
    <Nav>
      <Wrapped>
        <Logo className="nav-aside">News<span className="red">Viewer</span> </Logo>
        <Ul id="nav-menu" toggle={menuToggleOn}>
          <Li>
            <Link to="/" onClick={toggleMenu} className="nav-link">Home</Link>
          </Li>
          <Li>
            <Link to="/about" onClick={toggleMenu} className="nav-link">About</Link>
          </Li>
        </Ul>

        <Burger id="toggle-menu-btn" onClick={toggleMenu} >
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </Burger>
      </Wrapped>
    </Nav>
  )
};

export default Navbar
