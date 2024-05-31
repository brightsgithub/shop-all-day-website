import {serverUrl} from '../appConstants.js'
const categoryService = {
    async getCategories() {
        try {
            const response = await fetch(serverUrl+'/storage/v1/category');
            if (!response.ok) {
                throw new Error('Failed to fetch categories'); // Updated error message
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getCategoryById(props) {
        try {
            const categoryId = props.category.id;
            const response= await fetch(serverUrl+'/storage/v1/category/'+categoryId);
            if (!response.ok) {
                throw new Error('Failed to fetch category by id '+categoryId);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default categoryService;
