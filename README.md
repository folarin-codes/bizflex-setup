# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

# App folder

The app folder contains many subfolders with brackets which represents a container where other pages that relates to the folder will be created. all of those folder will also have a _layout.tsx file , where all of the related screen will be stored as a route , you can tahe reference from the tabs folder , however instead of Tabs , Stack will be used instead.


# Theme

The theme folder contains everything related to the theme of the project , such as colors and sizes , other colors  will be added as the project proceeds. A style file is also defined here which will only contain styles that will be used across the entire app.

Each folder will also have a style file , which includes styles to be shared across related screens in a folder.

# Components

Every reusable component will be added here , button is defined already , custom inputs will be added as we proceed.

# Responsiveness

I added the react-native-responsive-screen package to ensure responsiveness across various devices , and I have added it to the custom font sizes defined in the project.