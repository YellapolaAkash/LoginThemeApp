export type ThemeType = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeType;
}

export interface Colors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  inputBackground: string;
  inputBorder: string;
  buttonBackground: string;
  buttonText: string;
  placeholder: string;
  error: string;
  errorBackground: string;
  icon: string;
}

export interface Theme {
  colors: Colors;
}
