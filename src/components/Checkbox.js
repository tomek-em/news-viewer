/*
* Checkbox component is modified version of: https://codesandbox.io/s/building-a-checkbox-component-with-react-and-styled-components-gtt4r?file=/src/Checkbox.js
*/

import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;

`

const Icon = styled.svg`
  fill: none;
  stroke: #033F42;
  stroke-width: 4px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? '#6BA0A2' : '#A4CACC')};
  border-radius: 3px;
  transition: all 150ms;
  border: 2px solid #6BA0A2;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 0 pink;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`

const Checkbox = ({ className, checked, ...props }) => {

  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
      <polyline points="20 4 10 14 4 9" />
    </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox
