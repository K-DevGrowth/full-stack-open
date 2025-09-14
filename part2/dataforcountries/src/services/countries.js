import axios from "axios";

const baseUsrl = `https://studies.cs.helsinki.fi/restcountries/api/all`;

const getAll = () => {
    const request = axios.get(`${baseUsrl}`);
    return request.then(response => response.data);
}

export default { getAll }