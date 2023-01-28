import { ConstructionOutlined } from '@mui/icons-material'
import './dateBar.css'

export default function DateBar() {
    let date = new Date()
    const options = { month: "long" };
    const options2 = { weekday: "long" };
    return(
        <div className="date--bar">
            <div className="date--left">
                <div>
                    <h2>{date.getDate()}</h2>
                </div>
                <div>
                    <h3>{new Intl.DateTimeFormat("en-US", options).format(date)}</h3>
                    <h3>{date.getFullYear()}</h3>
                </div>
                <h3>{new Intl.DateTimeFormat("en-US", options2).format(date)}</h3>
            </div>
        </div>
    )
}