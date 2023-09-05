import { View, Text, StyleSheet, FlatList, Dimensions, useWindowDimensions} from "react-native";
import Title from "../components/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../game/NumberContainer";
import PrimaryButton from "../components/primaryButton";
import { Alert } from "react-native";
import Card from "../components/card";
import InstructionText from "../components/instructionText";
import  Ionicons  from '@expo/vector-icons/Ionicons';
import GuessLogItem from "../game/GuessLogItem";

function generateRandomNumber(min, max, exclude){
    const rdmNum = Math.floor(Math.random() * (max-min)) + min;
    if (rdmNum === exclude){
        return generateRandomNumber(min, max, exclude);
    }else{
        return rdmNum;
    }
}

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({userNumber, onGameOver}){
    const initialGuess = generateRandomNumber(1,100, userNumber);
    const [currentGuess,setCurrentGuess] = useState(initialGuess);  
    const [guessRounds, setGuessRounds] =  useState([initialGuess])
    const {width, height} = useWindowDimensions();

    useEffect(()=>{
        if(currentGuess === userNumber){
          onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(()=>{
        minBoundry=1;
        maxBoundry=100
    }, [])

    function nextGuessHandler(direction) {
        if( 
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ){
            Alert.alert("Dont Lie", "you know it is wrong", [
                {text: "s0rry", style:"cancel"}
            ])
            return;
        }
        if(direction === 'lower'){
            maxBoundry = currentGuess;
           
        }else{
            minBoundry = currentGuess + 1;
            
        }
        const newRndNumber = generateRandomNumber(minBoundry, maxBoundry, currentGuess)
        setCurrentGuess(newRndNumber)
        setGuessRounds(prevGuessRounds => [newRndNumber,...prevGuessRounds]);
    }

    const guessRoundsListLength = guessRounds.length

    let content = <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
            <InstructionText style={styles.InstructionText}>Higher or Lower?</InstructionText>
            <View style={styles.buttonContainer}>
                
                <View style={{flex: 1}}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </PrimaryButton>
                </View>
               
               <View style={{flex: 1}}>
               <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
               </PrimaryButton>
               </View>
                
                </View>
            </Card>
            

    
    </>
    if(width > 500 ){
        content = 
        <>       
            <View style={styles.buttonsContainerwide}>
                <View style={{flex: 1}}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButton>
                </View>

                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={{flex: 1}}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </>
        
    }


    return(

        <View style={styles.screen}>
            <Title>Opponents Guess</Title>
            {content}
            
            <View>
            
            {/* + - */}
            </View>
            <View style={styles.listConatiner}>
                {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
                <FlatList data={guessRounds} 
                renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />} 
                keyExtractor={(item)=>item}
                />
            </View>
        </View>
          )
}

export default GameScreen;


const styles  = StyleSheet.create({
    screen:{
        flex: 1, 
        padding: 39,
        alignItems: 'center',
       },
       title:{
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#ddb52f',
        textAlign: 'center',
        borderWidth: 2, 
        borderColor: '#ddb52f',
        padding: 12
       }, 
       buttonContainer:{
        flexDirection: "row"
       },
       InstructionText:{
        marginBottom: 12
       },
       listConatiner:{
        flex: 1, 
        padding: 16, 

       },
       buttonsContainerwide:{
        flexDirection: "row",
        alignItems: "center",
       }

})