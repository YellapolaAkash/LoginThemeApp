import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useAppTheme } from '../../hooks/redux';
import {
  LoginFormSchema,
  loginValidationSchema,
} from '../../validation/loginSchema';

const initialValues: LoginFormSchema = {
  email: '',
  password: '',
};

export const LoginScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useAppTheme();
  const scrollRef = useRef<ScrollView | null>(null);
  const [passwordY, setPasswordY] = useState<number>(0);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const keyboardOffset = Platform.OS === 'ios' ? 80 : 100;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates?.height || 0);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSubmit = (values: LoginFormSchema) => {
    console.log('Login submitted', values);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={(r) => { scrollRef.current = r; }}
          contentContainerStyle={[styles.content, { paddingBottom: Math.max(24, keyboardHeight + 24) }]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Welcome back</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Sign in to continue to your account.</Text>
          </View>

          <ThemeToggle />

          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
              isSubmitting,
            }) => (
              <View style={styles.form}>
                <CustomInput
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={Boolean(touched.email)}
                />

                <CustomInput
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  touched={Boolean(touched.password)}
                  showPasswordToggle
                  onTogglePassword={() => setShowPassword((prev) => !prev)}
                  onLayout={(e) => setPasswordY(e.nativeEvent.layout.y)}
                  onFocus={() => {
                    // If keyboard already open, scroll immediately. Otherwise wait briefly for keyboard to open.
                    const doScroll = () => {
                      if (scrollRef.current && passwordY !== undefined) {
                        scrollRef.current.scrollTo({ y: Math.max(passwordY - 24, 0), animated: true });
                      }
                    };

                    if (keyboardHeight > 0) {
                      doScroll();
                    } else {
                      // wait for keyboard to open
                      setTimeout(doScroll, 300);
                    }
                  }}
                />

                <CustomButton
                  title="Login"
                  onPress={() => handleSubmit()}
                  disabled={!isValid || !dirty || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 160,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
});
