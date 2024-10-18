import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up to Spatipay</Text>
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>Sign up with Google</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Or continue with Email</Text>
      <TextInput placeholder="Enter your name" style={styles.input} />
      <TextInput placeholder="Enter username" style={styles.input} />
      <TextInput placeholder="Enter Email" style={styles.input} />
      <TextInput placeholder="Enter password" style={styles.input} secureTextEntry />
      <TouchableOpacity style={styles.checkboxContainer}>
        <Text style={styles.checkboxText}>I agree with the Terms of Service and Privacy policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2EB872',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
  },
  googleButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
  },
  googleText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    width: '80%',
    marginBottom: 15,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkboxText: {
    color: '#fff',
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
