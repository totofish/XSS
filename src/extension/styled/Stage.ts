import styled, { css } from 'styled-components';

interface StageProps {
  readonly $list?: boolean;
  readonly $editor?: boolean;
}

export default styled.section<StageProps>`
  width: 100%;
  position: absolute;
  display: block;
  background-color: ${(props) => props.theme.color.bg};
  top: 0;
  left: 0;
  height: calc(100vh - 31px);
  box-sizing: border-box;
  outline: none;

  ${(props) => props.$list && css`
    overflow-y: auto;
    user-select: none;
    padding-top: 5px;
  `}

  ${(props) => props.$editor && css`
    padding: 10px;
  `}
`;
