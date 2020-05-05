/* global window */
import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import {
    LayerControls,
    MapStylePicker,
    HEXAGON_CONTROLS,
    DATA_CONTROLS,
    DataPicker,
    DataControls
} from './controls/controls';
import {dataPicker, tooltipStyle, uploadButton} from './controls/style';
import DeckGL from 'deck.gl';
import { renderLayers } from './deckgl-layers';
//import FactoryUploadData, {UploadData} from './data-loading/dataImporter';
import {UploadData} from './data-loading/dataImporter';
import {DataParser} from "./data-loading/CSVParser";
import {dataParsing} from './data/dataParser';
import Charts from './controls/charts';
import {layersAvaliable} from './controls/controls';
import {recalculateLayers} from './controls/controls'


//Import Data
//import taxiData from './data/js/taxi';
// import profileData from './data/profileData';
import phoneData from './data/js/phoneData'
import phoneDataTest from './data/js/phoneDataTest'
import UploadButton from "./data-loading/uploadButton";
import CSVReader from "react-csv-reader";
//import phoneDataJson from './data/phoneDataJson'
console.log(phoneDataTest);
// export const layersAvaliable = ['phoneData', 'phoneDataTest'];

const INITIAL_VIEW_STATE = {
  longitude: -1.470085,
  latitude: 53.381130,
  zoom: 11,
  minZoom: 2,  maxZoom: 20,
  pitch: 20,
  bearing: 330
};

export default class App extends Component {
  state = {
    data: '',
    hover: {
      x: 0,
      y: 0,
      hoveredObject: null
    },
    //age: null,
    points: [],
    settings: Object.keys(HEXAGON_CONTROLS).reduce(
        (accu, key) => ({
          ...accu,
          [key]: HEXAGON_CONTROLS[key].value
        }),
        {}
    ),
    dataSettings: Object.keys(DATA_CONTROLS).reduce(
        (accu, key) => ({
            ...accu,
            [key]: DATA_CONTROLS[key].value
        }),
        {}
    ),
    selectedHour: null,
    style: 'mapbox://styles/mapbox/dark-v9'
  };

