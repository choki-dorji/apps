import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView} from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import GameScreen from './screens/GameScreen';
import Colors from './constants/color';
import GameOverScreen from './screens/GameOverScreen';
// import {useFonts} from 'expo-font'
// import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  // const [splashScreenHidden, setSplashScreenHidden] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  // useEffect(() => {
  //   async function hideSplashScreen() {
  //     await SplashScreen.hideAsync();
  //     setSplashScreenHidden(true);
  //   }

  //   hideSplashScreen();
  // }, []);

 

  // const [fontsLoaded] = useFonts({
  //   'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  //   'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  // });

  

  function pickedNumberHandler(pickednumber){
    setUserNumber(pickednumber)
    setGameIsOver(false)
  }
  
  function gameOverHandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler(){
    setUserNumber(null);
    setGuessRounds(0);
  }


  let screen = <StartGameScreen  onPickNumber = {pickedNumberHandler} />

  if (userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver = {gameOverHandler}/>
  }
  if(gameIsOver && userNumber){
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }

  return (
    <>
    <StatusBar style='dark' />
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.container}>
         
        <ImageBackground 
          source={require('./assets/images/dd.jpg')} 
          resizeMode="cover"
          style={{flex: 1}} 
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
       
       {/* <StartGameScreen />  */}
      </ImageBackground>
         
      {/* <StartGameScreen /> */}
    </LinearGradient>
    </>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ddb52f'
  },
  backgroundImage:{
    opacity: 0.15
  }
});
