import React, { useEffect, useContext } from 'react'
import NewsContext from '../context/newsContext'
import styled from 'styled-components'
import Checkbox from './Checkbox'

const Content = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  margin: 30px 0;
  padding 8px 16px;
  background-color: #eaeded;
  color: #033F42;
  box-shadow: 6px 6px 5px 0px rgba(0,40,20,0.5);
  text-decoration: none;
  position: absolute;
  width: 90%;
  height: 110px;
  max-width: 600px;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  display: ${props => props.toggle ? 'block' : 'none' };

  h3 {
    font-size: 1.4em;
    margin-top: 12px;
    color: #12575A;
  }

  table {
    position: absolute;
    bottom: 10px;
  }
`;

const Td = styled.td`
  font-size: 1.2em;
  color: #222;
  padding-right: 12px;
`;


const Close = styled.div`
  position: absolute;
  right: 12px;
  top: 16px;

  .line {
    width: 32px;
    height: 4px;
    background-color: #12575A;
    margin: 4px;
  }
  .first-line {
    transform: rotate(45deg);
  }
  .second-line {
    transform: rotate(-45deg) translateX(6px) translateY(-6px);
  }
  :hover {
    transform: scale(1.1);
  }
`;

const ConfirmBtn = styled.div`
  padding: 8px 36px;
  position: absolute;
  right: 12px;
  bottom: 10px;
  color: #fff;
  background: #276C6F;
  font-weight: 800;
  border-radius: 6px;
  cursor: pointer;

  :hover {
    background: #2F7578;
  }
`;


const SettingsCard = (props) => {
  const newsContext = useContext(NewsContext);

  const { display_settings, src, chosen_src, news } = newsContext;

  return (
    <Content toggle={ props.toggle }>
      <Close onClick={() => newsContext.toggleSettings()}> <div className="line first-line"></div> <div className="line second-line"></div> </Close>
      <h3>Wybierz rodzaj wiadomości: </h3>
      <div>
        <table>
        <tbody>
          <tr>
            <Td>
              <label>
                <Checkbox
                  value={ chosen_src[0] }
                  checked={ chosen_src[0] === true }
                  id = { 0 }
                  onChange={ newsContext.changeSources }/> <span>{ src[0] }</span>
              </label>
             </Td>
            <Td>
              <label>
                <Checkbox
                  value={ chosen_src[1] }
                  checked={ chosen_src[1] === true }
                  id = { 1 }
                  onChange={ newsContext.changeSources }/> <span>{ src[1] }</span>
              </label>
             </Td>
                <Td>
                  <label><Checkbox
                    value={ chosen_src[2] }
                    checked={ chosen_src[2] === true }
                    id = { 2 }
                    onChange={ newsContext.changeSources }/> <span>{ src[2] }</span>
                  </label>
                </Td>
                <Td>
                  <label>
                    <Checkbox
                      value={ chosen_src[3] }
                      checked={ chosen_src[3] === true }
                      id = { 3 }
                      onChange={ newsContext.changeSources }/> <span>{ src[3] }</span>
                  </label>
                 </Td>
                    <Td>
                      <label><Checkbox
                        value={ chosen_src[4] }
                        checked={ chosen_src[4] === true }
                        id = { 4 }
                        onChange={ newsContext.changeSources }/> <span>{ src[4] }</span>
                      </label>
                    </Td>
            </tr>
         </tbody>
         </table>
         <ConfirmBtn onClick={ () => {
            newsContext.confirmChanges();
            newsContext.toggleSettings();
          }}>OK</ConfirmBtn>
        </div>
    </Content>
  );
}

export default SettingsCard;
