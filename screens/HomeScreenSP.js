import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { IconButton } from 'react-native-paper';
import axios from 'axios';

// YouTube API key (replace it with your own)
const YOUTUBE_API_KEY = 'AIzaSyBLCbDLftZx0hHZ9mifFUDuFsK6seWwLVU';

// Define background colors for each category
const categoryBackgroundColors = {
  Energize: 'rgba(255, 99, 71, 0.6)',  // Red-like color
  Sad: 'rgba(70, 130, 180, 0.6)',      // Steel blue color
  Romance: 'rgba(255, 182, 193, 0.6)', // Light pink color
  Party: 'rgba(218, 112, 214, 0.6)',   // Orchid color
  Workout: 'rgba(144, 238, 144, 0.6)', // Light green color
};

// Fetch YouTube videos for a specific query
const fetchYoutubeVideos = async (setVideos, query) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 10,
        q: query, // Search query based on category
        type: 'video',
        key: YOUTUBE_API_KEY,
      },
    });
    const videos = response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      image: item.snippet.thumbnails.medium.url,
    }));
    setVideos(videos);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
  }
};

function HomeScreen() {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Energize');

  useEffect(() => {
    // Fetch videos when category changes
    fetchYoutubeVideos(setVideos, selectedCategory);
  }, [selectedCategory]);

  return (
    <ScrollView style={styles.container}>
      {/* Blurred Header with Dynamic Background */}
      <View style={styles.headerContainer}>
        <BlurView intensity={80} style={styles.blurBackground}>
          <View
            style={[
              styles.header,
              { backgroundColor: categoryBackgroundColors[selectedCategory] },
            ]}
          >
            <Image
              source={{
                uri: 'https://th.bing.com/th/id/R.148b28a3992349e8db92184c65d24bbd?rik=AJNg4RcAH8fwOg&riu=http%3a%2f%2forig12.deviantart.net%2f846f%2ff%2f2015%2f245%2f9%2fb%2fnew_spotify_icon_by_mattroxzworld-d98301o.png&ehk=4kqixXCdaWV6y4x6GzGcuj9iskpnJgcYXxemWAfh3cc%3d&risl=&pid=ImgRaw&r=0',
              }}
              style={styles.logo}
            />
            <View style={styles.headerRight}>
              <IconButton icon="bell" color="white" size={24} onPress={() => {}} style={styles.iconButtonShadow} />
              <IconButton icon="account-circle" color="white" size={24} onPress={() => {}} style={styles.iconButtonShadow} />
            </View>
          </View>
        </BlurView>
      </View>

      {/* Horizontal Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {['Energize', 'Sad', 'Romance', 'Party', 'Workout'].map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* YouTube Videos for the selected category */}
      <Text style={styles.sectionTitle}>{selectedCategory} Songs</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            <Image source={{ uri: item.image }} style={styles.songImage} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
          </View>
        )}
      />

      {/* Sticky Player at Bottom */}
      <View style={styles.player}>
        <Image source={{ uri: 'https://example.com/song.jpg' }} style={styles.playerImage} />
        <View style={styles.playerInfo}>
          <Text style={styles.playerTitle}>Nothing is playing</Text>
        </View>
        <IconButton icon="play-circle" color="white" size={40} onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  headerContainer: { marginBottom: 10, marginTop: 40, height: 40 },
  blurBackground: { position: 'absolute', width: '100%', height: '100%' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: 110,
    borderRadius: 10,
  },
  logo: { width: 50, height: 50, resizeMode: 'contain', marginRight: 16 },
  headerRight: { flexDirection: 'row' },
  iconButtonShadow: {
    shadowColor: '#fff', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  categories: { paddingHorizontal: 16, marginVertical: 16, marginLeft: 70 },
  categoryButton: { backgroundColor: '#333', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, marginRight: 10 },
  categoryText: { color: '#fff', fontSize: 14 },
  activeCategoryText: { color: '#1DB954' }, // Active category indicator color
  sectionTitle: { color: '#fff', fontSize: 20, paddingHorizontal: 16, marginTop: 20 },
  songItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  songImage: { width: 60, height: 60, borderRadius: 8 },
  songInfo: { marginLeft: 16 },
  songTitle: { color: '#fff', fontSize: 16 },
  songArtist: { color: '#999', fontSize: 14 },
  player: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', padding: 16, position: 'absolute', bottom: 0, width: '100%' },
  playerImage: { width: 50, height: 50, borderRadius: 8 },
  playerInfo: { flex: 1, marginLeft: 16 },
  playerTitle: { color: '#fff', fontSize: 16 },
});

export default HomeScreen;

