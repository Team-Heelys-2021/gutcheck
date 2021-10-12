import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
// import 'mapbox-gl.css'
// do not edit the below - must include access token - allows mapbpox to recognize 
 mapboxgl.accessToken = 'pk.eyJ1IjoiY2ZnbWFwIiwiYSI6ImNrdWJ6NnR0NDB2azEzMG1hZzBxdWhxaWkifQ.gop6EERIzevZaBcYBIjWrw'

 // TODO: loader component
export default function MapBox() {
  const map = useRef(null);
  const [markers, setMarkers] = useState([]);
  let myMap;

  useLayoutEffect(() => {
    myMap = new mapboxgl.Map({
        container: map.current, // matches <div id="map" />
        style: 'mapbox://styles/mapbox/dark-v10', // sets the dark mode
        center: [-118.4912, 34.0195], 
        zoom: 9,
    })

    myMap.addControl(new mapboxgl.NavigationControl());

    // const marker = new mapboxgl.Marker()
    //         .setLngLat([-117.4912, 34.5]) //longitude and latitude
    //         .addTo(myMap)
    
  }, []);

    const handleMarkerClick = () => {

    }
    

    return (
      <div id="map" className='map-container' ref={map}></div>
      
    );
}