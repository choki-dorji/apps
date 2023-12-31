import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import Title from "../components/Title";
import Colors from "../constants/color";
import PrimaryButton from "../components/primaryButton";

function GameOverScreen({roundsNumber, userNumber, onStartNewGame}){
    const {width, height} = useWindowDimensions();

    let imageSize = 300;

    if (width < 400 ){
        imageSize = 150;
    }

    if (height < 400){
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize, 
        borderRadius: imageSize /2
    }

    return(
        <ScrollView style={{flex: 1}}>
        <View  style={[styles.rootContainer, {marginTop: 30}]}>
            <Title>Game Over</Title>
            <View style={[styles.imageContainer, imageStyle]}>
            <Image style = {styles.image} source={require('../assets/images/success.png')}/>
            </View>
            <View>
                <Text style={styles.summaryText}>Your Phone needed <Text style={styles.highlightText}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlightText}>{userNumber}</Text>  </Text>
            </View>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
        </ScrollView>
    )
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    rootContainer:{
        flex:1, 
        padding: 24, 
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageContainer: {
        // width: deviceWidth < 380 ? 150 : 300, 
        // height: deviceWidth < 380 ? 150 : 300, 
        // borderRadius: deviceWidth < 380 ? 75 : 150, 
        borderWidth: 3, 
        borderColor: Colors.primary800,
        overflow: "hidden",
        margin: 36
    },
    image:{
        width: "100%", 
        height: "100%",
    }, 
    summaryText:{
        // fontFamily: "open-sans", 
        fontSize: 20, 
        textAlign: "center",
        marginBottom: 24
    }, 
    highlightText:{
        // fontFamily: "open-sans-bold", 
        color: Colors.primary500,
        fontWeight: "bold"
    }
})