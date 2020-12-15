import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/homescreen';
import Login from './components/login';
import Signup from './components/signup';
import QRCode from './components/qrcode';
import FoodPage from './components/foodpage';
import ListFood from './components/listfoodpage';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" 
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={
          { title: 'Homescreen' },
          { headerLeft: null }
        }/>
        <Stack.Screen name="Login" component={Login} options={
          { title: 'Login' },
          { headerLeft: null }
        }/>
        <Stack.Screen name="Signup" component={Signup} options={
          { title: 'Signup' },
          { headerLeft: null }
        }/>
        <Stack.Screen name="QRCode" component={QRCode} options={
          { title: 'QRCode' },
          { headerLeft: null }
        } />
        <Stack.Screen name="Foodpage" component={FoodPage}  />
        <Stack.Screen name="Listfood" component={ListFood} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;