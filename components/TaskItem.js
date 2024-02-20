import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const TaskItem = ({ task, handleDelete }) => {
  const navigation = useNavigation();

  return (
    <View style={style.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("TaskFormScreen", { id: task.id })}
      >
        <Text style={style.text}>{task.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.buttonDelete}
        onPress={() => handleDelete(task.id)}
      >
        <Text style={style.delete}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#333",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  buttonDelete: {
    backgroundColor: "#ee5253",
    padding: 7,
    borderRadius: 5,
  },
  delete: {
    color: "#ccc",
  },
});

export default TaskItem;
