import React, { useState } from "react";
import Navbar from "../Navbar";
import "./inputNew.css"
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import DragAndDrop from '../DragAndDrop';
import Sidebar from './sidebar';
import TopBar from './topBar';
import InputArea from './inputArea';

function InputNew() {
    const [selected, setSelected] = useState(0)

    const [inputList, setInputList] = useState([
        { question: "", correctAnswer: "", wrongAnswer: "" },
    ]);
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([
            ...inputList,
            { question: "", correctAnswer: "", wrongAnswer: "" },
        ]);
    };





    return (
        <div>
            <TopBar />
            <Sidebar questions={inputList} selected={selected} setSelected={setSelected} addClick={handleAddClick} remove={handleRemoveClick}/>
            <InputArea selected={selected} inputChange={handleInputChange} inputList={inputList}/>
        </div>
    );
}

export default InputNew;
