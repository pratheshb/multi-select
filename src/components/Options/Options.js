import './Options.css'
import Option from '../Option/Option'
export default function Options(props) {
    return (
        <div className="drop-down-container">
        {
            props.options.filter(option => !props.SelectedOptions.includes(option)).map(
                (option, index) => (
                <Option key={index} option={option} onSelect={props.onSelect} />
                ))
        }
        </div>
    )
}