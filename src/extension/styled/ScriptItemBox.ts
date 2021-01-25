import styled from 'styled-components';
import { rgba } from 'polished';

const ScriptItemBox = styled.div`
  width: calc(100% - 20px);
  height: 40px;
  margin: 4px 10px;
  position: relative;
  display: inline-block;
  border: 1px dashed ${(props) => props.theme.color.yallow};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  background: white;
  box-sizing: border-box;
  transition: ${(props) => props.theme.transitionTime};

  .mask {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.80);
    opacity: 0;
    position: absolute;
    transition: ${(props) => props.theme.transitionTime};
    border-radius: ${(props) => props.theme.borderRadius.lg};
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.color.redLine};
    box-shadow: 0 0 5px 0 ${(props) => rgba(props.theme.color.redLine, 0.35)};

    .mask {
      opacity: 1;
    }
  }
`;

export const AddScriptItemBox = styled(ScriptItemBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-color: ${(props) => rgba(props.theme.color.yallow, 0.5)};
  margin-bottom: 10px;

  img {
    opacity: 0.3;
    pointer-events: none;
  }

  &:hover {
    border: 1px solid ${(props) => rgba(props.theme.color.redLine, 0.4)};
    box-shadow: 0 0 5px 0 ${(props) => rgba(props.theme.color.redLine, 0.35)};

    img {
      opacity: 1;
    }
  }
`;

export default ScriptItemBox;
