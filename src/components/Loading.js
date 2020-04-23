import React from 'react';
import styled from 'styled-components';

const CircleContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  margin: 16px;
  border-radius: 100%;
  background-color: rgba(160, 160, 160);
  animation-duration: 900ms;
  animation-name: circle_animation;
  animation-iteration-count: infinite;


  @keyframes circle_animation {
    0% {
      transform: translateY(-5px);
    }
    50% {
      transform: translateY(5px);
    }
    100% {
      transform: translateY(-5px);
    }
  }
`;



const Loading = (props) => {
  if (!props.status) {
    return null;
  }
  return (
    <CircleContainer>
      <Circle className="anim_first" /> <Circle className="anim_sec" /> <Circle className="anim_third" />
    </CircleContainer>
  )
}

export default Loading
