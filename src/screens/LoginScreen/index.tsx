import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useAppTheme, useThemeMode } from '../../hooks/redux';
import { useRouter } from 'expo-router';
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
  const mode = useThemeMode();
  const isDark = mode === 'dark';
  const router = useRouter();

  const handleLogin = (values: LoginFormSchema) => {
    console.log('Login submitted', values);
    router.replace({ pathname: '/dashboard' } as const);
  };

  const accentPrimary = isDark ? '#A78BFA' : '#4338CA';
  const accentSecondary = isDark ? '#C4B5FD' : '#7C3AED';
  const cardBg = theme.colors.surface;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB';
  const background = theme.colors.background;

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: background }]}> 
      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 110 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.hero}>
              <View style={[styles.badge, { backgroundColor: isDark ? '#FDE68A' : '#E9D5FF' }]}> 
                <Text style={[styles.badgeText, { color: isDark ? '#92400E' : '#6D28D9' }]}>OKULR Secure</Text>
              </View>
              <Text style={[styles.title, { color: accentPrimary }]}>Welcome back</Text>
              <Text style={[styles.subtitle, { color: accentSecondary }]}>Sign in to continue to your account.</Text>
            </View>

            <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}> 
              <Text style={[styles.cardTitle, { color: accentPrimary }]}>Secure access</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Use your credentials to access your dashboard quickly.</Text>

              <ThemeToggle />

              <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
                onSubmit={handleLogin}
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
                    />

                    {/* Password requirements helper - concise single-line hint */}
                    <Text style={[styles.pwHint, { color: theme.colors.textSecondary }]}>Password: 8+ chars, upper, lower, number, special</Text>

                    <CustomButton
                      title="Login"
                      onPress={() => handleSubmit()}
                      disabled={!isValid || !dirty || isSubmitting}
                      loading={isSubmitting}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 28,
    paddingBottom: 16,
  },
  hero: {
    marginBottom: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  card: {
    width: '100%',
    borderRadius: 32,
    borderWidth: 1,
    padding: 24,
    marginTop: 4,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 14,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 10,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    maxWidth: '92%',
  },
  form: {
    width: '100%',
  },
  pwRulesContainer: {
    marginTop: 8,
    marginBottom: 6,
  },
  pwRule: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  pwHint: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 6,
  },
});
