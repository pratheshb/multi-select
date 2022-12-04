import { useState } from 'react';
import './App.css';
import MultiSelect from './components/MultiSelect/MultiSelect';

function App() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  return (
    <div className='container'>
      <div className='multi-select-label'>Select Colors</div>
      <MultiSelect
        options={['Blue', 'Purple', 'Red', 'Green', 'Black', 'Brown', 'Cyan', 'Orange', 'Violet', 'Teal', 'Pink']}
        selectedOptions={selectedColors}
        onSelectionChange={(colors) => setSelectedColors(colors)}
      />
      <div className='multi-select-label'>Select Size</div>
      <MultiSelect
        options={['Small', 'Medium', 'Large']}
        selectedOptions={selectedSizes}
        onSelectionChange={(sizes) => setSelectedSizes(sizes)}
      />
    </div>
  );
}

export default App;
