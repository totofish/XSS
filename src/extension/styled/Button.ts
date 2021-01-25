import styled, { css } from 'styled-components';

interface ButtonProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  red?: boolean;
  gray?: boolean;
}

const Button = styled.button<ButtonProps>`
  margin-left: 8px;
  width: 60px;
  height: 26px;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  background-color: white;
  outline: none;
  cursor: pointer;
  font-weight: ${(props) => props.theme.fontWeight.normal};
  font-size: 14px;
  transition: ${(props) => props.theme.transitionTime};

  ${(props) => props.red && css`
    border: 1px solid ${props.theme.button.red};
    color: ${props.theme.button.red};

    &:hover {
      background-color: ${props.theme.button.red};
      color: white;
    }
  `}

  ${(props) => props.gray && css`
    border: 1px solid ${props.theme.button.gray};
    color: ${props.theme.button.gray};

    &:hover {
      background-color: ${props.theme.button.gray};
      color: white;
    }
  `}
`;

interface IconButtonProps {
  scale?: number;
  hoverColor?: string;
}

export const IconButton = styled(Button)<IconButtonProps>`
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  background: transparent;
  fill: ${(props) => props.theme.color.line};
  margin-left: 4px;

  svg {
    vertical-align: middle;
    ${(props) => props.scale && css`
      transform: scale(${props.scale});
    `};
  }

  &:hover {
    fill: ${(props) => (
    props.hoverColor ? props.hoverColor : props.theme.color.yallow
  )};
  }
`;

export default Button;
