import { Pressable, View, StyleSheet, Text} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({id, description, amount, date}){
    const navigation = useNavigation();

    function expensePressHandler(){
        navigation.navigate("ManageExpense", {
            expenseId: id
        })
    }

    return(
        <Pressable style={({pressed}) => pressed && Styles.pressed}
            onPress={expensePressHandler}
        >
            <View style={Styles.expenseitem}>
                <View>
                    <Text style={[Styles.textbased, Styles.description]}>{description}</Text>
                    <Text style={Styles.textbased}>{getFormattedDate(date)}</Text>
                </View>

                <View style={Styles.amountContainer}>
                <Text style={Styles.amount}>{amount}</Text>
                </View>
                
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const Styles = StyleSheet.create({
    pressed:{
        opacity: 0.75
    },
    expenseitem: {
        padding: 12, 
        marginVertical: 8, 
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 6, 
        elevation: 3, 
        shadowRadius: 4,
        shadowColor: GlobalStyles.colors.gray500,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4 
    },
    textbased:{
        color: GlobalStyles.colors.primary50,

    },
    description:{
        fontSize: 16, 
        marginBottom: 4, 
        fontWeight: 'bold',
    },
    amountContainer:{
        paddingHorizontal: 12,
        paddingVertical: 4, 
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 90,
    }, 
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    }
})