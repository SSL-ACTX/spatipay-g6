import React, { useState } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Alert } from 'react-native';
import { useFonts } from 'expo-font';

const membersData = [
  {
    name: 'Kurt Mellina',
    role: 'Group Leader - UI/UX Designer',
    description: 'Creative leader with a passion for sleek designs.',
    imageUri: 'https://i.ibb.co/FHGbH71/download.jpg',
    socialIcons: [
      'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', 
      'https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1729123200&semt=ais_hybrid'
    ],
  },
  {
    name: 'Jameel Tutungan',
    role: 'User Persona - Developer',
    description: 'Backend expert focusing on user-driven solutions.',
    imageUri: 'https://i.ibb.co/ZfxQ2YK/461598146-4059792147582777-75358189503223332-n.webp',
    socialIcons: [
      'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', 
      'https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1729123200&semt=ais_hybrid'
    ],
  },
  {
    name: 'John Kenneth Sangco',
    role: 'Color Theory',
    description: 'Master of color, bringing life to every project.',
    imageUri: 'https://i.ibb.co/RTLzYxt/439921816-1723628964828942-5825253512076196182-n.webp',
    socialIcons: [
      'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', 
      'https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1729123200&semt=ais_hybrid'
    ],
  },
  {
    name: 'Johnpaul Sombilon',
    role: 'Typography',
    description: 'Typography guru with an eye for detail.',
    imageUri: 'https://i.ibb.co/XDxpvxY/463779766-1934363750379462-4246227973407069304-n.webp', 
    socialIcons: [
      'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', 
      'https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1729123200&semt=ais_hybrid'
    ],
  },
  {
    name: 'James Timothy Abetchuela',
    role: 'Typography',
    description: 'Design enthusiast with a flair for typography.',
    imageUri: 'https://i.ibb.co/FHGbH71/download.jpg',
    socialIcons: [
      'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', 
      'https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1729123200&semt=ais_hybrid'
    ],
  },
  {
    name: 'Charles Kenjie Noronio',
    role: 'Color Theory',
    description: 'Bringing vibrant and harmonious colors to life.',
    imageUri: 'https://i.ibb.co/FHGbH71/download.jpg',
    socialIcons: [
      'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png', 
      'https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1729123200&semt=ais_hybrid'
    ],
  },
];

const AboutScreen = () => {
  const [displayCount, setDisplayCount] = useState(3); // Initial number of members to display

  const handleScroll = (event) => {
    const scrollOffsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    // Check if the user scrolled to the bottom
    if (scrollOffsetY + layoutHeight >= contentHeight) {
      setDisplayCount((prevCount) => Math.min(prevCount + 3, membersData.length)); // Load 3 more members
    }
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
    <ScrollView 
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={16} // Throttle the scroll event
    >
      <Text style={[styles.title, { fontFamily: 'SpotifyMix-Bold' }]}>Group 6 - Group Members</Text>
      <View style={styles.teamMembers}>
        {membersData.slice(0, displayCount).map((member, index) => (
          <View key={index} style={styles.member}>
            <Image source={{ uri: member.imageUri }} style={styles.memberImage} />
            <Text style={[styles.memberName, { fontFamily: 'SpotifyMix-Bold' }]}>{member.name}</Text>
            <Text style={[styles.memberRole, { fontFamily: 'SpotifyMix-Medium' }]}>{member.role}</Text>
            <Text style={[styles.memberDescription, { fontFamily: 'SpotifyMix-Regular' }]}>{member.description}</Text>
            <View style={styles.socialIcons}>
              {member.socialIcons.map((icon, iconIndex) => (
                <Image key={iconIndex} source={{ uri: icon }} style={styles.socialIcon} />
              ))}
            </View>
          </View>
        ))}
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
    marginTop: 10,
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
    width: 30, // Larger icons
    height: 30,
    overflow: 'hidden',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 6,
    marginLeft: 10,
  },
});

export default AboutScreen;

