import './Options.css';
export default function Options({
    options,
    onSelect
}) {
    return (
        <div className="drop-down-container">
            {
                options.length > 0 ? options.map(
                    (option, index) => (
                        <div
                            key={index}
                            onClick={() => onSelect(option)}
                            className='option'>
                            {option}
                        </div>
                    )) : <div className='no-items'>No items found</div>
            }
        </div>
    )
}