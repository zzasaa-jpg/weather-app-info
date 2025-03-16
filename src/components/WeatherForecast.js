import React, { useEffect, useState } from 'react';
import Loader from './Loader';

function FetchWeather({ search }) {
    let [weather, setWeather] = useState()
    let [error, setError] = useState()
    let [loader, setLoader] = useState(true)
    
    useEffect(() => {
        let fetchCurrentWeather = async () => {
            try {
                let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${process.env.REACT_APP_API_KEY}`);
                let data = await response.json();
                setWeather(data);
                setLoader(false);
            } catch (error) {
                console.log(error);
                setLoader(false)
                setError(error)
            }
        }

        fetchCurrentWeather();
    }, [search]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!weather || !weather.list || weather.list.length === 0) {
        return <div className=' min-h-screen'>
            <h1 className='pt-[10px] text-center text-[22px] sm:text-[24px] md:text-[28px] lg:text-[30px] text-white'>
                No weather data available.
            </h1>
        </div>;
    }

    return (
        <div className=' min-h-auto '>
            <h1 className='pt-[10px] text-center text-[22px] sm:text-[24px] md:text-[28px] lg:text-[30px] text-white'>
                Weather Forecast
            </h1>
            <div className=' flex justify-center items-center h-full my-[18px] mx-[6px] lg:mx-0'>
                <section className=' flex justify-center items-center flex-col '>
                    {loader ? (
                        <Loader />
                    ) : (
                        <>
                        {/*  City details */}
                            <div className=' mb-2 bg-[#ffffff4c] text-white shadow-2xl  w-[350px] h-[200px] p-[9px] sm:w-[500px] sm:h-[220px] md:w-[550px] md:h-[250px] lg:w-[600px] lg:h-[280px] rounded-[10px] lg:p-[15px] '>
                                <h1 className=' underline text-[15px] sm:text-[18px] md:text-[20px] lg:text-[20px]'>Information of City.</h1>
                                <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Date & Time: {weather.list[0].dt_txt}</h1>
                                <h1 className='text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Country: {weather.city.country}</h1>
                                <h1 className='text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Sunrise: {new Date(weather.city.sunrise * 1000).toLocaleTimeString()}</h1>
                                <h1 className='text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Sunset: {new Date(weather.city.sunset * 1000).toLocaleTimeString()}</h1>
                                <h1 className='text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Population: {weather.city.population}</h1>
                                <h1 className='text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Name: {weather.city.name}</h1>
                            </div>

                            {weather.list.map((item, index) => {
                                return (
                                    //  Weather forecast details
                                    <div className='flex ' key={index}>
                                        <div key={index} className='bg-[#ffffff36] text-white shadow-2xl w-[350px] h-[300px] my-[10px] px-[10px] sm:w-[500px] sm:h-[340px]  md:w-[550px] md:h-[390px] lg:w-[600px] lg:h-[430px] rounded-[10px] lg:px-[15px] '>
                                            <div className='flex items-center justify-between my-1'>
                                                {/* Render temperature */}
                                                <div className=' flex justify-center items-start flex-col'>
                                                    <div className=' flex justify-start items-center'>
                                                        <h1 className='flex text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px]'><ion-icon name="thermometer-outline"></ion-icon></h1>
                                                        <h1 className=' text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px]'>Temperature: {parseInt(item.main.temp - 273.15)}* C</h1>
                                                    </div>
                                                    <div className=' flex justify-start items-center gap-1 lg:gap-4'>
                                                        <h1 className='flex text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px]'><ion-icon name="cloud-outline"></ion-icon></h1>
                                                        <h1 className=' text-[20px] sm:text-[25px] md:text-[30px] lg:text-[30px]'>Weather: {item.weather[0].main}</h1>
                                                    </div>
                                                </div>
                                                <h1 className='flex outline rounded-[10px] text-[54px] sm:text-[70px] md:text-[80px] lg:text-[100px]'><ion-icon name="cloud-circle-outline"></ion-icon></h1>
                                            </div>

                                            <hr></hr>

                                            <div className='flex gap-8 pt-2'>
                                                {/* Weather forecast details */}
                                                <div className=''>
                                                    <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Date & Time: {item.dt_txt}
                                                    </h1>
                                                    <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Desc: {item.weather[0].description}</h1>
                                                    <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Humidity: {item.main.humidity}%</h1>
                                                    <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Sea_level: {item.main.sea_level ? item.main.sea_level : "N/A"}</h1>
                                                    <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Grnd_level: {item.main.grnd_level ? item.main.grnd_level : "N/A"}</h1>
                                                    <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Visibility: {parseInt(item.visibility / 1000)}Km</h1>
                                                    <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Wind: {parseInt(item.wind.speed * 3.6)}Km/h</h1>
                                                    <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Clouds: {item.clouds.all}%
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}

export default FetchWeather