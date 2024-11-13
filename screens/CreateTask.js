import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, Switch } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from 'expo-document-picker';
import RNPickerSelect from 'react-native-picker-select';
// import {usersinfo} from '../appwriteConfig';
 // Import your Appwrite client

const CreateTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]); // Users state
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [reminder, setReminder] = useState(new Date());
  const [attachment, setAttachment] = useState(null);
  const [repeatTask, setRepeatTask] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState({ type: '', visible: false });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await usersinfo.list(); // Fetch users
//         const userOptions = response.usersinfo.map(user => ({
//           label: user.name, // Use the correct property for the user's name
//           value: user.$id, // Unique identifier for the user
//         }));
//         setUsers(userOptions);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         Alert.alert('Error', 'Could not fetch users. Please try again later.');
//       }
//     };

//     fetchUsers();
//   }, []);

  const handleCreateTask = () => {
    if (!title) {
      Alert.alert('Error', 'Task title is required.');
      return;
    }

    Alert.alert('Task Created', 
      `Title: ${title}\nAssigned to: ${assignedTo}\nStart Date: ${startDate.toDateString()}\nDue Date: ${dueDate.toDateString()}\nReminder: ${reminder.toDateString()}\nRepeat: ${repeatTask ? 'Yes' : 'No'}` +
      (attachment ? `\nAttachment: ${attachment.name}` : '')
    );

    navigation.navigate('Home');
  };

  const handlePickAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        setAttachment(result);
      }
    } catch (err) {
      console.error('Error while picking file:', err);
    }
  };

  const handleClear = () => {
    setTitle('');
    setNotes('');
    setAssignedTo('');
    setStartDate(new Date());
    setDueDate(new Date());
    setReminder(new Date());
    setAttachment(null);
    setRepeatTask(false);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const showDatePicker = (type) => {
    setDatePickerVisibility({ type, visible: true });
  };

  const handleConfirm = (date) => {
    switch (isDatePickerVisible.type) {
      case 'startDate':
        setStartDate(date);
        break;
      case 'dueDate':
        setDueDate(date);
        break;
      case 'reminder':
        setReminder(date);
        break;
      default:
        break;
    }
    setDatePickerVisibility({ type: '', visible: false });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Task Notes"
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, { height: 80 }]}
        multiline
      />
      <Text style={styles.label}>Assign to:</Text>
      <RNPickerSelect
        onValueChange={(value) => setAssignedTo(value)}
        items={users}
        placeholder={{ label: 'Select a user', value: null }}
        style={{
          inputAndroid: styles.picker,
          inputIOS: styles.picker,
        }}
        value={assignedTo}
      />

      <TouchableOpacity onPress={() => showDatePicker('startDate')} style={styles.dateButton}>
        <Text style={styles.dateText}>Start Date: {startDate.toDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showDatePicker('dueDate')} style={styles.dateButton}>
        <Text style={styles.dateText}>Due Date: {dueDate.toDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showDatePicker('reminder')} style={styles.dateButton}>
        <Text style={styles.dateText}>Reminder: {reminder.toDateString()}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible.visible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility({ type: '', visible: false })}
      />

      <TouchableOpacity onPress={handlePickAttachment} style={styles.attachmentButton}>
        <Text style={styles.attachmentText}>
          {attachment ? `Attachment: ${attachment.name}` : 'Add Attachment'}
        </Text>
      </TouchableOpacity>

      <View style={styles.repeatContainer}>
        <Text style={styles.label}>Repeat Task:</Text>
        <Switch
          value={repeatTask}
          onValueChange={setRepeatTask}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Clear" onPress={handleClear} color="#FFA500" />
        <Button title="Cancel" onPress={handleCancel} color="#FF0000" />
        <Button title="Create Task" onPress={handleCreateTask} color="#008000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  dateButton: {
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#EEE',
  },
  dateText: {
    color: '#555',
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  attachmentButton: {
    backgroundColor: '#DDD',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  attachmentText: {
    color: '#555',
  },
  repeatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  picker: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
});

export default CreateTaskScreen;
