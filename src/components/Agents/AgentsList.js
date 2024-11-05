import axios from "axios";
import { ScrollView, Text } from "native-base";
import React, { useState } from "react";
import { Alert, Button, TextInput } from "react-native";
import GLOBALS from "../Common/Globals";

export function AgentsList() {
  // State variables for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [parking, setParking] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const residencyData = {
        title,
        description,
        price: parseFloat(price),
        address,
        country,
        city,
        facilities: {
          bedrooms: parseInt(bedrooms),
          bathrooms: parseInt(bathrooms),
          parking: parseInt(parking),
        },
        image:
          "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1%201x,%20https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2%202x",
        userEmail,
      };
      console.log(residencyData);

      // Send the data to the backend (replace with your backend URL)
      const response = await axios.post(
        `${GLOBALS.BASE_URL}/residency/create`,
        { data: residencyData }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Residency created successfully!");
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while creating the residency.");
    }
  };

  const styles = {
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
  };
  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Create Residency</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <TextInput
        placeholder="Number of Bedrooms"
        value={bedrooms}
        onChangeText={setBedrooms}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Number of Bathrooms"
        value={bathrooms}
        onChangeText={setBathrooms}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Parking Spaces"
        value={parking}
        onChangeText={setParking}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="User Email"
        value={userEmail}
        onChangeText={setUserEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <Button title="Create Residency" onPress={handleSubmit} />
    </ScrollView>
  );
}
