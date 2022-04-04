import React, {useState} from "react";
import {Map} from "leaflet";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import Modal from "react-bootstrap/Modal";
import axios from "axios";


function LocationMarker(props) {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click(e) {
            map.locate();
            //console.log(e);

                axios.get(`https://nominatim.openstreetmap.org/reverse.php?lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&format=jsonv2&debug=0`)
                    .then(res => {
                        console.log(res);
                        props.setChangedAddress({display_name: res.data.display_name, address: res.data.address, lat:e.latlng.lat, lon:e.latlng.lng});
                    });

            setPosition(e.latlng);

        }/*,
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },*/
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export function EditableOpenMap(props) {
    const [currentPos, setCurrentPos] = useState(null);

/*    constructor(props) {
        super(props);
        this.state = {
            currentPos: null
        };
        this.handleClick = this.handleClick.bind(this);
    }*/




/*    const map = useMapEvents({
        click(e) {
            alert(e);

            /!*setSelectedPosition([
                e.latlng.lat,
                e.latlng.lng
            ]);*!/
        },
    })*/

    return (
        <div>

            <MapContainer center={[50.5952, 36.5800]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setChangedAddress={props.setChangedAddress}/>
{/*
                <Marker position={[50.5952, 36.5800]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
*/}
                {
                    currentPos && <Marker position={currentPos} draggable={true}>
                        <Popup position={currentPos}>
                            A pretty CSS3 popup. <br /> Easily customizable.
                            {/*Current location: <pre>{JSON.stringify(currentPos, null, 2)}</pre>*/}
                        </Popup>
                    </Marker>
                }
            </MapContainer>

{/*
            <Map center={props.center} zoom={props.zoom} onClick={handleClick}>
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                { currentPos && <Marker position={currentPos} draggable={true}>
                    <Popup position={currentPos}>
                        Current location: <pre>{JSON.stringify(currentPos, null, 2)}</pre>
                    </Popup>
                </Marker>}
            </Map>
*/}
        </div>
    )
}