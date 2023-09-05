import { TextInput, View, StyleSheet, Alert, Text, ScrollView, KeyboardAvoidingView, Dimensions, useWindowDimensions} from "react-native";
import PrimaryButton from "../components/primaryButton";
import { useState, useEffect } from "react";
import Colors from "../constants/color";
import Title from "../components/Title";
import Card from "../components/card";
import InstructionText from "../components/instructionText";

function StartGameScreen({onPickNumber}){
    const [enteredNumber, setEnteredNumber] = useState('');

    const {width, height} = useWindowDimensions();
    
    function numberInputhandler(enteredText){
        // console.log(enteredNumber);
        setEnteredNumber(enteredText);
    }

    function resetInputhandler(){
        setEnteredNumber("")
        
    } 
    


    
    // const confirmInputhandler =() => {
    //   var chosenNumber = parseInt(enteredNumber)
    //   console.log(chosenNumber)
    // }

    function confirmInputhandler(){
        // console.log(enteredNumber)
        var chosenNumber = parseInt(enteredNumber);
      if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
        Alert.alert(
            'Invalid Number ',
            `Number has to be 0 - 99, ${chosenNumber}`,
            [{ text: 'Okay', style: 'destructive', onPress: resetInputhandler }]
        );
        console.log("inValid Number",chosenNumber)
      return
      }
      onPickNumber(chosenNumber);
    }

   const marginTop = height < 400 ? 30 : 100;

    return (
        <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="position">
        <View style={[styles.rootConatiner, {marginTop: marginTop}]}>
            <Title>Guess My Number</Title>
        <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput 
                style={styles.textInput} 
                maxLength={2} 
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                value={enteredNumber}
                onChangeText={numberInputhandler}
                />


                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <PrimaryButton onPress={resetInputhandler}>Reset</PrimaryButton>
                    </View>

                    <View style={styles.button}>
                        <PrimaryButton onPress={confirmInputhandler}>Confirm</PrimaryButton>
                    </View>
                   
                   
                </View>
                
        </Card>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;
const deviceheight = Dimensions.get('window').height

const styles = StyleSheet.create({
    rootConatiner:{
        flex: 1,
        // marginTop: deviceheight < 400 ? 30 : 100,
        alignItems: 'center',
    },
    textInput:{
        height: 50,
        width: 50,
        textAlign: "center",
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        fontWeight: "bold",
        marginVertical: 8
    }, 
    buttonsContainer:{
        flexDirection: 'row'
    },
    button:{
        flex:1
    }
})