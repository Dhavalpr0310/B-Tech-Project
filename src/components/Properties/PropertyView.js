import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import "intl";
import "intl/locale-data/jsonp/en"; // or any other locale you need
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Linking } from "react-native";
import getDirections from "react-native-google-maps-directions";
import { useSelector } from "react-redux";

export function PropertyView({ route }) {
  const [propertyDB, setPropertyDB] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);
  const navigation = useNavigation();

  const dollarUSLocale = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const { id } = route.params;
  const { list } = useSelector((state) => state.properties);
  const property = list.find((x) => x.id === id);

  // if (property.images.length === 0) {
  //   imageURLs = [`${GLOBALS.TEMP_IMAGE_PATH}/dashboard/img/house.gif`];
  // }

  // const imageURLs = property.images.map((image, index) => {
  //   return {
  //     id: index.toString(),
  //     thumbnail: image,
  //     url: image.url,
  //     title: image.title,
  //     description: "description",
  //   };
  // });

  // console.log("imageURLs ", imageURLs);

  //   // let agentImage = "";

  //   // if (props.property.user.picture) {
  //   //   agentImage = `${GLOBALS.TEMP_IMAGE_PATH}/${props.property.user.picture}`;
  //   // } else {
  //   //   agentImage = `${GLOBALS.TEMP_IMAGE_PATH}/dashboard/img/profile.jpg`;
  //   // }

  //   useEffect(() => {
  //     // dispatch(findPropertyById(id));
  //   }, []);

  // const mapLatitude = parseFloat(property.lat, 10);

  // const mapLongitude = parseFloat(property.lng, 10);

  const initiateUber = () => {
    let url = `uber://?action=setPickup&dropoff[latitude]=${mapLatitude}&dropoff[longitude]=${mapLongitude}`;

    Linking.openURL(url)
      .then((data) => {
        console.log("Uber Opened");
      })
      .catch(() => {
        alert("Make sure Uber installed on your device");
      });
  };

  const handleGetDirections = () => {
    const data = {
      destination: {
        latitude: mapLatitude,
        longitude: mapLongitude,
      },
      params: [
        {
          key: "travelmode",
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  return (
    <Box border="1" borderRadius="md">
      <ScrollView>
        <VStack space="4">
          <Box>
            {/* <ImageCarousel data={imageURLs} openGallery={openGallery} /> */}
          </Box>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <Text
              style={{
                marginLeft: 10,
                fontSize: 24,
                paddingTop: 10,
              }}
            >
              {dollarUSLocale.format(property.price)}
            </Text>
            <Text
              style={{
                textAlign: "right",
                marginRight: 10,
              }}
            >
              {property.bedrooms} Beds / {property.bathrooms} Baths
            </Text>
          </HStack>
          <HStack
            alignItems="center"
            space={4}
            justifyContent="space-between"
            mt="-4"
            p="0"
          >
            <Text
              style={{
                color: "grey",
                marginLeft: 10,
              }}
            >
              {property.address}
            </Text>
          </HStack>
          <HStack alignItems="center" space={1} justifyContent="space-between">
            <Button
              variant="outline"
              title="View Map"
              onPress={() =>
                navigation.navigate("Property Map", {
                  latitude: mapLatitude,
                  longitude: mapLongitude,
                })
              }
              style={{
                marginLeft: 10,
                flex: 1,
              }}
              leftIcon={
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={24}
                  color="black"
                />
              }
            >
              View Map
            </Button>
            <Button
              variant="outline"
              title="Get Directions"
              onPress={() => handleGetDirections()}
              style={{
                flex: 1,
              }}
              leftIcon={
                <FontAwesome5 name="directions" size={24} color="black" />
              }
            >
              Get Directions
            </Button>
            <Button
              variant="outline"
              title="Uber"
              onPress={() => initiateUber()}
              style={{
                marginRight: 10,
                flex: 1,
              }}
              leftIcon={<FontAwesome5 name="uber" size={24} color="black" />}
            >
              Uber
            </Button>
          </HStack>
          <HStack alignItems="center" space={1} justifyContent="space-between">
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
              }}
            >
              Key Details
            </Text>
          </HStack>
          <HStack
            justifyContent="space-between"
            m="0"
            p="0"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <Text>Property Address</Text>
            <Text>{property.address}</Text>
          </HStack>
          <HStack
            justifyContent="space-between"
            mt="-3"
            p="0"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <Text>City</Text>
            <Text>{property.city}</Text>
          </HStack>
          <HStack
            justifyContent="space-between"
            mt="-3"
            p="0"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <Text>Country</Text>
            <Text>{property.country}</Text>
          </HStack>
          <HStack
            justifyContent="space-between"
            mt="-3"
            p="0"
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <Text>Facilities:</Text>
            <Text>Bedrooms:{property.facilities.bedrooms || "NA"} </Text>
            <Text>Bathrooms:{property.facilities.bathrooms || "NA"} </Text>
            <Text>Parking:{property.facilities.parking || "NA"}</Text>
            {/* <Text>{property.build_size}</Text> */}
          </HStack>
          <HStack alignItems="center" space={1} justifyContent="space-between">
            <Text
              style={{
                flex: 1,
                marginLeft: 10,
                fontSize: 20,
              }}
            >
              About this home
            </Text>
          </HStack>
          <HStack alignItems="center" space={1} justifyContent="space-between">
            <Text
              style={{
                marginLeft: 10,
              }}
            >
              {property.description}
            </Text>
          </HStack>
          <HStack alignItems="center" space={1} justifyContent="space-between">
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
              }}
            >
              {/* Contact Agent - {property.user.fname} {property.user.lname} */}
            </Text>
          </HStack>

          <HStack alignItems="center" space={1} justifyContent="space-between">
            <AspectRatio w="100%" ratio={16 / 14}>
              {/* <Image
                style={{ paddingTop: "25px", marginTop: "25px" }}
                source={{
                  uri: `${GLOBALS.TEMP_IMAGE_PATH}${property.user.picture}`,
                }}
                alt="image"
              /> */}
            </AspectRatio>
          </HStack>

          <HStack alignItems="center" space={1} justifyContent="space-between">
            <Button
              title="Send Agent Message"
              // onPress={() =>
              //   navigation.navigate("Property Send Message", {
              //     id: property.user.id,
              //     pid: property.id,
              //   })
              // }
              style={{
                flex: 1,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 100,
              }}
            >
              Send Message
            </Button>
          </HStack>
        </VStack>
        {/* <ImageGallery close={closeGallery} isOpen={isOpen} images={imageURLs} /> */}
      </ScrollView>
    </Box>
  );
}
