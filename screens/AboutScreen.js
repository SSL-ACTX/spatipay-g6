// AboutScreen.js
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Group 6 - Group Members</Text>
      <View style={styles.teamMembers}>
        <View style={styles.member}>
          <Image source={{ uri: 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png' }} style={styles.memberImage} />
          <Text style={styles.memberName}>Kurt Mellina</Text>
          <Text style={styles.memberRole}>Group Leader - UI/UX Designer</Text>
          <Text style={styles.memberDescription}>TBC</Text>
          <View style={styles.socialIcons}>
            <Image source={{ uri: 'https://picsum.photos/100/100?random=1' }} style={styles.socialIcon} />
            <Image source={{ uri: 'https://picsum.photos/100/100?random=2' }} style={styles.socialIcon} />
            <Image source={{ uri: 'https://picsum.photos/100/100?random=3' }} style={styles.socialIcon} />
          </View>
        </View>
        <View style={styles.member}>
          <Image source={{ uri: 'https://avatars.githubusercontent.com/u/120081647?v=4' }} style={styles.memberImage} />
          <Text style={styles.memberName}>Jameel Tutungan</Text>
          <Text style={styles.memberRole}>User Persona - Backend Dev</Text>
          <Text style={styles.memberDescription}>TBC</Text>
          <View style={styles.socialIcons}>
            <Image source={{ uri: 'https://picsum.photos/100/100?random=1' }} style={styles.socialIcon} />
            <Image source={{ uri: 'https://picsum.photos/100/100?random=2' }} style={styles.socialIcon} />
            <Image source={{ uri: 'https://picsum.photos/100/100?random=3' }} style={styles.socialIcon} />
          </View>
        </View>
        <View style={styles.member}>
          <Image source={{ uri: 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png' }} style={styles.memberImage} />
          <Text style={styles.memberName}>John Kenneth Sangco</Text>
          <Text style={styles.memberRole}>Color Theory</Text>
          <Text style={styles.memberDescription}>TBC</Text>
          <View style={styles.socialIcons}>
            <Image source={{ uri: 'https://picsum.photos/100/100?random=1' }} style={styles.socialIcon} />
            <Image source={{ uri: 'https://picsum.photos/100/100?random=2' }} style={styles.socialIcon} />
            <Image source={{ uri: 'https://picsum.photos/100/100?random=3' }} style={styles.socialIcon} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2EB872', // Light background
    padding: 20,
  },
  title: {
    fontSize: 28, // Larger title font size
    fontWeight: 'bold',
    color: '#fff', // Darker title color
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'center',
  },
  teamMembers: {
    flexDirection: 'column',
  },
  member: {
    alignItems: 'center',
    marginBottom: 40, 
    backgroundColor: '#000', 
    borderRadius: 20,
    padding: 20,
    shadowColor: '#fff', 
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.75,
    shadowRadius: 5.84,
    elevation: 15,
  },
  memberImage: {
    width: 120, // Larger image size
    height: 120,
    borderRadius: 60,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 15,
  },
  memberName: {
    fontSize: 22, // Larger name font size
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  memberRole: {
    fontSize: 18, 
    color: '#d3d3d3', 
    marginBottom: 10,
  },
  memberDescription: {
    fontSize: 16, 
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 30, // Larger icons
    height: 30,
    borderRadius: 60,
    marginRight: 15,
  },
});

export default AboutScreen;