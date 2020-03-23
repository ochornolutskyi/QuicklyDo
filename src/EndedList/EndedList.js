import React from "react";
import './EndedList.css'

const EndedList = props => {
    return (
        <li className="ended-list list__item">
            <span className="item-title">{props.itemTitle}</span>
            <button
                className="item-button item-button__remove"
                onClick={props.onRemoveTask}
            >
                <i className="fas fa-times"></i>{" "}
            </button>
        </li>
    );
};

export default EndedList;
