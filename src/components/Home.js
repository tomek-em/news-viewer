
import React, { useState, useEffect, useContext } from 'react'
import NewsContext from '../context/newsContext'

import Card from './Card'
import Loading from './Loading'
import SettingsCard from './SettingsCard'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'


const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const TopCont = styled.div`
  width: 100%;
  color: #222;
  position: relative;

  h2 {
    color: #444;
  }
`;

const H1 = styled.h1`
  text-align: center;
  padding-bottom: 0
`;

const A = styled.a`
  text-decoration: none;
`;

const SettingsBtn = styled.div`
  position: absolute;
  right: 20px;
  top: 0;
  font-size: 32px;
  color: #444;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;

  :hover {
    color: #465;
  }
`;


const Home = (props) => {
  const newsContext = useContext(NewsContext);

  const [ settingsOn, setSettingsOn ] = useState(false);
  const togglSettings = () => {
    setSettingsOn(settingsOn => !settingsOn);
  }

  useEffect(() => {
    newsContext.getCurrentDate();
    newsContext.getData();
  }, []);  // useEffect runs on component update not only componentDidMOunt. getCurrentDate() function changes state
            //we need to add [], because otherwise it will run in the loop

    useEffect(() => {
      window.addEventListener('scroll', newsContext.handleScroll);
      return () => window.removeEventListener('scroll', newsContext.handleScroll);
    });

  const { date, news, loading, all_rendered, stored_news, settings_on } = newsContext;

  return (
    <Wrapper>
        <Container id="home-cont">
          <SettingsCard toggle={ settings_on } />
          <TopCont>
            <H1>News</H1>
            <h2 style={ userStyle }>{ date[2] }-{ date[1] }-{ date[0] }</h2>
            <SettingsBtn onClick={() => {
                newsContext.toggleSettings();
              }
             } ><FontAwesomeIcon icon={ faSlidersH } /></SettingsBtn>
          </TopCont>
          { news.map((n, i) => (
              <A href={n.link} target="_blank" key={i}><Card title={n.title} body={n.body} picture={n.picture} link={n.link} key={i} /></A>
          )) }
          <Loading status = { loading } />
        </Container>
    </Wrapper>
  )
}

const userStyle = {
	fontSize: '1.2em',
  textAlign: 'center',
  marginTop: '0'
}

export default Home;
