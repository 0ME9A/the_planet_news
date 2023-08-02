import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dispatch, SetStateAction, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { NewsContext } from "../API/TheContext";
import { AntDesign } from "@expo/vector-icons";

type TopNavigationType = {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
};

const TopNavigation = ({ index, setIndex }: TopNavigationType) => {
  const { fetchNews, setDarkTheme, DarkTheme } = useContext(NewsContext);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: DarkTheme ? "#282C35" : "white",
      }}
    >
      {index === 0 ? (
        <TouchableOpacity
          onPress={() => setDarkTheme(!DarkTheme)}
          style={styles.left}
        >
          <Text
            style={{ ...styles.text, color: DarkTheme ? "lightgrey" : "black" }}
          >
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={24}
              color="#007FFF"
            />
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.left} onPress={() => setIndex(0)}>
          <SimpleLineIcons name="arrow-left" size={15} color="#007FFF" />
          <Text
            style={{ ...styles.text, color: DarkTheme ? "lightgrey" : "black" }}
          >
            Discover
          </Text>
        </TouchableOpacity>
      )}

      <Text style={{ ...styles.center, color: DarkTheme ? "white" : "black" }}>
        {index ? "All News" : "Discover"}
      </Text>
      {index ? (
        <TouchableOpacity style={styles.right} onPress={() => fetchNews()}>
          <Text style={styles.text}>
            <AntDesign name="reload1" size={24} color="#007FFF" />
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.left} onPress={() => setIndex(1)}>
          <Text
            style={{ ...styles.text, color: DarkTheme ? "white" : "black" }}
          >
            All News
          </Text>
          <SimpleLineIcons name="arrow-right" size={15} color="#007FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TopNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  center: {
    paddingBottom: 6,
    borderBottomColor: "#007FFF",
    borderBottomWidth: 5,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "700",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  right: {
    width: 80,
    alignItems: "flex-end",
  },
});
