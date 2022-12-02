import './SelectedOption.css';
import { MdClear } from 'react-icons/md'

export default function SelectedOption({ option, onClear }) {

    return (
        <span className='selected-option'>
            {option}
            <MdClear onClick={() => onClear(option)} className='clear-icon' />
        </span>
    )
}