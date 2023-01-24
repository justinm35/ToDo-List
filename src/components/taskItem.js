import React from 'react'
import { useMotionValue, motion, Reorder, useDragControls } from "framer-motion";
import dragImg from './images/draggable.png'
import Checkbox from '@mui/material/Checkbox';
// import ReorderIcon from '@mui/icons-material/Reorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRaisedShadow } from "./useRaisedShadows.ts";
import { ReorderIcon } from "./icon.tsx";


export default function TaskComp(props) {
    const [openState, setOpenState] = React.useState(false)
    const maximized = {opacity: 1,display: "block"};
    const minimized = {opacity: 0,transitionEnd: {display: "none"}};
    const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();
    return(
        <Reorder.Item className="task--comp-box" key={props.items.id} value={props.items} id={props.items} style={{ boxShadow, y }} dragListener={false} dragControls={dragControls}>
            <div className="task--comp-checkbox"><Checkbox onClick={() => props.checkedStatusChange(props.items.id)} color="success" sx={{ '& .MuiSvgIcon-root': { fontSize: 38 }}} /></div>
                <div className="task--comp-content">
                    <h1 className={`task--comp-title`} style={{textDecoration : props.checkedStatus ?'line-through' : 'none'}} onClick={() => setOpenState(!openState)}>{props.title}</h1>
                    <div className="task--comp-date" >{props.dueDate ? `Deadline: ${props.dueDate}` : "No Deadline"}
                        <div style={props.categoryName ?
                                    {backgroundColor:props.categoryColor} :
                                    {backgroundColor: 'transparent'}} className="task--comp-category">{props.categoryName}
                        </div>
                        <div className="task--comp-priority">{props.priority}</div>
                    </div>
                     <motion.div animate={openState ? maximized : minimized}>
                        <p className="task--comp-desc">{props.description} This is a test descirption of the above task and made superlong to show the wrap.</p>
                        <DeleteIcon className="task--comp-trash" color="disabled"/>
                     </motion.div>
                     
                </div>
                <div className="task--drag-icon"><ReorderIcon dragControls={dragControls} /></div>
                {/* <img className="task--drag-icon" dragControls={dragControls} src={dragImg} /> */}
        </Reorder.Item>
    )
}