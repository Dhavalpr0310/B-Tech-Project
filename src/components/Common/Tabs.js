import * as React from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { PropertiesList } from "../Properties/PropertiesList";
import { PropertiesMap } from "../Properties/PropertiesMap";
import GLOBALS from "./Globals";

const FirstRoute = () => <PropertiesList />;
const SecondRoute = () => <PropertiesMap />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export function NavBarTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "List" },
    // { key: "second", title: "Map" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: GLOBALS.HEADER_COLOR }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}