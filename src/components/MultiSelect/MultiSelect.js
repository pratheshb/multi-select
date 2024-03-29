import { useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowDown, MdClear } from 'react-icons/md';
import Options from '../Options/Options';
import SelectedOption from '../SelectedOption/SelectedOption';
import Filter from '../Filter/Filter';
import './MultiSelect.css';

export default function MultiSelect({
    options,
    selectedOptions,
    onSelectionChange,
    isSingle
}) {
    const ref = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const availableOptions = isSingle ? options : options.filter(option => !selectedOptions.includes(option));
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
    }, []);

    function handleToggle() {
        setIsExpanded(!isExpanded);
        setSelectedIndex(isExpanded ? -1 : 0);
    }

    function handleSelect(option) {
        setIsExpanded(false);
        setFilterText('');
        setSelectedIndex(-1);
        const updatedOptions = isSingle ? [option] : [
            ...selectedOptions,
            option
        ];
        onSelectionChange(updatedOptions);
    }

    function handleClear(option) {
        onSelectionChange(selectedOptions.filter(opt => opt !== option));
    }

    function handleFilterChange(e) {
        setIsExpanded(true);
        setFilterText(e.target.value);
        setSelectedIndex(0);
    }

    function handleKeyBoardNavigation(key) {
        const lastIndex = filteredOptions.length - 1;
        if (key === 'ArrowDown') {
            setIsExpanded(true);
            setSelectedIndex(selectedIndex === lastIndex ? 0 : selectedIndex + 1);
        } else if (key === 'ArrowUp') {
            setIsExpanded(true);
            setSelectedIndex(selectedIndex <= 0 ? lastIndex : selectedIndex - 1);
        }
    }

    function handleBackSpaceClear() {
        const length = selectedOptions.length;
        if (!filterText && length > 0) {
            handleClear(selectedOptions[length - 1]);
        }
    }

    function handleFilterKeyDown(e) {
        if (e.key === 'Backspace') {
            handleBackSpaceClear();
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
                            isSingle = {isSingle}
                            onClear={handleClear}
                        />
                    ))}
                    <Filter
                        filterText={filterText}
                        isOptionSelected={selectedOptions.length > 0}
                        onFocus={handleToggle}
                        onKeyDown={handleFilterKeyDown}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className='select-icon-container'>
                    {selectedOptions.length > 0 && <MdClear onClick={() => onSelectionChange([])} className='clear-all-icon' />}
                    <MdKeyboardArrowDown onClick={handleToggle} />
                </div>
            </div>
            {isExpanded && (
                <Options
                    options={filteredOptions}
                    selectedIndex={selectedIndex}
                    onPointerEnter={i => setSelectedIndex(i)}
                    onSelect={handleSelect}
                />)
            }
        </div>
    )
}