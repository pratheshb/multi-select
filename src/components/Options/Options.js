import './Options.css';
export default function Options(props) {
    return (
        <div className="drop-down-container">
            {
                props.options.length > 0 ? props.options.map(
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