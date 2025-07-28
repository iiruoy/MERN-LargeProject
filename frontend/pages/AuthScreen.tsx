import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

type RootStackParamList = {
  Home: undefined;
};

type AuthScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface FormData {
  username?: string;
  email: string;
  password: string;
}

const AuthScreen=({ setUser }: { setUser: (user: any) => void }) => {
  const navigation = useNavigation<AuthScreenProp>();
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

 const handleSubmit = async () => {
  const { email, password, username } = formData;

  if (!email || !password || (isRegistering && !username)) {
    Alert.alert('Error', 'All fields are required.');
    return;
  }

  const auth = getAuth();

  try {
    let userCredential;

    if (isRegistering) {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } 
    else {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    }

    const user = userCredential.user;
    setUser(user); // store relevant user info

    Alert.alert(
      'Success',
      `${isRegistering ? 'Registration' : 'Login'} successful!`,
      [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
    );
  } 
  catch (error: any) {
    console.error(error);
    Alert.alert('Firebase Auth Error', error.message || 'Authentication failed.');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Create an Account' : 'Login'}</Text>

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username || ''}
          onChangeText={text => handleChange('username', text)}
          autoCapitalize="none"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={text => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={text => handleChange('password', text)}
      />

      <Button title={isRegistering ? 'Register' : 'Login'} onPress={handleSubmit} />

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.toggleText}>
          {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Register"}
        </Text>
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
  toggleText: {
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AuthScreen;