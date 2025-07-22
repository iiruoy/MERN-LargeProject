import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
};

type RegisterScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigation = useNavigation<RegisterScreenProp>();

  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  // need web client ID from Google cloud console
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleResponse(authentication?.accessToken);
    }
  }, [response]);

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        Alert.alert('Success', 'Registration successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Server error');
    }
  };

  const handleGoogleSignIn = () => {
    promptAsync();
  };

  const handleGoogleResponse = async (token: string | undefined) => {
  if (!token) return;

  try {
    const res = await fetch('http://localhost:5000/api/users/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });

    const data = await res.json();
    if (res.ok) {
      Alert.alert('Login Success', 'Google account authenticated');
      navigation.navigate('Home');
    } 
    else {
      Alert.alert('Login Failed', data.message || 'Try again');
    }
  } 
  catch (err) {
    console.error(err);
    Alert.alert('Server Error');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={text => handleChange('username', text)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={text => handleChange('email', text)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={text => handleChange('password', text)}
      />

      <Button title="Register" onPress={handleSubmit} />

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: '600',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
