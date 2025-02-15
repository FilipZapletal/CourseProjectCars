import React from 'react';

import './CarTable.css'

function CarTable({ data, handleChange, handleDelete }) {
    if (!data.length) {
      return <div>Nejsou k dispozici žádná data</div>
    }

  return <table>
      <thead>
      <tr>
          <th>Značka</th>
          <th>Model</th>
          <th>Reg. značka</th>
          <th>Najeto km</th>
          <th>Rok výroby</th>
          <th colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
        {data.map(car => (
          <tr key={car.id}>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.reg}</td>
            <td>{car.km}</td>
            <td>{car.year}</td>
            <td>
              <button onClick={() => handleChange(car.id)}>Edituj</button>
              <button onClick={() => handleDelete(car.id)}>Smazat</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
}

export default CarTable