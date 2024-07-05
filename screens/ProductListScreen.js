import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '../screens/LoginScreen';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://your-api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://your-api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  return (
    <View style={styles.container}>
      {user && user.role === 'admin' && (
        <Button title="Add Product" onPress={() => navigation.navigate('ProductForm', { mode: 'add' })} />
      )}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => user && user.role === 'admin' && navigation.navigate('ProductForm', { mode: 'edit', product: item })}>
            <View style={styles.product}>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
              {user && user.role === 'admin' && (
                <Button title="Delete" onPress={() => deleteProduct(item.id)} color="red" />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  product: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ced4da',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productDetails: {
    flexDirection: 'column',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export default ProductListScreen;
