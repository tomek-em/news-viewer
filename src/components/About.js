import React from 'react'
import styled from 'styled-components'

const AboutCont = styled.div`
  width: 600px;
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;

  h2 {
    text-align: center;
  }
  p {
    font-size: 1.2em;
  }
  a {
    text-decoration: none;
    color: #465;
  }
`;


class About extends React.Component {
  render () {
    return (
      <AboutCont>
      <h2>News Viewer</h2>
      <p>version: 1.0</p>
      <p>Simple applicatoin showing current news from different sources.</p>
      <p>Created by <a href="https://tomaszmejer.com/">Tomasz Mejer</ a></p>
      </AboutCont>
    );
  };
}

export default About;
