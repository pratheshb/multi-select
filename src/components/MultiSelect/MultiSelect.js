import { useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowDown, MdClear } from 'react-icons/md';
import Options from '../Options/Options';
import SelectedOption from '../SelectedOption/SelectedOption';
import Filter from '../Filter/Filter';
import './MultiSelect.css';

export default function MultiSelect({
    options,
    selectedOptions,
    onSelect,
    onClear,
    onClearAll
}) {
    const ref = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [filterText, setFilterText] = useState('');

    const availableOptions = options.filter(option => !selectedOptions.includes(option));
    const filteredOptions = availableOptions.filter(option => option.toLowerCase().includes(filterText.toLowerCase()));

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsExpanded(false);
                setFilterText('');
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const onToggle = function () {
        setIsExpanded(isExpanded => !isExpanded);
    }

    const handleSelect = function (option) {
        setIsExpanded(false);
        setFilterText('');
        onSelect(option);
    }

    const handleFilterChange = function (e) {
        setFilterText(e.target.value);
    }

    const handleFilterKeyDown = function (e) {
        const length = selectedOptions.length
        if (e.key === 'Backspace') {
            if (!filterText && length > 0) {
                onClear(selectedOptions[length - 1])
            }
        }
    }

    return (
        <div ref={ref} className='select-control'>
            <div className="select-container">
                <div className='select-value-container'>
                    {selectedOptions.map((option, index) => (
                        <SelectedOption
                            key={index}
                            option={option}
                            onClear={onClear}
                        />
                    ))}
                    <Filter
                        filterText={filterText}
                        onFocus={() => setIsExpanded(true)}
                        onKeyDown={handleFilterKeyDown}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className='select-icon-container'>
                    {selectedOptions.length > 0 && <MdClear onClick={onClearAll} className='clear-all-icon' />}
                    <MdKeyboardArrowDown onClick={onToggle} />
                </div>
            </div>
            {isExpanded && (
                <Options
                    options={filteredOptions}
                    onSelect={handleSelect}
                />)
            }
        </div>
    )
}