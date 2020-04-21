import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from './Card';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
`;

const H1 = styled.h1`
  color: #222;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const A = styled.a`
  text-decoration: none;
`;


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    news: [],
    date: '',
    month: '',
    year: '',
    sources: {
      tvn: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftvn24.pl%2Fnajnowsze.xml',
      polsat: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.polsatnews.pl%2Frss%2Fwszystkie.xml'
    }
  }

  componentDidMount() {
    let fullDate = new Date();
    this.setState(state =>({
      year: fullDate.getFullYear(),
      month: fullDate.getMonth() + 1,
      date: fullDate.getDate()
    }));
    this.getNews(this.state.sources.polsat, 'polsat');
  }

  getNews(url, src) {
    fetch(url)
    .then((res) => res.json())
    .then((json) => this.setNews(json.items, src))
    .catch((err) => console.log("err"));
  }

  setNews(json, src) {
    let draft = [];
    json.map((n, i) => {
      const regex = /(<([^>]+)>)/ig;
      const res = n.content.replace(regex, '');
      const new_obj = {
        title: n.title,
        body: n.description,
        link: n.link
      };
      src == 'polsat' ? new_obj.picture = n.enclosure.link : new_obj.picture = '';
      draft.push(new_obj);
    });
    this.setState(state => ({
      news: draft
    }));
  }

  render () {
    const { news, date, month, year } = this.state
    return (
      <Wrapper>
        <H1>News {date}-{ month }-{ year } </H1>
        <Container>
          { news.map((n, i) => (
              <A href={n.link} target="_blank" key={i}><Card title={n.title} body={n.body} picture={n.picture} link={n.link} key={i} /></A>
          )) }
        </Container>

      </Wrapper>
    );
  }
}

export default Home;
