import {serverUrl} from '../appConstants.js'

const productTypeService = {
    async getProductTypesByCategory(categoryId) {
        try {
            const response = await fetch(serverUrl+'/storage/v1/product-type/category/'+categoryId);
            if (!response.ok) {
                throw new Error('Failed to fetch Product Types '+response.statusText);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default productTypeService;