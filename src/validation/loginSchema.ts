import * as yup from 'yup';

// Strong email regex (simple, practical) and password rules
const emailRules = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:'"\\|,.<>/?]).{8,}$/;

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .lowercase()
    .matches(emailRules, 'Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .matches(
      passwordRules,
      'Password must be at least 8 characters and include uppercase, lowercase, number and special character'
    )
    .required('Password is required'),
});

export type LoginFormSchema = yup.InferType<typeof loginValidationSchema>;
