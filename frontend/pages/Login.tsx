import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginProps {
  setUser: (user: any) => void;
}

export default function Login({ setUser }: LoginProps) {
  const navigation = useNavigation<LoginScreenProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    /*
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } 
    catch (err: any) {
      console.error(err);
      Alert.alert('Error', err.message || 'Login failed');
    }
  };
  */
  
    // local and straight to database
    
    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
      // const res = await fetch('http://COP4331Group7.xyz/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Server error');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleSubmit} />
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
});
