import React, { Component } from 'react';
import { mapStylePicker, layerControl, dataPicker, dataControl } from './style';
//import layersAvaliable from '../App';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import phoneData from '../data/js/phoneData'
import phoneDataTest from '../data/js/phoneDataTest'
import {layers} from '../App'

export const HEXAGON_CONTROLS = {
    showHexagon: {
        displayName: 'Show Hexagon (Not compatible w/ data filters)',
        type: 'boolean',
        value: false
    },
    radius: {
        displayName: 'Hexagon Radius',
        type: 'range',
        value: 100,
        step: 50,
        min: 50,
        max: 1000
    },
    coverage: {
        displayName: 'Hexagon Coverage',
        type: 'range',
        value: 1,
        step: 0.1,
        min: 0,
        max: 1
    },
    upperPercentile: {
        displayName: 'Hexagon Upper Percentile',
        type: 'range',
        value: 100,
        step: 0.1,
        min: 80,
        max: 100
    },
    showScatterplot: {
        displayName: 'Show Scatterplot',
        type: 'boolean',
        value: true
    },
    radiusScale: {
        displayName: 'Scatterplot Radius',
        type: 'range',
        value: 5,
        step: 5,
        min: 1,
        max: 200
    },
    showHeatmap: {
        displayName: 'Show Heatmap',
        type: 'boolean',
        value: false
    },
    intensity: {
        displayName: 'Heat Intensity',
        type: 'range',
        value: 1,
        step: 0.05,
        min: 0,
        max: 1
    },
    opacity: {
        displayName: 'Opacity',
        type: 'range',
        value: 0.5,
        step: 0.01,
        min: 0,
        max: 1
    },
    show1stAddedLayerScatterplot:{
        displayName: 'Show 1st Added Layer : Scatterplot',
        type: 'boolean',
        value: true
    },
    show1stAddedLayerHeatmap:{
        displayName: 'Show 1st Added Layer : Heatmap',
        type: 'boolean',
        value: false
    },
    show2ndAddedLayerScatterplot:{
        displayName: 'Show 2nd Added Layer : Scatterplot',
        type: 'boolean',
        value: true
    },
    show2ndAddedLayerHeatmap:{
        displayName: 'Show 2nd Added Layer : Heatmap',
        type: 'boolean',
        value: false
    }
};
export const DATA_CONTROLS = {
    showMales:{
        displayName: 'Male',
        type: 'boolean',
        value: true
    },
    showFemale:{
        displayName: 'Female',
        type: 'boolean',
        value: true
    },
    lowerAgeLimit:{
        displayName: 'Lower Age Limit',
        type: 'range',
        value: 1,
        step: 1,
        min: 0,
        max: 100
    },
    upperAgeLimit:{
        displayName: 'Upper Age Limit',
        type: 'range',
        value: 99,
        step: 1,
        min: 0,
        max: 100
    },
    lowerSpendCategory:{
        displayName: 'Lower Spend Category Limit',
        type: 'range',
        // value1: 1,
        // value2: 50,
        value: 1,
        step: 1,
        min: 1,
        max: 5
    },
    upperSpendCategory:{
        displayName: 'Upper Spend Category Limit',
        type: 'range',
        // value1: 1,
        // value2: 50,
        value: 5,
        step: 1,
        min: 1,
        max: 5
    },
    lowerResidentCategory: {
        displayName: 'Lower Resident Category',
        type: 'range',
        value: 1,
        step: 1,
        min: 1,
        max: 3
    },
    upperResidentCategory: {
        displayName: 'Upper Resident Category',
        type: 'range',
        value: 3,
        step: 1,
        min: 1,
        max: 3
    },

    // appleAndorid: {
    //     displayName: 'Android Or Apple',
    //     type: 'range',
    //     value: 1,
    //     step: 1,
    //     min: 1,
    //     max: 3
    // },
    // networkFlag: {
    //     displayName: 'Network Flag',
    //     type: 'range',
    //     value: 1,
    //     step: 1,
    //     min: 1,
    //     max: 3
    // },
    // networkProvider: {
    //     displayName: 'Network Provider',
    //     type: 'range',
    //     value: 1,
    //     step: 1,
    //     min: 1,
    //     max: 5
    // },
    // prePaidPostPaid: {
    //     displayName: 'Pre-paid / Post-paid',
    //     type: 'range',
    //     value: 1,
    //     step: 1,
    //     min: 1,
    //     max: 2
    // },
    // activePassive: {
    //     displayName: 'Active / Passive',
    //     type: 'range',
    //     value: 1,
    //     step: 1,
    //     min: 1,
    //     max: 2
    // },
    // voiceData: {
    //     displayName: 'Voice Data',
    //     type: 'range',
    //     value: 1,
    //     step: 1,
    //     min: 1,
    //     max: 2
    // }

};
export const layersAvaliable = ['phoneData'];

export const avaliableDatalist = [
    {label: 'Phone Data', value: 'phoneData', id: phoneData},
     ];

export function recalculateLayers(){
    for(let i = 0; i < layersAvaliable.length; i++){
        avaliableDatalist[i] = {
            label: layersAvaliable[i],
            value: layersAvaliable[i],
            id: layers[i]}
    }
}

const IMPORTED_DATA = avaliableDatalist;
export function DataPicker({ currentData, onDataChange}){
    return (
        <select
            className="data-selector"
            style={dataPicker}
            value={currentData}
            onChange={e => onDataChange (e.target.value)}
        >
            {IMPORTED_DATA.map(data => (
                <option key={data.value} value={data.value}>
                    {data.label}
                </option>
            ))}
        </select>
    );
}

