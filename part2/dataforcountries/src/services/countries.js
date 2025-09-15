import axios from "axios";

const baseUsrl = `https://studies.cs.helsinki.fi/restcountries/api/all`;

const getAll = () => {
    const request = axios.get(`${baseUsrl}`);
    return request.then(response => response.data);
}

const getWeather = (lat, lon) => {
    const apiKey = import.meta.env.VITE_SOME_KEY;
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    return request.then(response => response.data);
}

export default { getAll, getWeather }