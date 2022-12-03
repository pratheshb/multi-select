import { useState } from 'react';
import './App.css';
import MultiSelect from './components/MultiSelect/MultiSelect';

function App() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  function handleColorSelect(color) {
    setSelectedColors(selectedColors => ([
      ...selectedColors,
      color
    ]));
  }

  function handleSizeSelect(size) {
    setSelectedSizes(selectedSizes => ([
      ...selectedSizes,
      size
    ]));
  }

  function handleColorRemove(color) {
    setSelectedColors(selectedColors => selectedColors.filter(col => col !== color));
  }

  function handleSizeRemove(size) {
    setSelectedSizes(selectedSizes => selectedSizes.filter(siz => siz !== size));
  }

  return (
    <div className='container'>
      <div className='multi-select-label'>Select Colors</div>
      <MultiSelect
        options={['Blue', 'Purple', 'Red', 'Green', 'Black', 'Brown', 'Cyan', 'Orange', 'Violet', 'Teal', 'Pink']}
        selectedOptions={selectedColors}
        onSelect={handleColorSelect}
        onClear={handleColorRemove}
        onClearAll={() => setSelectedColors([])}
      />
      <div className='multi-select-label'>Select Size</div>
      <MultiSelect
        options={['Small', 'Medium', 'Large']}
        selectedOptions={selectedSizes}
        onSelect={handleSizeSelect}
        onClear={handleSizeRemove}
        onClearAll={() => setSelectedSizes([])}
      />
    </div>
  );
}

export default App;
