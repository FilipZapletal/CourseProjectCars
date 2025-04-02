import { useState, useEffect } from "react";
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

  // pokud davas na web tak misto localhost musi byt cesta k index složce
  //všechna auta
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

  useEffect(() => {
    getCars();
  }, []);

  //získání aut podle id
  const filterCars = (ids) => {
    // http://localhost:3000/php_complex/?action=getSpec&ids=5,7,8
    const param = ids.join(); // [5,7,8] = "5,7,8"
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

  //vymazání auta
  const deleteCar = (id) => {
    // http://localhost:3000/php_complex/?action=delete&ids=7
    axios
      .delete(`http://localhost:3000/php_complex/${id}`)
      .then((response) => {
        console.log(response.data);
        getCars();
        alert("Auto bylo úspěšně smazáno.");
      })
      .catch((error) => {
        alert(`Chyba: ${error}`);
      });
  };

  //přidání nového auta
  const insertCar = (car) => {
    axios.post('http://localhost/php_complex/', car).then((response) => {
      console.log(response.data);
      getCars();
      alert("Auto bylo úspěšně přidáno.");
    })
  }

  const updateCar = (car) => {
    axios.put('http://localhost/php_complex/', car).then((response) => {
      console.log(response.data);
      getCars();
      alert("Auto bylo úspěšně aktualizováno.");
    })
  }

  const [carToChange, setCarToChange] = useState({
    id: 0,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });

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

  const handleFilterData = (ids) => {
    const ids = filteredCar.map((car) => car.id);
    filterCars(ids);
  };

  const handleUpdate = (source) => {
    switch (source) {
      case "add-car-form": {
        insertCar();
        setNewCar({
          brand: "",
          model: "",
          reg: "",
          km: "",
          year: "",
        });
        break;
      }
      case "change-car-form": {
          updateCar(carToChange)
          setCarToChange({
            id: 0,
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: "",
          });
          break;
      }
    }

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
  };
}

export default App;
