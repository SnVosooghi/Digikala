import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login'
import Home from './Home'
import CategoryList from './CategoryList';
import CategoryMovies from './CategoryMovies'

const Stack = createStackNavigator();
const AppStack = createStackNavigator();
const AuthStack = createStackNavigator()

function AppComponent() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="CategoryList" component={CategoryList} />
      <AppStack.Screen name="CategoryMovies" component={CategoryMovies} />
    </AppStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >

        <Stack.Screen name="AppComponent" component={AppComponent} 
          options={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
        <Stack.Screen name="Login" component={Login} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}