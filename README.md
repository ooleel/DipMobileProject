# SeniorLearn Bulletins Mobile App

## What is it?

**SeniorLearn** is a platform for seniors to connect through learning. It requires a mobile application to manage and display two types of bulletins:
- Official Bulletins (admin-posted)
- Member Interest Bulletins (user-posted)

> *Note:* see this [Notion](https://www.notion.so/leeloos/SL-mobile-app-1c1e21e50cf88080bd14eadd85a9889a?source=copy_link) page for project management.

### Tech stack

| Front-End | Back-End | Database |
| --------- | -------- | -------- | 
| **React Native** | **Express.js API** | **MongoDB** | 
| Displays bulletins | Handles CRUD operations | Stores both bulletin types |
| Handles user login and post creation for member bulletins | Uses JWT for authentication and role-based access | Uses collections with partitioning (e.g. bulletin type) and metadata (timestamps) |
| | Connects to MongoDB for data storage | |

## Features 

(add main functionalities)

## Getting started 

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

### Prerequisites 

(add here)

### How to use 

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo.

