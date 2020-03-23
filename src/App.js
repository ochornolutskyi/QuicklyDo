import React, { Component } from "react";
import "./App.css";
import NewTask from "./NewTask/NewTask";
import MustDoList from "./MustDoList/MustDoList";
import EndedList from "./EndedList/EndedList";

class App extends Component {
    state = {
        tasks: [        ],
        ended: []
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
            tasks.push({ itemTitle: newTask });
            event.target.reset();
            this.setState({
                tasks: tasks
            });
        }
    }

    onEndTask(index) {
        let endedTask = [...this.state.ended];
        const currentEndedTask = this.state.tasks[index];
        endedTask.push(currentEndedTask);
        this.deleteMustDoTasksHandler(index);
        this.setState({
            ended: endedTask
        });
    }

    onEditTask(index) {
        const task = this.state.tasks[index];
        let newTitle = prompt(
            "Please, enter a new task title: ",
            task.itemTitle
        );
        if (!newTitle) {
            return;
        }
        this.onChangeItemTitle(newTitle, index);
    }

    onChangeItemTitle = (itemTitle, index) => {
        const tasks = [...this.state.tasks];
        const task = this.state.tasks[index];
        task.itemTitle = itemTitle;
        tasks[index] = task;
        this.setState({
            tasks: tasks
        });
    };

    deleteMustDoTasksHandler(index) {
        const tasks = [...this.state.tasks];
        tasks.splice(index, 1);
        this.setState({
            tasks: tasks
        });
    }

    deleteEndedTasksHandler(index) {
        const ended = [...this.state.ended];
        ended.splice(index, 1);
        this.setState({
            ended: ended
        });
    }

    render() {
        //rendering all tasks
        let tasks = this.state.tasks;
        if (tasks.length === 0) {
            tasks = <span className="item-title">Please, add the tasks</span>;
        } else {
            tasks = this.state.tasks.map((item, index) => {
                return (
                    <MustDoList
                        key={index}
                        itemTitle={item.itemTitle}
                        onEndTask={this.onEndTask.bind(this, index)}
                        onEditTask={this.onEditTask.bind(this, index)}
                        onChangeItemTitle={event =>
                            this.onChangeItemTitle(event.target.value, index)
                        }
                        onRemoveTask={this.deleteMustDoTasksHandler.bind(
                            this,
                            index
                        )}
                    ></MustDoList>
                );
            });
        }
        //rendering ended task
        let ended = this.state.ended;
        if (ended.length === 0) {
            ended = <span className="item-title">Not ended tasks</span>;
        } else {
            ended = this.state.ended.map((item, index) => {
                return (
                    <EndedList
                        key={index}
                        itemTitle={item.itemTitle}
                        onRemoveTask={this.deleteEndedTasksHandler.bind(
                            this,
                            index
                        )}
                    ></EndedList>
                );
            });
        }

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
                    <ul className="mustDoList-list">{tasks}</ul>
                </div>
                <div className="wrapper endedList">
                    <h2 className="title">Was done:</h2>
                    <ul className="wasEnded-list">{ended}</ul>
                </div>
            </div>
        );
    }
}

export default App;
