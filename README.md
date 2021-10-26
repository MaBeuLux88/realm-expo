# MongoDB Realm & Expo - R&D Repository

This repository is a proof of concept. We are trying to use MongoDB Realm with Expo to build a mobile application using React Native.

# Run this Project

```shell
npm install
npm run web
```

Then scan the QR code from the Expo web app using the Expo Go app from your phone. See the errors in the section below. The expected result should be a working TODO application.

# How to Reproduce

```shell
npm i -g expo-cli
expo init realm-expo --npm
cd realm-expo
git remote add origin git@github.com:MaBeuLux88/realm-expo.git
```

At this point, the project works and we can build and run it in an Android Virtual Device.

```shell
npm run web
OR
npm run android
```

It also works if I scan the QR code provided at http://localhost:19002/ with my Expo Go application on my Android phone.

Now we can install Realm & deps + some React Native deps.

```shell
npm i realm
npm i @realm.io/react@0.0.2-alpha.2
npm i react-native-get-random-values
```

Now that we have these dependencies in place, we can import the code from the [full React Native repo](https://github.com/MaBeuLux88/ReactNativeMaximeDemo) (no expo there) which is just one `App.js` file [available here](https://github.com/MaBeuLux88/ReactNativeMaximeDemo/blob/step_2/App.js).

Replace the existing App.js with this one and run the project again.

```shell
npm run web
```

This is working great without expo but it doesn't in the expo environment here.

Here is the error I get in the console: 

```
Error: Missing Realm constructor. Did you run "pod install"? Please see https://realm.io/docs/react-native/latest/#missing-realm-constructor for troubleshooting
at node_modules/react-native/Libraries/Core/ExceptionsManager.js:104:6 in reportException
at node_modules/react-native/Libraries/Core/ExceptionsManager.js:172:19 in handleException
at node_modules/react-native/Libraries/Core/setUpErrorHandling.js:24:6 in handleError
at node_modules/@react-native/polyfills/error-guard.js:49:36 in ErrorUtils.reportFatalError
at node_modules/metro-runtime/src/polyfills/require.js:204:6 in guardedLoadModule
at http://192.168.1.2:19000/node_modules/expo/AppEntry.bundle?platform=android&dev=true&hot=false&minify=false:127798:3 in global code

Invariant Violation: "main" has not been registered. This can happen if:
* Metro (the local dev server) is run from the wrong folder. Check if Metro is running, stop it and restart it in the current project.
* A module failed to load due to an error and `AppRegistry.registerComponent` wasn't called.
at node_modules/react-native/Libraries/Core/ExceptionsManager.js:104:6 in reportException
at node_modules/react-native/Libraries/Core/ExceptionsManager.js:172:19 in handleException
at node_modules/react-native/Libraries/Core/setUpErrorHandling.js:24:6 in handleError
at node_modules/@react-native/polyfills/error-guard.js:49:36 in ErrorUtils.reportFatalError
```

And a screenshot from what I get on my mobile after scanning the QR code with Expo Go:

![Error 1](/home/polux/Work/realm-expo/images_readme/error1.jpeg)

![Error 2](/home/polux/Work/realm-expo/images_readme/error2.jpeg)

# Author

Maxime Beugnet <maxime@mongodb.com>
