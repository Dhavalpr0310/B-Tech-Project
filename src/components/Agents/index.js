import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import GLOBALS from "../Common/Globals";
import { NavBarSearchAgents } from "../Common/NavBarSearchAgents";
import { AgentSearch } from "./AgentSearch";
import { AgentsList } from "./AgentsList";
import { AgentView } from "./AgentView";

const AgentsStack = createNativeStackNavigator();

export function Agents() {
  return (
    <AgentsStack.Navigator>
      <AgentsStack.Screen
        name="Agent List"
        component={AgentsList}
        options={{
          headerTitle: (props) => <NavBarSearchAgents {...props} />,
          headerStyle: {
            backgroundColor: GLOBALS.HEADER_COLOR,
          },
          headerTintColor: GLOBALS.HEADER_TINT_COLOR,
          headerTitleStyle: {
            fontWeight: GLOBALS.HEADER_TITLE_FONTWEIGHT,
          },
        }}
      />
      <AgentsStack.Screen
        name="Agent Info"
        title="Agent Info"
        component={AgentView}
        options={{
          headerStyle: {
            backgroundColor: GLOBALS.HEADER_COLOR,
          },
          headerTintColor: GLOBALS.HEADER_TINT_COLOR,
          headerTitleStyle: {
            fontWeight: GLOBALS.HEADER_TITLE_FONTWEIGHT,
          },
        }}
      />
      <AgentsStack.Screen
        name="Agent Search"
        title="Agent Search"
        component={AgentSearch}
        options={{
          headerStyle: {
            backgroundColor: GLOBALS.HEADER_COLOR,
          },
          headerTintColor: GLOBALS.HEADER_TINT_COLOR,
          headerTitleStyle: {
            fontWeight: GLOBALS.HEADER_TITLE_FONTWEIGHT,
          },
        }}
      />
    </AgentsStack.Navigator>
  );
}
