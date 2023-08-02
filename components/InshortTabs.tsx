import { TabView, SceneMap } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import { NewsContext } from "../API/TheContext";
import { useContext, useState } from "react";
import DiscoverScreen from "../Screens/DiscoverScreen";
import NewsScreen from "../Screens/NewsScreen";
import TopNavigation from "./TopNavigation";

type initialIndexType = {
  key: string;
  title: string;
};
const initialIndex: initialIndexType[] = [
  { key: "first", title: "Discover" },
  { key: "second", title: "News" },
];

export default function InshortTabs() {
  const { Index, setIndex } = useContext(NewsContext);
  const [routes] = useState<initialIndexType[]>(initialIndex);
  
  const layout = useWindowDimensions();

  const renderScene = SceneMap({
    first: DiscoverScreen,
    second: NewsScreen,
  });

  return (
    <TabView
      navigationState={{ index: Index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={() => <TopNavigation index={Index} setIndex={setIndex} />}
    />
  );
}
