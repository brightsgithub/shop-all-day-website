import {serverUrl} from '../appConstants.js'

const productStockService = {
    async getProductStocksByCategory(categoryId) {
        try {
            const response = await fetch(serverUrl+'/storage/v1/product-stock/category/'+categoryId);
            if (!response.ok) {
                throw new Error('Failed to fetch Product Stock '+response.statusText);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default productStockService;