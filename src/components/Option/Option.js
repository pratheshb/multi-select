import { useState } from "react"
import './Option.css'
export default function Option(props) {

    const [isMouseEnter, setIsMouseEnter] = useState(false);

    function handleHover() {
        setIsMouseEnter(isMouseEnter => !isMouseEnter);
    }

    const backgroundColor = isMouseEnter ? 'rgb(240, 240, 240)' : null;
    return (
        <div
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            style={{ backgroundColor }}
            onClick={() => props.onSelect(props.option)}
            className='option'>
            {props.option}
        </div>
    )
}