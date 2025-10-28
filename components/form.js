import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../utils/context";

const STORAGE_KEY = "@user_form_data";

const UserInputForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [addressThree, setAddressThree] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [Amount, setAmount] = useState("");
  const [submittedText, setSubmittedText] = useState("");

  const { setUserData } = useContext(UserContext);

  // Load data from AsyncStorage when component mounts
  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData !== null) {
        const parsedData = JSON.parse(savedData);
        setTextInput(parsedData.textInput || "");
        setAddressOne(parsedData.addressOne || "");
        setAddressTwo(parsedData.addressTwo || "");
        setAddressThree(parsedData.addressThree || "");
        setStartTime(parsedData.startTime || "");
        setEndTime(parsedData.endTime || "");
        setDuration(parsedData.duration || "");
        setAmount(parsedData.Amount || "");
        setSelectedImage(parsedData.selectedImage || null);
        setSubmittedText(parsedData.submittedText || "");
      }
    } catch (error) {
      console.error("Error loading form data:", error);
    }
  };

  const saveFormData = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];

      const imageData = {
        uri: asset.uri,
        mimeType: asset.type,
        fileName: asset.fileName,
      };

      setSelectedImage(imageData);

      // Save immediately after image selection
      const currentData = {
        textInput,
        addressOne,
        addressTwo,
        addressThree,
        startTime,
        endTime,
        duration,
        Amount,
        selectedImage: imageData,
        submittedText,
      };
      await saveFormData(currentData);
    }
  };

  const convertToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage || !textInput) {
      Alert.alert("Incomplete Form", "Please select an image and enter text.");
      return;
    }

    const formData = {
      name: textInput,
      image: selectedImage,
      addressOne: addressOne,
      addressTwo: addressTwo,
      addressThree: addressThree,
      startTime: startTime,
      endTime: endTime,
      duration: duration,
      Amount: Amount,
    };

    setUserData(formData);
    setSubmittedText(textInput);

    // Save all data to AsyncStorage
    const dataToSave = {
      textInput,
      addressOne,
      addressTwo,
      addressThree,
      startTime,
      endTime,
      duration,
      Amount,
      selectedImage,
      submittedText: textInput,
    };

    await saveFormData(dataToSave);
    Alert.alert("Success", "Form data saved successfully!");
  };

  // Auto-save when any field changes
  useEffect(() => {
    const dataToSave = {
      textInput,
      addressOne,
      addressTwo,
      addressThree,
      startTime,
      endTime,
      duration,
      Amount,
      selectedImage,
      submittedText,
    };
    saveFormData(dataToSave);
  }, [
    textInput,
    addressOne,
    addressTwo,
    addressThree,
    startTime,
    endTime,
    duration,
    Amount,
  ]);

  return (
    <ImageBackground
      source={require("../assets/cc.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={pickImageAsync} style={styles.imagePicker}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage.uri }} style={styles.image} />
            ) : (
              <Text style={styles.imagePickerText}>Pick an Image</Text>
            )}
          </TouchableOpacity>
          {submittedText ? (
            <Text style={styles.submittedText}>{submittedText}</Text>
          ) : null}

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              value={textInput}
              onChangeText={setTextInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address One</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter address one"
              value={addressOne}
              onChangeText={setAddressOne}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address Two</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter address two"
              value={addressTwo}
              onChangeText={setAddressTwo}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address Three</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter address three"
              value={addressThree}
              onChangeText={setAddressThree}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Start Time with AM or PM</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., 9:00 AM"
              value={startTime}
              onChangeText={setStartTime}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>End time with AM or PM</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., 5:00 PM"
              value={endTime}
              onChangeText={setEndTime}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Duration full with Hours and minutes
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., 8 hours 30 minutes"
              value={duration}
              onChangeText={setDuration}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Amount</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter amount"
              value={Amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  imagePicker: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  imagePickerText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  submittedText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginTop: 16,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 8,
  },
  textInput: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "rgb(255 108 0)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default UserInputForm;
