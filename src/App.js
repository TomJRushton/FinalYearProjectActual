/* global window */
import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from 'deck.gl';

import {LayerControls,
        MapStylePicker,
        HEXAGON_CONTROLS,
        DATA_CONTROLS,
        FirstDataPicker,
        SecondDataPicker,
        DataControls,
        avaliableDatalist,
        recalculateFirstLayers,
        recalculateSecondLayers,
        firstLayersAvaliable,
        secondLayersAvaliable,
        avaliableFirstDatalist,
        avaliableSecondDatalist} from './controls/controls';
import {dataControl, tooltipStyle, uploadButton1, uploadButton2} from './controls/style';
import {dataParsing, abstractDataParser, initialDataParsing} from './controls/dataParser';
import { renderLayers } from './deckgl-layers';
import Charts from './controls/charts';

//Import Data
import phoneData from './data/js/phoneData'
import CSVReader from "react-csv-reader";
import newPhoneData from './data/js/phoneDataNew';

//Layer Selector
export const firstLayers = [phoneData], secondLayers = [];

//Set initial view state
const INITIAL_VIEW_STATE = {
  longitude: -1.470085,
  latitude: 53.381130,
  zoom: 11,
  minZoom: 2,  maxZoom: 20,
  pitch: 20,
  bearing: 330
};

//App class with initial state defined
export default class App extends Component {
  state = {
    data: '',
    addedLayerData: [],
    hover: {
      x: 0,
      y: 0,
      hoveredObject: null
    },
    points: [],
    firstImportedPoints: [],
    secondImportedPoints: [],
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
    //this._processData(phoneData);
      this._processData(newPhoneData);
  }

//make a process data that proccess the data depending on whats entered (dont need to?)
  _processData = (importedData) => {
      const data = initialDataParsing(importedData);
      this.setState(data);
  };

  //Display tooltip when mouse hovers over a data point
  _onHover({ x, y, object }) {
      //console.log(object);
      const label = object
        ? object.points
            ? `${object.points.length} Profiles in this location`
            : `Profiles age : ${object.position} \n Profiles spend cat : ${object.spendCategory}`
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
    //console.log(label);
    this.setState({ hover: { x, y, hoveredObject: object, label } });
  }

  //State change on mouse over a chart value
  _onHighlight(highlightedHour) {
    this.setState({ highlightedHour });
  }

  //State change on click of chart column
  _onSelect(selectedHour) {
    this.setState({
      selectedHour:
          selectedHour === this.state.selectedHour ?
              null :
              selectedHour
    });
  }

  //State change on different map style chosen
  onStyleChange = style => {
    this.setState({ style });
  };

  //Update layer one selector with added layer
  onFirstDataChange = data => {
        console.log(data);
        this.setState({data});
        for(let i = 0; i < avaliableFirstDatalist.length; i++){
            if(avaliableFirstDatalist[i].value === data){
                this.setState(dataParsing((avaliableFirstDatalist[i].id), null));
                break;
            }
        }
    };

    //Update layer two selector with added layer
    onSecondDataChange = data => {
      console.log(data);
      this.setState({data});
      for(let i = 0; i < avaliableSecondDatalist.length; i++){
          if(avaliableSecondDatalist[i].value === data){
              this.setState(dataParsing((avaliableSecondDatalist[i].id), null));
              break;
          }
      }
  };

  //Performed on webGL inisialisation
  _onWebGLInitialize = gl => {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  };

  //Update state for any layer controls changed
  _updateLayerSettings(settings) {
    this.setState({ settings });
  }

  //Update state for and data controls changed
  _updateDataLayerSettings(dataSettings) {
      this.setState({ dataSettings });
  }

  //Parse and add new imported layer one
  _addFirstNewData(csvData, fileInfo){
      const parsedData = dataParsing(csvData);
      //this.setState(dataParsing(csvData, fileInfo));
      this.setState({firstImportedPoints: parsedData.firstImportedPoints});
      firstLayers.push(csvData);
      firstLayersAvaliable.push(fileInfo.name);
      console.log(firstLayersAvaliable);
      recalculateFirstLayers();
      this.render();
  }

    //Parse and add new imported layer two
    _addSecondNewData(csvData, fileInfo){
      const parsedData = abstractDataParser(csvData);
      //this.setState(dataParsing(csvData, fileInfo));
      this.setState({secondImportedPoints: parsedData.secondImportedPoints});
      secondLayers.push(csvData);
      secondLayersAvaliable.push(fileInfo.name);
      console.log(secondLayersAvaliable);
      recalculateSecondLayers();
    }

  //Render all components
  render() {
    const papaparseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };
    const processData = (csvData, fileInfo) => this._addFirstNewData(csvData, fileInfo);
    const processData2 = (csvData, fileInfo) => this._addSecondNewData(csvData, fileInfo);
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

          <FirstDataPicker
              onDataChange={this.onFirstDataChange}
              // currentData={this.state.points}
          />

          <SecondDataPicker
              onDataChange={this.onSecondDataChange}
              // currentData={this.state.data}
          />

          <div className="firstDataImport" style={uploadButton1}>
            <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={processData}
                parserOptions={papaparseOptions}
                currentData={this.state.data}
                //onChange={this._onChange()}>
            />
          </div>

          <div className="secondDataImport" style={uploadButton2}>
            <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={processData2}
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
              layers={renderLayers({
                data: this.state.points,
                hour: this.state.highlightedHour || this.state.selectedHour,
                onHover: hover => this._onHover(hover),
                settings: this.state.settings,
                dataSettings: this.state.dataSettings,
                firstAddedLayerData: this.state.firstImportedPoints,
                secondAddedLayerData: this.state.secondImportedPoints
              })}
              initialViewState={INITIAL_VIEW_STATE}
              viewState={viewState}
              controller={controller}
          >
              <StaticMap mapStyle={this.state.style}  mapboxApiAccessToken={"pk.eyJ1IjoiYWJsZWthbmUxMjMiLCJhIjoiY2s2bTczbHNvMGwxNjNscnIxMXg4ODU4aCJ9.luI_mSXhJ3LKcCcFanpXJg"}/>
          </DeckGL>

          <Charts {...this.state}
                  highlight={hour => this._onHighlight(hour)}
                  select={hour => this._onSelect(hour)}
          />
        </div>
    );
  }
}
