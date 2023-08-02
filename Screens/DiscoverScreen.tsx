import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { categories, sources } from "../API/api";
import { NewsContext } from "../API/TheContext";
import { useContext } from "react";

import Carousel from "react-native-snap-carousel";
import Search from "../components/Search";

export default function DiscoverScreen() {
  const { fetchNews, fetchBySource, DarkTheme } = useContext(NewsContext);

  const windowSize = Dimensions.get("window");
  const SLIDE_WIDTH = Math.round(windowSize.width / 3.5);

  const color = DarkTheme ? "lightgrey" : "black";

  return (
    <ScrollView>
      <Search />
      <View style={styles.discover}>
        <Text
          style={{
            ...styles.subtitle,
            color,
          }}
        >
          Category
        </Text>
        <Carousel
          layout="default"
          data={categories}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.category}
              onPress={() => fetchNews(item?.name)}
            >
              <Image source={{ uri: item.pic }} style={styles.categoryImage} />
              <Text
                style={{
                  ...styles.name,
                  color,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          sliderWidth={windowSize.width}
          itemWidth={SLIDE_WIDTH}
          activeSlideAlignment="start"
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />

        <Text
          style={{
            ...styles.subtitle,
            color,
          }}
        >
          Sources
        </Text>

        <View style={styles.sources}>
          {sources.map((item) => (
            <TouchableOpacity
              style={styles.sourceContainer}
              onPress={() => fetchBySource(item.id)}
              key={item.id}
            >
              <Image source={{ uri: item.pic }} style={styles.sourceImage} />
              <Text
                style={{
                  ...styles.name,
                  color,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  discover: {
    padding: 10,
    alignItems: "center",
    position: "relative",
    zIndex: -1,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 8,
    borderBottomColor: "#007fff",
    borderBottomWidth: 5,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  categoryImage: {
    width: "100%",
    height: "60%",
    resizeMode: "contain",
  },
  name: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  category: {
    height: 130,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  sources: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  sourceContainer: {
    height: 150,
    width: "40%",
    borderRadius: 10,
    margin: 15,
    backgroundColor: "#cc313d",
  },
  sourceImage: {
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
});
