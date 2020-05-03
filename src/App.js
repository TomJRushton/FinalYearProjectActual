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
import {dataPicker, tooltipStyle} from './controls/style';
import DeckGL from 'deck.gl';
import { renderLayers } from './deckgl-layers';
import Charts from './controls/charts';



//Import Data
//import taxiData from './data/js/taxi';
// import profileData from './data/profileData';
import phoneData from './data/js/phoneData'
import phoneDataTest from './data/js/phoneDataTest'
//import phoneDataJson from './data/phoneDataJson'



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
        //importedData = phoneData;
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
        const data = importedData.reduce(
            (accu, curr) => {
                const pickupHour = new Date(curr.p).getUTCHours(),
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
                        pickup: true
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


  _onHover({ x, y, object }) {
    const label = object
        ? object.points
            ? `${object.points.length} Profiles in this location`
            : object.pickup
                ? 'Pickup'
                : 'Dropoff'
        : null;

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

  render() {
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
