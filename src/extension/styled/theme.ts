import { DefaultTheme } from 'styled-components';
import { rgba } from 'polished';
import { StyleTheme } from '../../types';

export enum Color {
  YALLOW = '#FF9D00',
  WHITE = '#FFFFFF',
  DARK = '#35363A',
  BLACK = '#2C2C2C',
  RED = '#D0021B',
  LIGHT_RED = '#F32038',
  LIGHT_GRAY = '#DADADA',
  GRAY = '#9B9B9B',
  DARK_GRAY = '#6A6A6A',
}

export const themes: { light: DefaultTheme; dark: DefaultTheme } = {
  light: {
    type: StyleTheme.LIGHT,
    color: {
      red: Color.RED,
      hoverLine: 'rgba(208, 2, 27, 0.5)',
      bg: '#FBFBFB',
      scriptItemBoxBg: Color.WHITE,
      maskBg: 'rgba(255, 255, 255, 0.8)',
      line: Color.LIGHT_GRAY,
      yallow: Color.YALLOW,
      selection: rgba(Color.RED, 0.15),
    },
    input: {
      bg: Color.WHITE,
    },
    button: {
      red: Color.LIGHT_RED,
      gray: Color.GRAY,
      bg: Color.WHITE,
      fill: Color.LIGHT_GRAY,
    },
    borderRadius: {
      lg: '8px',
      sm: '4px',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    dropMask: {
      bg: 'rgba(255, 255, 255, 0.85)',
    },
    shadow: '1px 1px 0 #FFFFFF',
    boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,0.22)',
    transitionTime: '0.25s',
  },
  dark: {
    type: StyleTheme.DARK,
    color: {
      red: Color.RED,
      hoverLine: Color.YALLOW,
      bg: Color.DARK,
      scriptItemBoxBg: Color.DARK,
      maskBg: rgba(Color.DARK, 0.9),
      line: Color.LIGHT_GRAY,
      yallow: Color.YALLOW,
      selection: rgba(Color.RED, 0.5),
    },
    input: {
      bg: Color.BLACK,
    },
    button: {
      red: Color.LIGHT_RED,
      gray: Color.GRAY,
      bg: Color.DARK,
      fill: Color.DARK_GRAY,
    },
    borderRadius: {
      lg: '8px',
      sm: '4px',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    dropMask: {
      bg: 'rgba(0, 0, 0, 0.75)',
    },
    shadow: '1px 1px 0 #FFFFFF',
    boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,0.22)',
    transitionTime: '0.25s',
  },
};

export default {
  themes,
};
