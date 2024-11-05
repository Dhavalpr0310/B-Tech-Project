import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import React from "react";

export function NavBarSearchAgents() {
  const navigation = useNavigation();

  return (
    <VStack w="100%" minWidth={"100%"}>
      {/* <Input
        onFocus={async () => {
          navigation.navigate("Agent Search");
        }}
        placeholder={"Search agents"}
        width="92%"
        borderRadius="4"
        variant={"unstyled"}
        fontSize="14"
        InputLeftElement={
          <Icon
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        }
        InputRightElement={
          <Icon
            mr="3"
            size="6"
            color="gray.400"
            as={<Ionicons name="filter" />}
          />
        }
      /> */}
    </VStack>
  );
}
