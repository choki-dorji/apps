import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notification from 'expo-notifications'
import { useEffect } from 'react';

Notification.setNotificationHandler({
  handleNotification: async ()=> {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true
    }
  }
});

export default function App() {
  useEffect(()=>{
    const subsciption = Notification.addNotificationReceivedListener((notification)=> {
      console.log('notification received')
      console.log(notification)
    })
    return ()=>{
      subsciption.remove()
    }
    
  }, [])

  function scheduleNotification() {
    Notification.scheduleNotificationAsync({
      content: { 
        title: 'My first notification',
        body: 'This is my first notification',
        data:{userName: 'Max'},
        sound: 'sound.wav'
      },
      trigger:{
        seconds: 5
      }
    })
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Schedule notification" onPress={scheduleNotification}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
