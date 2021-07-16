import { base_url } from "../configs";
const { default: axios } = require("axios");

export default axios.create({
    baseURL: base_url
});