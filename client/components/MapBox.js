import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
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

  function handleMapMarkerClick(e) {
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    const marker = new mapboxgl.Marker({
              draggable: true, 
              clickTolerance: 10
            })
            .setLngLat([lng, lat]) //longitude and latitude
            .addTo(myMap)
    marker.getElement().addEventListener('click', function (e) {
      e.stopPropagation();
      marker.remove();
    })
    setMarkers([...markers, marker]);
  }

  useLayoutEffect(() => {
    myMap = new mapboxgl.Map({
        container: map.current, // matches <div id="map" />
        style: 'mapbox://styles/mapbox/dark-v10', // sets the dark mode
        center: [-118.4912, 34.0195], 
        zoom: 14,
    })

    myMap.addControl(new mapboxgl.NavigationControl());

  

    myMap.on('click', (e) => {
      // console.log(e.lngLat)
      handleMapMarkerClick(e);
    })
  }, []);



    return (
        <div id="map" className='map-container' ref={map}></div>
    );
}