import axios from "axios";

const $host = axios.create({
    baseURL: "https://my-json-server.typicode.com/ibrohim74/dacha/",
});
const $authHost = axios.create({
    baseURL: "https://my-json-server.typicode.com/ibrohim74/dacha/",
});

export {$host , $authHost}