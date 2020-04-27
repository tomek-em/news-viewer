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
    //return () => window.removeEventListener('scroll', newsContext.handleScroll);
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



// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       news: [],
//       temp: [],
//       draft: [],
//       polsat: [],
//       biznes: [],
//       tvn: [],
//       mashup: [],
//       date: '',
//       month: '',
//       year: '',
//       url: {
//         tvn: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftvn24.pl%2Fnajnowsze.xml',
//         polsat: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.polsatnews.pl%2Frss%2Fwszystkie.xml',
//         biznes: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.polsatnews.pl%2Frss%2Fbiznes.xml'
//       },
//       src: ['polsat', 'tvn', 'biznes'],
//       chosen_src: [true, true, true],
//       range: [0, 1],
//       all_showed: false,
//       loading: false
//     }
//   }
//
//   componentDidMount() {
//     let fullDate = new Date();
//     this.setState(state =>({
//       year: fullDate.getFullYear(),
//       month: fullDate.getMonth() + 1,
//       date: fullDate.getDate()
//     }));
//     this.getData();
//     window.addEventListener('scroll', this.handleScroll.bind(this));
//   }
//
//   componentWillUnmount() {
//     window.removeEventListener('scroll', this.handleScroll);
//   }
//
//   useEffect(() => {
//     newsContext.getCurrentDate();
//   });
//
//   wait(t) {
//     return new Promise(resolve => {
//       setTimeout(() => {resolve('abc')}, t);
//     });
//   }
//
//   async getData() {
//     const { src, range } = this.state;
//     const { polsat, tvn, biznes } = this.state.url;
//     await this.getNews(polsat, src[0]);
//     this.setState({
//       polsat: this.state.temp
//     });
//     await this.getNews(tvn, src[1]);
//     this.setState({
//       tvn: this.state.temp
//     });
//     await this.getNews(biznes, src[2]);
//     this.setState({
//       biznes: this.state.temp,
//       temp: []
//     });
//     this.setNews(range);
//   }
//
//   // get news from Url
//   getNews(url, src) {
//     return fetch(url)
//       .then((res) => res.json())
//       .then((json) => {
//         this.setState({temp: json.items});
//       });
//   }
//
//   // set news to show
//   setNews(rng) {
//     const { src, chosen_src } = this.state;
//     for(let i = rng[0]; i <= rng[1]; i+= 1) {
//       chosen_src.map((s, index) => {
//         if(s && [src[i]].length) {
//           this.addNews(this.state[src[index]], src[index], i);
//         }
//       });
//     }
//   }
//
//   // add news
//   addNews(recent, src, n) {
//     const regex = /(<([^>]+)>)/ig;
//     let res = recent[n].content.replace(regex, '');
//     const new_obj = {
//       title: recent[n].title,
//       body: res,
//       link: recent[n].link
//     };
//     src === 'tvn' ? new_obj.picture = recent[n].thumbnail : new_obj.picture = recent[n].enclosure.link;
//
//     this.setState({
//       news: [...this.state.news, new_obj]
//     });
//   }
//
//   // old - not useed
//   convertNews(recent, src) {
//     recent.map((n, i) => {
//       const regex = /(<([^>]+)>)/ig;
//       const res = n.content.replace(regex, '');
//       const new_obj = {
//         title: n.title,
//         body: res,
//         link: n.link
//       };
//       src === 'polsat' ? new_obj.picture = n.enclosure.link : new_obj.picture = n.thumbnail;
//       this.setState({
//         draft: [...this.state.draft, new_obj]
//       });
//     });
//   }
//
//   isBottom(e) {
//     return e.getBoundingClientRect().bottom <= window.innerHeight;
//   }
//
//   async handleScroll() {
//     const cont = document.getElementById('home-cont');
//     if (cont.getBoundingClientRect().bottom <= window.innerHeight - 50 && this.state.all_showed === false) {
//       //window.removeEventListener('scroll', this.handleScroll;
//       this.setState({
//         all_showed: true,
//         loading: true
//       });
//       console.log('waiting');
//       await this.wait(2000);
//       console.log('bottom reached');
//       this.setState({
//         range: [2, 9],
//         loading: false
//       });
//       this.setNews(this.state.range);
//     }
//   }
//
//   render () {
//     const { news, date, month, year, loading } = this.state;
//     return (
//       <Wrapper>
//         <H1>News {date}-{ month }-{ year } </H1>
//         <Container id="home-cont">
//           { news.map((n, i) => (
//               <A href={n.link} target="_blank" key={i}><Card title={n.title} body={n.body} picture={n.picture} link={n.link} key={i} /></A>
//           )) }
//           <Loading status = { loading} />
//         </Container>
//       </Wrapper>
//     );
//   }
// }
//
// export default Home;
