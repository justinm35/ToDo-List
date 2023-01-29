import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import TaskComp from './taskItem'
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Chip from '@mui/material/Chip';
import { useMotionValue, motion, Reorder, AnimatePresence} from "framer-motion";
import './taskBar.css'
import './taskInputForm.css'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import { purple, red, pink, orange, green, teal, blue, deepPurple, lightBlue, cyan } from '@mui/material/colors';


export default function TaskBar() {
    const [isFormVisible, setIsFormVisible] = React.useState(false);
    const [inputErrorState, setInputErrorState] = React.useState("")
    const [categoryList, setCategoryList] = React.useState([{ catId:nanoid(3),color:"#4fc3f7", name:'Home', state: false},{ catId:nanoid(3), color:"#f06292", name:'Work',state: false}])
    const [taskListData, setTaskListData] = React.useState([])

    // const handleDeleteCategory = (catToDelete) => () => {
    //     setCategoryList((prevArr) => prevArr.filter((cat) => cat.name !== catToDelete.name));
    // }
    const oldData = JSON.parse(window.localStorage.getItem('prev'))
    useEffect(() =>{
        if(oldData == null) {
            setTaskListData([{id: nanoid(10), checkedStatus: false ,title: 'Pick up kids from school', description: 'Go pick up the kids from school @ 3:00pm', dueDate: '2023-04-01', priority: 'High', categoryName: [{ catId:nanoid(3),color:"#4fc3f7", name:'Home', state: true}]},
                            {id: nanoid(10), checkedStatus: true ,title: 'Open the worlds best To-Do web app', description: 'Yep, its this one... This is the best To-Do list web app!', dueDate: '' , priority: 'Medium', categoryName: [{ catId:nanoid(3),color:"#f06292", name:'Work', state: true},{ catId:nanoid(3), color:'#ffb74d', name:'Fun',state: true}]},
                            {id: nanoid(10), checkedStatus: false ,title: 'Delete these and start your own list!', description: 'Go ahead, delete these samples and play aroud with the app.', dueDate: 'Now' , priority: '', categoryName: [{ catId:nanoid(3),color:randomColor(), name:'Cool Stuff', state: true},{ catId:nanoid(3), color:'#ffb74d', name:'Fun',state: true}]} ])
        }else{
            setTaskListData(oldData)
        }
    },[])
    useEffect(() => {
        window.localStorage.setItem('prev', JSON.stringify(taskListData))
    }, [taskListData])
    function handleCatAdd() {
        TaskListItem.categoryName && categoryList.some(category => category.name === TaskListItem.categoryName) === false &&
        setCategoryList(prevData => [...prevData,{catId: nanoid(3), color: randomColor(), name: TaskListItem.categoryName, state: true}])
        setTaskListItem((prev) => {return {...prev, categoryName:""}})
        console.log(TaskListItem)
    }
    function changeCatStatus(id) {
        const newCatList =  categoryList.map((item) => {if(item.catId === id){return{...item, state: !item.state}} else{return {...item}}})
        setCategoryList(() => newCatList)
    }
    let [colorCount, setColorCount] = React.useState(0)
    const randomColor = () => {
        const categoryColorArr = [red[300], purple[300], orange[300], pink[300], teal[300], blue[300], deepPurple[300], lightBlue[300], cyan[300] ]
        // let newColor = categoryColorArr[colorCount]
        // console.log(colorCount + newColor)
        // return newColor
        return categoryColorArr[parseInt(Math.random() * categoryColorArr.length)]
    }
    const [TaskListItem, setTaskListItem] = React.useState({id: "", checkedStatus: false, title: "", description: "", dueDate: "", priority: "", categoryColor: randomColor(), categoryName:""})
    
    function handleDeleteCompletedTask() {
        const newData = taskListData.filter((item) => item.checkedStatus === false && item)
        setTaskListData(newData)
    }
    function handleDelete(checkId) {
        const newData = taskListData.filter((item) => {if(item.id !== checkId){return item}})
        setTaskListData(newData)
    }
    function handleCheck(checkId) { 
        const nextStatus = taskListData.map((status) => {if(status.id === checkId){return {...status, checkedStatus : !status.checkedStatus}}else { return status}})
        setTaskListData(nextStatus)
    }

    //Handles every change in input fields
    function handleChange(event){
        const {name, value} = event.target
        setTaskListItem(prevData => {return{ ...prevData, [name] : value}})
    }

    //Handle the form submit
    function handleSubmit(event) {
        event.preventDefault()
        const catsSubmit = categoryList.filter((valid) => valid.state && valid)
        if(TaskListItem.title === ""){
            setInputErrorState("title")
        }else{
            setInputErrorState("")
            setTaskListData([...taskListData, 
                            {id: nanoid(10), 
                            checkedStatus:TaskListItem.checkedStatus ,
                            title: TaskListItem.title, 
                            description: TaskListItem.description, 
                            dueDate: TaskListItem.dueDate,
                            priority: TaskListItem.priority,  
                            categoryName: catsSubmit} ])
            setTaskListItem({id: "",
                            checkedStatus: false, 
                            title: "", 
                            description: "", 
                            dueDate: "", 
                            priority: "",  
                            categoryName:""})
            setIsFormVisible(vis => !vis);
        }
    }
      const show = {translateY: '0px', opacity: 1,display: "block"};
      const hide = {opacity: 0,translateY:'500px',transitionEnd: {display: "none"}};
      const rotated = {rotate: 0}
      const unRotated = {rotate:45}
      console.log(taskListData)
    return (
        <div className="task--bar">
        {/*Input Task Form*/}
        <AnimatePresence initial={false}>
                <motion.div animate={isFormVisible ? show : hide} className="input--box">
                    <form onSubmit={handleSubmit}>
                        <div className="input--box-left">
                            <TextField id="outlined-basic" 
                                       label="Title" 
                                       variant="outlined" 
                                       type="text"
                                       name="title"
                                       value={TaskListItem.title}
                                       onChange={handleChange}
                                        error={inputErrorState === "title" ? 'NoTitle' :  ''}
                                        helperText={inputErrorState === "title" ? 'You need a task title.' :  ''}
                                       />
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
                                <ToggleButton  className="test" name="priority" value="Low">Low</ToggleButton>
                                <ToggleButton  className="test" name="priority" value="Medium">Medium</ToggleButton>
                                <ToggleButton  className="test" name="priority" value="High">High</ToggleButton>
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
                            
                            <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="category">Add New Tag</InputLabel>
                                <OutlinedInput id="category"
                                    type="text"
                                    label="Add New Tag"
                                    name="categoryName"
                                    onChange={handleChange}
                                    value={TaskListItem.categoryName}
                                    endAdornment={
                                        <InputAdornment position="end">
                                                <IconButton edge="end" onClick={() => handleCatAdd()}>
                                                    <AddIcon/>
                                                </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>


                            <div className="input-category-box">
                                 {categoryList.map((data) => {  return (
                                        <Chip key={data.catId}
                                        label={data.name}
                                        onClick={() => changeCatStatus(data.catId)}
                                        onDelete={() => changeCatStatus(data.catId)}
                                        deleteIcon={data.state ?<DoneIcon sx={{ color: green[500] }} />: <CloseIcon/> }
                                        // color={data.state ? red[500] : 'default'}
                                        style={data.state ? {backgroundColor: data.color, color: '#ffffff'} : {borderColor:data.color,color: data.color}}
                                        variant={data.state ? 'filled' : 'outlined'}
                                        />
                                )})} 
                            </div>

                        </div>
                            <motion.button whileTap={{ scale:0.95}} className="input-btn-add">Add Task</motion.button>
                                        
                    </form>
                </motion.div> 
                </AnimatePresence>
        {/*Displays all of the items/tasks through .map if there is any*/}
                    {taskListData.length > 0 ? 
                        <Reorder.Group axis="y" onReorder={setTaskListData} values={taskListData}>
                            <AnimatePresence mode="popLayout">
                            {taskListData.map((items) => (
                                        <TaskComp key={items.id} 
                                                  items={items} 
                                                  title={items.title} 
                                                  checkedStatus={items.checkedStatus} 
                                                  checkedStatusChange={(p) => handleCheck(p)} 
                                                  handleDelete={(id) => handleDelete(id)}
                                                  description={items.description} 
                                                  dueDate={items.dueDate} 
                                                  priority={items.priority} 
                                                  categoryName={items.categoryName} 
                                                  categoryColor={items.categoryColor} /> 
                            ))}
                            </AnimatePresence>
                            <Link href="#" className="task--remove-completed" component="button" color="inherit" underline="always"onClick={handleDeleteCompletedTask}>Remove Completed Tasks</Link>
                        </Reorder.Group> 
                    
                        :
                        <h1 className="task--no-task">You have nothing to do. Add something!</h1>
                    }
        {/* Add task "+" button*/}
            {/* <motion.button whileTap={{ scale: 0.90 }} onClick={() => setIsFormVisible(x => !x)} className="task--add-btn"><motion.div animate={isFormVisible ? unRotated : rotated}>+</motion.div></motion.button> */}
            <motion.div whileTap={{ scale: 0.90 }} onClick={() => setIsFormVisible(x => !x)} className="task--add-btn" animate={isFormVisible ? unRotated : rotated}><AddIcon className="task--add-btn-child" sx={{ fontSize: 60 }}/></motion.div>

        </div>
    )
}

