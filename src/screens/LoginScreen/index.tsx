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
  const keyboardOffset = Platform.OS === 'ios' ? 90 : 24;

  const handleSubmit = (values: LoginFormSchema) => {
    console.log('Login submitted', values);
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.colors.background }]}> 
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardOffset}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={[styles.scrollView, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.hero}>
              <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Welcome back</Text>
              <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Sign in to continue to your account.</Text>
            </View>

            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.inputBorder,
                  shadowColor: theme.colors.textPrimary,
                },
              ]}
            >
              <Text style={[styles.cardTitle, { color: theme.colors.textPrimary }]}>Secure login</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Use your credentials to access the dashboard.</Text>

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
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: 'transparent',
  },
  hero: {
    marginBottom: 24,
  },
  card: {
    width: '100%',
    borderRadius: 30,
    borderWidth: 1,
    padding: 28,
    marginTop: 8,
    marginBottom: 24,
    shadowOpacity: 0.18,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 16 },
    elevation: 14,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 10,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
});
