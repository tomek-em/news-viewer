import React, { useReducer } from 'react';
import NewsContext from './newsContext';
import NewsReducer from './newsReducer';

import {
  GET_DATE,
  GET_NEWS,
  SET_NEWS,
  SET_LOADING,
  TOGGLE_SETTINGS,
  CHANGE_SOURCES,
  RELOAD_NEWS
} from './types';

const url = {
  bbc: ' https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.telegraph.co.uk%2Fnewsfeed%2Frss%2Fnews_main.xml',
  tvn: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftvn24.pl%2Fnajnowsze.xml',
  polsat: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.polsatnews.pl%2Frss%2Fwszystkie.xml',
  biznes: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.polsatnews.pl%2Frss%2Fbiznes.xml',
  astronomia: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fastro4u.net%2Fforum%2Fsyndication.php%3Flimit%3D15'
};

const NewsState = props => {
  const initialState = {
    date: [0, 0, 0],
    news: [],
    stored_news: [],
    temp: [],
    src: ['Polsat', 'Tvn', 'Biznes', 'Astronomia', 'English'],
    chosen_src: [true, true, true, false, true],
    range: [0, 2],
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
    let astronomia = await getNews(url.astronomia, state.src[3]);
    let en = await getNews(url.bbc, state.src[4]);
    setNews([polsat, tvn, biznes, astronomia, en], state.range, state.chosen_src);
  }

  // set news in order
  const setNews = (all_news, rng) => {
    const { src, range, chosen_src } = state;
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
    if( src === 'Tvn') {
      news_obj.picture = recent.thumbnail;
    } else {
      news_obj.picture = recent.enclosure.link;
    }
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
      state.stored_news.length != 0 ? loadAll() : console.log('');
    }
  }

  const toggleSettings = () => {
    dispatch({
      type: TOGGLE_SETTINGS,
      payload: !(state.settings_on)
    });
  }

  const reloadNews = () => {
    dispatch({type: RELOAD_NEWS});
  }

  const changeSources = (e) => {
    let sources = state.chosen_src;
    sources[e.target.id] = !(state.chosen_src[e.target.id]);
    dispatch({
      type: CHANGE_SOURCES,
      payload: sources
    });
  }

  const confirmChanges = () => {
    reloadNews();
    setTimeout(getData, 2000);
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
      src: state.src,
      chosen_src: state.chosen_src,
      getCurrentDate,
      getData,
      loadAll,
      handleScroll,
      toggleSettings,
      changeSources,
      confirmChanges
    }}
  >
    {props.children}
  </NewsContext.Provider>
);
}

export default NewsState;
