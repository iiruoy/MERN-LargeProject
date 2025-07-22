import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


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

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

// google button info left in
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
