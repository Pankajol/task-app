// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      navigation.navigate('Home');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <AuthForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={handleLogin} submitButtonText="Log In" />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
