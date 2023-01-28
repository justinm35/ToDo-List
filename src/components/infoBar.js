import React from 'react'
import './infoBar.css'

export default function InfoBar(props) {
    let date = new Date().toDateString()
    let time = new Date().getHours()
    const greeting = (time) => {
        if(time > 5 && time < 12)
            {return "Good Morning "}
        else if(time >=12 && time <=18){return "Good Afternoon "}
        else if(time > 18 && time < 20){return "Good Evening " }
        else{return "Hello! "}} 
    return(
        <div className="info--bar">
            <p className="info--date">{date}</p>
            <h2 className="info--hello"><span>{greeting()}</span><br/> Here is your new things list.</h2>
        </div>
    )
}