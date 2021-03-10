import styled from 'styled-components';

interface InputProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
}

export default styled.input<InputProps>`
  background: ${(props) => props.theme.input.bg};
  border: 1px solid ${(props) => props.theme.color.line};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  outline: none;
  display: block;
  width: 100%;
  padding: 0 6px;
`;
