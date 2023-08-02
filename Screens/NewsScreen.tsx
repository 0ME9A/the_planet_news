import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import SingleNews from "../components/SingleNews";
import { NewsContext } from "../API/TheContext";

const NewsScreen = () => {
  const { News, setIndex } = useContext(NewsContext);

  const [activeIndex, setActiveIndex] = useState<number>();
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.carousel}>
      {News?.articles && (
        <Carousel
          firstItem={News.articles.slice(0, 10).length - 1}
          layout={"stack"}
          data={News.articles.slice(0, 10)}
          sliderHeight={300}
          itemHeight={windowHeight}
          vertical={true}
          renderItem={({ item, index }) => (
            <SingleNews item={item} index={index} />
          )}
          onSnapToItem={(index) => setIndex(index)}
        />
      )}
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    transform: [{ scaleY: -1 }],
    backgroundColor: "black",
  },
});
