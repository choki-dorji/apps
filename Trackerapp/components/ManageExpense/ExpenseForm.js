import { View,Text,  StyleSheet, Alert} from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues }){

    // single useSate for multiple textinputs
    const [inputs, setInputs] = useState({
        amount: {
            value : defaultValues ? defaultValues.amount.toString() :'',
            isValid : true
        },
        date: {
            value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) :  '',
            isValid :true
        },
        description: {
            value: defaultValues ? defaultValues.description : '', 
            isValid : true
        }
    })
    function inputChangeHandler(identifier, enteredAmount){
        setInputs((curInputs) => {
            return {
                ...curInputs, 
                [identifier]: {value: enteredAmount, isValid: true}
            }
        })
    }

    function submitHandler(){
        const expensData={
            amount: +inputs.amount.value, 
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        const amountIsValid =!isNaN(expensData.amount) &&  expensData.amount > 0;
        const dateIsValid = expensData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expensData.description.trim().length > 0
        
        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            // showFeed Back
            // Alert.alert('Invalid Input', 'Please Check your input Values')
            setInputs((curInputs) => {
                return {
                    amount:{
                        value: curInputs.amount.value,
                        isValid: amountIsValid
                    },
                    date:{
                        value: curInputs.date.value,
                        isValid: dateIsValid
                    },
                    description:{
                        value: curInputs.description.value,
                        isValid: descriptionIsValid
                    }
                }
            })
            
            return 
        }
        
        
        onSubmit(expensData)

    }

    const formIsValid = 
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRowStyle}>
            <Input 
                style={styles.row} 
                Label="Amount" textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: inputs.amount.value
            }}
            invalid={ !inputs.amount.isValid }
            />
            <Input 
                style={styles.row} 
                invalid={ !inputs.date.isValid }
                Label="Date" 
                textInputConfig={{
                placeholder: "YYY-MM-DD",
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value
            }}/>

            </View>

           
            <Input 
                Label="Description" 
                invalid={!inputs.description.isValid}
                textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value
            }} />
            {
                formIsValid && (
                    <Text style={styles.errorText}>Invalid input values - please check your entered data</Text>
                )
            }
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>
                   {submitButtonLabel}
                    {/*  */}
                </Button>

            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title:{
        fontSize: 24, 
        fontWeight: 'bold', 
        color: 'white',
        marginVertical: 24, 
        textAlign: 'center'
    },
    inputRowStyle: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    row:{
        flex: 1
    },
    buttonContainer:{
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        minWidth: 120, 
        marginHorizontal: 8,
    },
    errorText:{
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})