import React, { useReducer, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';

const initialState = {
  tasks: [],
};

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState); 
  const [task, setTask] = useState(''); // Local state for task input



  //Dispatch tasks
  const handleAddTask = () => {
    if (task.trim()) {
      dispatch({ type: ADD_TASK, payload: task }); 
      setTask(''); 
    }
  };

  const handleRemoveTask = (index) => {
    
    const taskName = state.tasks[index];

    Alert.alert(
      'You are trying to remove a task',
      'Have you completed the task: '+taskName+'?',
      [
        {
          text: 'No',
          style: 'cancel', 
        },
        {
          text: 'Yes!',
          onPress: () => dispatch({ type: REMOVE_TASK, payload: index }), // Dispatch action to remove task if confirmed
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My To-Do's</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={task}
        onChangeText={setTask} 
      />
      <Button title="Save" onPress={handleAddTask} /> 

      <FlatList
        data={state.tasks}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleRemoveTask(index)}>
            <View style={styles.taskContainer}>
              <Text style={styles.taskText}>{item}</Text> 
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  taskContainer: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  taskText: {
    fontSize: 18,
  },
});

