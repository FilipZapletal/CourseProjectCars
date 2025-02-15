import React, { useEffect, useState } from 'react'

function FilterForm({ data }) {
    const[brands, setBrands] = useState([]);
    const[selBrands, setSelBrands] = useState([]);
    const[selRegistration, setSelRegistration] = useState('');
    const[criteria, setCriteria] = useState('brand');

    useEffect(() => {
        setBrands(Array.from(new Set(data.map(car => car.brand))))
    }, [data])

    const handleChange = (event) => {
        const name = event.target.name;
        switch (name) {
            case 'brand':{
                const tempBrands = Array.from(event.target.selectedOptions).map(option => option.value);
                setSelBrands(tempBrands);

                break;
            }
            case 'reg':{
                setSelRegistration(event.target.value);
                break;
            }
            default:
                break;
        }
    }

    const handleCriteria = (event) => {
        setCriteria(event.target.value);
    }

    const handleReset = (e) => {
        setSelBrands([]);
        setSelRegistration('');
    }

  return (
    <fieldset>
        <legend>filtr vyhledávání</legend>
        <div>
            <input 
            type="radio" 
            name="filter-criteria" 
            id="brand-criteria" 
            value="brand" 
            checked={ criteria === "brand"} 
            // {...criteria === "brand" ? "checked" : ""} 
            onChange={handleCriteria}/>
            <label htmlFor="brand-criteria">
                hledání podle značky výrobce  
            </label>
        </div>
        <div>
            <input type="radio" 
            name="filter-criteria"
            id="reg-criteria" 
            value="reg"
            checked={criteria === "reg"}
            onChange={handleCriteria}
            // {...criteria === "reg" ? "checked" : ""}
            />
            <label htmlFor="reg-criteria">hledání podle registrační značky</label>
        </div>
        <div>
            <select 
            disabled={criteria !== "brand"}
            name="brand" 
            id="brand" 
            multiple 
            value={selBrands} 
            onChange={handleChange}>
                 {brands.map(brand => (<option key={brand}>{brand}</option>))}
            </select>
        </div>
        <div>
            <input 
            disabled={criteria === "brand"} 
            type="text" 
            name="reg" 
            id="reg" 
            value={selRegistration} 
            onChange={handleChange}/>
        </div>
        <div>
            <button onClick={handleFilter}>filtruj</button>
            <button onClick={handleReset}>Reset filtru</button>
        </div>
    </fieldset>
  )
}

export default FilterForm