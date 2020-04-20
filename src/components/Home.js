import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Card1 from './Card1';
import Btn1 from './Btn1';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  // test news
  state = {
    news: [
      {title: 'First news', body: 'First news body'},
      {title: 'Second news', body: 'Second news body'}
    ]
  }


  render () {
    return (
      <Wrapper>
        <Card1 title={this.state.news[0].title} />

      </Wrapper>
    );
  }
}

export default Home;
