import React, { useReducer } from 'react';
import NewsContext from './newsContext';
import NewsReducer from './newsReducer';

import {
  GET_DATE,
  GET_NEWS,
  SET_NEWS,
  SET_LOADING,
  TOGGLE_SETTINGS,
  CHANGE_SOURCES
} from './types';

const url = {
  tvn: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftvn24.pl%2Fnajnowsze.xml',
  polsat: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.polsatnews.pl%2Frss%2Fwszystkie.xml',
  biznes: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.polsatnews.pl%2Frss%2Fbiznes.xml'
};

const NewsState = props => {
  const initialState = {
    date: [0, 0, 0],
    news: [],
    stored_news: [],
    temp: [],
    src: ['polsat', 'tvn', 'biznes'],
    chosen_src: [true, false, true],
    range: [0, 1],
    all_rendered: false,
    loading: false,
    settings_on: false
  };


  const [state, dispatch] = useReducer(NewsReducer, initialState);

  const getCurrentDate = () => {
    let fullDate = new Date();
    let year = fullDate.getFullYear();
    let month = fullDate.getMonth() + 1;
    if((String(month)).length < 2) month = `0${month}`;
    let date = fullDate.getDate();
    if((String(date)).length < 2) date = `0${date}`;

    dispatch({
      type: GET_DATE,
      payload: [year, month, date]
    });
  }

  // get news from single Url
  const getNews = async (url, src) => {
    const result = await fetch(url)
      .then((res) => res.json())
      return result.items;
  }

  // get all news
  const getData = async () => {
    let polsat = await getNews(url.polsat, state.src[0]);
    let tvn = await getNews(url.tvn, state.src[1]);
    let biznes = await getNews(url.biznes, state.src[2]);
    setNews([polsat, tvn, biznes], state.range);
  }

  // set news in order
  const setNews = (all_news, rng) => {
    const { src, chosen_src, range } = state;
    const ordered_news = [];
    for(let i = rng[0]; i <= rng[1]; i+= 1) {
      chosen_src.map((s, index) => {
        let current_news = all_news[index][i];
        if(s && (all_news[index]).length > rng[1]) {
          let n = selectFromNews(current_news, src[index]);
          ordered_news.push(n);
        }
      });
    }
    dispatch({
      type: SET_NEWS,
      show: ordered_news,
      store: all_news
    });
    console.log(state.news);
  }

  // select needed data from single news
  const selectFromNews = (recent, src) => {
    const regex = /(<([^>]+)>)/ig;
    let res = recent.content.replace(regex, '');
    const news_obj = {
      title: recent.title,
      body: res,
      link: recent.link
    };
    src === 'tvn' ? news_obj.picture = recent.thumbnail : news_obj.picture = recent.enclosure.link;
    return news_obj;
  }

  const loadAll = () => {
    dispatch({type: SET_LOADING});
    setTimeout(() => {
      setNews(state.stored_news, [0, 9]);
    }, 2000);
  }

  const handleScroll = () => {
    const container = document.getElementById('home-cont');
    if (container.getBoundingClientRect().bottom <= window.innerHeight - 50 && state.all_rendered === false) {
      loadAll();
    }
  }

  const toggleSettings = () => {
    dispatch({
      type: TOGGLE_SETTINGS,
      payload: !(state.settings_on)
    });
  }

  const changeSources = () => {
    dispatch({
      type: CHANGE_SOURCES,
      payload: [!state.chosen_src[0], !state.chosen_src[1], !state.chosen_src[2]]
    });
    setNews(state.stored_news, state.range);
  }


return (
  <NewsContext.Provider
    value={{
      date: state.date,
      news: state.news,
      all_rendered: state.all_rendered,
      stored_news: state.stored_news,
      loading: state.loading,
      settings_on: state.settings_on,
      chosen_src: state.chosen_src,
      getCurrentDate,
      getData,
      loadAll,
      handleScroll,
      toggleSettings,
      changeSources
    }}
  >
    {props.children}
  </NewsContext.Provider>
);
}

export default NewsState;
