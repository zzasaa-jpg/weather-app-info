import React, { useEffect, useState } from 'react';
import Loader from './Loader';

function FetchWeather({ search }) {
    let [weather, setWeather] = useState()
    let [error, setError] = useState()
    let [loader, setLoader] = useState(true)
    useEffect(() => {
        let fetchCurrentWeather = async () => {
            try {
                let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}`);
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

    return (
        <div className=' min-h-screen'>
            <h1 className='pt-[10px] text-center text-[22px] sm:text-[24px] md:text-[28px] lg:text-[30px] text-white'>
                Current Weather
            </h1>
            <div className=' flex justify-center items-center h-full my-[20px] mx-[6px] lg:mx-0'>

                <section className=' bg-[#ffffff4c] text-white shadow-2xl w-[350px] h-[300px] p-[9px] sm:w-[500px] sm:h-[320px] md:w-[550px] md:h-[360px] lg:w-[600px] lg:h-[400px] rounded-[10px] lg:p-[15px] '>
                    {loader ? (
                        <Loader />
                    ) : (
                        <>
                            {weather && weather.weather && weather.weather.length > 0 && weather.main.temp !== 'undefined' ? (
                                <>
                                    <div className='flex items-center gap-20 sm:gap-40 md:gap-36 lg:gap-20 pb-1'>
                                        <div className=' flex justify-center items-start flex-col'>
                                            <div className=' flex justify-start items-center'>
                                                <h1 className='flex text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px]'><ion-icon name="thermometer-outline"></ion-icon></h1>
                                                <h1 className=' text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px]'>Tempture: {parseInt(weather.main.temp - 273.15)}* C</h1>
                                            </div>

                                            <div className=' flex justify-start items-center gap-1 lg:gap-4'>
                                                <h1 className='flex text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px]' ><ion-icon name="cloud-outline"></ion-icon></h1>
                                                <h1 className=' text-[20px] sm:text-[25px] md:text-[30px] lg:text-[30px]'>Weather: {weather.weather[0].main}
                                                </h1>
                                            </div>
                                        </div>
                                        <h1 className='flex outline rounded-[10px] text-[54px] sm:text-[70px] md:text-[80px] lg:text-[100px]'><ion-icon name="cloud-circle-outline"></ion-icon></h1>

                                    </div>

                                    <hr></hr>

                                    {/* current weather details */}
                                    <div className='flex gap-8 pt-2 '>
                                        <div>
                                            <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Desc: {weather.weather[0].description}
                                            </h1>

                                            <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Humidity: {weather.main.humidity}%
                                            </h1>

                                            <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Clouds: {weather.clouds.all}%
                                            </h1>

                                            <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Sea_level: {weather.main.sea_level ? weather.main.sea_level : "N/A"}
                                            </h1>

                                            <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px] '>Grnd_level: {weather.main.grnd_level ? weather.main.grnd_level : "N/A"}</h1>

                                            <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px] '>Visibility: {parseInt(weather.visibility / 1000)}Km</h1>

                                            <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px] '>Wind: {parseInt(weather.wind.speed * 3.6)}Km/h
                                            </h1>
                                        </div>

                                        <div>
                                            <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Name:{weather.name}
                                            </h1>

                                            <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Country:  {weather.sys.country}
                                            </h1>

                                            <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                                            </h1>

                                            <h1 className=' text-[18px] sm:text-[20px] md:text-[23px] lg:text-[25px]'>Sunset: {new Date(weather.sys.sunset).toLocaleTimeString()}
                                            </h1>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <h1 className=' text-[30px] text-center'>
                                    No data
                                </h1>
                            )}
                        </>

                    )}
                </section>

            </div>
        </div>
    )
}

export default FetchWeather;