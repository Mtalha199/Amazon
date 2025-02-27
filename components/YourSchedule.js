// ScheduleScreen.js
import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity 
} from 'react-native';
import { UserContext } from '../utils/context';

const ScheduleScreen = ({ navigation }) => {
           const { userData } = useContext(UserContext);
       
    
  const scheduleData = {
    date: new Date(), // February 28, 2025
    location: userData?.addressOne,
    client: userData?.addressTwo,
    time: `${userData?.startTime} - ${userData?.endTime}`,
    duration: userData?.duration,
    earnings: `A$${userData?.Amount}`,
    address: userData?.addressThree,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.dateText}>
          {scheduleData.date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'numeric',
            day: 'numeric'
          })}
        </Text>

        <TouchableOpacity 
          style={styles.scheduleCard}
          onPress={() => navigation.navigate('SCHEDULE DETAILS', { scheduleData })}
        >
          <View style={styles.scheduleRow}>
            <Text style={styles.locationText}>{scheduleData.location}</Text>
            <Text style={styles.statusText}>ⓘ Scheduled to deliver</Text>
          </View>
          <Text style={styles.clientText}>{scheduleData.client}</Text>
          <View style={styles.separator} />
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{scheduleData.time}</Text>
            <Text style={styles.earningsText}>{scheduleData.earnings}</Text>
          </View>
          <Text style={styles.durationText}>{scheduleData.duration}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A202C',
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 4,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#333',
    marginBottom: 16,
  },
  scheduleCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    
  },
  locationText: {
    fontSize: 16,
    color: '#1A202C',
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 12,
    // color: '#666',
  },
  clientText: {
    fontSize: 14,
    fontWeight: 'bold',

    // color: '#1A202C',
    // marginVertical: 8,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  timeText: {
    fontSize: 14,
    // color: '#666',
  },
  earningsText: {
    fontSize: 16,
    color: '#1A202C',
    fontWeight: 'bold',

  },
  durationText: {
    fontSize: 14,
    // color: '#666',
    textAlign: 'left',
  },
  separator: {
    height: 2, 
    backgroundColor: '#E0E0E0', 
    marginVertical: 8, 
  },
});

export default ScheduleScreen;