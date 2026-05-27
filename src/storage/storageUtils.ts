import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeType } from '../types/theme';

const THEME_KEY = '@login_app_theme';

let _inMemoryTheme: ThemeType | null = null;

export const storageUtils = {
  async getTheme(): Promise<ThemeType | null> {
    try {
      if (!AsyncStorage || typeof AsyncStorage.getItem !== 'function') {
        if (_inMemoryTheme) return _inMemoryTheme;
        console.warn('AsyncStorage not available (getTheme), using in-memory/default theme');
        return null;
      }

      const theme = await AsyncStorage.getItem(THEME_KEY);
      if (theme) return theme as ThemeType;
      return _inMemoryTheme || null;
    } catch (error: any) {
      console.warn('AsyncStorage getTheme failed — using in-memory/default theme', error?.message || error);
      return _inMemoryTheme || null;
    }
  },

  async setTheme(theme: ThemeType): Promise<void> {
    try {
      if (!AsyncStorage || typeof AsyncStorage.setItem !== 'function') {
        _inMemoryTheme = theme;
        console.warn('AsyncStorage not available (setTheme), theme persisted in memory only');
        return;
      }

      await AsyncStorage.setItem(THEME_KEY, theme);
      _inMemoryTheme = theme;
    } catch (error: any) {
      _inMemoryTheme = theme;
      console.warn('Could not persist theme to storage — using in-memory value', error?.message || error);
    }
  },

  async removeTheme(): Promise<void> {
    try {
      if (!AsyncStorage || typeof AsyncStorage.removeItem !== 'function') {
        _inMemoryTheme = null;
        console.warn('AsyncStorage not available (removeTheme), removed in-memory theme');
        return;
      }

      await AsyncStorage.removeItem(THEME_KEY);
      _inMemoryTheme = null;
    } catch (error: any) {
      _inMemoryTheme = null;
      console.warn('Could not remove theme from storage', error?.message || error);
    }
  },
};
