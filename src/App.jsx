import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import rawData from "./rawData.json";
import CarTable from "./components/CarTable/CarTable";
import FilterForm from "./components/FilterForm/FilterForm";
import UniForm from "./components/UniForm/UniForm";

function App() {
  const [cars, setCars] = useState([]);
  const [carsToShow, setCarsToShow] = useState([]);

  const [newCar, setNewCar] = useState({
    id: cars.length > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 1,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });

  const [carToChange, setCarToChange] = useState({
    id: 0,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });

  useEffect(() => {
    getCars();
  }, []);

  const getCars = () => {
    axios
      .get("http://localhost:3000/php_complex/?action=getAll")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCars(response.data);
          setCarsToShow(response.data);
        } else {
          console.error("Odpověď serveru není pole.");
        }
      })
      .catch((error) => {
        alert(`Chyba: ${error}`);
      });
  };

  const filterCars = (ids) => {
    const param = ids.join();
    axios
      .get(`http://localhost:3000/php_complex/?action=getSpec&ids=${param}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCarsToShow(response.data);
        } else {
          console.error("Odpověď serveru není pole.");
        }
      })
      .catch((error) => {
        alert(`Chyba: ${error}`);
      });
  };

  const deleteCar = (id) => {
    axios
      .delete(`http://localhost:3000/php_complex/${id}`)
      .then(() => {
        getCars();
        alert("Auto bylo úspěšně smazáno.");
      })
      .catch((error) => {
        alert(`Chyba: ${error}`);
      });
  };

  const insertCar = (car) => {
    axios.post("http://localhost/php_complex/", car).then(() => {
      getCars();
      alert("Auto bylo úspěšně přidáno.");
    });
  };

  const updateCar = (car) => {
    axios.put("http://localhost/php_complex/", car).then(() => {
      getCars();
      alert("Auto bylo úspěšně aktualizováno.");
    });
  };

  const handleNewData = (updatedCar, source) => {
    switch (source) {
      case "add-car-form":
        setNewCar(updatedCar);
        break;
      case "change-car-form":
        setCarToChange(updatedCar);
        break;
      default:
        break;
    }
  };

  const handleChange = (idToChange) => {
    const temp = cars.filter((car) => car.id === idToChange);
    setCarToChange(...temp);
  };

  const handleDelete = (idToDelete) => {
    deleteCar(idToDelete);
  };

  const handleFilterData = (filteredCars) => {
    const idsToFilter = filteredCars.map((car) => car.id);
    filterCars(idsToFilter);
  };

  const handleUpdate = (source) => {
    switch (source) {
      case "add-car-form":
        insertCar(newCar);
        setNewCar({
          brand: "",
          model: "",
          reg: "",
          km: "",
          year: "",
        });
        break;
      case "change-car-form":
        updateCar(carToChange);
        setCarToChange({
          id: 0,
          brand: "",
          model: "",
          reg: "",
          km: "",
          year: "",
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <FilterForm data={carsToShow} handleFilterData={handleFilterData} />
      <CarTable
        data={cars}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
      <p>Přidání nového auta</p>
      <UniForm
        id="add-car-form"
        data={newCar}
        handleNewData={handleNewData}
        handleUpdate={handleUpdate}
      />
      <p>Update existujícího auta</p>
      <UniForm
        id="change-car-form"
        data={carToChange}
        handleNewData={handleNewData}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
