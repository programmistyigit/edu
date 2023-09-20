import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarComponent() {
  const [eventData, setEventData] = useState([
    { date: '2023-09-08', title: 'Event 1' },
    { date: '2023-09-08', title: 'Event 1' },
    { date: '2023-09-10', title: 'Event 2' },
    { date: '2023-09-12', title: 'Event 3' },
    { date: '2023-09-15', title: 'Event 3' },
  ]);

  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventSelectDay , setEvent] = useState([])

  useEffect(() => {
    setEvent(!selectedDay ? [] : eventData.filter(e=>e.date == selectedDay.dateString))    
  } , [selectedDay , events])

  const markEvents = () => {
    const marked = {};
    eventData.forEach((event) => {
      marked[event.date] = {
        selected: true,
        selectedColor: 'blue',
        selectedTextColor: 'white',
        title: event.title,
      };
    });
    setEvents(marked);
  };

  useEffect(() => {
    markEvents();
  }, [eventData]);

  const handleDayPress = (day) => {
    if( !eventData.find(e=>e.date == day.dateString) ) return ;
    setSelectedDay(day);
  };

  const component = useMemo(() => {
    return (
      <View style={styles.container}>
      <Calendar
        style={{ borderRadius: 15, overflow: 'hidden' }}
        markedDates={events}
        theme={{
          calendarBackground: '#303030',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#ffffff',
          textDisabledColor: '#d9e1e8',
          dotColor: 'red',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: '#ffffff',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textMonthFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        onDayPress={handleDayPress}
      />

      <Modal visible={selectedDay !== null} transparent >
        <View style={styles.modalContainer} onTouchEnd={() => setSelectedDay(null)}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
          >
            <View style={styles.modalContent}>
              {
                eventSelectDay.map((e , i)=> <Text key={i} style={styles.modalTitle}> {e.title} </Text> )
              }
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    )
  } , [selectedDay , events , eventSelectDay])

  return component
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});