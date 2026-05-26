import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppTheme, useThemeMode } from '../../hooks/redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { storageUtils } from '../../storage/storageUtils';
import { ThemeType } from '../../types/theme';

export const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useThemeMode();
  const theme = useAppTheme();
  const isDark = mode === 'dark';

  const handleToggle = async () => {
    const nextTheme: ThemeType = isDark ? 'light' : 'dark';
    dispatch(toggleTheme());
    await storageUtils.setTheme(nextTheme);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.inputBorder },
      ]}
    >
      <View style={styles.labelRow}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Theme</Text>
        <Text style={[styles.modeLabel, { color: theme.colors.textSecondary }]}>{isDark ? 'Dark' : 'Light'}</Text>
      </View>
      <Pressable
        onPress={handleToggle}
        style={[
          styles.switch,
          { backgroundColor: isDark ? theme.colors.primary : theme.colors.inputBackground },
        ]}
      >
        <View
          style={[
            styles.thumb,
            { backgroundColor: theme.colors.surface },
            isDark ? styles.thumbDark : styles.thumbLight,
          ]}
        >
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={18}
            color={theme.colors.buttonText}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  modeLabel: {
    fontSize: 14,
  },
  switch: {
    width: 62,
    height: 34,
    borderRadius: 20,
    justifyContent: 'center',
    padding: 4,
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbLight: {
    alignSelf: 'flex-start',
  },
  thumbDark: {
    alignSelf: 'flex-end',
  },
});
