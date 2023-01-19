import React from 'react'
import './infoBar.css'

export default function InfoBar(props) {
    let date = new Date().toDateString()
    return(
        <div className="info--bar">
            <p className="info--date">{date}</p>
            <h2 className="info--hello"><span>Good Night {props.userName},</span><br/> here is your new things list.</h2>
        </div>
    )
}