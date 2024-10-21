import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Alert, ScrollView, Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
import Svg, { Path } from 'react-native-svg';
import { useFonts } from 'expo-font';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av'; 

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

  const [topAlbums, setTopAlbums] = useState([]);
  const [showSecretContainer, setShowSecretContainer] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [sound, setSound] = useState(); // State to hold the audio object
  const [isPlaying, setIsPlaying] = useState(false); // State to track if a song is playing
  const [currentSongIndex, setCurrentSongIndex] = useState(null); // Track the currently playing song index
  const [animation] = useState(new Animated.Value(0)); // Animated value for indicator

  const songs = [
    { uri: 'https://github.com/SSL-ACTX/TG_Test/raw/569f5a5d2b1847c239424a86e163a592db98f0ca/Cup%20of%20Joe,%20Janine%20Te%C3%B1oso%20%20-%20_Tingin_%20(Official%20Lyric%20Video).m4a' },
    { uri: 'https://github.com/SSL-ACTX/TG_Test/raw/569f5a5d2b1847c239424a86e163a592db98f0ca/Mundo.m4a' },
    { uri: 'https://github.com/SSL-ACTX/TG_Test/raw/569f5a5d2b1847c239424a86e163a592db98f0ca/TAKE%20ALL%20THE%20LOVE%20-%20Arthur%20Nery%20%5BOfficial%20Lyric%20Video%5D.m4a' },
    { uri: 'https://github.com/SSL-ACTX/TG_Test/raw/569f5a5d2b1847c239424a86e163a592db98f0ca/Maki%20-%20Dilaw%20(Lyrics).m4a' },
  ];

  useEffect(() => {
    const loadAlbums = async () => {
      const storedAlbums = await AsyncStorage.getItem('topAlbums');
      if (storedAlbums) {
        setTopAlbums(JSON.parse(storedAlbums));
      } else {
        setTopAlbums(initialTopAlbums);
      }
    };
    loadAlbums();
  }, []);

  const saveAlbums = async (albums) => {
    await AsyncStorage.setItem('topAlbums', JSON.stringify(albums));
  };

  const handleLongPress = () => {
    setShowSecretContainer(true);
  };

  const handleAddImage = () => {
    if (newImage.trim() === '') {
      Alert.alert('Error', 'Please enter a valid image URL');
      return;
    }
    const newAlbums = [...topAlbums, { uri: newImage }];
    setTopAlbums(newAlbums);
    saveAlbums(newAlbums);
    setNewImage('');
  };

  const handleChangeImage = (index, value) => {
    const updatedAlbums = [...topAlbums];
    updatedAlbums[index].uri = value;
    setTopAlbums(updatedAlbums);
    saveAlbums(updatedAlbums);
  };

  const closeSecretContainer = () => {
    setShowSecretContainer(false);
  };

  const handleSongPress = async (index) => {
    const cachedSoundKey = `cachedSound_${index}`;
    const cachedSound = await AsyncStorage.getItem(cachedSoundKey);
    
    // If the same song is clicked, stop it
    if (currentSongIndex === index) {
      if (isPlaying) {
        await sound.stopAsync();
        setIsPlaying(false);
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      // Load new song
      if (sound) {
        await sound.unloadAsync(); // Unload previous sound
      }

      // Check if the sound is already cached
      if (cachedSound) {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: cachedSound });
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
        setCurrentSongIndex(index);
        // Start the animation
        Animated.loop(
          Animated.sequence([
            Animated.timing(animation, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(animation, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ).start();
      } else {
        // If not cached, fetch the sound and cache it
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: songs[index].uri });
        setSound(newSound);
        await newSound.playAsync();
        await AsyncStorage.setItem(cachedSoundKey, songs[index].uri); // Cache the song URI
        setIsPlaying(true);
        setCurrentSongIndex(index);
        // Start the animation
        Animated.loop(
          Animated.sequence([
            Animated.timing(animation, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(animation, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ).start();
      }
    }
  };

  // New logout function
  const handleLogout = async () => {
    if (sound) {
      await sound.stopAsync(); // Stop the current song
      await sound.unloadAsync(); // Unload the sound to free resources
      setIsPlaying(false); // Reset the playing state
      setCurrentSongIndex(null); // Reset the current song index
    }
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  // Calculate scale for the indicator based on animated value
  const scaleInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

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
          <TouchableOpacity key={index} style={styles.song} onPress={() => handleSongPress(index)}>
            <Image source={{ uri: song.uri }} style={styles.songImage} />
            <Text style={[styles.songTitle, { fontFamily: 'SpotifyMix-Medium' }]}>{song.title}</Text>
            <View style={styles.playButton}>
              {/* Play Button SVG */}
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path d="M8 5v14l11-7L8 5z" fill="#000000" />
              </Svg>
            </View>
            {currentSongIndex === index && isPlaying && (
              <Animated.View style={[styles.indicator, { transform: [{ scale: scaleInterpolate }] }]}>
                <Text style={styles.indicatorText}>Playing</Text>
              </Animated.View>
            )}
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
        <TouchableOpacity style={styles.footerButton} onPress={handleLogout}>
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
    marginTop: '8%',
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
    borderWidth: 1.5,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 5.84,
    elevation: 10,
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
    top: '42%',
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
    borderWidth: 2,
    borderColor: '#000',
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
