import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screen/Allplaces';
import AddPlace from './screen/Addplaces';
import IconButton from './Component/UI/iconButton';
import { Colors } from './constants/colors';
import Map from './screen/Map';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary500
          },
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700}
        }}>
          <Stack.Screen 
            name="AllPlaces" 
            component={AllPlaces}
            options={({navigation}) => ({
              title: 'Your Favourite Places',
              headerRight: ({tintColor}) =>
              <IconButton 
                icon="add" 
                color={tintColor} 
                size={24} 
                onPress={() => navigation.navigate('AddPlaces')}
                
                /> 
            })}
          />
          <Stack.Screen 
            name="AddPlaces" 
            component={AddPlace}
            options={{
              title: "Add a new place",
            }}
            
          />
          <Stack.Screen name='Map' component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
   </>
  );
}

