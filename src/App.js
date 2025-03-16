// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FetchWeather from './components/FetchWeather';
import WeatherForecast from './components/WeatherForecast'
import Pagenotfound from './components/Page_not_found';
import { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  let [search, setSearch] = useState("")

  return (
    <BrowserRouter>
      <>
        <div className="App bg-[#ff0000] font-exo">
          <Navbar setSearch={setSearch} />
          <Routes>
            <Route path="/" element={<FetchWeather search={search} />} />
            <Route path="weather_forecast" element={<WeatherForecast search={search} />} />
            <Route path='*' element={<Pagenotfound/>}/>
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
