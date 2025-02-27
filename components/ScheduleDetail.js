import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity 
} from 'react-native';

const ScheduleDetails = ({ navigation, route }) => {
  const { scheduleData } = route.params || {
    location: '',
    client: '',
    date: "" ,// February 28, 2025
    time: '',
    duration: '',
    earnings: '',
    address: ''
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.locationText}>
          {scheduleData.location} - {scheduleData.client}
        </Text>
        <Text style={styles.addressText}>{scheduleData.address}</Text>
        <View style={styles.separator} />
        <View style={styles.detailCard}>
          <Text style={styles.dateText}>
            {scheduleData.date.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'numeric',
              day: 'numeric'
            })}
          </Text>
          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <Text style={styles.detailValue}>
              {scheduleData.time} • ({scheduleData.duration})
            </Text>
          </View>
          <View style={styles.separator} />

          <View >
            <Text style={styles.earningsText}>{scheduleData.earnings}</Text>
          </View>
        </View>
      </View>

      {/* Forfeit Button at the Bottom */}
      <TouchableOpacity style={styles.forfeitButton} >
        <Text style={styles.forfeitText}>Forfeit block</Text>
      </TouchableOpacity>
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
  backButton: {
    padding: 8,
  },
  backIcon: {
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
    flex: 1,
  },
  locationText: {
    fontSize: 18,
    color: '#1A202C',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    // color: '#666',
    marginBottom: 16,
  },
  separator: {
    height: 2,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  detailCard: {
    backgroundColor: '#F5F5F5', 
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateText: {
    fontSize: 16,
    // color: '#666',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    // color: '#666',
    // textAlign: 'left',
  },
  earningsBox: {
    backgroundColor: '#E0E0E0', // Light gray background for earnings
    padding: 12,
    borderRadius: 4,
    marginTop: 8, // Spacing above earnings box
    alignItems: 'center',
  },
  earningsText: {
    fontSize: 16,
    color: '#1A202C',
    fontWeight: 'bold',
  },
  forfeitButton: {
    backgroundColor: '#FF9800', // Orange button
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1, // Add subtle border to match the design
    borderColor: '#E67E22', // Slightly darker orange for border
  },
  forfeitText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default ScheduleDetails;