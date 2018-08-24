import { Map as maps } from "ol";
import TileLayer from "ol/layer/Tile";
// import BaseLayer from "ol/layer/Base";
import OSM from "ol/source/OSM";
import { View } from 'ol';
import VectorLayer from 'ol/layer/Vector.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import VectorSource from 'ol/source/Vector.js';
import {vector} from "./_layers";
import { buildSource} from "./_source"
import { bbox } from 'ol/loadingstrategy';
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import color from 'ol/color';
import Overlay from "ol/Overlay";
let popup = document.getElementById('pop-up')
let previous_feature = null
// console.log(document.getElementById('pop-up'))


// let vectorSource =  new VectorSource({
//     format:new GeoJSON(),
//     loader:(extent, resolution, projection)=>{
//         let proj = projection.getCode();
//         // let url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
//         //     'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
//         //     'outputFormat=application/json&srsname=' + proj + '&' +
//         //     'bbox=' + extent.join(',') + ',' + proj;
//         let bbox = extent.join(",");
//         let url = encodeURIComponent(`http://localhost:8080/geoserver/wfs?request=GetFeature&outputFormat=
//         JSON&version=1.1.0&typeName=India:District&srsname=${proj}&bbox=${bbox},${proj}`);
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", `/proxy?source=${url}`);
        
//         let onError = function() {
//             vectorSource.removeLoadedExtent(extent);
//         };
//         xhr.onerror = onError;
//         xhr.onload = function() {
//             if (xhr.status == 200) {
//                 // console.log(xhr.responseText);
//                 vectorSource.addFeatures(
//                     vectorSource.getFormat().readFeatures(xhr.responseText)
//                 );
//                 // vectorSource.forEachFeature((feature)=>{
//                     // // console.log();
//                     // feature.overlay = () => { console.log(xhr.responseText)}
//                     // })
//                 } else {
//                     onError();
//                 }
//             };
//             xhr.send();
//         },
//         strategy:bbox
//     })

    let config = {
        format:'geojson',
        url: 'http://localhost:8080/geoserver/wfs?request=GetFeature&outputFormat=JSON&version=1.1.0&typeName=India:District',
        strategy:bbox
    }
    let map = new maps({
        target: "map-canvas",
        layers:[
            new TileLayer({
                source:new OSM()
            }),
            new VectorLayer({
                source:buildSource(config),
                style:new Style({
                    fill:new Fill({
                        color:'rgba(255,127,80,0.3)'
                    }),
                    stroke:new Stroke({
                        color:'#FF7F50',
                        widht:1.25
                    })
                })
            })
            
        ],
        view:new View({
            center: [77.99, 21.99],
            zoom:5,
            projection: 'EPSG:4326'
        })
        
    });

let featureOverlay = new VectorLayer({
    source: new VectorSource(),
    map: map,
    style: new Style({
                stroke: new Stroke({
                    color: '#000066',
                    width: 2
                })
                // fill: new Fill({
                //     color: 'rgba(192,192,192,0.7)'
                // }),
            })
        })
    
map.on('click',(evt)=>{
    evt.map.removeOverlay()
let feature = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    return feature;
});
if (feature){
    let prop = feature.getProperties()
    // console.log(popup)
    popup.innerHTML = `<p>Name:${prop.name_engli}</p>`
    let pop = new Overlay({
        id:1,
        element:popup,
    })
    pop.setPosition(evt.coordinate)
    evt.map.addOverlay(pop)
}else{
    evt.map.removeOverlay()
}
})
map.on('pointermove',(evt)=>{
// if (featureOverlay.getSource().getFeatures().length>0){
//     let features = featureOverlay.getSource().getFeatures()
//     features.forEach(f=>{
//         featureOverlay.getSource().removeFeature(f)
//     })
// }
// evt.map.removeOverlay(2)
let feature = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    return feature;
});
if(previous_feature && previous_feature!==feature){
    if(featureOverlay.getSource().getFeatures().length>0){
        featureOverlay.getSource().removeFeature(previous_feature)
    }
}
if (feature){
    featureOverlay.getSource().addFeature(feature);
    previous_feature=feature
}

})


export default map;