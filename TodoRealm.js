import Realm from 'realm';
import {Todo} from "./Todo";
import {anonymousLogin} from "./Auth";

let todoRealm;

export const openTodoRealm = async () => {
    if (todoRealm !== undefined) {
        return todoRealm;
    }
    let user = anonymousLogin();
    try {
        const config = {
            schema: [Todo.schema],
            sync: {
                user: user,
                partitionValue: "Max",
            },
        };
        todoRealm = await Realm.open(config);
    } catch (error) {
        throw `Error opening realm: ${JSON.stringify(error,null,2)}`;
    }
};