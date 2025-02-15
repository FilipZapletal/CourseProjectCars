import { useState } from 'react'
import './App.css'
import rawData from './rawData.json'
import CarTable from './components/CarTable/CarTable'
import FilterForm from './components/FilterForm/FilterForm';

function App() {
  const [cars, setCars] = useState(rawData.cars);
  console.log(cars);

  const handleChange = () => {}
  const handleDelete = () => {}

  return (<div className="container">
    <FilterForm data={cars} />
     <CarTable data={cars}
      handleChange={handleChange}
      handleDelete={handleDelete}
     />
    </div>)
}

export default App
