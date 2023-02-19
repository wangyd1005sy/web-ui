import http from '../utils/http/http.js'

const getProvinceList = (data) => {
    return http.get("/province/getProvinceList", data);
};
export default {
    getProvinceList
}