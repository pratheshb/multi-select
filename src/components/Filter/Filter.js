import './Filter.css';

export default function Filter({
    filterText,
    isOptionSelected,
    onFocus,
    onKeyDown,
    onChange
}) {
    return (
        <div onClick={onFocus} className='input-container'>
        <input 
        type="text"
        placeholder= {isOptionSelected ? '' : 'Select...'}
        className='select-input'
        value={filterText}
        onKeyDown={onKeyDown} 
        onChange={onChange} />
    </div>
    );
}