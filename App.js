import { Provider } from "react-redux";
//import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";

//import thunk from "redux-thunk";
//import reducers from "./src/reducers";
import AgentsReducer from "./src/reducers/AgentsReducer";
import PropertiesReducer from "./src/reducers/PropertiesReducer";

import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { NativeBaseProvider } from "native-base";
import * as Sentry from "sentry-expo";
import { Agents } from "./src/components/Agents";
import GLOBALS from "./src/components/Common/Globals";
import { Profile } from "./src/components/Profile";
import { Properties } from "./src/components/Properties";

// https://docs.expo.dev/versions/latest/sdk/splash-screen/
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
// hide splashscreen below?

Sentry.init({
  dsn: GLOBALS.SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: true, // If true, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to false in production
});

const Tab = createBottomTabNavigator();

function MainMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 50,
          paddingHorizontal: 0,
          paddingTop: 0,
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "PROPERTIES") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "AGENTS") {
            iconName = focused ? "id-card" : "id-card";
          } else if (route.name === "PROFILE") {
            iconName = focused ? "user" : "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarActiveBackgroundColor: "gray",
      })}
    >
      <Tab.Screen
        name="PROPERTIES"
        component={Properties}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ADD PROPERTY"
        component={Agents}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="PROFILE"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// The redux-dev-tools and redux-thunk are already included in redux-toolkit.
const store = (preloadedState) =>
  configureStore({
    reducer: {
      properties: PropertiesReducer,
      agents: AgentsReducer,
    },
    preloadedState,
  });

export default function App() {
  // hide spashscreen
  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 2000);

  return (
    <Provider store={store()}>
      <NavigationContainer>
        <NativeBaseProvider>
          <MainMenu />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
