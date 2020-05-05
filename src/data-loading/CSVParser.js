import React, {Component} from "react";
import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";
import {uploadButton} from "../controls/style";
import PropTypes from 'prop-types';
//import "./styles.css";

export const handleForce = (data, fileInfo) => console.log(data);
//const errorMsg = console.log('ERROR');

const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

export class DataParser extends Component {

    // static propTypes = {
    //     onUpload: PropTypes.func.isRequired
    // };
    _onChange = () => {
        //this.props.onUpload(handleForce);
        //console.log(files);
    };

    render() {
        return(
            <div className="container" style={uploadButton}>
                <CSVReader
                    cssClass="react-csv-input"
                    onFileLoaded={handleForce}
                    //onError={errorMsg}
                    parserOptions={papaparseOptions}
                    //onChange={this._onChange()}
                />
            </div>
        )
    }
}