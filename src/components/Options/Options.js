import './Options.css';
export default function Options(props) {
    const availableOptions = props.options.filter(option => !props.selectedOptions.includes(option));
    const filteredOptions = availableOptions.filter(option => option.toLowerCase().includes(props.filterText.toLowerCase()));
    return (
        <div className="drop-down-container">
            {
                filteredOptions.length > 0 ? filteredOptions.map(
                    (option, index) => (
                        <div
                            key={index}
                            onClick={() => props.onSelect(option)}
                            className='option'>
                            {option}
                        </div>
                    )) : <div className='no-items'>No items found</div>
            }
        </div>
    )
}