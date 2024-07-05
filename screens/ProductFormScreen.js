// screens/ProductFormScreen.js
import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ProductFormScreen = ({ route, navigation }) => {
  const { mode, product } = route.params;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
  });

  const handleFormSubmit = async (values) => {
    try {
      if (mode === 'add') {
        await axios.post('https://your-api/products', values);
      } else {
        await axios.put(`https://your-api/products/${product.id}`, values);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Failed to submit form', error);
    }
  };

  return (
    <Formik
      initialValues={{
        name: mode === 'edit' ? product.name : '',
        price: mode === 'edit' ? product.price.toString() : '',
      }}
      onSubmit={handleFormSubmit}
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
            placeholder="Price"
            style={styles.input}
            onChangeText={handleChange('price')}
            onBlur={handleBlur('price')}
            value={values.price}
            keyboardType="numeric"
          />
          {touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}
          <Button title={mode === 'add' ? 'Add Product' : 'Update Product'} onPress={handleSubmit} />
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

export default ProductFormScreen;
