import { useState } from 'react';
import './App.css';
import MultiSelect from './components/MultiSelect/MultiSelect';

function App() {
  const [SelectedColors, setSelectedColors] = useState([]);
  const [SelectedSizes, setSelectedSizes] = useState([]);

  const handleColorSelect = function (color) {
    setSelectedColors(SelectedColors => ([
      ...SelectedColors,
      color
    ]));
  }

  const handleSizeSelect = function (size) {
    setSelectedSizes(SelectedSizes => ([
      ...SelectedSizes,
      size
    ]));
  }

  const handleColorRemove = function (color) {
    setSelectedColors(SelectedColors => SelectedColors.filter(col => col !== color));
  }

  const handleSizeRemove = function (size) {
    setSelectedSizes(selectedSizes => selectedSizes.filter(siz => siz !== size));
  }

  return (
    <div className='container'>
      <div className='multi-select-label'>Select Colors</div>
      <MultiSelect
        options={['Blue', 'Purple', 'Red', 'Green', 'Black', 'Brown', 'Cyan', 'Orange', 'Violet', 'Teal', 'Pink']}
        SelectedOptions={SelectedColors}
        onSelect={handleColorSelect}
        onClear={handleColorRemove}
        onClearAll={() => setSelectedColors([])}
      />
      <div className='multi-select-label'>Select Size</div>
      <MultiSelect
        options={['Small', 'Medium', 'Large']}
        SelectedOptions={SelectedSizes}
        onSelect={handleSizeSelect}
        onClear={handleSizeRemove}
        onClearAll={() => setSelectedSizes([])}
      />
    </div>
  );
}

export default App;
