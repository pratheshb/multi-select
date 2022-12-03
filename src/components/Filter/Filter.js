import './Filter.css';

export default function Filter({
    filterText,
    onFocus,
    onKeyDown,
    onChange
}) {
    return (
        <div onClick={onFocus} className='input-container'>
        <input 
        type="text"
        className='select-input'
        value={filterText}
        onKeyDown={onKeyDown} 
        onChange={onChange} />
    </div>
    );
}