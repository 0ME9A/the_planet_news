import { StyleSheet, Text, View, StatusBar } from "react-native";
import InshortTabs from "./components/InshortTabs";
import TheContext, { NewsContext } from "./API/TheContext";
import { useContext } from "react";

function App() {
  const { DarkTheme } = useContext(NewsContext);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: DarkTheme ? "#282c35" : "white",
      }}
    >
      <InshortTabs />
    </View>
  );
}

export default function WrapApp() {
  return (
    <TheContext>
      <App />
    </TheContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
