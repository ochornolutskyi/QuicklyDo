import React, { Component } from "react";
import "./App.css";
import NewTask from "./NewTask/NewTask";
import MustDoList from "./MustDoList/MustDoList";
import EndedList from "./EndedList/EndedList";

class App extends Component {
    state = {
        tasks: []
    };

    onChangeNewTaskTitle(inputChanges) {
        let classError = "input-error";
        if (inputChanges.classList.contains(classError)) {
            inputChanges.classList.remove(classError);
        }
    }

    addNewTask(event) {
        event.preventDefault();
        const input = document.getElementById("newTask");
        let newTask = input.value;
        if (newTask === "" || /^[\s]+$/.test(newTask)) {
            input.classList.add("input-error");
            input.value = "";
            input.focus();
        } else {
            let tasks = [...this.state.tasks];
            tasks.push({
                taskTitle: newTask,
                wasEnded: false,
                id: String(Date.now())
            });
            event.target.reset();
            this.setState({
                tasks: tasks
            });
        }
    }

    onEndTask(id) {
        let tasks = [...this.state.tasks];
        let currentEndedTask = tasks.filter(item => item.id === id)[0];
        currentEndedTask.wasEnded = true;
        this.setState({
            tasks: tasks
        });
    }

    onEditTask(id) {
        let tasks = [...this.state.tasks];
        let editTask = tasks.filter(item => item.id === id)[0];
        let newTitle = prompt(
            "Please, enter a new title for the current task: ",
            editTask.taskTitle
        );
        editTask.taskTitle = newTitle;
        this.setState({
            tasks: tasks
        });
    }

    deleteTaskHandler(id) {
        let tasks = [...this.state.tasks];
        const deletingTask = tasks.filter(item => item.id === id)[0];
        const from = tasks.indexOf(deletingTask);
        tasks.splice(from, 1);
        this.setState({
            tasks: tasks
        });
    }

    render() {
        let tasks = this.state.tasks;
        //rendering must to do tasks
        let mustDoList = tasks
            .filter(item => item.wasEnded === false)
            .map(item => {
                return (
                    <MustDoList
                        key={item.id}
                        itemTitle={item.taskTitle}
                        onEndTask={this.onEndTask.bind(this, item.id)}
                        onEditTask={this.onEditTask.bind(this, item.id)}
                        onRemoveTask={this.deleteTaskHandler.bind(
                            this,
                            item.id
                        )}
                    ></MustDoList>
                );
            });
        if (mustDoList.length < 1)
            mustDoList = (
                <span className="emptyList">Please, add a new task</span>
            );
        //rendering ended tasks
        let endedList = tasks
            .filter(item => item.wasEnded === true)
            .map((item, id) => {
                return (
                    <EndedList
                        key={id}
                        itemTitle={item.taskTitle}
                        onRemoveTask={this.deleteTaskHandler.bind(
                            this,
                            item.id
                        )}
                    ></EndedList>
                );
            });
        if (endedList.length < 1)
            endedList = (
                <span className="emptyList">You have not done tasks</span>
            );
        return (
            <div className="wrap">
                <NewTask
                    onAddTask={this.addNewTask.bind(this)}
                    onChangeNewTaskTitle={event => {
                        this.onChangeNewTaskTitle(event.target);
                    }}
                ></NewTask>
                <div className="wrapper mustDoList">
                    <h2 className="title">Must to do:</h2>
                    <ul className="mustDoList-list">{mustDoList}</ul>
                </div>
                <div className="wrapper endedList">
                    <h2 className="title">Was done:</h2>
                    <ul className="wasEnded-list">{endedList}</ul>
                </div>
            </div>
        );
    }
}

export default App;
