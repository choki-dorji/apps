import MapView, {Marker} from 'react-native-maps';
import { Alert, StyleSheet } from 'react-native'
import { useCallback, useLayoutEffect, useState } from 'react';
import IconButton from '../Component/UI/iconButton';

function Map({navigation}) {
    const [selectLocation, setSelectLocation] = useState()
    const region = {
        latitude: 37.78, 
        longitude: -122.43, 
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421
    }
    function selectLocationHandler(event){
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectLocation({ lat: lat, lng: lng });
    }
    const savePickedhandler = useCallback(() =>{
        if(!selectLocation){
            Alert.alert(
                'No Loaction Pcked',
                'You have to pick a location'
            )
            return;
        }
        navigation.navigate('AddPlaces', {
            pickedLat : selectLocation.lat,
            pickedLng : selectLocation.lng
        })
    }, [navigation, selectLocation])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <IconButton icon="save" size={24}  color={tintColor} onPress={savePickedhandler} />
        })
    }, [navigation, savePickedhandler])
    return (
    <MapView onPress={selectLocationHandler} style={styles.map} initialRegion={region}>
        {selectLocation && (
            <Marker
            title="Picked Location"
                coordinate={{
                    latitude: selectLocation.lat, 
                    longitude: selectLocation.lng
                }}
            />
        
        )}
    </MapView>
    
    )
}
export default Map

const styles = StyleSheet.create({
    map:{
        flex: 1
    }
})