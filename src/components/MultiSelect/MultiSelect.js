import { useState } from 'react';
import { MdKeyboardArrowDown, MdClear } from 'react-icons/md';
import Options from '../Options/Options';
import SelectedOption from '../SelectedOption/SelectedOption';
import Filter from '../Filter/Filter';
import './MultiSelect.css';

export default function MultiSelect(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [filterText, setFilterText] = useState('');

    const onToggle = function () {
        if (props.options.length === props.selectedOptions.length) {
            return;
        }
        setIsExpanded(isExpanded => !isExpanded);
    }

    const handleSelect = function (option) {
        setIsExpanded(false);
        setFilterText('');
        props.onSelect(option);
    }

    const handleFilterChange = function(e) {
        setFilterText(e.target.value); 
    }

    const handleFilterKeyDown = function(e) {
        const length = props.selectedOptions.length
        if(e.keyCode === 8) {
            if(!filterText && length > 0) {
                props.onClear(props.selectedOptions[length -1])
            }
        }
    }

    const color = props.options.length === props.selectedOptions.length ? '#ccc' : null;

    return (
        <div className='select-control'>
            <div className="select-container">
                <div className='select-value-container'>
                    {props.selectedOptions.map((option, index) => (
                        <SelectedOption
                            key={index}
                            option={option}
                            onClear={props.onClear}
                        />
                    ))}
                    <Filter
                        filterText={filterText}
                        onFilterFocus={() => setIsExpanded(true)} 
                        onFilterKeyDown={handleFilterKeyDown} 
                        onFilterChange={handleFilterChange}
                    />
                </div>
                <div className='select-icon-container'>
                    {props.selectedOptions.length > 0 && <MdClear onClick={props.onClearAll} className='clear-all-icon'/>}
                    <MdKeyboardArrowDown style={{ color }} onClick={onToggle} />
                </div>

            </div>
            {isExpanded && (
                <Options
                    options={props.options}
                    selectedOptions={props.selectedOptions}
                    filterText={filterText}
                    onSelect={handleSelect} 
                />)
            }
        </div>
    )
}