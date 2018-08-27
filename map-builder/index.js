import { Map as maps } from "ol";
// import TileLayer from "ol/layer/Tile";
// // import BaseLayer from "ol/layer/Base";
// import OSM from "ol/source/OSM";
import { View } from 'ol';
// import VectorLayer from 'ol/layer/Vector.js'
// import GeoJSON from 'ol/format/GeoJSON.js'
import VectorSource from 'ol/source/Vector.js';
import { init as Layers, addHoverLayer} from "./_layers";
import { buildSource} from "./_source"
// import { bbox } from 'ol/loadingstrategy';
// import Style from "ol/style/Style";
// import Fill from "ol/style/Fill";
// import Stroke from "ol/style/Stroke";
// import color from 'ol/color';
// import Overlay from "ol/Overlay";
class Maps extends maps{
    constructor(){
        super(...arguments)
        this.wireUp();
    }
    wireUp(){
        super.on('click', this.onClick)
        super.on("pointermove", this.onHover);
        
    }
    onClick(){
        let feature = this.findFeature(...arguments)
        if (feature)console.log(true)
    }
    onHover(){
        let feature = this.findFeature(...arguments)
        if (feature)console.log(true)
        // else console.log(false)
    }
    findFeature(evt){
        
        return evt.map.forEachFeatureAtPixel(evt.pixel, (feature, layer)=> {
            return feature;
        });
    }
}

let map
let mapData = {
    target:"map-canvas",
    layers: [
        {
        type: 'tile',
        base: {
            id: 'osm'
              }
        },
        {
            type: 'vector',
            format: 'geojson',
            url: 'http://localhost:8080/geoserver/wfs?request=GetFeature&outputFormat=JSON&version=1.1.0&typeName=India:District',
            strategy: "bbox"
        }
        ],
    view:new View(
        {
        center: [77.99, 21.99],
        zoom:5,
        projection:'EPSG:4326'
        }
        )
    }
    
    
let featureOverlay = addHoverLayer()
function build(info){
    map = new Maps({
        target:info.target,
        layers:Layers(info.layers),
        view:info.view
    })
}
let popup = document.getElementById('pop-up')
build(mapData)
map.addLayer(featureOverlay)
