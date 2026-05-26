import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { RootNavigator } from '../src/navigation';
import { setTheme } from '../src/redux/slices/themeSlice';
import { store } from '../src/redux/store';
import { storageUtils } from '../src/storage/storageUtils';
import { ThemeType } from '../src/types/theme';
import { useAppDispatch, useThemeMode, useAppTheme } from '../src/hooks/redux';

function RootLayoutContent() {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);
  const mode = useThemeMode();
  const theme = useAppTheme();

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await storageUtils.getTheme();
      if (savedTheme) {
        dispatch(setTheme(savedTheme as ThemeType));
      }
      setIsReady(true);
    };

    loadTheme();
  }, [dispatch]);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <RootNavigator />
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutContent />
    </Provider>
  );
}
