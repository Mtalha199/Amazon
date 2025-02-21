import React, { useContext, useState } from "react";
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
import { UserContext } from "../utils/context";

const UserInputForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [textInput, setTextInput] = useState("");
    const [submittedText, setSubmittedText] = useState("");

    const { setUserData } = useContext(UserContext);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];

            setSelectedImage({
                uri: asset.uri,
                mimeType: asset.type,
                fileName: asset.fileName,
            });
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

    const handleSubmit = () => {
        if (!selectedImage || !textInput) {
            Alert.alert("Incomplete Form", "Please select an image and enter text.");
            return;
        }
        setUserData({ name: textInput, image: selectedImage });
        setSubmittedText(textInput);
        setTextInput("");
    };

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
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional overlay
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
