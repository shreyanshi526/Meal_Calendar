# Mealer


## Overview

The Meal Calendar App is a Vue 3 application designed for managing weekly meal plans. It offers interactive features for meal scheduling and calorie tracking, with a user-friendly interface that simplifies meal planning and adjustments.

## Pages and Their Functionality

### 1. **Home Page**
- **Path**: `/`
- **Functionality**: The landing page of the application. It provides an introduction and access to other parts of the app. This page typically includes a brief overview and navigation options.

### 2. **Meals Page**
- **Path**: `/meals`
- **Functionality**: 
  - **Meal Management**: This page allows users to view and manage their meal plans. It provides options to add, edit, or remove meals.

### 3. **Calendar Page**
- **Path**: `/calendar`
- **Functionality**:
  - **Weekly Calendar View**: Displays a calendar for the current week with each day showing scheduled meals.
  - **Drag and Drop**: Users can drag and drop meals between different days to adjust their meal plans. This feature updates the meal's date in the system.
  - **Calorie Tracking**: Shows the total calories for each day, calculated based on the meals scheduled for that day.

### 4. **Login Page**
- **Path**: `/login`
- **Functionality**:
  - **User Authentication**: Allows users to log in to access the app's features. The login process authenticates users and redirects them to the appropriate page based on their authentication status.

### 5. **Signup Page**
- **Path**: `/signup`
- **Functionality**:
  - **User Registration**: Provides a form for new users to register an account. Users can input their username, email, and password to create a new account. Successful registration redirects users to the login page.

## Key Features

- **Drag and Drop Meal Management**: Users can easily rearrange meals between days using drag-and-drop functionality.
- **Daily Calorie Tracking**: Automatically calculates and displays the total calories for each day based on scheduled meals.
- **Responsive Design**: Ensures the app is usable on various devices, including desktops and mobile devices.

## Technologies Used

- **Vue 3**: For building the user interface and application logic.
- **Vuex**: For state management, handling meal data and user authentication.
- **Vue Router**: For navigation between different views.
- **VueDraggableNext**: For implementing drag-and-drop functionality.

## How to Use

1. **Navigate**: Use the navigation menu to move between pages.
2. **Manage Meals**: On the Meals page, add or adjust your meals.
3. **View Calendar**: Check the Calendar page to see your weekly meal plan and track daily calorie intake.
4. **Login/Signup**: Use the Login or Signup pages to access or register an account.

Feel free to explore and use the application to better manage your meal plans and track your dietary goals.
