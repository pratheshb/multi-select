import './SelectedOption.css';
import {MdClear} from 'react-icons/md'

export default function SelectedOption(props) {

    return (
        <span className='selected-option'>
            {props.option}
            <MdClear onClick={() => props.onClear(props.option)} className='clear-icon'/>
        </span>
    )
}