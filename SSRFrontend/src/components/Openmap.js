import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import axios from "axios";

function LocationMarker(props) {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click(e) {
            map.locate();
            axios.get(`https://nominatim.openstreetmap.org/reverse.php?lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&format=jsonv2&debug=0`)
                .then(res => {
                    console.log(res);
                    props.setChangedAddress({display_name: res.data.display_name, address: res.data.address, lat:e.latlng.lat, lon:e.latlng.lng});
                });

            setPosition(e.latlng);

        }
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default function EditableOpenMap(props) {
    const [currentPos, setCurrentPos] = useState(null);

    return (
        <div>
            <MapContainer center={[55.75196340001187, 37.62089011005137]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setChangedAddress={props.setChangedAddress}/>
                {
                    currentPos && !props.markers && <Marker position={currentPos} draggable={true}>
                        <Popup position={currentPos}>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                }
                {
                    props.markers && props.markers.map(m => <Marker position={m.position} eventHandlers={{
                        click: () => {
                            m.onClick()
                        },
                    }} draggable={false}>
                        <Popup position={m.position}>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>)
                }
            </MapContainer>
        </div>
    )
}