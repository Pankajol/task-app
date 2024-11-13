// components/AuthForm.js
import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function AuthForm({ email, setEmail, password, setPassword, onSubmit, submitButtonText }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={styles.input}
      />
      <Button title={submitButtonText} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
