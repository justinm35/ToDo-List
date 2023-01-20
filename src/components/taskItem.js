import React from 'react'
import { useMotionValue, Reorder } from "framer-motion";

export default function TaskComp(props) {
     const y = useMotionValue(0);
     console.log(props)
    return(
            <div className="task--comp-box">
                <input className="task--comp-checkbox" type="checkbox"></input>
                <div className="task--comp-descriptions">
                    <h1 className="task--comp-title">{props.title}</h1>
                    <p className="task--comp-desc">{props.description}</p>
                    <p>{props.id}</p>
                </div>
                <p className="task--comp-date">Jan 15th, 2020</p>
            </div>
    )
}