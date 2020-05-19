
# Mobile Flashcards App
<a href="https://www.udacity.com/">
  <img src="https://s3-us-west-1.amazonaws.com/udacity-content/rebrand/svg/logo.min.svg" width="300" alt="Udacity logo">
</a>


This project was bootstrapped with [`create-react-native-app`](https://github.com/react-community/create-react-native-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template layout and the new functional component approach

 -  `create-react-native-app mobile-flashcards` 

The App uses [Expo](http://expo.io) framework to build cross-platform functional code, including animation and it was tested on iOS devices and through expo web builder
    
## Table of Contents

- [Table of Contents](#table-of-contents)
- [Instructions](#instructions)
- [Build](#build)
- [Application](#application )
- [Storage](#storage)
- [To Do(s)](#to-dos)

## Instructions
  
`npm install`
To install dependencies

`expo start --web`
Runs the app in the development mode.<br />

  Local:            http://localhost:19006/
  On Your Network:  http://192.168.110.2:19006/

The page will reload if you make edits.<br />

expo provides QR codes to launch app on your device (you must have the Expo app installed on your device) 

### Build
`npm install -g exp`
install Expo `exp`

`expo build:ios`
to build the app for iOS App Store.<br />
`expo build:android`
 to build the app for Google Play store 

## Application 

The app holds flashcard card decks, each deck having one or more flashcards with a Q&A quiz. The 'front' of the flashcard has the question, while the 'back' has the answer. Users must flip the card to view the answer.

Buttons are included to allow the user to mark their guess as 'Correct' or 'Incorrect' and, when the quiz completes, the final result is displayed. 

Users can add cards as well as add or remove decks 

## Storage
All data is locally stored leveraging [AsyncStorage](https://docs.expo.io/versions/latest/react-native/asyncstorage/) while the application data store is managed with Redux.

## To Do(s)
- Add component proptypes
- Add a remove card option
 - Add [**React Native Firebase**](https://rnfirebase.io/) storage
