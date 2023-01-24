import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import TaskComp from './taskItem'
import { useMotionValue, motion, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "./useRaisedShadows.ts";
import './taskBar.css'
import './taskInputForm.css'
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



export default function TaskBar() {
    const [isFormVisible, setIsFormVisible] = React.useState(false);
    const [inputErrorState, setInputErrorState] = React.useState("")
    const [categoryList, setCategoryList] = React.useState([{color:'#D8A2D3', name:'Home'},{color:'#DDE8B9', name:'Work'}])
    const [taskListData, setTaskListData] = React.useState([])
    const y = useMotionValue(0);

    const randomColor = () => {
        const categoryColorArr = ['#8884FF', '#EB9090', '#7ECFEF', '#BAEFCD', '#ADD7F6', '#FBD0CE', '#FFA787', '#8BFFDE']
        return categoryColorArr[parseInt(Math.random() * categoryColorArr.length)]
    }
    const [TaskListItem, setTaskListItem] = React.useState({id: "", checkedStatus: false, title: "", description: "", dueDate: "", priority: "", categoryColor: randomColor(), categoryName:""})
    
    function handleCheck(checkId) { 
        const nextStatus = taskListData.map((status) => {if(status.id == checkId){return {...status, checkedStatus : !status.checkedStatus}}else { return status}})
        setTaskListData(nextStatus)
        // taskListData.map((currentItem, index) => currentItem.id == checkId && setTaskListData([...taskListData, taskListData[index]checkedStatus = "asd" ]))
        

    }

    //handles every change in input fields
    function handleChange(event){
        const {name, value} = event.target
        setTaskListItem(prevData => {return{ ...prevData, [name] : value}})
    }

    //Handle the form submit
    function handleSubmit(event) {
        event.preventDefault()
        // console.log(Object.values(TaskListItem).every(Boolean))
        if(TaskListItem.title === ""){
            setInputErrorState("*Make sure you have a task added!")
        }else{
            // const thisColor = categoryList[categoryList.length-1] == undefined ? "transparent" : categoryList[categoryList.length-1][0]
            // console.log(thisColor)
        setInputErrorState("")
        TaskListItem.categoryName && categoryList.some(category => category.name == TaskListItem.categoryName) == false && setCategoryList(prevData => [...prevData,{ color: TaskListItem.categoryColor, name: TaskListItem.categoryName}] )
        setTaskListData([...taskListData, 
                        {id: nanoid(10), 
                        checkedStatus:TaskListItem.checkedStatus ,
                        title: TaskListItem.title, 
                        description: TaskListItem.description, 
                        dueDate: TaskListItem.dueDate,
                        priority: TaskListItem.priority, 
                        categoryColor: TaskListItem.categoryColor, 
                        categoryName: TaskListItem.categoryName} ])
        setTaskListItem({id: "",
                        checkedStatus: false, 
                        title: "", 
                        description: "", 
                        dueDate: "", 
                        priority: "", 
                        categoryColor:randomColor() , 
                        categoryName:""})
        setIsFormVisible(vis => !vis);
        }
    }
    console.log(taskListData)
      const show = {translateY: '0px', opacity: 1,display: "block"};
      const hide = {opacity: 0,translateY:'400px',transitionEnd: {display: "none"}};
      const rotated = {rotate: 0}
      const unRotated = {rotate:45}


      const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

            const [items, setItems] = React.useState(initialItems);

    return (
        <div className="task--bar">
        {/*Input Task Form*/}
                <motion.div animate={isFormVisible ? show : hide} className="input--box">
                    <form onSubmit={handleSubmit}>
                        <div className="input--box-left">
                            <TextField id="outlined-basic" 
                                       label="Title" 
                                       variant="outlined" 
                                       type="text"
                                       name="title"
                                       value={TaskListItem.title}
                                       onChange={handleChange}/>
                            <TextField id="outlined-multiline-static"
                                       label="Description"
                                       multiline
                                       rows={4}
                                       name="description"
                                       value={TaskListItem.description}
                                       onChange={handleChange}/>
                            <ToggleButtonGroup
                                    color="primary"
                                    value={TaskListItem.priority}
                                    exclusive
                                    onChange={handleChange}
                                    aria-label="Platform"
                                    ><p className="input--priority-label">Priority: </p>
                                <ToggleButton  className="test" name="priority" value="1">1</ToggleButton>
                                <ToggleButton  className="test" name="priority" value="2">2</ToggleButton>
                                <ToggleButton  className="test" name="priority" value="3">3</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className="input--box-right">
                                <TextField
                                    label="Deadline"
                                    type="date"
                                    name="dueDate"
                                    value={TaskListItem.dueDate}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            
                            <TextField id="outlined-basic" 
                                       label="Category" 
                                       variant="outlined" 
                                       name="categoryName"
                                       value={TaskListItem.categoryName}
                                       onChange={handleChange}/>
                            <div className="input-category-box">
                                <ul className="input-ul">
                                {categoryList.map((categories) => <li key={nanoid(4)} ><motion.div style={{backgroundColor: `${categories.color}`}} className="input-category-selector" onClick={() => setTaskListItem(prev => {return{...prev, categoryColor: categories.color, categoryName: categories.name}})}>{categories.name}</motion.div></li>)}
                                </ul>
                            </div>
                        </div>
                            <h3 className="input-error-message">{inputErrorState}</h3>
                            <motion.button whileTap={{ color:'red' }} className="input-btn-add">Add Task</motion.button>
                                        
                    </form>
                </motion.div> 
        {/*Displays all of the items/tasks through .map if there is any*/}
                    {taskListData.length > 0 ? 
                        <Reorder.Group axis="y" onReorder={setTaskListData} values={taskListData}>
                            {taskListData.map((items) => (
                                    //  <Reorder.Item key={items.id} value={items} id={items} style={ y}>
                                        <TaskComp key={items.id} 
                                                  items={items} 
                                                  title={items.title} 
                                                  checkedStatus={items.checkedStatus} 
                                                  checkedStatusChange={(p) => handleCheck(p)} 
                                                  description={items.description} 
                                                  dueDate={items.dueDate} 
                                                  priority={items.priority} 
                                                  categoryName={items.categoryName} 
                                                  categoryColor={items.categoryColor} /> 
                                    // </Reorder.Item>
                            ))}
                        </Reorder.Group> 
                        :
                        <h1 className="task--no-task">You have nothing to do. Add something!</h1>
                    }

        {/* Add task "+" button*/}
            <motion.button whileTap={{ scale: 0.90 }} onClick={() => setIsFormVisible(x => !x)} className="task--add-btn"><motion.div animate={isFormVisible ? unRotated : rotated}>+</motion.div></motion.button>
        </div>
    )
}

