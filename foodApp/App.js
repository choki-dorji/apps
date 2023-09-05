import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import CategoryScreen from './screens/CategoryScreen';
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import MealsOverViewScreen from './screens/mealsOverViewScreen';
import MealsDetailScreen  from './screens/mealsDetailsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavouriteScreen from './screens/FavouriteScreen';
import {Ionicons} from '@expo/vector-icons'
import FavouriteContextProvider from './store/context/favourites-context';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator(){
  return(
    <Drawer.Navigator screenOptions={{
      headerStyle: {backgroundColor: '#351401'},
      headerTintColor: 'white',
      sceneContainerStyle: {backgroundColor: '#3f2f25'}, 
      drawerContentStyle: {backgroundColor: '#351401'},
      drawerInactiveTintColor: 'white',
      drawerActiveBackgroundColor: '#e4baa1',
      drawerActiveTintColor: '#351401',
    }}>
      <Drawer.Screen 
      name='categories'  
      component={CategoryScreen} 
      options={{
        drawerIcon: ({color, size}) => <Ionicons name='list' color={color} size={size} />
      }}
      />
      <Drawer.Screen 
      name='Favourites'  
      component={FavouriteScreen}
      options={{
        drawerIcon: ({color, size}) => <Ionicons name='star' color={color} size={size} />
      }}
      />
    </Drawer.Navigator>
  )
}
// const DrawerNavigator = () =>{
//   <Drawer.Navigator>
//   <Drawer.Screen name='Drawer'  component={CategoryScreen}/>
//   <Drawer.Screen name='Favourites'  component={FavouriteScreen}/>
// </Drawer.Navigator>
// }

export default function App() {
 
  return (
    <>
    <StatusBar style='light'/>
    <FavouriteContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: "#351401"},
          headerTintColor: "#FFFFFF", 
          contentStyle: {backgroundColor: "3f2f25"}
        }}>
          <Stack.Screen 
          name='MealsCategory' 
          component={DrawerNavigator}
          options={{
            // title : "All Categories",
            headerShown : false
          }}
          />

          <Stack.Screen 
          name='MealsOverView' 
          component={MealsOverViewScreen}
          />

          <Stack.Screen 
          name='MealDetails' 
          component={MealsDetailScreen}
          
          />

        </Stack.Navigator>
      </NavigationContainer>
      </FavouriteContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
