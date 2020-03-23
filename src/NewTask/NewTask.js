import React from "react";
import "./NewTask.css";

const NewTask = props => {
    return (
        <header className="wrapper header">
            <h1 className="title">New Task</h1>
            <form className="header-form" onSubmit={props.onAddTask}>
                <input
                    className="header-form__input"
                    id="newTask"
                    type="text"
                    placeholder="Enter new task"
                    autoComplete="off"
                    onChange={props.onChangeNewTaskTitle}
                ></input>
                <button className="header-form__addButton" type="submit">
                    Add
                </button>
            </form>
        </header>
    );
};
export default NewTask;
