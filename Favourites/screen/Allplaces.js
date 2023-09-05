import { useEffect, useState } from "react";
import PlacesList from "../Component/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

function AllPlaces({route}){
    const [loadPlaces, setLoadPlaces] = useState()
    const isFocused = useIsFocused();
    
    useEffect(()=>{
        if(isFocused && route.params){
            setLoadPlaces(curPlaces => [...curPlaces, route.params.place])
        }

    }, [isFocused])
    return (
        <PlacesList places={loadPlaces} />
    )
}

export default AllPlaces;