  componentDidMount() {
    this._processData(phoneData);
  }

//make a process data that proccess the data depending on whats entered (dont need to?)
    _processData = (importedData) => {
        // const data = taxiData.reduce(
        //     (accu, curr) => {
        //       const pickupHour = new Date(curr.p).getUTCHours();
        //       const dropoffHour = new Date(curr.dropoff_datetime).getUTCHours();
        //
        //       const pickupLongitude = Number(curr.pickup_longitude);
        //       const pickupLatitude = Number(curr.pickup_latitude);
        //
        //       if (!isNaN(pickupLongitude) && !isNaN(pickupLatitude)) {
        //         accu.points.push({
        //           position: [pickupLongitude, pickupLatitude],
        //           hour: pickupHour,
        //           pickup: true
        //         });
        //       }
        //
        //       const dropoffLongitude = Number(curr.dropoff_longitude);
        //       const dropoffLatitude = Number(curr.dropoff_latitude);
        //
        //       if (!isNaN(dropoffLongitude) && !isNaN(dropoffLatitude)) {
        //         accu.points.push({
        //           position: [dropoffLongitude, dropoffLatitude],
        //           hour: dropoffHour,
        //           pickup: false
        //         });
        //       }
        //
        //       const prevPickups = accu.pickupObj[pickupHour] || 0;
        //       const prevDropoffs = accu.dropoffObj[dropoffHour] || 0;
        //
        //       accu.pickupObj[pickupHour] = prevPickups + 1;
        //       accu.dropoffObj[dropoffHour] = prevDropoffs + 1;
        //
        //       return accu;
        //     },
        //     {
        //       points: [],
        //       pickupObj: {},
        //       dropoffObj: {}
        //     }
        // );
        //console.log(this.state.data);
        console.log(importedData);
        const data = importedData.reduce(
            (accu, curr) => {

                const pickupHour = new Date(curr.p).getUTCHours(),
                    sex = Number(curr.Sex),
                    age = Number(curr.Age),
                    pickupLongitude = Number(curr.Longitude),
                    pickupLatitude = Number(curr.Latitude),
                    spendingCategory = Number(curr.SpendCat),
                    residentCategory = Number(curr.ResidentCat),
                    networkFlag = Number(curr.NetworkFlag),
                    appleOrAndroid = Number(curr.AppleAndorid),
                    networkProvider = Number(curr.NetworkProvider),
                    prePaidOrPostPaid = Number(curr.PrePaidPostPaid),
                    activeOrPassive = Number(curr.ActivePassive),
                    voiceData = Number(curr.VoiceData);


                if (!isNaN(pickupLongitude) && !isNaN(pickupLatitude)) {
                    accu.points.push({
                        position: [pickupLongitude, pickupLatitude],
                        sex: sex,
                        age: age,
                        spendCategory: spendingCategory,
                        residentCategory: residentCategory,
                        networkFlag: networkFlag,
                        appleOrAndroid: appleOrAndroid,
                        networkProvider: networkProvider,
                        prePaidOrPostPaid: prePaidOrPostPaid,
                        activeOrPassive: activeOrPassive,
                        voiceData: voiceData,
                        //hour: pickupHour,
                        //pickup: true
                    });
                }
                //const prevPickups = accu.pickupObj[pickupHour] || 0;

                //accu.pickupObj[pickupHour] = prevPickups + 1;

                return accu;
            },
            {
                points: [],
                //pickupObj: {},
            }
        );
        // data.pickups = Object.entries(data.pickupObj).map(([hour, count]) => {
        //     return { hour: Number(hour), x: Number(hour) + 0.5, y: count };
        // });
        console.log(data);

        this.setState(data);

    };
    // _proccesNewData = (importedData) => {
    //     const data = importedData.reduce(
    //         (accu, curr) => {
    //             //console.log(importedData);
    //             const pickupHour = new Date(curr.p).getUTCHours(),
    //                 sex = Number(curr.sex),
    //                 age = Number(curr.age),
    //                 pickupLongitude = Number(curr.longitude),
    //                 pickupLatitude = Number(curr.latitude),
    //                 spendingCategory = Number(curr.spendcat),
    //                 residentCategory = Number(curr.residentCat),
    //                 networkFlag = Number(curr.networkFlag),
    //                 appleOrAndroid = Number(curr.appleAndorid),
    //                 networkProvider = Number(curr.networkProvider),
    //                 prePaidOrPostPaid = Number(curr.prePaidPostPaid),
    //                 activeOrPassive = Number(curr.activePassive),
    //                 voiceData = Number(curr.voiceData);
    //
    //
    //             if (!isNaN(pickupLongitude) && !isNaN(pickupLatitude)) {
    //                 accu.points.push({
    //                     position: [pickupLongitude, pickupLatitude],
    //                     sex: sex,
    //                     age: age,
    //                     spendCategory: spendingCategory,
    //                     residentCategory: residentCategory,
    //                     networkFlag: networkFlag,
    //                     appleOrAndroid: appleOrAndroid,
    //                     networkProvider: networkProvider,
    //                     prePaidOrPostPaid: prePaidOrPostPaid,
    //                     activeOrPassive: activeOrPassive,
    //                     voiceData: voiceData,
    //                     //hour: pickupHour,
    //                     //pickup: true
    //                 });
    //             }
    //             //const prevPickups = accu.pickupObj[pickupHour] || 0;
    //
    //             //accu.pickupObj[pickupHour] = prevPickups + 1;
    //
    //             return accu;
    //         },
    //         {
    //             points: [],
    //             //pickupObj: {},
    //         }
    //     );
    //
    //     console.log(data);
    //
    //     this.setState(data);
    // }

  _onHover({ x, y, object }) {
      console.log(object);
      const label = object
        ? object.points
            ? `${object.points.length} Profiles in this location`
            : `Profiles age : ${object.age} \n Profiles spend cat : ${object.spendCategory}`
          : null;
    // const age = `Profiles age : ${object.age}`,
    //     spendingCat = `Spending Category : ${object.spendCategory}`,
    //     residentCategory = `Resident Category : ${object.residentCategory}`,
    //     appleAndorid = `Android Or Apple' : ${object.appleOrAndroid}`,
    //     networkFlag = `Network Flag : ${object.networkFlag}`,
    //     networkProvider = `Network Provider : ${object.networkProvider}`,
    //     prePaidPostPaid = `Pre-paid / Post-paid : ${object.prePaidOrPostPaid}`,
    //     activePassive = `Active / Passive : ${object.activeOrPassive}`,
    //     voiceData = `Voice Data : ${object.voiceData}`;
    console.log(label);
    this.setState({ hover: { x, y, hoveredObject: object, label } });
  }

