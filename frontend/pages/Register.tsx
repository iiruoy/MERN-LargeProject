import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp , createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import auth, { createUserWithEmailAndPassword, updateProfile } from '@react-native-firebase/auth';


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

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  
  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }

    /*
    try {
      // Create user with Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      // Update the user's display name
      await userCredential.user.updateProfile({
        displayName: formData.username,
      });

      const uid = userCredential.user.uid;
      const token = await userCredential.user.getIdToken();

      // Send user info and token to your backend
      const res = await fetch('http://COP4331Group7.xyz/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid,
          username: formData.username,
          email: formData.email,
        }),
      });

      if (res.ok) {
        Alert.alert('Success', 'Registration successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      } 
      else {
        const data = await res.json();
        Alert.alert('Error', data.message || 'Failed to save user information.');
      }
    } 
    catch (err: any) {
      console.error(err);
      Alert.alert('Error', err.message || 'Registration failed.');
    }
  };

  */
    // local and direct to database
    
    try {
      const res = await fetch('http://192.168.68.65:3001/api/users/register', {
      // const res = await fetch('http://COP4331Group7.xyz/api/items/', {
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

      <TouchableOpacity onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
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
  signInText: {
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
