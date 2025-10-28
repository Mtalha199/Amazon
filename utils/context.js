import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

const STORAGE_KEY = "@user_form_data";

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "Your Name",
    image: null,
    addressOne: "",
    addressTwo: "",
    addressThree: "",
    startTime: "",
    endTime: "",
    duration: "",
    Amount: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage when provider mounts
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData !== null) {
        const parsedData = JSON.parse(savedData);

        // Update userData with saved values
        setUserData({
          name: parsedData.textInput || "Your Name",
          image: parsedData.selectedImage || null,
          addressOne: parsedData.addressOne || "",
          addressTwo: parsedData.addressTwo || "",
          addressThree: parsedData.addressThree || "",
          startTime: parsedData.startTime || "",
          endTime: parsedData.endTime || "",
          duration: parsedData.duration || "",
          Amount: parsedData.Amount || "",
        });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save userData to AsyncStorage whenever it changes
  const setUserDataWithStorage = async (newData) => {
    try {
      setUserData(newData);

      // Convert to storage format
      const dataToSave = {
        textInput: newData.name,
        selectedImage: newData.image,
        addressOne: newData.addressOne || "",
        addressTwo: newData.addressTwo || "",
        addressThree: newData.addressThree || "",
        startTime: newData.startTime || "",
        endTime: newData.endTime || "",
        duration: newData.duration || "",
        Amount: newData.Amount || "",
        submittedText: newData.name,
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData: setUserDataWithStorage,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
