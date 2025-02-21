import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { UserContext } from '../utils/context';
import AntDesign from '@expo/vector-icons/AntDesign';

const UserProfileScreen = ({ navigation }) => {
    const { userData } = useContext(UserContext);

    if (!userData || !userData.name || !userData.image) {
        return (
            <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={styles.errorText}>No user data available.</Text>
            </View>
        );
    }
    return (
        <ImageBackground
            source={require('../assets/otherbg.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.contentContainer}>
                <Image source={{ uri: userData?.image?.uri }} style={styles.profileImage} />
                <Text style={styles.name}>{userData?.name}</Text>
                <Text style={styles.status}>ON DUTY</Text>
                <Text style={styles.date}>
                    {`${new Date().toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}, ${new Date().toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    })}`}
                </Text>
                <TouchableOpacity style={styles.itineraryButton}>
                    <Text style={styles.itineraryText}>TODAY'S ITINERARY</Text>
                    <AntDesign name="right" size={18} color="#808080" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'relative', // Add this

    },
    profileImage: {
        width: 350,
        height: 360,
        borderRadius: 185,
        marginBottom: '30%',
        marginTop: '25%',

    },
    name: {
        fontSize: 24,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    status: {
        backgroundColor: '#ff6c00',
        color: '#fff',
        fontSize: 14,
        marginBottom: 8,
        paddingVertical: 6,
        paddingHorizontal: 6,
        marginVertical: 14,
    },
    date: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        marginTop: 10,
        fontWeight: '500',
    },
    itineraryButton: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute', // Add this
        bottom: 0, // Add this
    },
    itineraryText: {
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
    },
});

export default UserProfileScreen;