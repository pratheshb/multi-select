import './SelectedOption.css';
import { MdClear } from 'react-icons/md'

export default function SelectedOption({ option, isSingle, onClear }) {

    return (
        <span className={`selected-option${isSingle ? ' single-option' : ''}`}>
            {option}
            {!isSingle && <MdClear onClick={() => onClear(option)} className='clear-icon' />}
        </span>
    )
}