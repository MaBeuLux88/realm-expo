import Realm from 'realm';

let app;

export const realmApp = () => {
    const appId = 'realmsync-fdltv';
    const appConfig = {
        id: appId,
        timeout: 10000,
    };
    if (app === undefined) {
        console.log("=> New Realm App.")
        app = new Realm.App(appConfig);
    }
    return app;
};