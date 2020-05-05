import {ScatterplotLayer} from '@deck.gl/layers';
import {HexagonLayer, HeatmapLayer } from '@deck.gl/aggregation-layers';
//import {HexagonLayer, HeatmapLayer, ScatterplotLayer } from 'deck.gl';
import { DataFilterExtension } from '@deck.gl/extensions';
//new DataFilterExtension({filterSize: 1, fp64: true});

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
    const { data, hour, onHover, settings, dataSettings } = props;
    //const filteredData = hour === null ? data : data.filter(d => d.hour === hour);
    //console.log(data);
    let sexLowerLimit = 1, sexUpperLimit = 2;

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
            //data: filteredData,
            data,
            getPosition: d => d.position,
            getColor: d => (d.pickup ? PICKUP_COLOR : DROPOFF_COLOR),
            getFilterValue: d => [d.age, d.spendCategory, d.sex],
            filterRange: [
                [dataSettings.lowerAgeLimit, dataSettings.upperAgeLimit],
                [dataSettings.lowerSpendCategory, dataSettings.upperSpendCategory],
                [sexLowerLimit, sexUpperLimit]
            ],
            extensions: [new DataFilterExtension({filterSize: 3})],
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
            //data: filteredData,
            data,
            onHover,
            ...settings
        }),
        settings.showHeatmap &&
        new HeatmapLayer({
            id: 'heatmapActual',
            colorRange: HEATMAP_COLORS,
            getPosition: d => d.position,
            getFilterValue: d => [d.age, d.spendCategory, d.sex],
            filterRange: [
                [dataSettings.lowerAgeLimit, dataSettings.upperAgeLimit],
                [dataSettings.lowerSpendCategory, dataSettings.upperSpendCategory],
                [sexLowerLimit, sexUpperLimit]
            ],
            extensions: [new DataFilterExtension({filterSize: 3})],
            lightSettings: LIGHT_SETTINGS,
            opacity: 0.8,
            pickable: true,
            //data: filteredData,
            data,
            onHover,
            ...settings
        })
    ];
}
