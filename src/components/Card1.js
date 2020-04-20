import React, { Component } from 'react';

class Card1 extends Component{
  constructor(props) {
    super(props);

    this.state = {
      title: props.title
    };
  };


  changeTitle = () => {
    console.log('button clicked');
  }

  render () {
    return(
      <h3>{ this.state.title }</h3>
    );
  };
};

export default Card1;
