import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomePage = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.headerButton} />
      </View> */}

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Refill at water stations</Text>
          <Text style={styles.cardSubtitle}>Monday at 7:21 pm</Text>
          <Text style={styles.cardContent}>
            Look for water fountains at stations to refill on water before dehydrating in the heat. Watch out for heat-related symptoms like dizziness, nausea, and dehydration.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Making right turns</Text>
          <Text style={styles.cardSubtitle}>Yesterday at 12,182,880</Text>
          <Text style={styles.cardContent}>
            When making a right turn, always allow the oncoming lanes of traffic to fully clear the intersection before proceeding. Remember, the oncoming traffic has the right-of-way in general.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: '#333',
  },
});

export default HomePage;