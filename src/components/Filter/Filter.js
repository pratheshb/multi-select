import './Filter.css';

export default function Filter(props) {
    return (
        <div className='input-container'>
        <input 
        type="text"
        className='select-input'
        value={props.filterText} 
        onFocus={props.onFilterFocus}
        onKeyDown={props.onFilterKeyDown} 
        onChange={props.onFilterChange} />
    </div>
    );
}