import { useEffect, useState } from "react"
import { SyncLoader } from 'react-spinners'

const WeatherComp = () => {

    const [cityName, setCityName] = useState("")
    const [weatherData, setWeatherData] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    async function getweatherData() {
        try {
            setLoading(true)
            setWeatherData("")

            let API_KEY = process.env.REACT_APP_API_KEY;
            console.log(API_KEY);
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)

            let result = await response.json()

            if (result.cod == "404") {
                setError(result.message)
                setWeatherData("")
            }
            if (result.cod !== "400" && result.cod !== "404") {
                setWeatherData(result)
                setError("")
            }

            console.log(result);
        } catch (error) {
            console.log("Error message is ", error);
            setError(error.message)

        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getweatherData()
    }, [cityName])


    function tempChange() {
        let tempData = weatherData?.main?.temp
        let tempChangeData = Math.floor(tempData - 273)
        return tempChangeData
    }
    let tempChanger = tempChange()


    return (<>

        <div className="container">
            <div className="main-container">
                <div>
                    <input type="text" className="form__field" placeholder="Name" name="name" id='name' required value={cityName} onChange={(e) => setCityName(e.target.value)} />
                    <label for="name" className="form__label">Enter Your City</label>

                </div>
                <span className="loading">
                    {loading && <SyncLoader
                        color="#ffff"
                        cssOverride={{}}
                        margin={10}
                        size={5}
                        speedMultiplier={3}
                    />}
                </span>
                <span className="error">
                    {error && <p>Error: {error}</p>}
                </span>

                {weatherData && (
                    <div>
                        <div>
                            <p >
                                <span className="temperature">
                                    {tempChanger}°
                                </span>
                                <span style={{ fontFamily: "cursive", color: "rgb(225, 218, 215)", margin: "-15px" }}>C</span>
                            </p>
                            <h3 className="city-name">{weatherData?.name}</h3>
                        </div>
                        <div className="image-div">{
                            weatherData.weather &&
                            <img src={`${weatherData?.weather[0].icon}.svg`} alt="" className="images" />
                        }
                        </div>
                        <div className="discraption">
                            {weatherData.weather && <div className="discraption-item item1"> <p>description: {weatherData.weather[0].description}</p>
                            </div>}

                            {weatherData.main && <div className="discraption-item item2">  <p>humidity: {weatherData?.main?.humidity}</p>
                            </div>}
                            {weatherData.sys && <div className="discraption-item item3">  <p>Country: {weatherData?.sys?.country}</p>
                            </div>}


                        </div>

                    </div>)}

            </div>

        </div >

    </>)

}

export default WeatherComp