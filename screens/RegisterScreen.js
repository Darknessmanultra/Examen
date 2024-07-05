import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleRegister = async (values) => {
    try {
      const response = await axios.post('https://your-auth-api/register', values);
      console.log('Registration successful', response.data);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed', error.response.data);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      onSubmit={handleRegister}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            onChangeText={handleChange('Lastname')}
            onBlur={handleBlur('Lastname')}
            value={values.name}
          />
          {touched.Lastname && errors.Lastname && <Text style={styles.error}>{errors.Lastname}</Text>}
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <TextInput
            placeholder="Password"
            style={styles.input}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
          <TextInput
            placeholder="Phone"
            style={styles.input}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.password}
            secureTextEntry
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            secureTextEntry
          />
          {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
          <Button title="Register" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
});

export default RegisterScreen;