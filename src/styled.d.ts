import 'styled-components';
import { StyleTheme } from './types';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    type: StyleTheme;
    color: {
      red: string;
      hoverLine: string;
      bg: string;
      scriptItemBoxBg: string;
      maskBg: string;
      line: string;
      yallow: string;
      selection: string;
    };
    input: {
      bg: string;
    };
    button: {
      red: string;
      gray: string;
      bg: string;
      fill: string;
    };
    borderRadius: {
      lg: string;
      sm: string;
    };
    fontWeight: {
      normal: string;
      bold: string;
    };
    dropMask: {
      bg: string;
    };
    shadow: string;
    boxShadow: string;
    transitionTime: string;
  }
}
