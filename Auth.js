import Realm from 'realm';
import {realmApp} from "./RealmApp";

let user;

export const anonymousLogin = async () => {
    if (user !== undefined) {
        console.log("=> Return existing USER.");
        return user;
    }
    try {
        const app = realmApp();
        const credentials = Realm.Credentials.anonymous();
        user = await app.logIn(credentials);
        console.log("ID outside user: ", user.id);
        return user;
    } catch (error) {
        throw `Error logging in anonymously: ${JSON.stringify(error, null, 2)}`;
    }
};