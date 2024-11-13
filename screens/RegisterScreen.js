// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/authService';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await registerUser(email, password, name);
      navigation.navigate('Login');
    } catch (err) {
      setError('Registration failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <AuthForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={handleRegister} submitButtonText="Sign Up" />
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
