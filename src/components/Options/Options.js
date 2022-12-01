import './Options.css';
export default function Options(props) {
    return (
        <div className="drop-down-container">
            {
                props.options.filter(option => !props.SelectedOptions.includes(option)).map(
                    (option, index) => (
                        <div
                            key={index}
                            onClick={() => props.onSelect(option)}
                            className='option'>
                            {option}
                        </div>
                    ))
            }
        </div>
    )
}