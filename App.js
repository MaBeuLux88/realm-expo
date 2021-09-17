import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import 'react-native-get-random-values';
import {realmApp} from "./RealmApp";
import Realm from 'realm';
import {anonymousLogin} from "./Auth";
import { Todo, RealmProvider, useRealm, useQuery } from './Todo';

export default function AppWrapper() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authenticate = async () => {
            setUser(await anonymousLogin());
        }
        console.log("=> AUTH UseEffect! ONE TIME.")
        authenticate();
    }, [])
    if (!RealmProvider || !user) {
        return null;
    }
    return (
        <RealmProvider config={{schema:[Todo.schema], sync:{user, partitionValue:"Max"}}}>  
            <App/>
        </RealmProvider>
    );
};


function App() {
    const realm = useRealm()
    const {data: todos} = useQuery('Todo')

    const addTodo = (task) => {
        realm.write(() => {
            realm.create("Todo", {_id: new Realm.BSON.ObjectId(), text: task, _partition: "Max"})
        })
    }

    const deleteTodo = (id) => {
        realm.write(() => {
            realm.delete(realm.objectForPrimaryKey("Todo", id))
        })
    }

    return (
        <View style={styles.container}>
            <Todos todos={todos} deleteTodo={deleteTodo}/>
            <CreateTodo addTodo={addTodo}/>
            <StatusBar style="auto"/>
        </View>
    );
}

const Todos = ({todos, deleteTodo}) => {
    if(!todos || todos.length == 0){
        return null
    }
    console.log("todos", JSON.stringify(todos[0]))
    return (
        <ScrollView style={styles.todos}>
            {todos.map(t => {
                return <View key={t._id} style={styles.todo}>
                    <Text style={styles.text}>{t.text}</Text>
                    <Button title="X" color="red" onPress={() => deleteTodo(t._id)}/>
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
