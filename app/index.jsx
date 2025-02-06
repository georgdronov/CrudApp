import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { data } from "../data/todo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import Animated, { LinearTransition } from "react-native-reanimated";

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState("");

  const { colorScheme, toggleColorScheme, theme } = useContext(ThemeContext);

  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  if (!loaded && !error) {
    return null;
  }

  const styles = createStyles(theme, colorScheme);

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoText, item.completed && styles.completedTodo]}
        onPress={() => toggleTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" />
      </Pressable>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor="#666"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
        <Pressable onPress={toggleColorScheme} style={{ marginLeft: 10 }}>
          {colorScheme === "dark" ? (
            <Octicons
              name="light-bulb"
              size={36}
              color={theme.text}
              selectable={false}
            />
          ) : (
            <Octicons
              name="moon"
              size={36}
              color={theme.text}
              selectable={false}
            />
          )}
        </Pressable>
      </View>
      <Animated.FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(todo) => todo.id.toString()}
        contentContainerStyle={styles.todoContainer}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode={"on-drag"}
      />
    </SafeAreaView>
  );
}
function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    inputContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginRight: 10,
      fontSize: 16,
      backgroundColor: theme.surface,
      color: theme.text,
      fontFamily: "Inter_500Medium",
    },
    addButton: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    addButtonText: {
      color: theme.onPrimary,
      fontSize: 16,
      fontWeight: "bold",
    },
    todoContainer: {
      flexGrow: 1,
    },
    todoItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.surface,
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
    },
    todoText: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      fontFamily: "Inter_500Medium",
    },
    completedTodo: {
      textDecorationLine: "line-through",
      color: theme.textSecondary,
    },
    deleteButton: {
      backgroundColor: theme.error,
      borderRadius: 8,
      padding: 8,
      marginLeft: 10,
    },
    deleteButtonText: {
      color: theme.onError,
      fontSize: 14,
      fontWeight: "bold",
    },
  });
}
