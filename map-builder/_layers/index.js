import {_vectorLayer} from './_vectorLayer.js'
import { buildSource } from '../_source';
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";

let mapIds  ={
    osm: OSM
}


export function init(layers){
  
    let MapLayer = []
    layers.forEach(element => {
        if (element.type==='vector') MapLayer.push(addVectorLayer(element))
        if (element.type ==='tile') MapLayer.push(addTileLayer(element))
    });
  
    return MapLayer
}


export function addVectorLayer(config){
 let layerConfig = {
    source:buildSource(config)
 }
 return new _vectorLayer(layerConfig)
}


export function addHoverLayer(config){
    let layerConfig = {
        source:buildSource(config)
    }
    return new _vectorLayer(layerConfig)
}


export function addTileLayer(config){
    let layerConfig = {
        source:getBaseMap(config.base.id)
    }
    return new TileLayer(layerConfig)
}


function getBaseMap(id){
    // console.log("getBaseMap")
    if(mapIds[id]) return new mapIds[id]()
    else return new OSM()
}