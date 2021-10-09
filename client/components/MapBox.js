import React, {useEffect, useState, useLayoutEffect} from 'react';
import mapboxgl from 'mapbox-gl';
// do not edit the below - must include access token - allows mapbpox to recognize 
 mapboxgl.accessToken = 'pk.eyJ1IjoiY2ZnbWFwIiwiYSI6ImNrdWJ6NnR0NDB2azEzMG1hZzBxdWhxaWkifQ.gop6EERIzevZaBcYBIjWrw'

 // TODO: loader component
export default function MapBox() {

  useLayoutEffect(() => {
    new mapboxgl.Map({
        container: 'map', // matches <div id="map" />
        style: 'mapbox://styles/mapbox/dark-v10', // sets the dark mode
        center: [-118.4912, 34.0195], 
        zoom: 9,
    })}, []);

 

    return (
      <div id="map" className='map-container'></div>
      // <div id="map" className='mapboxgl-canvas'></div>
    );
}