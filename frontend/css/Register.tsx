import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  registerContainer: {
    maxWidth: 400,
    marginVertical: 50,
    padding: 32, // 2rem ≈ 32px
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    alignSelf: 'center', // centers container - replaces marginHorizontal
    textAlign: 'center', // only text
  },

  registerFormInput: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  registerFormButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#e36c27',
    borderRadius: 6,
    fontWeight: 'bold',
    alignItems: 'center', // horizontal center
  },

  registerFormButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  googleBtn: {
    width: 280,
    marginBottom: 16,
    alignSelf: 'center', // horizontal cetner
  },
});
