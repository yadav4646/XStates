import { useEffect, useState } from "react";

function App() {

  const [countries, setCountries] = useState([]); // List of countries
  const [states, setState] = useState([]); // List of State
  const [cities, setCities] = useState([]); // List of City

  const [selectedCountry, setSelectedCountry] = useState(""); // List of selected Country 
  const [selectedState, setSelectedState] = useState(""); // List of selected State
  const [selectedCity, setSelectedCity] = useState(""); // List of selected City

  // console.log("Countries:", countries);
  // console.log("States:", states);
  // console.log("Cities:", cities);
  // console.log("Selected Country:", selectedCountry);
  // console.log("Selected State:", selectedState);
  // console.log("Selected City:", selectedCity);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(" https://crio-location-selector.onrender.com/countries");
        const data = await response.json();
        setCountries(data)
        // console.log(data)
      } catch (error) {
        console.error("Error fetching countries" + error);
      }
    }

    fetchCountries() // Call the fetch function
  }, []) // Empty array so that it only renders once

  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
          const data = await response.json();
          setState(data)
          // console.log(data)
        } catch (error) {
          console.log("Error Fetching States: " + error)
        }

      };
      fetchStates()
    }
  }, [selectedCountry])

  // console.log("countries" + countries);

  useEffect(() => {
    if (states) {
      const fetchCities = async () => {
        try {
          const response = await fetch(` https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
          const data = await response.json();
          setCities(data)
        } catch (error) {
          console.log("Error while Fetching cities: " + error)
        }
      }
      fetchCities()
    }
  }, [selectedState])


  return (
    <div className="App">
      <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value="">Select Country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!states.length}>
        <option value="">Select State</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!cities.length}>
        <option value="">Select City</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* <h2>
        You selected {selectedCountry}, {selectedState}, {selectedCity}
      </h2> */}

      {selectedCity && (
        <h2>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </h2>
      )}

    </div>
  );
}

export default App;
