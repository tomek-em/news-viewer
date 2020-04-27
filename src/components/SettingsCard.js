import React, { useContext } from 'react'
import NewsContext from '../context/newsContext'
import styled from 'styled-components'

const Content = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  margin: 30px 0;
  padding 16px 16px;
  background-color: #033F42;
  color: #fff;
  box-shadow: 6px 6px 5px 0px rgba(0,40,20,0.5);
  text-decoration: none;
  position: fixed;
  width: 90%;
  max-width: 1000px;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  display: ${props => props.toggle ? 'block' : 'none' }
`;

const Close = styled.div`
  position: absolute;
  right: 12px;

  .line {
    width: 30px;
    height: 4px;
    background-color: #ddd;
    margin: 5px;
  }
  .first-line {
    transform: rotate(45deg);
  }
  .second-line {
    transform: rotate(-45deg) translateX(5px) translateY(-7px);
  }
  :hover {
    transform: scale(1.1);
  }
`;


const SettingsCard = (props) => {
  const newsContext = useContext(NewsContext);

  const { display_settings, chosen_src } = newsContext;

  return (
    <Content toggle={ props.toggle }>
      <Close onClick={() => newsContext.toggleSettings()}> <div className="line first-line"></div> <div className="line second-line"></div> </Close>
      <div>
        <p>Set</p>
        <tbody>
          <tr>
            <td>
            <input type="checkbox" name="tvn"
               value={ chosen_src[1] }
               checked={ chosen_src[1] === true }
               onChange={ () => newsContext.changeSources() } />a
             </td>
              <td>
              <input type="checkbox" name="polsat"
                 value={ chosen_src[0] }
                 checked={ chosen_src[0] === true }
                 onChange={ () => console.log('change') } />b
             </td>
             <td>
             <input type="checkbox" name="biznes"
                value={ chosen_src[2] }
                checked={ chosen_src[2] === true }
                onChange={ () => console.log('change') } />c
            </td>
            </tr>
         </tbody>
        </div>
    </Content>
  );
}

export default SettingsCard;
