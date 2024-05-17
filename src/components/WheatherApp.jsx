import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import clouds from "../assets/images/clouds.png"
import wind from "../assets/images/wind.png"
import rain from "../assets/images/rain.png"
import snow from "../assets/images/snow.png"
import mist from "../assets/images/mist.png"
import drizzle from "../assets/images/drizzle.png"
import clear from "../assets/images/clear.png"

import humidityIcon from "../assets/images/humidity.png"
const WheatherApp = () => {
    const [cityName, setCityName] = useState("Chennai")
    const [temp, setTemp] = useState(0)
    const [humidity, setHumdity] = useState(0)
    const [windSpeed, setWindspeed] = useState(0);
    const [cityNotfound, setCityNotfound] = useState(false)
    const [img, setImg] = useState(clouds)
    const apiKey = 'f620be15a57edf3cefdf3d3637a06d8c'



    async function search() {
        const Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`

        try {
            const data = await fetch(Url)
            const result = await data.json();
            if (result.cod == '404') setCityNotfound(true);

            // true statement
            setTemp(Math.round(result.main.temp))
            setHumdity(result.main.humidity)
            setWindspeed(Math.round(result.wind.speed))

            switch (result.weather[0].main) {
                case 'Clouds':
                    setImg(clouds)
                    break;
                case 'Drizzle':
                    setImg(drizzle)
                    break;
                case "Rain":
                    setImg(rain)
                    break;
                case "Snow":
                    setImg(snow)
                    break;
                case "Mist":
                    setImg(mist)
                    break;
                case "Clear":
                    setImg(clear)
                    break;
            }
            setCityNotfound(false)
        } catch (error) {
            console.error(`Error occured: ${error.message}`)
        }
    }
    useEffect(() => {
        search()
    }, [])

    function handleInput(e) {
        setCityName(e.target.value)
    }

    // handle search btn
    function handleSearch() {
        if (cityName.trim() !== '') {
            search()
        }
    }
    function handleEnter(e) {
        if (e.key === "Enter" && cityName.trim() != '') {
            search()
        }
    }


    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-700 to-blue-900 flex items-center justify-center '>
            <div className='border rounded-xl bg-gradient-to-tr from-slate-900 to-zinc-700 shadow-md shadow-slate-950'>

                {/* search bar */}
                <div className='flex p-6'>
                    <input type="text" placeholder='search City' value={cityName} onKeyDown={(e) => handleEnter(e)} onChange={(e) => handleInput(e)} className='px-2 py-1 font-semibold rounded-md font-nunito' />
                    <div className='bg-black flex items-center justify-center p-2 rounded-full'>
                        <button onClick={handleSearch} >
                            <MagnifyingGlassIcon className='text-white h-5' />
                        </button>
                    </div>
                </div>
                {/*icon container */}
                <div className=' flex justify-center'>
                    <img src={img} className='h-24' />
                </div>

                {/* celcius degree*/}

                <div className='flex justify-center items-center gap-2 flex-col'>
                    <h1 className='text-4xl font-Lucky text-white'>{temp}°C</h1>
                    {cityNotfound ? <h1 className='text-xl font-Lucky text-white'>City Not found</h1> : <h1 className='text-3xl font-Lucky text-white'>{cityName}</h1>}
                </div>


                {/* Humidity container */}
                <div className='flex justify-center items-center gap-1 mt-6'>
                    <div className=' flex items-center border-r-2 border-white'>
                        <div className='p-2'>
                            <img src={humidityIcon} className='h-9' />
                        </div>
                        <div className='flex flex-col items-center p-2'>
                            <h3 className='text-white font-outfit text-xl'>{humidity}%</h3>
                            <h3 className='text-white font-outfit text-'>Humidity</h3>
                        </div>
                    </div>
                    <div className=' flex items-center border-l-2 border-white'>

                        <div className='p-2'>
                            <img src={wind} className='h-9' />
                        </div>
                        <div className='flex flex-col items-center p-2'>
                            <h3 className='text-white font-outfit text-xl'>{windSpeed}km/h</h3>
                            <h3 className='text-white font-outfit text-base'>wind speed</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WheatherApp
