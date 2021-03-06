import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Content = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  margin: 30px 16px;
  padding 16px 16px;
  box-shadow: 6px 6px 5px 0px rgba(0,40,20,0.5);
  text-decoration: none;

  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;


const TextCont = styled.div`
  float: left;
  height: 100%;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;


const H3 = styled.h3 `
  text-align: left;
  color: #022;
  font-size: 1.6em;
  margin: 10px;
`;

const Picture = styled.div`
  width: 360px;

  overflow: hidden;
  margin: 10px 20px 10px 10px;

  @media (max-width: 768px) {
    width: 96%;
    max-width: 500px;
  }
  img {
    width: 100%;
  }
`;

const Body = styled.div`
  color: #444;
`;


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      body: props.body,
      picture: props.picture,
      link: props.link
    }
  }

  render () {
    return (
      <Content>
        <Picture> <img src={ this.state.picture } alt="" /> </Picture>
        <TextCont>
          <H3>{ this.state.title }</H3>
          <Body> { this.state.body } </Body>
        </TextCont>
        <div style={{clear:'both'}}></div>
      </Content>
    );
  }
}

export default Card;
