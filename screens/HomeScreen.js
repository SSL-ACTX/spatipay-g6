import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
import Svg, { Path } from 'react-native-svg'; // Import Svg and Path
import { useFonts } from 'expo-font'; // Import useFonts

const { width: screenWidth } = Dimensions.get('window');

const AppScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'SpotifyMix-Bold': require('../assets/fonts/SpotifyMix-Bold.ttf'),
    'SpotifyMix-Regular': require('../assets/fonts/SpotifyMix-Regular.ttf'),
    'SpotifyMix-Medium': require('../assets/fonts/SpotifyMix-Medium.ttf'),
  });

  const topAlbums = [
    { uri: 'https://picsum.photos/200/300' },
    { uri: 'https://picsum.photos/201/300' },
    { uri: 'https://picsum.photos/202/300' },
    { uri: 'https://picsum.photos/203/300' },
    { uri: 'https://picsum.photos/204/300' },
  ];

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Display a loading state until fonts are ready
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { fontFamily: 'SpotifyMix-Bold' }]}>Top Albums</Text>
      </View>
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
      <View style={styles.songContainer}>
        <Text style={[styles.songText, { fontFamily: 'SpotifyMix-Bold' }]}>Top Songs</Text>
      </View>
      <View style={styles.songs}>
        {[
          { uri: 'https://picsum.photos/205/300', title: 'Tingin - Cup of Joe, Janine Teñoso' },
          { uri: 'https://picsum.photos/206/300', title: 'IV of Spades - Mundo' },
          { uri: 'https://picsum.photos/207/300', title: 'Arthur Nery - Take All The Love' },
          { uri: 'https://picsum.photos/208/300', title: 'Maki - Dilaw' }
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
        <TouchableOpacity style={styles.footerButton}>
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
    borderRadius: 10,
    overflow: 'hidden',
  },
  albumImage: {
    width: '100%',
    height: '100%',
  },
  carouselContainer: {
    marginBottom: -20,
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

