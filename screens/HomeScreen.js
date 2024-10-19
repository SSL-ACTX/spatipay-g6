import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Alert, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
import Svg, { Path } from 'react-native-svg';
import { useFonts } from 'expo-font';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Simulated JSON data
const initialTopAlbums = [
  { uri: 'https://i.ibb.co/wwdncLg/ab67616d00001e02aa23e019734fd2eaeab2425e.jpg' },
  { uri: 'https://i.ibb.co/7kpWf44/Screenshot-20241019-233647.jpg' },
  { uri: 'https://picsum.photos/202/300' },
  { uri: 'https://picsum.photos/203/300' },
  { uri: 'https://picsum.photos/204/300' },
];

const { width: screenWidth } = Dimensions.get('window');

const AppScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'SpotifyMix-Bold': require('../assets/fonts/SpotifyMix-Bold.ttf'),
    'SpotifyMix-Regular': require('../assets/fonts/SpotifyMix-Regular.ttf'),
    'SpotifyMix-Medium': require('../assets/fonts/SpotifyMix-Medium.ttf'),
  });

  const [topAlbums, setTopAlbums] = useState([]); // Top albums fetched from JSON
  const [showSecretContainer, setShowSecretContainer] = useState(false);
  const [newImage, setNewImage] = useState('');

  // Load JSON data on start
  useEffect(() => {
    const loadAlbums = async () => {
      const storedAlbums = await AsyncStorage.getItem('topAlbums');
      if (storedAlbums) {
        setTopAlbums(JSON.parse(storedAlbums)); // Load from AsyncStorage
      } else {
        setTopAlbums(initialTopAlbums); // Fallback to initial data
      }
    };
    loadAlbums();
  }, []);

  // Function to save top albums to AsyncStorage
  const saveAlbums = async (albums) => {
    await AsyncStorage.setItem('topAlbums', JSON.stringify(albums));
  };

  const handleLongPress = () => {
    setShowSecretContainer(true);  // Show the secret container
  };

  const handleAddImage = () => {
    if (newImage.trim() === '') {
      Alert.alert('Error', 'Please enter a valid image URL');
      return;
    }
    const newAlbums = [...topAlbums, { uri: newImage }];
    setTopAlbums(newAlbums); // Add new image to carousel
    saveAlbums(newAlbums); // Save to AsyncStorage
    setNewImage(''); // Clear input
  };

  const handleChangeImage = (index, value) => {
    const updatedAlbums = [...topAlbums];
    updatedAlbums[index].uri = value;
    setTopAlbums(updatedAlbums); // Update image URL in the carousel
    saveAlbums(updatedAlbums); // Save to AsyncStorage
  };

  const closeSecretContainer = () => {
    setShowSecretContainer(false);
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onLongPress={handleLongPress} delayLongPress={3000}>
        <View style={styles.header}>
          <Text style={[styles.headerText, { fontFamily: 'SpotifyMix-Bold' }]}>Top Albums</Text>
        </View>
      </TouchableWithoutFeedback>

      <Carousel
        data={topAlbums}
        renderItem={({ item }) => (
          <View style={styles.album}>
            <Image source={{ uri: item.uri }} style={styles.albumImage} />
          </View>
        )}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.75}
        loop
        autoplay
        autoplayDelay={1000}
        autoplayInterval={3000}
        containerCustomStyle={styles.carouselContainer}
      />

      {showSecretContainer && (
        <ScrollView style={styles.secretContainer}>
          <Text style={[styles.secretTitle, { fontFamily: 'SpotifyMix-Bold' }]}>Modify Images</Text>
          <TouchableOpacity onPress={closeSecretContainer} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          
          {topAlbums.map((album, index) => (
            <View key={index} style={styles.imageLinkContainer}>
              <Text style={styles.imageText}>Image {index + 1}:</Text>
              <TextInput
                value={album.uri}
                onChangeText={(text) => handleChangeImage(index, text)}
                style={styles.input}
              />
            </View>
          ))}

          <Text style={[styles.secretTitle, { fontFamily: 'SpotifyMix-Bold', marginTop: 20 }]}>Add New Image</Text>
          <TextInput
            value={newImage}
            onChangeText={setNewImage}
            placeholder="Enter Image URL"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleAddImage} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <View style={styles.songContainer}>
        <Text style={[styles.songText, { fontFamily: 'SpotifyMix-Bold' }]}>Top Songs</Text>
      </View>
      <View style={styles.songs}>
        {[
          { uri: 'https://i.ibb.co/88zYWgn/tingin.jpg', title: 'Tingin - Cup of Joe, Janine Teñoso' },
          { uri: 'https://i.ibb.co/PNP3KsB/mundo.jpg', title: 'IV of Spades - Mundo' },
          { uri: 'https://i.ibb.co/DrZrgBW/tkall.jpg', title: 'Arthur Nery - Take All The Love' },
          { uri: 'https://i.ibb.co/4j99vDC/dlaw.jpg', title: 'Maki - Dilaw' }
        ].map((song, index) => (
          <TouchableOpacity key={index} style={styles.song}>
            <Image source={{ uri: song.uri }} style={styles.songImage} />
            <Text style={[styles.songTitle, { fontFamily: 'SpotifyMix-Medium' }]}>{song.title}</Text>
            <View style={styles.playButton}>
              {/* Play Button SVG */}
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path d="M8 5v14l11-7L8 5z" fill="#000000" />
              </Svg>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('About')}>
          <Image source={require('../assets/users.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/user.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Login')}>
          <Image source={require('../assets/exit.png')} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2EB872',
    paddingBottom: 70,
  },
  header: {
    padding: 5,
    marginTop: '10%',
    marginLeft: '20%',
    marginRight: '20%',
    marginBottom: '4%',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#2E9B4A',
  },
  headerText: {
    fontSize: 24,
    color: '#000',
  },
  album: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
  },
  albumImage: {
    width: '100%',
    height: '100%',
  },
  carouselContainer: {
    marginBottom: -20,
  },
  secretContainer: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    zIndex: 999,
  },
  secretTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  closeButton: {
    backgroundColor: '#FF5C5C',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  songContainer: {
    position: 'absolute',
    top: '43%',
    left: '20%',
    right: '20%',
    padding: 5,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#2E9B4A',
  },
  songText: {
    fontSize: 24,
    color: '#000',
  },
  songs: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    borderRadius: 12,
  },
  song: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  songTitle: {
    fontSize: 16,
    color: '#000',
  },
  playButton: {
    marginLeft: 'auto',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 9,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(124, 179, 66, 0.8)',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#000',
  },
  footerButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});

export default AppScreen;
