import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { Colors } from "../../constants/colors";
import { useState } from "react";
import OutlinedButton from "../UI/outLinedButton";

function ImagePicker({ontakeImage}){
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestpermission] = useCameraPermissions()
    
    async function verifyPermissions(){
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestpermission();
            return permissionResponse.granted
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('insufficent permissions', 
            'ypu need to grant permission to use this app')

            return false
        }
        return true
    }
    
    async function takeImageHandler(){
        const hasPermission = await verifyPermissions();

        if(!hasPermission){
            return
        }
        const image = await launchCameraAsync({
            allowsEditing: true, 
            aspect: [16,9],
            quality: 0.5
        })
        // console.log(image.assets[0].uri)
        setPickedImage(image.assets[0].uri)
        ontakeImage(image.assets[0].uri)
    }
    let imagePreview  = <Text>No image taken Yet</Text>

    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
    }
    return(
       <View>
        <View style={styles.imagePreview}>
            {imagePreview}
        </View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
       </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%', 
        height: 200, 
        marginVertical: 8, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: Colors.primary100, 
        borderRadius:4
    }, 
    image:{
        width: '100%', 
        height: '100%', 

    }
})