import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpence from './screens/ManageExpense';
import RecentExpence from './screens/recentExpense';
import AllExpences from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons} from '@expo/vector-icons'
import IconButton from './components/UI/iconbutton';
import ExpeneseContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpenseOverview(){
  return(
    <BottomTab.Navigator screenOptions={({ navigation }) => ({
      headerStyle:{backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white', 
      tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => (
        <IconButton 
            icon="add" 
            size={24} 
            color={tintColor} 
            onPress={()=>{
              navigation.navigate('ManageExpense')
            }} 
            
            />
      ),
    })}
    
    >
      <BottomTab.Screen 
      name='Recent Expense' 
      component={RecentExpence}
      options={{
        title: "Recent Expense",
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size}) => (
          <Ionicons name='hourglass' size={size} color={color} />
        )
      }}
      />

      <BottomTab.Screen 
      name='All Expense' 
      component={AllExpences}
      options={{
        title: "All Expense",
        tabBarLabel: 'All',
        tabBarIcon: ({color, size}) => (
          <Ionicons name='calendar' size={size} color={color} />
        )
      }}
      />
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
   <>
      <StatusBar style="light" />
      <ExpeneseContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white'
        }}>
        <Stack.Screen 
        name='ExpenseOverview' 
        component={ExpenseOverview}
        options={{
          headerShown: false
        }}
        />

          <Stack.Screen 
          name="ManageExpense" 
          component={ManageExpence}
          options={{
            presentation: 'modal', // only for iphone
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpeneseContextProvider>

    
    </>
  );
}
