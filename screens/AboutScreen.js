import React, { useState } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Alert, TouchableOpacity, Linking } from 'react-native';
import { useFonts } from 'expo-font';

const membersData = [
  {
    name: 'Kurt Mellina (20)',
    role: 'UI/UX Designer / Group Leader',
    description: 'Creative leader with a passion for minimalistic designs.',
    imageUri: 'https://i.ibb.co/FHGbH71/download.jpg',
    extendedDetails: [
      'App UI/UX design using Figma',
      'Responsible Leader'
    ],
    socialIcons: [
      { iconUri: 'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', link: 'https://facebook.com' }
    ],
  },
  {
    name: 'Jameel Tutungan (20)',
    role: 'User Persona / Developer',
    description: 'I hate sleeping, it wastes so much time. \n─ Jameel',
    imageUri: 'https://i.ibb.co/ZfxQ2YK/461598146-4059792147582777-75358189503223332-n.webp',
    extendedDetails: [
      'Overall App backend/frontend',
      'Firebase Auth Integration for account creation and login',
      'Minor UI and Style Improvements',
      'Music Playback functionality (extras)'
    ],
    socialIcons: [
      { iconUri: 'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', link: 'https://facebook.com/seuriin' },
      { iconUri: 'https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png', link: 'https://github.com/SSL-ACTX' },
      { iconUri: 'https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1729123200&semt=ais_hybrid', link: 'https://x.com/lordxu777' }
    ],
  },
  {
    name: 'John Kenneth Sangco (21)',
    role: 'Color Theory / 60-30-10 Rule',
    description: 'Capable of bringing life to every project.',
    imageUri: 'https://i.ibb.co/RTLzYxt/439921816-1723628964828942-5825253512076196182-n.webp',
    extendedDetails: [
      '60-30-10 Rule',
      'Reliable Teammate'
    ],
    socialIcons: [
      { iconUri: 'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', link: 'https://facebook.com' }
    ],
  },
  {
    name: 'Charles Kenjie Noronio (21)',
    role: 'Color Theory / 60-30-10 Rule',
    description: 'ꕥ',
    imageUri: 'https://i.ibb.co/FHGbH71/download.jpg',
    extendedDetails: [
      '60-30-10 Rule',
    ],
    socialIcons: [
      { iconUri: 'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', link: 'https://facebook.com' }
    ],
  },
  {
    name: 'Johnpaul Sombilon (23)',
    role: 'Typography',
    description: 'ꕥ',
    imageUri: 'https://i.ibb.co/XDxpvxY/463779766-1934363750379462-4246227973407069304-n.webp',
    extendedDetails: [
      'Typography',
    ],
    socialIcons: [
      { iconUri: 'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', link: 'https://facebook.com' }
    ],
  },
  {
    name: 'James Timothy Abetchuela (23)',
    role: 'Typography',
    description: 'ꕥ',
    imageUri: 'https://i.ibb.co/FHGbH71/download.jpg',
    extendedDetails: [
      'Typography',
    ],
    socialIcons: [
      { iconUri: 'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', link: 'https://facebook.com' }
    ],
  },
];


const AboutScreen = () => {
  const [expandedMember, setExpandedMember] = useState(null);

  const toggleExpand = (index) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

  const [fontsLoaded] = useFonts({
    'SpotifyMix-Bold': require('../assets/fonts/SpotifyMix-Bold.ttf'),
    'SpotifyMix-Regular': require('../assets/fonts/SpotifyMix-Regular.ttf'),
    'SpotifyMix-Medium': require('../assets/fonts/SpotifyMix-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container} scrollEventThrottle={16}>
      <Text style={[styles.title, { fontFamily: 'SpotifyMix-Bold' }]}>Group 6 - Team Members</Text>
      <View style={styles.teamMembers}>
        {membersData.map((member, index) => (
          <TouchableOpacity key={index} onPress={() => toggleExpand(index)} style={styles.member}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: member.imageUri }} style={styles.memberImage} />
            </View>
            <Text style={[styles.memberName, { fontFamily: 'SpotifyMix-Bold' }]}>{member.name}</Text>
            <Text style={[styles.memberRole, { fontFamily: 'SpotifyMix-Medium' }]}>{member.role}</Text>
            <Text style={[styles.memberDescription, { fontFamily: 'SpotifyMix-Regular' }]}>{member.description}</Text>

            <View style={styles.socialIcons}>
              {member.socialIcons.map((iconData, iconIndex) => (
                <TouchableOpacity key={iconIndex} onPress={() => Linking.openURL(iconData.link)}>
                  <Image source={{ uri: iconData.iconUri }} style={styles.socialIcon} />
                </TouchableOpacity>
              ))}
            </View>

            {expandedMember === index && (
              <View style={styles.extendedDetails}>
                <Text style={styles.separator}>❃───────────────────────────────────❃</Text>
                {member.extendedDetails.map((detail, detailIndex) => (
                  <Text key={detailIndex} style={styles.extendedDetailItem}>• {detail}</Text>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2EB872',
    padding: 20,
    borderWidth: 4,
    borderColor: '#000',
    borderTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 70,
    marginTop: 0,
    textAlign: 'center',
  },
  teamMembers: {
    flexDirection: 'column',
  },
  member: {
    alignItems: 'center',
    marginBottom: 75,
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 5.84,
    elevation: 10,
  },
  imageContainer: {
    position: 'absolute',
    top: -60, 
    zIndex: 5, 
  },
  memberImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    zIndex: 5,
  },
  memberName: {
    marginTop: 50, // prevent overlapping
    fontSize: 22,
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
    fontStyle: 'italic',
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
    width: 30,
    height: 30,
    overflow: 'hidden',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 6,
    marginLeft: 10,
  },
  extendedDetails: {
    marginTop: 10,
    transition: '0.7s ease-in', 
  },
  extendedDetailItem: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 2,
  },
  separator: {
    color: '#fff',
    paddingBottom: 4,
  },
});

export default AboutScreen;