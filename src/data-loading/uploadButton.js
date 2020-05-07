// import React, {Component, createRef} from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import {uploadButton} from "../controls/style";
// //import UploadData from "./dataImporter";
//
// export default class UploadButton extends Component {
//     static propTypes = {
//         onUpload: PropTypes.func.isRequired
//     };
//
//     _fileInput = createRef();
//
//     _onClick = () => {
//         this._fileInput.current.value = null;
//         this._fileInput.current.click();
//     };
//
//     _onChange = ({target: {files}}) => {
//         if (!files) {
//             return;
//         }
//
//         this.props.onUpload(files);
//         //console.log(files);
//     };
//     //UploadData;
//     render() {
//         return (
//             <div className="upload-button" style={uploadButton}>
//                 <input
//                     type="file"
//                     ref={this._fileInput}
//                     // style={{display: 'none'}}
//                     onChange={this._onChange}
//                     className="upload-button-input"
//                 />
//                 <span className="file-upload__upload-button-span" onClick={this._onClick}>
//           {this.props.children}
//         </span>
//             </div>
//         );
//     }
// }
//
