import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeType } from '../types/theme';

const THEME_KEY = '@login_app_theme';

// Fallback in-memory storage used when AsyncStorage fails (e.g. web/mocked env)
let _inMemoryTheme: ThemeType | null = null;

export const storageUtils = {
  // Theme storage
  async getTheme(): Promise<ThemeType | null> {
    try {
      if (!AsyncStorage || typeof AsyncStorage.getItem !== 'function') {
        // AsyncStorage not available, return in-memory value
        if (_inMemoryTheme) return _inMemoryTheme;
        console.warn('AsyncStorage not available (getTheme), using in-memory/default theme');
        return null;
      }

      const theme = await AsyncStorage.getItem(THEME_KEY);
      if (theme) return theme as ThemeType;
      // If nothing in persistent storage, fall back to in-memory value
      return _inMemoryTheme || null;
    } catch (error: any) {
      // Keep a clear diagnostic message to help debugging
      console.warn('AsyncStorage getTheme failed — using in-memory/default theme', error?.message || error);
      return _inMemoryTheme || null;
    }
  },

  async setTheme(theme: ThemeType): Promise<void> {
    try {
      if (!AsyncStorage || typeof AsyncStorage.setItem !== 'function') {
        // Persist in memory if AsyncStorage isn't available
        _inMemoryTheme = theme;
        console.warn('AsyncStorage not available (setTheme), theme persisted in memory only');
        return;
      }

      await AsyncStorage.setItem(THEME_KEY, theme);
      // keep in-memory copy in sync
      _inMemoryTheme = theme;
    } catch (error: any) {
      // Gracefully handle storage errors - keep state in memory and log details
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
      // Gracefully handle storage errors
      _inMemoryTheme = null;
      console.warn('Could not remove theme from storage', error?.message || error);
    }
  },
};
