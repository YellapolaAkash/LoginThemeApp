import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Provider, useDispatch } from 'react-redux';
import { RootNavigator } from '../src/navigation';
import { setTheme } from '../src/redux/slices/themeSlice';
import { store } from '../src/redux/store';
import { storageUtils } from '../src/storage/storageUtils';
import { ThemeType } from '../src/types/theme';

function RootLayoutContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load theme from storage on app start
    const loadTheme = async () => {
      const savedTheme = await storageUtils.getTheme();
      if (savedTheme) {
        dispatch(setTheme(savedTheme as ThemeType));
      }
    };

    loadTheme();
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator />
      <StatusBar style="auto" />
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
