import OutlinedButton from "../UI/outLinedButton"
import { StyleSheet, View, Text, Image } from "react-native";
import { Colors } from "../../constants/colors";
import {    getCurrentPositionAsync,PermissionStatus, useForegroundPermissions  } from 'expo-location'
import { getAddress, getMapView } from "../UI/location";
import { useEffect, useState } from "react";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";



function LocationPicker({onPickLocation}){

    const navigation = useNavigation()
    const route = useRoute();
    const isFocused = useIsFocused();
    
    const [pickedLocation, setPickedLocation] = useState()
    const [locationPermissionInformation, requestpermission] = useForegroundPermissions()
    
     
    useEffect(()=>{
        if(isFocused && route.params){
            const mapPickedLoaction = route.params && {
                lat: route.params.pickedLat, 
                lng: route.params.pickedLng
            }
            setPickedLocation(mapPickedLoaction)
        }
        
        
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation(){
            if(pickedLocation){
                const address = await getAddress(
                    pickedLocation.lat, 
                    pickedLocation.lng
                )
                console.log(address)
                onPickLocation({...pickedLocation, address: address})
            }
        }  
        handleLocation()      
    }, [pickedLocation, onPickLocation])

    async function verifyPermissions(){
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestpermission();
            return permissionResponse.granted
        }

        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('insufficent permissions', 
            'ypu need to grant location permission to use this app')

            return false
        }
        return true
    }
    async function getLocationHandler(){
        const hasPermission = await verifyPermissions()

        if(!hasPermission){
            return;
        }

        const location = await getCurrentPositionAsync();
        // console.log(location)
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude

        })
    }

    function pickLocationHandler(){
        navigation.navigate('Map')
    }
    


    let locationPreview = <Text>No location Picked yet</Text>
    if(pickedLocation){
        locationPreview = <Image style={styles.mapPreviewImage} source={{uri: getMapView(pickedLocation.lat, pickedLocation.lat)}} />
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickLocationHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview:{
        width: '100%', 
        height: 200, 
        marginVertical: 8, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: Colors.primary100, 
        borderRadius:4,
        overflow: 'hidden',
    }, 
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mapPreviewImage:{
        width: '100%',
        height: '100%',
    }
})