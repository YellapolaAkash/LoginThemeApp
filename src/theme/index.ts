import { ThemeType } from '../types/theme';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const getTheme = (mode: ThemeType) => themes[mode];

export { darkTheme, lightTheme };

