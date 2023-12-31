
const GOOGLE_API_KEY ='AIzaSyDZSm6j2veqfHzWsIPGBfY6kK-UR8YG-lc'

export function getMapView(lat, lng){
    const imagePreviewUri = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}
    &key=${GOOGLE_API_KEY}`
    return imagePreviewUri
}

export async function getAddress(lat, lng){
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`

    const response = await fetch(url)

    if(!response.ok){
        throw new Error('Failed to fetch address')
    }
    const data = await response.json()
    const address = data.results[0].address;
    return address
} 