  _onHighlight(highlightedHour) {
    this.setState({ highlightedHour });
  }

  _onSelect(selectedHour) {
    this.setState({
      selectedHour:
          selectedHour === this.state.selectedHour ?
              null :
              selectedHour
    });
  }

  onStyleChange = style => {
    this.setState({ style });
  };

  onDataChange = data => {
      //console.log(data);
      if(data === 'phoneDataTest'){
          this._processData(phoneDataTest);
      }
      if(data === 'phoneData'){
          this._processData(phoneData);
      }
      this.setState({data});
  };

  _onWebGLInitialize = gl => {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  };

  _updateLayerSettings(settings) {
    this.setState({ settings });
  }
  _updateDataLayerSettings(dataSettings) {
      this.setState({ dataSettings });
  }

  _addNewData(csvData, fileInfo){
      console.log(csvData, fileInfo);
      this.setState(dataParsing(csvData, fileInfo));
      layersAvaliable.push(fileInfo.name);
      console.log(layersAvaliable);
      recalculateLayers();
      this.onDataChange();
  }

  render() {
    const papaparseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };
    const handleForce = (csvData, fileInfo) => this._addNewData(csvData, fileInfo);
    const { viewState, controller = true } = this.props;
    const data = this.state.points;
      if (!data.length) {
      return null;
    }

    const { hover, settings } = this.state;
    return (
        <div>
          {hover.hoveredObject && (
              <div
                  style={{
                    ...tooltipStyle,
                    transform: `translate(${hover.x}px, ${hover.y}px)`
                  }}
              >
                <div>{hover.label}</div>
                  <div>{hover.label2}</div>
              </div>
          )}
          <MapStylePicker
              onStyleChange={this.onStyleChange}
              currentStyle={this.state.style}
          />
          <DataPicker
              onDataChange={this.onDataChange}
              currentData={this.state.data}
          />
          {/*<FactoryUploadData>*/}
          {/*    /!*currentData={this.state.data}*!/*/}
          {/*    onFileUpload={this._addNewData}*/}
          {/*</FactoryUploadData>*/}
          {/*<UploadData onFileUpload={this._addNewData}/>*/}
          {/*<UploadButton*/}
          {/*    onUpload={this._addNewData}/>*/}
          {/*<UploadData onFileUpload={this._addNewData}/>*/}
          {/*<DataParser*/}
          {/*    {...console.log('testy')}*/}
          {/*    onFileLoaded={this._addNewData}/>*/}
          <div className="container" style={uploadButton}>
            <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={handleForce}
                parserOptions={papaparseOptions}
                currentData={this.state.data}
                //onChange={this._onChange()}>
            />
          </div>
          <LayerControls
              settings={this.state.settings}
              propTypes={HEXAGON_CONTROLS}
              onChange={settings => this._updateLayerSettings(settings)}
          />
          <DataControls
              dataSettings={this.state.dataSettings}
              propTypes={DATA_CONTROLS}
              onChange={dataSettings => this._updateDataLayerSettings(dataSettings)}/>
          <DeckGL
              {...this.state.settings}
              {...this.state.dataSettings}
              onWebGLInitialized={this._onWebGLInitialize}
              {...console.log(this.state.points)}
              layers={renderLayers({
                data: this.state.points,
                hour: this.state.highlightedHour || this.state.selectedHour,
                onHover: hover => this._onHover(hover),
                settings: this.state.settings,
                dataSettings: this.state.dataSettings
              })}
              initialViewState={INITIAL_VIEW_STATE}
              viewState={viewState}
              controller={controller}
          >
              <StaticMap mapStyle={this.state.style}  mapboxApiAccessToken={"pk.eyJ1IjoiYWJsZWthbmUxMjMiLCJhIjoiY2s2bTczbHNvMGwxNjNscnIxMXg4ODU4aCJ9.luI_mSXhJ3LKcCcFanpXJg"}/>
          </DeckGL>
          {/*<Charts {...this.state}*/}
          {/*        highlight={hour => this._onHighlight(hour)}*/}
          {/*        select={hour => this._onSelect(hour)}*/}
          {/*/>*/}
        </div>
    );
  }
}
