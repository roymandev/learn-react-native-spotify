import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const LikedSongsScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");

  return (
    <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>

          <View
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 9,
              gap: 10,
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#42275a",
                padding: 9,
                flex: 1,
                borderRadius: 3,
                height: 38,
              }}
            >
              <AntDesign name="search1" size={24} color="white" />
              <TextInput
                value={input}
                onTextInput={setInput}
                placeholder="Find in Liked songs"
                placeholderTextColor="white"
              />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#42275a",
                padding: 10,
                borderRadius: 3,
                height: 38,
              }}
            >
              <Text style={{ color: "white" }}>Sort</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default LikedSongsScreen;

const styles = StyleSheet.create({});
