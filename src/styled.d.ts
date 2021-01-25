import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      red: string;
      redLine: string;
      bg: string;
      line: string;
      yallow: string;
      selection: string;
    };
    button: {
      red: string;
      gray: string;
    };
    borderRadius: {
      lg: string;
      sm: string;
    };
    fontWeight: {
      normal: string;
      bold: string;
    };
    shadow: string;
    boxShadow: string;
    transitionTime: string;
  }
}
