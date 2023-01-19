import React from 'react'
import './taskBar.css'
import './taskInputForm.css'

export default function TaskBar() {
    function TaskInputForm() {
        const [taskList, setTaskList] = React.useState({})
        return(
            <div className="input--box">
                <form>
                    <label className="input-text-label" for="taskName">Task Name</label>
                    <input className="input-text" type="text" id="taskName"

                    ></input>
                    <label className="input-text-label" for="taskDescription">Description</label>
                    <input className="input-text" type="text" id="taskDescription"
                    name=""
                    value=""
                    ></input>
                    <button>Add Task</button>
                </form>
            </div>
        )
    }
    const [inputState, setInputState] = React.useState(false);
    function handleClick() {
        setInputState(x => !x);
    }
    function TaskComp() {
        return(
            <div className="task--comp-box">
                <input className="task--comp-checkbox" type="checkbox"></input>
                <div className="task--comp-descriptions">
                    <h1 className="task--comp-title">Meet the New Owner</h1>
                    <p className="task--comp-desc">Meeting the new owner of this company that I found.</p>
                </div>
                <p className="task--comp-date">Jan 15th, 2020</p>
            </div>
        )
    }

    return (
        <div className="task--bar">
            {inputState === true && <TaskInputForm /> }
            <TaskComp />
            <TaskComp />
            <TaskComp />
            <div onClick={handleClick} className="task--add-btn">+</div>
        </div>
    )
}