const MAPBOX_DEFAULT_MAPSTYLES = [
    { label: 'Streets V10', value: 'mapbox://styles/mapbox/streets-v10' },
    { label: 'Outdoors V10', value: 'mapbox://styles/mapbox/outdoors-v10' },
    { label: 'Light V9', value: 'mapbox://styles/mapbox/light-v9' },
    { label: 'Dark V9', value: 'mapbox://styles/mapbox/dark-v9' },
    { label: 'Satellite V9', value: 'mapbox://styles/mapbox/satellite-v9' },
    {
        label: 'Satellite Streets V10',
        value: 'mapbox://styles/mapbox/satellite-streets-v10'
    },
    {
        label: 'Navigation Preview Day V4',
        value: 'mapbox://styles/mapbox/navigation-preview-day-v4'
    },
    {
        label: 'Navitation Preview Night V4',
        value: 'mapbox://styles/mapbox/navigation-preview-night-v4'
    },
    {
        label: 'Navigation Guidance Day V4',
        value: 'mapbox://styles/mapbox/navigation-guidance-day-v4'
    },
    {
        label: 'Navigation Guidance Night V4',
        value: 'mapbox://styles/mapbox/navigation-guidance-night-v4'
    }
];
export function MapStylePicker({ currentStyle, onStyleChange }) {
    return (
        <select
            className="map-style-picker"
            style={mapStylePicker}
            value={currentStyle}
            onChange={e => onStyleChange(e.target.value)}
        >
            {MAPBOX_DEFAULT_MAPSTYLES.map(style => (
                <option key={style.value} value={style.value}>
                    {style.label}
                </option>
            ))}
        </select>
    );
}


export class DataControls extends Component{
    _onValueChange(settingName, newValue) {
        const { dataSettings } = this.props;
        // Only update if we have a confirmed change
        if (dataSettings[settingName] !== newValue) {
            // Create a new object so that shallow-equal detects a change
            const newSettings = {
                ...this.props.dataSettings,
                [settingName]: newValue
            };

            this.props.onChange(newSettings);
        }
    }

    render() {
        const { title, dataSettings, propTypes = {} } = this.props;

        return (
            <div className="data-controls" style={dataControl}>
                {title && <h4>{title}</h4>}
                {Object.keys(dataSettings).map(key => (
                    <div key={key}>
                        <label>{propTypes[key].displayName}</label>
                        <div style={{ display: 'inline-block', float: 'right' }}>
                            {dataSettings[key]}
                        </div>
                        <Setting
                            settingName={key}
                            value={dataSettings[key]}
                            propType={propTypes[key]}
                            onChange={this._onValueChange.bind(this)}
                        />
                    </div>
                ))}
            </div>

        );
    }
}

export class LayerControls extends Component {
    _onValueChange(settingName, newValue) {
        const { settings } = this.props;
        // Only update if we have a confirmed change
        if (settings[settingName] !== newValue) {
            // Create a new object so that shallow-equal detects a change
            const newSettings = {
                ...this.props.settings,
                [settingName]: newValue
            };

            this.props.onChange(newSettings);
        }
    }

    render() {
        const { title, settings, propTypes = {} } = this.props;

        return (
            <div className="layer-controls" style={layerControl}>
                {title && <h4>{title}</h4>}
                {Object.keys(settings).map(key => (
                    <div key={key}>
                        <label>{propTypes[key].displayName}</label>
                        <div style={{ display: 'inline-block', float: 'right' }}>
                            {settings[key]}
                        </div>
                        <Setting
                            settingName={key}
                            value={settings[key]}
                            propType={propTypes[key]}
                            onChange={this._onValueChange.bind(this)}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

const Setting = props => {
    const { propType } = props;
   // console.log(propType);
    if (propType && propType.type) {
        switch (propType.type) {
            case 'range':
                return <Sliders  {...props}/>;
            // case 'doubleRange':
            //     console.log({...props});
            //     return <DoubleSlider {...props}/>
            case 'boolean':
                return <Checkbox {...props} />;
            default:
                return <input {...props} />;
        }
    }
};

const Checkbox = ({ settingName, value, onChange }) => {
    return (
        <div key={settingName}>
            <div className="input-group">
                <input
                    type="checkbox"
                    id={settingName}
                    checked={value}
                    onChange={e => onChange(settingName, e.target.checked)}
                />
            </div>
        </div>
    );
};

const Sliders = ({ settingName, value, propType, onChange }) => {
    const { max = 100 } = propType;
    const { min = 0 } = propType;
    const { step = 1 } = propType;
    return (
        <div key={settingName}>
            <div className="input-group">
                <div>
                    <input
                        type="range"
                        id={settingName}
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={e => onChange(settingName, Number(e.target.value))}
                    />
                </div>
            </div>
        </div>

    );
};

// export class CustomizedRange extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             lowerBound: 20,
//             upperBound: 40,
//             value: [20, 40],
//         };
//     }
//     onSliderChange = (value) => {
//         console.log(value);
//         this.setState({
//             value,
//         });
//     }
//     render() {
//         return (
//             <div className="data-controls" style={dataControl}>
//                 <Range allowCross={false} value={this.state.value} onChange={this.onSliderChange} />
//             </div>
//         );
//     }
// }
//
// const Range = Slider.Range;
//
// const DoubleSlider = ({ settingName, value1, value2, propType, onChange }) => {
//     const { max = 100 } = propType;
//     const { min = 0 } = propType;
//     //const { step = 1 } = propType;
//     console.log(settingName);
//     console.log(value1,value2);
//     console.log(propType);
//     console.log(onChange);
//     return (
//         <div key={settingName}>
//             <div>
//                 <Range allowCross={false} value={[value1, value2]} onChange={e => onChange(settingName, [Number(e.target.value1), Number(e.target.value2)])} />
//             </div>
//         </div>
//     );
// };
