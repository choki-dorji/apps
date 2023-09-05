import { useLayoutEffect, useState} from "react";
import { TextInput, View, StyleSheet} from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/iconbutton";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expenses-context";
import { useContext } from "react";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverLay from "../components/UI/loadingOverlay";
import ErrorOverLay from "../components/UI/ErrorOverlay";

function ManageExpence({route, navigation}){
    const [error, setError] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const expenseCtx = useContext(ExpenseContext);

    //  used to retrieve data while swtiching fromonr screen to another
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });

    }, [navigation, isEditing]);

    
    async function expenseDeleteHandler(){
        setIsSubmitting(true)
        try{
            await deleteExpense(editedExpenseId)
            expenseCtx.deleteExpense(editedExpenseId)
            navigation.goBack();
        } catch(err){
            setError('could not delete expense')
            setIsSubmitting(false)
        }
        
        
    }

    function cancelHandler(){
        navigation.goBack();
    }
    async function confirmHandler(expenseData){
        setIsSubmitting(true)
        try{
            if(isEditing){
                expenseCtx.updateExpense(editedExpenseId,expenseData);
                await updateExpense(editedExpenseId, expenseData);
            }else{
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({expenseData, id: id});
            }
            navigation.goBack();
        } catch(e){
            setError('could not save data please try again')
            setIsSubmitting(false)
        }
        
    }

  

    if(error && !isSubmitting){
        return (
            <ErrorOverLay message={error}  />
        )
    }

if (isSubmitting){
    return (
        <LoadingOverLay />
    )
}


    return(
        <View style={styles.container}>
            <ExpenseForm 
                submitButtonLabel={isEditing ? 'Update': 'Add'} 
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
                />
            
            {isEditing && (
                <View style={styles.deleteContainer}>
                <IconButton 
                    icon="trash"
                    color={GlobalStyles.colors.error500}
                    size={36}
                    onPress={expenseDeleteHandler}
                    />
                </View>
            )}
        </View>
    )
}

export default ManageExpence;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 24, 
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16, 
        paddingTop:8, 
        borderTopWidth: 2, 
        borderTopColor: GlobalStyles.colors.primary200, 
        alignItems: 'center'
    }, 
    
})