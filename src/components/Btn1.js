import React, { Component } from 'react';

class Btn1 extends Component{

  render () {
    return(
      <button onClick={this.props.click}> Click </button>
    );
  };
};

export default Btn1;
