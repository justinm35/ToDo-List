import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import TaskComp from './taskItem'
import { useMotionValue, motion, Reorder } from "framer-motion";
import { useRaisedShadow } from "./useRaisedShadows.ts";
import './taskBar.css'
import './taskInputForm.css'

export default function TaskBar() {
    const [isFormVisible, setIsFormVisible] = React.useState(false);
    const y = useMotionValue(2);
    const boxShadow = useRaisedShadow(y);
    const [TaskListItem, setTaskListItem] = React.useState({
        id : "",
        title: "", 
        description: ""
    })

    const [taskListData, setTaskListData] = React.useState([])
    
    //handles every change in input fields
    function handleChange(event){
        const {name, value} = event.target
        setTaskListItem(prevData => {return{ ...prevData, [name] : value}})
    }

    //Handle the form submit
    function handleSubmit(event) {
        event.preventDefault()
        taskListData.push({id: nanoid(10), title: TaskListItem.title, description: TaskListItem.description})
        setTaskListItem({id: "", title: "", description: ""})
        setIsFormVisible(x => !x);
        console.log(taskListData)
    }
    const show = {
        opacity: 1,
        display: "block"
      };
      
      const hide = {
        opacity: 0,
        transitionEnd: {
          display: "none"
        }
      };

    return (
        <div className="task--bar">

                <motion.div animate={isFormVisible ? show : hide} className="input--box">
                    <form onSubmit={handleSubmit}>
                        <label className="input-text-label" for="taskName">Task Name</label>
                        <input className="input-text" type="text" id="taskName"
                            name="title"
                            value={TaskListItem.title}
                            onChange={handleChange}
                        ></input>
                        <label className="input-text-label" for="taskDescription">Description</label>
                        <input className="input-text" type="text" id="taskDescription"
                            name="description"
                            value={TaskListItem.description}
                            onChange={handleChange}
                        ></input>
                        <motion.button whileTap={{ scale: 0.90 }} className="input-btn-add">Add Task</motion.button>
                    </form>
                </motion.div> 

                    {taskListData.length > 0 ? 
                        <Reorder.Group axis="y" onReorder={setTaskListData} values={taskListData}>
                            {taskListData.map((items) => (
                                    <Reorder.Item key={items.id} value={items} id={items} style={ y}>
                                        <TaskComp title={items.title} description={items.description} /> 
                                    </Reorder.Item> 
                            ))}
                        </Reorder.Group> 
                        :
                        <h1 className="task--no-task">You have nothing to do. Add something!</h1>
                    }

            <motion.button whileTap={{ scale: 0.90 }} onClick={() => setIsFormVisible(x => !x)} className="task--add-btn">+</motion.button>
        </div>
    )
}

