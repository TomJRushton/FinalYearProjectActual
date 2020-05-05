// // import {load} from '@loaders.gl/core';
// // import {CSVLoader} from '@loaders.gl/csv';
// //
// // const data = await load('data.csv', CSVLoader);
// //
// // for (const row of data) {
// //     console.log(JSON.stringify(row)); // => '{header1: value1, header2: value2}'
// // }
//
// import UploadButton from './uploadButton';
// import React, {Component, createRef} from 'react';
// import PropTypes from 'prop-types';
// //import {WarningMsg} from "./uploadFile";
// import styled from 'styled-components';
// import { injectIntl} from 'react-intl';
// import {uploadButton} from "../controls/style";
// import CSVReader from "react-csv-reader";
// import ReactDOM from "react-dom";
// const defaultValidFileExt = ['csv', 'json', 'geojson'];
// const handleForce = (data, fileInfo) => console.log(data, fileInfo);
// const papaparseOptions = {
//     header: true,
//     dynamicTyping: true,
//     skipEmptyLines: true,
//     transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
// };
// // function FactoryUploadData(){
// //     console.log('Test2');
//
//     export class UploadData extends Component {
//
//         static propTypes = {
//             onFileUpload: PropTypes.func.isRequired,
//             validFileExt: PropTypes.arrayOf(PropTypes.string),
//             fileLoading: PropTypes.bool
//         };
//
//         static defaultProps = {
//             validFileExt: defaultValidFileExt
//         };
//
//         state = {
//             //dragOver: false,
//             fileLoading: false,
//             files: [],
//             errorFiles: [],
//             data: [],
//         };
//
//         static getDerivedStateFromProps(props, state) {
//             //console.log('testDerived');
//             if (state.fileLoading && props.fileLoading === false && state.files.length) {
//                 return {
//                     files: [],
//                     fileLoading: props.fileLoading
//                 };
//             }
//             return {
//                 fileLoading: props.fileLoading
//             };
//         }
//
//         frame = createRef();
//
//         _isValidFileType = filename => {
//             const {validFileExt} = this.props;
//             const fileExt = validFileExt.find(ext => filename.endsWith(ext));
//
//             //console.log(Boolean(fileExt));
//             return Boolean(fileExt);
//         };
//
//         _handleFileInput = (files, e) => {
//             if (e) {
//                 e.stopPropagation();
//             }
//             console.log(files);
//             const nextState = {files: [], errorFiles: [], dragOver: false};
//             for (let i = 0; i < files.length; i++) {
//                 const file = files[i];
//
//                 if (file && this._isValidFileType(file.name)) {
//                     nextState.files.push(file);
//                 } else {
//                     nextState.errorFiles.push(file.name);
//                 }
//                 //console.log(nextState);
//             }
//
//             this.setState(nextState, () =>
//                 nextState.files.length ? this.props.onFileUpload(nextState.files) : null
//             );
//             //console.log(nextState);
//             //console.log(nextState.files);
//
//         };
//
//        // _parseData = () => {
//
//             // const reader = (
//             //     <div className="container">
//             //         <CSVReader
//             //             cssClass="react-csv-input"
//             //             label="test"
//             //             onFileLoaded={handleForce}
//             //             parserOptions={papaparseOptions}
//             //         />
//             //     </div>
//             // );
//         //};
//
//         render() {
//             //const {dragOver, files} = this.state;
//             //const {validFileExt, intl} = this.props;
//             return (
//                 <div className="file-uploader" ref={this.frame}>
//                     <UploadButton onUpload={this._handleFileInput}>
//                         <CSVReader
//                             cssClass="react-csv-input"
//                             label="test"
//                             onFileLoaded={handleForce}
//                             parserOptions={papaparseOptions}
//                         />
//                         <div id={'fileUploader.browseFiles'} />
//                     </UploadButton>
//                 </div>
//             );
//
//         }
//     }
//
// //     return injectIntl(UploadData)
// // }
// //
// // export default FactoryUploadData;
// // export const UploadData = FactoryUploadData();