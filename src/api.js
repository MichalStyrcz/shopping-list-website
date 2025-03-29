import axios from 'axios'

const ProductsApi = axios.create({
    baseURL: 'https://shopping-list-api-etcda4dhbsc2frb4.polandcentral-01.azurewebsites.net/'
});

export default ProductsApi;