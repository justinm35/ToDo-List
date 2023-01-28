import React from 'react'
import { useMotionValue, motion, Reorder, useDragControls, AnimatePresence } from "framer-motion";
import dragImg from './images/draggable.png'
import Checkbox from '@mui/material/Checkbox';
// import ReorderIcon from '@mui/icons-material/Reorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRaisedShadow } from "./useRaisedShadows.ts";
import { ReorderIcon } from "./icon.tsx";
import Chip from '@mui/material/Chip';
import { IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { pink,  } from '@mui/material/colors';


export default function TaskComp(props) {
    const [openState, setOpenState] = React.useState(false)
    const maximized = {opacity: 1,display: "block"};
    const minimized = {opacity: 0,transitionEnd: {display: "none"}};
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();
    return(
        <Reorder.Item layout
        // initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring" }} className="task--comp-box" value={props.items} id={props.items} style={{ boxShadow, y }} dragListener={false} dragControls={dragControls}>
            <div className="task--comp-checkbox"><Checkbox onClick={() => props.checkedStatusChange(props.items.id)} checked={props.checkedStatus} color="success" sx={{ '& .MuiSvgIcon-root': { fontSize: 38 }}} /></div>
                <div className="task--comp-content">
                    <div className="task--comp-top">
                        <h1 className={`task--comp-title`} style={{textDecoration : props.checkedStatus ?'line-through' : 'none', opacity : props.checkedStatus ?'0.7' : '1'}}>{props.title}</h1>
                        <IconButton className="task--dropdown" onClick={() => setOpenState(!openState)} size="small">{openState? <ArrowDropDownIcon  fontSize="large"/> :<ArrowDropUpIcon  fontSize="large"/> }</IconButton>
                    </div>
                    <div className="task--comp-info-box" >
                        {props.categoryName.map((data) =>{ return(<Chip style={{backgroundColor: data.color, color: 'white'}} className="task--tags"fontSize="medium" key={data.catId}label={data.name}/>)})}
                    </div>
                </div>
                <div className="task--drag-icon"><ReorderIcon size="small"dragControls={dragControls} /></div> 
                <motion.div className="task--comp-popup" animate={openState ? maximized : minimized}>
                {props.priority != '' && <div className="task--comp-priority">{props.priority == 'High' ? '!!!' :  props.priority == 'Medium' ? '!!' : '!' } {props.priority}</div>}
                <p className="task--comp-date">{props.dueDate ? `Deadline: ${props.dueDate}` : "No Deadline"}</p>
                        <p className="task--comp-desc">{props.description}</p> 
                        <IconButton  size="large"className="task--comp-trash" onClick={() => props.handleDelete(props.items.id)}><DeleteIcon color="disabled"/></IconButton>
                     </motion.div>
        </Reorder.Item>
    )
}