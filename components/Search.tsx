import { FontAwesome } from "@expo/vector-icons";
import { NewsContext } from "../API/TheContext";
import { useContext, useState } from "react";
import { newsType } from "../types/newsType";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

import SingleNews from "./SingleNews";

export default function Search() {
  const { News } = useContext(NewsContext);
  const [SearchResult, setSearchResult] = useState<newsType[] | null>(null);
  const [CurrentNews, setCurrentNews] = useState<newsType | null>(null);

  const handleSearch = (text: string) => {
    // console.log(text);
    if (text) {
      News?.articles &&
        setSearchResult(
          News.articles.filter((item) =>
            item.title.toLowerCase().includes(text.toLowerCase())
          )
        );
    } else {
      setSearchResult(null);
    }
  };

  const handleModal = (data: newsType) => {
    setCurrentNews(data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...styles.search }}
        onChangeText={(text) => handleSearch(text)}
        placeholder="Search for news"
        placeholderTextColor={"white"}
      />
      <View style={styles.searchResult}>
        {SearchResult?.slice(0, 10).map((item) => (
          <TouchableOpacity
            key={item.title}
            activeOpacity={0.7}
            onPress={() => handleModal(item)}
          >
            <Text style={{ ...styles.singleResult }}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {CurrentNews && (
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setCurrentNews(null)}
        >
          <TouchableOpacity
            onPress={() => setCurrentNews(null)}
            style={styles.closeModal}
          >
            <FontAwesome name="close" size={24} color="red" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <SingleNews item={CurrentNews || null} index={0} pt={0} />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  search: {
    backgroundColor: "black",
    color: "white",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 15,
  },
  searchResult: {
    position: "absolute",
    zIndex: 100,
    top: 70,
    left: 10,
    backgroundColor: "black",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  singleResult: {
    backgroundColor: "black",
    color: "white",
    padding: 10,
    borderWidth: 0.5,
    borderBottomColor: "gray",
  },
  closeModal: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    marginRight: 20,
    top: 10,
    backgroundColor: "black",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    height: "100%",
    transform: [{ scaleY: -1 }],
  },
});
