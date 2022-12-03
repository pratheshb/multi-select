import './Filter.css';

export default function Filter({
    filterText,
    onFocus,
    onKeyDown,
    onChange
}) {
    return (
        <div className='input-container'>
        <input 
        type="text"
        className='select-input'
        value={filterText} 
        onFocus={onFocus}
        onKeyDown={onKeyDown} 
        onChange={onChange} />
    </div>
    );
}