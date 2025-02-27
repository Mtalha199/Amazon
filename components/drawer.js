import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import icon from '../assets/icon.png';
import { UserContext } from '../utils/context';
const { width } = Dimensions.get('window');

const DrawerContent = ({ navigation }) => {


    const { userData } = useContext(UserContext);
    console.log(userData.image);

    return (
        <View style={[styles.drawerContainer, { width: width * 0.8 }]}>
            <TouchableOpacity style={styles.profileSection} onPress={() => navigation.navigate('Profile')}>
                <Image
                    source={userData.image?.uri ? { uri: userData.image.uri } : require('../assets/icon.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{userData.name || 'Your Name'}</Text>
            </TouchableOpacity>
            <View style={styles.drawerContent}>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#fff' }]}>Current stop</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#fff' }]}>Today's itinerary</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#fff' }]}>Pick up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Amazon')}>
                    <Text style={[styles.drawerItemText, { color: '#fff' }]}>Updates</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#fff' }]}>Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#fff' }]}>Offers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#fff' }]}>Your Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#fff' }]}>Learning Portal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#fff' }]} onPress={() => navigation.navigate('CALENDER')}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#fff' }]}>Earnings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#fff' }]}>Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#ff9800' }]}>Driver Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}>
                    <Text style={[styles.drawerItemText, { color: '#ff9800' }]}>Emergency Help</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#000',
        shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 8,
        // },
        // shadowOpacity: 0.44,
        // shadowRadius: 10.32,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 5,
    },
    profileName: {
        fontSize: 18,
        color: '#fff',
    },
    drawerContent: {
        flex: 1,
        paddingVertical: 16,
    },
    drawerItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopWidth: 0.5,
        borderTopColor: '#fff',
    },
    drawerItemText: {
        fontSize: 16,
        color: '#ccc',
    },
});

export default DrawerContent;