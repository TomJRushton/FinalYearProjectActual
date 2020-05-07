import {ScatterplotLayer} from '@deck.gl/layers';
import {HexagonLayer, HeatmapLayer } from '@deck.gl/aggregation-layers';
//import {HexagonLayer, HeatmapLayer, ScatterplotLayer } from 'deck.gl';
import { DataFilterExtension } from '@deck.gl/extensions';
//new DataFilterExtension({filterSize: 1, fp64: true});
import phoneData from './data/js/phoneData';
const PICKUP_COLOR = [240, 19, 12];
const DROPOFF_COLOR = [243, 185, 72];

const HEATMAP_COLORS = [
    [255, 255, 204],
    [199, 233, 180],
    [127, 205, 187],
    [65, 182, 196],
    [44, 127, 184],
    [37, 52, 148]
];

const LIGHT_SETTINGS = {
    lightsPosition: [-73.8, 40.5, 8000, -74.2, 40.9, 8000],
    ambientRatio: 0.4,
    diffuseRatio: 0.6,
    specularRatio: 0.2,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 2
};

const elevationRange = [0, 1000];


export function renderLayers(props) {
    console.log('render layers called')
    const { data, hour, onHover, settings, dataSettings, firstAddedLayerData, secondAddedLayerData } = props;
    const filteredData = hour === null ? data : data.filter(d => d.hour === hour);
    // const newData = addedLayerData;
    let sexLowerLimit = 1, sexUpperLimit = 2;
    //console.log(data);
    //console.log(addedLayerData);
    //console.log(filteredData);
    if(dataSettings.showMales === false){
        sexLowerLimit = 2;
    }else{sexLowerLimit = 1;}
    if(dataSettings.showFemale === false){
        sexUpperLimit = 1;
    }else{sexUpperLimit = 2;}



    return [
        settings.showScatterplot &&
        new ScatterplotLayer({
            id: 'scatterplot',
            data: filteredData,
            getPosition: d => d.position,
            //getColor: d => (d.pickup ? PICKUP_COLOR : DROPOFF_COLOR),
            getColor: [120,130,250],
            getFilterValue: d => [d.age, d.spendCategory, d.sex, d.residentCategory],
            filterRange: [
                [dataSettings.lowerAgeLimit, dataSettings.upperAgeLimit],
                [dataSettings.lowerSpendCategory, dataSettings.upperSpendCategory],
                [sexLowerLimit, sexUpperLimit],
                [dataSettings.lowerResidentCategory, dataSettings.upperResidentCategory]
            ],
            extensions: [new DataFilterExtension({filterSize: 4})],
            getRadius: d => 5,
            opacity: 0.5,
            pickable: true,
            radiusMinPixels: 0.25,
            radiusMaxPixels: 30,
            onHover,
            ...settings
        }),
        settings.showHexagon &&
        new HexagonLayer({
            id: 'heatmap',
            colorRange: HEATMAP_COLORS,
            elevationRange,
            elevationScale: 5,
            extruded: true,
            getPosition: d => d.position,
            lightSettings: LIGHT_SETTINGS,
            opacity: 0.8,
            pickable: true,
            data: filteredData,
            onHover,
            ...settings
        }),
        settings.showHeatmap &&
        new HeatmapLayer({
            id: 'heatmapActual',
            colorRange: HEATMAP_COLORS,
            getPosition: d => d.position,
            getFilterValue: d => [d.age, d.spendCategory, d.sex, d.residentCategory],
            filterRange: [
                [dataSettings.lowerAgeLimit, dataSettings.upperAgeLimit],
                [dataSettings.lowerSpendCategory, dataSettings.upperSpendCategory],
                [sexLowerLimit, sexUpperLimit],
                [dataSettings.lowerResidentCategory, dataSettings.upperResidentCategory]
            ],
            extensions: [new DataFilterExtension({filterSize: 4})],
            lightSettings: LIGHT_SETTINGS,
            opacity: 0.8,
            pickable: true,
            data: filteredData,
            onHover,
            ...settings
        }),
        settings.show1stAddedLayerScatterplot &&
        new ScatterplotLayer({
            id: 'scatterplotAddedData',
            data: firstAddedLayerData,
            getPosition: d => d.position,
            getRadius: d => 5,
            getColor: [250, 0, 0],
            opacity: 0.1,
            pickable: true,
            radiusMinPixels: 0.25,
            radiusMaxPixels: 30,
            onHover,
            ...settings
        }),
        settings.show1stAddedLayerHeatmap &&
        new HeatmapLayer({
            id: 'heatmapAddedData',
            data: firstAddedLayerData,
            getPosition: d => d.position,
            getRadius: d => 5,
            getColor: [250, 0, 0],
            opacity: 0.1,
            pickable: true,
            radiusMinPixels: 0.25,
            radiusMaxPixels: 30,
            onHover,
            ...settings
        }),
        settings.show2ndAddedLayerScatterplot &&
        new ScatterplotLayer({
            id: 'scatterplotAddedData',
            data: secondAddedLayerData,
            getPosition: d => d.position,
            getRadius: d => 5,
            getColor: [50,205,50],
            opacity: 0.1,
            pickable: true,
            radiusMinPixels: 0.25,
            radiusMaxPixels: 30,
            onHover,
            ...settings
        }),
        settings.show2ndAddedLayerHeatmap &&
        new HeatmapLayer({
            id: 'heatmapAddedData',
            data: secondAddedLayerData,
            getPosition: d => d.position,
            getRadius: d => 5,
            getColor: HEATMAP_COLORS,
            opacity: 0.1,
            pickable: true,
            radiusMinPixels: 0.25,
            radiusMaxPixels: 30,
            onHover,
            ...settings
        })
    ];
}



