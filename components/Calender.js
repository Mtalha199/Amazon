import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Calendar = ({ navigation }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date(); // Get today's date
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      // Check if current date matches today's date
      const isToday = day === today.getDate() && 
                     month === today.getMonth() && 
                     year === today.getFullYear();
                     const dayContent = (
                      <View style={isToday ? styles.todayCircle : null}>
                        <Text style={styles.dayText}>{day}</Text>
                        {isToday && <View style={styles.orangeDot} />}
                      </View>
                    );
                     days.push(
                      <View key={`day-${day}`} style={[styles.dayCell, styles.dateAreaBackground]}>
                        {isToday ? (
                          <TouchableOpacity 
                            onPress={() => navigation.navigate('YOUR SCHEDULE')} // New screen navigation
                          >
                            {dayContent}
                          </TouchableOpacity>
                        ) : (
                          dayContent
                        )}
                      </View>
                    );
                  }
    
    return days;
  };
  
  const getMonthName = (date) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[date.getMonth()];
  };
  
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  
  const goToPrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={goToPrevMonth}>
          <View style={styles.hiddenIcon} />
        </TouchableOpacity>
        
        <Text style={styles.monthTitle}>{getMonthName(currentMonth)}</Text>
        
        <TouchableOpacity onPress={goToNextMonth}>
          <Icon name="chevron-right" size={32} color="#ccc" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.weekdayHeader}>
        <Text style={styles.weekdayText}>S</Text>
        <Text style={styles.weekdayText}>M</Text>
        <Text style={styles.weekdayText}>T</Text>
        <Text style={styles.weekdayText}>W</Text>
        <Text style={styles.weekdayText}>T</Text>
        <Text style={styles.weekdayText}>F</Text>
        <Text style={styles.weekdayText}>S</Text>
      </View>
      
      <View style={styles.calendarGrid}>
        {generateCalendarDays()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  hiddenIcon: {
    width: 32,
    height: 32,
  },
  weekdayHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '800',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,

  },
  dateAreaBackground: {
    // backgroundColor: '#f0f0f0',
  },
  dayText: {
    fontSize: 12,
    color: '#333',


  },
  todayCircle: {
    // width: 36,
    // height: 36,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f5f5f5',
    // borderRadius: 18,
  },
  orangeDot: {
    position: 'absolute',
    bottom: -11,
    right:3,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#FF9800',
  },
});

export default Calendar;