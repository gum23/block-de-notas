import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, {useState, useEffect} from "react";

import Layout from "../components/Layout.js";
import { initDatabase, saveNote, updateNote, getNote } from '../api.js';

const taskEmpty = {title: "", body: ""};

const TaskFormScreen = ({navigation, route}) => {

  const [task, setTask] = useState(taskEmpty);
  const [editing, setEditing] = useState(false)

  const handleChange = (name, value) => setTask({...task, [name]: value});
  
  const handleSubmit = async () => {
    if (!editing) {
      try {
        //Crear alert de nota guardada
        await saveNote(task);
      } catch (error) {
        console.error('Error saving note:', error);
      }  
    } else {
      try {
        //Crear alert de la actualización
        await updateNote(route.params.id, task)
      } catch (error) {
        console.error(error);
      }
    }

    navigation.navigate("HomeScreen");

  }

  useEffect(() => {
    initDatabase();
    if (route.params && route.params.id) {
      navigation.setOptions({headerTitle: "Update Note"});
      setEditing(true);
      (async() => {
        const task = await getNote(route.params.id);
        setTask({title: task.title, body: task.body});
      })();
    }  
  }, [])
  

  return (
    <Layout>
      <TextInput
        style={style.title}
        placeholder="Titulo"
        placeholderTextColor="#546574"
        onChangeText={text => handleChange("title", text)}
        value={task.title}
      />
      <ScrollView style={style.bodyContainer}>
        <TextInput
          style={style.body}
          placeholder="Nueva nota"
          placeholderTextColor="#546574"
          multiline
          onChangeText={text => handleChange("body", text)}
          value={task.body}
        />
      </ScrollView>
      {!editing ? (
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={style.buttonSave}>Guardar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={style.buttonUpdate}>Actualizar</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const style = StyleSheet.create({
  title: {
    width: "90%",
    fontSize: 24,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: "#10ac84",
    color: "#fff",
    borderRadius: 5,
  },
  bodyContainer: {
    width: "90%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#10ac84",
    borderRadius: 5,
  },
  body: {
    width: "100%",
    fontSize: 20,
    paddingLeft: 8,
    color: "#fff",
  },
  buttonSave: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 3,
    backgroundColor: "#10ac84"
  },
  buttonUpdate: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 3,
    backgroundColor: "#e58e26"
  }
});

export default TaskFormScreen;
