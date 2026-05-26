import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { useAppTheme } from '../../hooks/redux';

import type { LayoutChangeEvent } from 'react-native';

export interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  showPasswordToggle?: boolean;
  isPassword?: boolean;
  onTogglePassword?: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  touched,
  showPasswordToggle,
  onTogglePassword,
  secureTextEntry,
  style,
  onLayout,
  ...textInputProps
}) => {
  const theme = useAppTheme();
  const hasError = Boolean(error && touched);

  return (
    <View style={styles.container} onLayout={onLayout}>
      {label ? <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrapper,
          { backgroundColor: theme.colors.inputBackground, borderColor: theme.colors.inputBorder },
          hasError && { borderColor: theme.colors.error },
        ]}
      >
        <TextInput
          {...textInputProps}
          secureTextEntry={secureTextEntry}
          style={[styles.input, { color: theme.colors.textPrimary }, style]}
          placeholderTextColor={theme.colors.placeholder}
        />
        {showPasswordToggle ? (
          <Pressable onPress={onTogglePassword} style={styles.iconButton}>
            <Ionicons
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={22}
              color={theme.colors.textSecondary}
            />
          </Pressable>
        ) : null}
      </View>
      {hasError ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '700',
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    minHeight: 42,
    fontSize: 15,
    lineHeight: 20,
    paddingVertical: 0,
  },
  iconButton: {
    padding: 8,
  },
  errorText: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
  },
});
