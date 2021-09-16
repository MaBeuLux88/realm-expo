import Realm from 'realm';

export function getRealmApp() {
    const appId = 'realmsync-fdltv';
    const appConfig = {
        id: appId,
        timeout: 10000,
    };
    console.log("Bonjour!!!")
    return new Realm.App(appConfig);
}