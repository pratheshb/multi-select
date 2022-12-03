import './Options.css';
export default function Options({
    options,
    selectedIndex,
    onSelect,
    onPointerEnter
}) {
    return (
        <div className="drop-down-container">
            {
                options.length > 0 ? options.map(
                    (option, index) => (
                        <div
                            onMouseEnter={() => onPointerEnter(index)}
                            key={index}
                            onClick={() => onSelect(option)}
                            className={`option${selectedIndex === index ? ' active-option': ''}`}>
                            {option}
                        </div>
                    )) : <div className='no-items'>No items found</div>
            }
        </div>
    )
}