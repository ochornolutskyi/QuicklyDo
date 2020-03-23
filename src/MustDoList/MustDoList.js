import React from "react";
import "./MustDoList.css";

const MustDoList = props => {
    return (
        <li className="list__item">
            <span className="item-title">{props.itemTitle}</span>
            <button
                className="item-button item-button__ended"
                onClick={props.onEndTask}
            >
                <i className="fas fa-check"></i>
            </button>
            <button
                className="item-button item-button__edit"
                onClick={props.onEditTask}
            >
                <i className="fas fa-pen"></i>
            </button>
            {/* <input type='text' onChange={props.onChangeItemTitle} value={props.itemTitle}></input> */}
            <button
                className="item-button item-button__remove"
                onClick={props.onRemoveTask}
            >
                <i className="fas fa-times"></i>{" "}
            </button>
        </li>
    );
};
export default MustDoList;
