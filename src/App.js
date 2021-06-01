import {useEffect, useState} from "react";
import countries from 'i18n-iso-countries'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTemperatureHigh, faTemperatureLow, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"))


const App = () => {
    const location = 'Irvine, USA'
    const [apiData, setApiData] = useState()
    const [getState, setGetState] = useState(location)
    const [state, setState] = useState(location)

    const API_KEY = process.env.REACT_APP_API_KEY
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${API_KEY}`

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setApiData(data))
    }, [API_URL])

    const inputHandler = (event) => {
        setGetState(event.target.value)
    }

    const submitHandler = () => {
        setState(getState)
    }

    const kelvinToFarenheit = (k) => {
        return ((k - 273.15) * 1.8 + 32).toFixed(0)
    }

    const renderApiData = !!apiData && apiData.main ? (<div className='card-body text-center'>
        <img src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
             alt='weather status icon'
             className='weather-icon'/>
        <p className='h2'>
            {kelvinToFarenheit(apiData.main.temp)}&deg; F
        </p>
        <p className='h5'>
            <FontAwesomeIcon icon={faMapMarkerAlt}
                             className='fas fa-1x mr-2 text-dark'/>{' '}<strong>{apiData.name}</strong>
        </p>
    </div>) : (<h1>Loading...</h1>)
    return (
        <div className="app">
            <header className='d-flex justify-content-center align-content-center'>
                <h2>React Weather App</h2>
            </header>
            <div className='container shadow'>
                <div className='mt-3 d-flex flex-column justify-content-center align-items-center'>
                    <div className='col-auto'>
                        <label htmlFor='location-name' className='col-form-label'>
                            Enter Location :
                        </label>
                    </div>
                    <div className='col-auto'>
                        <input type='text' id='location-name' className='form-control' onChange={inputHandler}
                               value={getState}/>
                        <button className='btn btn-primary mt-2' onClick={submitHandler}>
                            Search
                        </button>
                    </div>
                </div>
                <div className='card mt-3 mx-auto'>
                    {renderApiData}
                </div>
                <div className='row mt-4'>
                    <div className='col-md-6'>
                        <p>
                            <FontAwesomeIcon icon={faTemperatureLow} className='fas fa-1x mr-2 text-primary'/>{' '}
                            {!!apiData && <strong>{kelvinToFarenheit(apiData.main.temp_min)}&deg; F</strong>}
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faTemperatureHigh} className='fas fa-1x mr-2 text-danger'/>{' '}
                            {!!apiData && <strong>{kelvinToFarenheit(apiData.main.temp_max)}&deg; F</strong>}
                        </p>
                    </div>
                    <div className='col-md-6'>
                        <p>
                            {' '}
                            <strong>{!!apiData && apiData.weather[0].main}</strong>
                        </p>
                        {!!apiData && <p>
                            <strong>
                                {' '}
                                {countries.getName(apiData.sys.country, 'en', {
                                    select: 'official'
                                })}
                            </strong>
                        </p>}
                    </div>
                </div>
            </div>
            <footer className='footer fw-bold'>
                &copy; React Weather App
            </footer>
        </div>
    );
}

export default App;
