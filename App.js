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
import Detailfood from './components/detailfood';
import Keranjangpage from './components/keranjangpage';
import Menuadminpage from './componentsadmin/menuadminpage';
import Homepageadmin from './componentsadmin/Homepageadmin';
import Listmenuadmin from './componentsadmin/Listmenupage';
import Addmenupage from './componentsadmin/Addmenupage';
import Editmenupage from './componentsadmin/Editmenuadmin';
import Orderpageadmin from './componentsadmin/Orderadminpage';
import Onprocessadminpage from './componentsadmin/Onprocessadminpage';
import Profilepageadmin from './componentsadmin/Profileadmin';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepageadmin" 
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
        <Stack.Screen name="Detailfood" component={Detailfood} />
        <Stack.Screen name="Keranjangpage" component={Keranjangpage} />
        <Stack.Screen name="menuadminpage" component={Menuadminpage} />
        <Stack.Screen name="Homepageadmin" component={Homepageadmin} />
        <Stack.Screen name="Listmenuadmin" component={Listmenuadmin} />
        <Stack.Screen name="Addmenuadmin" component={Addmenupage} />
        <Stack.Screen name="Editmenuadmin" component={Editmenupage} />
        <Stack.Screen name="Orderpageadmin" component={Orderpageadmin} />
        <Stack.Screen name="Onprocesspageadmin" component={Onprocessadminpage} />
        <Stack.Screen name="Profilepageadmin" component={Profilepageadmin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;