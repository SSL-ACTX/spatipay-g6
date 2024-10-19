import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { auth } from '../firebase'; // Import your Firebase auth
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'; // Import necessary methods

const ProfileScreen = () => {
  const user = auth.currentUser; // Get the current user
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // State for current password
  const [showPasswordChange, setShowPasswordChange] = useState(false); // State to toggle password change visibility
  const [loading, setLoading] = useState(false); // State for loading

  // Ensure the user is authenticated
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>User not authenticated</Text>
      </View>
    );
  }

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    if (newPassword === currentPassword) {
      Alert.alert('Error', 'New password must be different from current password.');
      return;
    }

    setLoading(true);
    try {
      // Reauthenticate the user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Now update the password
      await updatePassword(user, newPassword);
      Alert.alert('Success', 'Password changed successfully!');
      setNewPassword(''); // Clear the input field
      setCurrentPassword(''); // Clear the current password input field
    } catch (error) {
      let errorMessage = 'An error occurred';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Current password is incorrect.';
      }
      Alert.alert('Error', errorMessage); // Handle errors
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://i.ibb.co/FHGbH71/download.jpg' }} // Replace with the user's profile image URL
          style={styles.profileImage}
        />
        <Text style={styles.title}>{user?.email}</Text>
      </View>

      <TouchableOpacity 
        style={styles.toggleButton} 
        onPress={() => setShowPasswordChange(!showPasswordChange)}
      >
        <Text style={styles.toggleButtonText}>
          {showPasswordChange ? 'Hide Password Change' : 'Change Password'}
        </Text>
      </TouchableOpacity>

      {showPasswordChange && (
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            style={styles.input}
            secureTextEntry
          />

          <TextInput
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleChangePassword} 
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Changing...' : 'Change Password'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2EB872',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#000', 
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    alignSelf: 'stretch',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff', 
  },
  label: {
    fontSize: 18,
    color: '#fff',
  },
  toggleButton: {
    marginHorizontal: '30%',
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#000', 
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 25,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  passwordContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    elevation: 3,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2EB872', // Matching button color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProfileScreen;
