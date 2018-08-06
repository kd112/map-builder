import { Map as maps } from "ol";
import TileLayer from "ol/layer/Tile";
// import BaseLayer from "ol/layer/Base";
import OSM from "ol/source/OSM";
import { View } from 'ol';
import VectorLayer from 'ol/layer/Vector.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import VectorSource from 'ol/source/Vector.js';
import { bbox } from 'ol/loadingstrategy';
let vectorSource =  new VectorSource({
              format:new GeoJSON(),
              loader:(extent, resolution, projection)=>{
                  let proj = projection.getCode();
                // let url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
                //     'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
                //     'outputFormat=application/json&srsname=' + proj + '&' +
                //     'bbox=' + extent.join(',') + ',' + proj;
                let bbox = extent.join(",");
                let url = encodeURIComponent(`http://localhost:8080/geoserver/wfs?request=GetFeature&outputFormat=
                JSON&version=1.1.0&typeName=India:Country&srsname=${proj}&bbox=${bbox},${proj}`);
                let xhr = new XMLHttpRequest();
                xhr.open("GET", `/proxy?source=${url}`);

                let onError = function() {
                vectorSource.removeLoadedExtent(extent);
                };
                xhr.onerror = onError;
                xhr.onload = function() {
                if (xhr.status == 200) {
                    // console.log(xhr.responseText);
                    vectorSource.addFeatures(
                    vectorSource.getFormat().readFeatures(xhr.responseText)
                    );
                    // vectorSource.forEachFeature((feature)=>{
                    // // console.log();
                    // feature.overlay = () => { console.log(xhr.responseText)}
                    // })
                } else {
                    onError();
                }
                };
                xhr.send();
              },
              strategy:bbox
            })
let map = new maps({
  target: "map-canvas",
  layers:[
      new TileLayer({
          source:new OSM()
      }),
      new VectorLayer({
          source:vectorSource
      })

  ],
  view:new View({
      center: [77.99, 21.99],
      zoom:5,
      projection: 'EPSG:4326'
  })

});


export default map;