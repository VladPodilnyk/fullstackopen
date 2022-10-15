import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { Header, Button } from './common'


const SearchField = (props) => {
    return (
        <div>find: <input onChange={props.onSearchValueChange} />
        </div>
    );
}

const DisplayWeather = (props) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const [weatherData, setWeatherData] = useState(null);

    const weatherReportUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${apiKey}&units=metric`;

    useEffect(() => {
        axios.get(weatherReportUrl).then(response => {
            setWeatherData(response.data);
        })
    }, []);

    if (weatherData !== null) {
        const description = weatherData.weather[0].description
        const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        return (
            <>
            <Header name={`Weather in ${props.capital}`} />
            <p>{description}</p>
            <p>temperature {weatherData.main.temp} Celcius</p>
            <p>feels like {weatherData.main.feels_like} Celcius</p>
            <img src={iconUrl} alt={description} />
            <p>wind {weatherData.wind.speed} m/s</p>
            </>
        );
    }

}

const DisplayCountryInfo = (props) => {
    const languages = Object.values(props.countryInfo.languages);
    const svgImage = props.countryInfo.flags.svg;
    return (
        <>
        <Header name={props.countryInfo.name.official} />
        <p>capital {props.countryInfo.capital[0]}</p>
        <p>area {props.countryInfo.area}</p>
        <h3>languages</h3>
        <ul>
            {languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={svgImage} alt='flag' width={400} height={200}/>
        <DisplayWeather capital={props.countryInfo.capital[0]}/>
        </>
    );
}

const DisplayListItem = (props) => (
    <li>{props.text} <Button text='show' onClick={props.onShowClick} /></li>
)

const Display = (props) => {
    const dataLength = props.filteredData.length 
    if (dataLength > 10) {
        return <p>Too many matches, please specify another filter.</p>
    }

    if (dataLength == 1) {
        return <DisplayCountryInfo countryInfo={props.filteredData[0]}/>;
    }

    return (
        <ul>
            {props.filteredData.map(value => {
                console.log('debug filterd data', value);
                const name = value.name.official;
                return <DisplayListItem key={name} text={name} onShowClick={props.onShowClick(value)} />
            })}
        </ul>
    );
}

const CountrySearchApp = () => {
    const [filteredData, setFilteredData] = useState([]);
    const dataContainer = useRef([]);
    const searchInput = useRef('');

    // FIXME: we are fetching to much data here...
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then(response => {
            console.log('prefetch countries data');
            dataContainer.current = response.data;
            setFilteredData(response.data);
        });
    }, []);

    // Checking page reload event
    useEffect(() => {
        if (window.performance) {
            if (performance.navigation.type == 1) {
                searchInput.current = ''
            }
        }
    });

    // NOTE: due to a fact that I've used a simple event handler instead of useState hook
    //       it is possible that user will see a previous input after page reload, 
    //       but nothing will happening with an application. 
    const onSearchInput = (event) => {
        const input = event.target.value.toLowerCase();
        searchInput.current = input;
        const filterResult = dataContainer.current.filter(value => value.name.official.toLowerCase().includes(input));
        setFilteredData(filterResult);
    };

    const onShowClick = (countryInfo) => {
        const f = () => {
            console.log('country info', countryInfo);
            setFilteredData([countryInfo]);
        }
        return f;
    };

    return (
        <>
        <Header name='country search app'/>
        <SearchField onSearchValueChange={onSearchInput}/>
        <Display filteredData={filteredData} onShowClick={onShowClick}/>
        </>
    );
}

export default CountrySearchApp;