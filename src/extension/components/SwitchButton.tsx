import React, { CSSProperties, FC } from 'react';
import styled from 'styled-components';
import { lighten, shade } from 'polished';

/* Styled Components */

const Switch = styled.label`
  position: absolute;
  display: inline-block;
  width: 34px;
  height: 14px;
  pointer-events: auto;

  .switch-input {
    display:none;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #8f8f8f;
    transition: .4s;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.15) inset;
  }
  .switch-input:checked + .slider {
    background-color: ${(props) => shade(0.2, lighten(0.35, props.theme.color.red))};
  }
  .switch-input:focus + .slider {
    box-shadow: 0 0 1px ${(props) => shade(0.2, lighten(0.35, props.theme.color.red))};
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 21px;
    width: 21px;
    left: -1px;
    bottom: -3px;
    background-color: white;
    transition: .3s;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.20)
  }
  .slider.round {
    border-radius: 12px;
  }
  .slider.round:before {
    border-radius: 50%;
  }
  .switch-input:checked + .slider:before {
    transform: translateX(15px);
    background-color: ${(props) => props.theme.color.red};
  }
`;

/* List Component */

interface SwitchButtonProps {
  checked: boolean;
  title?: string;
  style?: CSSProperties;
  onChange: () => void;
}

const SwitchButton: FC<SwitchButtonProps> = ({
  checked,
  title,
  style,
  onChange,
}: SwitchButtonProps) => (
  <Switch style={style} title={title}>
    <input className="switch-input" type="checkbox" checked={checked} onChange={onChange} />
    <span className="slider round" />
  </Switch>
);

SwitchButton.defaultProps = {
  title: '',
  style: {},
};

export default SwitchButton;
