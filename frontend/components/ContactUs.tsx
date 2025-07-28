import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Alert, ScrollView } from 'react-native';

const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // You can add your form submission logic here (e.g., API call)
    Alert.alert('Message sent!', `Thanks for contacting us, ${name}.`);
    // Clear form after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <ScrollView contentContainerStyle={styles.contactusOuter}>
      <View style={styles.contactusCard}>
        <Text style={styles.contactusTitle}>Contact Us</Text>
        <View style={styles.contactusUnderline} />

        <Text style={styles.contactusText}>
          Have questions, feedback, or need support?{"\n\n"}
          Our team is here to help!{"\n\n"}
          <Text style={{ fontWeight: 'bold' }}>Email: </Text>
          <Text
            style={styles.contactusLink}
            onPress={() => Linking.openURL('mailto:support@nodemart.com')}
          >
            support@nodemart.com
          </Text>
          {"\n"}
          <Text style={{ fontWeight: 'bold' }}>Phone: </Text>
          <Text
            style={styles.contactusLink}
            onPress={() => Linking.openURL('tel:+1234567890')}
          >
            +1 (234) 567-890
          </Text>
          {"\n\n"}
          Or use the form below and we’ll get back to you as soon as possible.
        </Text>

        <View style={styles.contactusForm}>
          <TextInput
            style={styles.contactusInput}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
            required
          />
          <TextInput
            style={styles.contactusInput}
            placeholder="Your Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            required
          />
          <TextInput
            style={[styles.contactusInput, styles.contactusTextarea]}
            placeholder="Your Message"
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
            required
          />

          <TouchableOpacity style={styles.contactusBtn} onPress={handleSubmit}>
            <Text style={styles.contactusBtnText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contactusOuter: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  contactusCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  contactusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactusUnderline: {
    height: 3,
    width: 60,
    backgroundColor: '#007BFF',
    marginBottom: 20,
    borderRadius: 2,
  },
  contactusText: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  contactusLink: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  contactusForm: {
    marginTop: 10,
  },
  contactusInput: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  contactusTextarea: {
    height: 100,
    textAlignVertical: 'top', // Android: makes multiline text start at top-left
  },
  contactusBtn: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  contactusBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ContactUs;
