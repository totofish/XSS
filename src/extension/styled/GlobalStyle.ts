import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .CodeMirror {
    &.cm-s-neo {
      .CodeMirror-cursor {
        width: 1px;
        background: rgba(155,157,162,0.8);
      }
      .CodeMirror-linenumber {
        color: #bdbebf;
      }
    }
  }
`;
