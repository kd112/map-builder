import {vectorSource} from './_vectorSource.js'
import GeoJSON from "ol/format/GeoJSON.js";
import { bbox } from 'ol/loadingstrategy';
export function buildSource (config){
    if (config){
        let source = new vectorSource({
            format:buildFormat(config.format),
            loader:(extent,resolution,projection)=>{
                let proj = projection.getCode();
                let bbox = extent.join(',');
                let url = encodeURIComponent(`${config.url}&srsname=${proj}&bbox=${bbox},${proj}`);
                
                let xhr = new XMLHttpRequest();
                xhr.open('GET',`/proxy?source=${url}`)
                let onError = ()=>{
                    source.removeLoadedExtent(extent)
                }
                xhr.onError=onError
                xhr.onload = ()=>{
                    if(xhr.status==200){
                        source.addFeatures(
                            source.getFormat().readFeatures(xhr.responseText)
                        )
                    }else{
                        onError();
                    }
                }
                xhr.send()
            },
            strategy: buildStrategy(config.strategy)
        })
        return source
    }else{
        return new vectorSource()
    }
}


function buildFormat(format){
    if(format==='geojson')return new GeoJSON()
}

function buildStrategy(strategy){
    if (strategy=='bbox')return bbox
}