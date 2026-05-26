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

  const handleSubmit = (values: LoginFormSchema) => {
    console.log('Login submitted', values);
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.colors.background }]}> 
      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
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
              <Text style={[styles.cardTitle, { color: theme.colors.textPrimary }]}>Secure access</Text>
              <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>Use your credentials to access your dashboard quickly.</Text>

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
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 18,
    paddingBottom: 24,
  },
  hero: {
    marginBottom: 16,
  },
  card: {
    width: '100%',
    borderRadius: 26,
    borderWidth: 1,
    padding: 20,
    marginTop: 4,
    marginBottom: 16,
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 8,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  form: {
    width: '100%',
  },
});
