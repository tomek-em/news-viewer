import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const Nav = styled.nav`
  margin: 0;
  padding: 12px 0;
  width: 100%;
  min-height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #002525;
`;

const Logo = styled.h3`
  margin: 0;
  font-family: 'Lato', snas-serif;
  font-size: 2.0em;
  color: #fff;

  .red {
    color: #d55;
  }
`;

const Ul = styled.ul`
  padding: 0;
  min-width: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.0em;

   @media (max-width: 768px) {
     flex-direction: column;
     position: fixed;
     top: 6vh;
     left:0;
     height: 26vh;
     width: 100%;
     text-align: center;;
     background-color: #002525;

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
  margin-right: 20px;

  div {
    width: 28px;
    height: 3px;
    background-color: #ddd;
    margin: 5px;
  }

  @media (max-width: 768px) {
    display: inline-block;
  }
`;


class Navbar extends React.Component{
  constructor( props ) {
    super(props);
    this.state = {menuToggleOn: false};
  }

  static defaultProps = {
    toggle: false
  }

  toggleMenu = () => {
    this.setState(state => ({
      menuToggleOn: !state.menuToggleOn
    }));
  }

  render () {
    return (
      <Nav>
        <Logo className="nav-aside">News<span className="red">Viewer</span></Logo>
        <Ul id="nav-menu" toggle={this.state.menuToggleOn}>
          <Li>
            <Link to="/" onClick={this.toggleMenu} className="nav-link">Home</Link>
          </Li>
          <Li>
            <Link to="/about" onClick={this.toggleMenu} className="nav-link">About</Link>
          </Li>
        </Ul>
        <div className="nav-aside">
          <Burger id="toggle-menu-btn" onClick={this.toggleMenu} >
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
          </Burger>
        </div>
      </Nav>
    )
  }
};

export default Navbar
