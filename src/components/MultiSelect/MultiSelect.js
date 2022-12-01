import { useState } from 'react';
import './MultiSelect.css';
import Options from '../Options/Options'
import SelectedOption from '../SelectedOption/SelectedOption';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdClear } from 'react-icons/md';
export default function MultiSelect(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const onToggle = function () {
        if (props.options.length === props.SelectedOptions.length) {
            return;
        }
        setIsExpanded(isExpanded => !isExpanded);
    }

    const handleSelect = function (option) {
        setIsExpanded(false);
        props.onSelect(option);
    }

    const color = props.options.length === props.SelectedOptions.length ? '#ccc' : null;

    return (
        <div className='select-control'>
            <div className="select-container">
                <div className='select-value-container'>
                    {props.SelectedOptions.map(option => (
                        <SelectedOption
                            option={option}
                            onClear={props.onClear}
                        />
                    ))}
                </div>
                <div className='select-icon-container'>
                    {props.SelectedOptions.length > 0 && <MdClear onClick={props.onClearAll} className='clear-all-icon'/>}
                    <MdKeyboardArrowDown style={{ color }} onClick={onToggle} />
                </div>

            </div>
            {isExpanded && (
                <Options
                    options={props.options}
                    SelectedOptions={props.SelectedOptions}
                    onSelect={handleSelect} 
                />)
            }
        </div>
    )
}