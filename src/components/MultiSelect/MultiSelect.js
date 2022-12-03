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
    const [selectedIndex, setSelectedIndex] = useState(-1);

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

    const handleToggle = function () {
        setIsExpanded(!isExpanded);
        setSelectedIndex(isExpanded ? -1 : 0);
    }

    const handleSelect = function (option) {
        setIsExpanded(false);
        setFilterText('');
        setSelectedIndex(-1);
        onSelect(option);
    }

    const handleFilterChange = function (e) {
        setIsExpanded(true);
        setFilterText(e.target.value);
        setSelectedIndex(0);
    }

    const handleKeyBoardNavigation = function (key) {
        const lastIndex = filteredOptions.length - 1;
        if (key === 'ArrowDown') {
            setIsExpanded(true);
            setSelectedIndex(selectedIndex === lastIndex ? 0 : selectedIndex + 1)
        } else if (key === 'ArrowUp') {
            setIsExpanded(true);
            setSelectedIndex(selectedIndex <= 0 ? lastIndex : selectedIndex - 1)
        }
    }

    const handleClear = function () {
        const length = selectedOptions.length;
        if (!filterText && length > 0) {
            onClear(selectedOptions[length - 1])
        }
    }

    const handleFilterKeyDown = function (e) {
        if (e.key === 'Backspace') {
            handleClear();
        } else if (e.key.startsWith('Arrow')) {
            handleKeyBoardNavigation(e.key);
        } else if (e.key === 'Enter') {
            isExpanded && filteredOptions.length > 0 && handleSelect(filteredOptions[selectedIndex]);
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
                        onFocus={handleToggle}
                        onKeyDown={handleFilterKeyDown}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className='select-icon-container'>
                    {selectedOptions.length > 0 && <MdClear onClick={onClearAll} className='clear-all-icon' />}
                    <MdKeyboardArrowDown onClick={handleToggle} />
                </div>
            </div>
            {isExpanded && (
                <Options
                    options={filteredOptions}
                    selectedIndex={selectedIndex}
                    onMouseOver={i => setSelectedIndex(i)}
                    onSelect={handleSelect}
                />)
            }
        </div>
    )
}