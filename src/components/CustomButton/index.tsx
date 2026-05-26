import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../../hooks/redux';

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
}) => {
  const theme = useAppTheme();
  const buttonColor = disabled ? theme.colors.inputBorder : theme.colors.buttonBackground;
  const textColor = disabled ? theme.colors.textSecondary : theme.colors.buttonText;

  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: buttonColor },
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 18,
  },
  buttonDisabled: {
    opacity: 0.72,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
