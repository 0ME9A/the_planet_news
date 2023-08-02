import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import { newsType } from "../types/newsType";
import { NewsContext } from "../API/TheContext";

const WindowSize = Dimensions.get("window");

export default function SingleNews({
  item,
  index,
  pt = 50,
}: {
  item: newsType;
  index: number;
  pt: number;
}) {
  const { DarkTheme } = useContext(NewsContext);
  const color = DarkTheme ? "lightgrey" : "black";
  const backgroundC = DarkTheme ? "#282C35" : "white";

  return (
    <View
      style={{
        width: WindowSize.width,
        height: WindowSize.height,
        backgroundColor: backgroundC,
        transform: [{ scaleY: -1 }],
        paddingTop: pt,
      }}
    >
      <Image
        source={{ uri: item?.urlToImage }}
        style={{ height: "45%", resizeMode: "cover", width: WindowSize.width }}
      />
      <View style={styles.newsDetail}>
        <Text style={{ ...styles.title, color }}>{item.title}</Text>
        <Text style={{ ...styles.description, color }}>{item.description}</Text>
        <Text style={{ ...styles.description, marginTop: 10, color }}>
          Shorts by:- {item.author ?? "Unknown"}
        </Text>
      </View>
      <ImageBackground
        blurRadius={30}
        source={{ uri: item.urlToImage }}
        style={styles.footer}
      >
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
          <Text style={{ fontSize: 15, color }}>
            {item.content?.slice(0, 100)}{" "}
            <Text style={{ color: "#d7be69" }}>Read more...</Text>
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  newsDetail: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "white",
  },
  description: {
    fontSize: 14,
    color: "rgb(200, 200, 200)",
  },
  footer: {
    height: 80,
    width: WindowSize.width,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#d7be69",
    justifyContent: "center",
    padding: 10,
  },
});
