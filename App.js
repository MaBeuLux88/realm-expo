import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import 'react-native-get-random-values';
import {realmApp} from "./RealmApp";
import Realm from 'realm';
import {anonymousLogin} from "./Auth";
import {RealmProvider} from './Todo';

export default function AppWrapper() {
    if (!RealmProvider) {
        return null;
    }
    return (
        <RealmProvider>
            <App/>
        </RealmProvider>
    );
};


function App() {
    // const app = realmApp();
    // const user = anonymousLogin();
    // const todoRealm = openTodoRealm();
    const todoRealm = "Hello...";
    const [todos, setTodos] = useState([]);
    const [user, setUser] = useState(null);

    const addTodo = (task) => {
        let arrayTodos = todos.slice();
        arrayTodos.push({_id: new Realm.BSON.ObjectId(), todo: task, user: "Max"});
        setTodos(arrayTodos);
        console.log("USER ", user, user.id, user.type, user.identities);
        console.log("TODO REALM ", todoRealm);
    }

    const deleteTodo = (id) => {
        let arrayTodos = todos.slice();
        arrayTodos = arrayTodos.filter(t => t._id !== id);
        setTodos(arrayTodos);
    }

    useEffect(() => {
        const authenticate = async () => {
            setUser(await anonymousLogin());
        }
        console.log("=> AUTH UseEffect! ONE TIME.")
        authenticate();
    }, [])

    return (
        <View style={styles.container}>
            <Todos todos={todos} deleteTodo={deleteTodo}/>
            <CreateTodo addTodo={addTodo}/>
            <StatusBar style="auto"/>
        </View>
    );
}

const Todos = (props) => {
    return (
        <ScrollView style={styles.todos}>
            {props.todos.map(t => {
                return <View key={t._id} style={styles.todo}>
                    <Text style={styles.text}>{t.todo}</Text>
                    <Button title="X" color="red" onPress={() => props.deleteTodo(t._id)}/>
                </View>
            })}
        </ScrollView>
    );
};

const CreateTodo = (props) => {
    const [task, setTask] = useState('');

    return (
        <View style={styles.create}>
            <TextInput style={styles.input} value={task} onChangeText={text => setTask(text)}/>
            <Button title="+" onPress={() => {
                props.addTodo(task);
                setTask('');
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    todos: {
        marginTop: 20,
        width: '100%',
    },
    todo: {
        flexDirection: "row",
        borderStyle: "solid",
        borderColor: "blue",
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: "space-between",
        margin: 10,
        padding: 10
    },
    create: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        padding: 10,
        width: '100%'
    },
    text: {
        fontSize: 25
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        width: '90%',
        marginRight: 10,
        padding: 5,
        fontSize: 20
    }
});
