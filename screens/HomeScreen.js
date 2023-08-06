import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [userProfile, setUserProfile] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime >= 0 && currentTime < 12) {
      return "Good Morning";
    } else if (currentTime >= 12 && currentTime < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const message = greetingMessage();
  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTopItems = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
      if (!accessToken) {
        console.log("Access token not found");
        return;
      }

      const type = "artists";
      const response = await axios.get(
        `https://api.spotify.com/v1/me/top/${type}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTopArtists(response.data.items);
      // console.log(response.data.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getRecentlyPlayedSongs = async () => {
    const accessToken = await AsyncStorage.getItem("token");

    try {
      const response = await axios({
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/recently-played?limit=4",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const tracks = response.data.items;

      setRecentlyPlayed(tracks);
      // console.log(tracks);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProfile();
    getRecentlyPlayedSongs();
    getTopItems();
  }, []);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {userProfile?.images?.[0]?.url ? (
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    resizeMode: "cover",
                  }}
                  source={{ uri: userProfile?.images?.[0]?.url }}
                />
              ) : (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "white",
                  }}
                />
              )}
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {message}
              </Text>
            </View>

            <MaterialCommunityIcons
              name="lightning-bolt-outline"
              size={24}
              color="white"
            />
          </View>

          <View
            style={{
              marginHorizontal: 12,
              marginVertical: 5,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "#282828",
                padding: 10,
                borderRadius: 30,
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>Music</Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: "#282828",
                padding: 10,
                borderRadius: 30,
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>
                Podcast & Shows
              </Text>
            </Pressable>
          </View>

          <View style={{ height: 10 }} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("Liked")}
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 8,
                backgroundColor: "#202020",
                borderRadius: 4,
                elevation: 3,
              }}
            >
              <LinearGradient colors={["#33006f", "#FFFFFF"]}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="heart" size={24} color="white" />
                </View>
              </LinearGradient>

              <Text
                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
              >
                Liked Song
              </Text>
            </Pressable>

            <View
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 8,
                backgroundColor: "#202020",
                borderRadius: 4,
                elevation: 3,
              }}
            >
              <Image
                style={{ width: 55, height: 55 }}
                source={{ uri: "https://i.pravatar.cc/100" }}
              />
              <View style={styles.randomArtist}>
                <Text
                  style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
                >
                  Hiphop Tamhiza
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {recentlyPlayed.map((item, index) => (
              <View
                key={index}
                style={{
                  width: "50%",
                }}
              >
                <Pressable
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#282828",
                    borderRadius: 4,
                    elevation: 3,
                    marginVertical: 8,
                    marginHorizontal: 10,
                  }}
                >
                  <Image
                    style={{ height: 55, width: 55 }}
                    source={{ uri: item.track.album.images[0].url }}
                  />
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 8,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {item.track.name}
                    </Text>
                  </View>
                </Pressable>
              </View>
            ))}
          </View>

          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            Your Top Artists
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {topArtists.map((item, index) => (
              <ArtistCard key={index} item={item} />
            ))}
          </ScrollView>

          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            Recently Played
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentlyPlayed.map((item, index) => (
              <RecentlyPlayedCard key={index} item={item} />
            ))}
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
