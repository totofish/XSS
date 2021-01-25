import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  color: {
    red: '#D0021B',
    redLine: 'rgba(208, 2, 27, 0.5)',
    bg: '#FBFBFB',
    line: '#DADADA',
    yallow: '#FF9D00',
    selection: 'rgba(208, 2, 27, 0.15)',
  },
  button: {
    red: '#F32038',
    gray: '#9B9B9B',
  },
  borderRadius: {
    lg: '8px',
    sm: '4px',
  },
  fontWeight: {
    normal: '400',
    bold: '700',
  },
  shadow: '1px 1px 0 #FFFFFF',
  boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,0.22)',
  transitionTime: '0.25s',
};

export default {
  theme,
};
