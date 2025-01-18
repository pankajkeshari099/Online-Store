import axios from 'axios';
import { toast } from "react-toastify";

const addToCart = async (product) => {
    let token = localStorage.getItem('token');
    try {
        let data = {
            items: [{
                productId: product._id,
                price: product.price,
                quantity: 1
            }],
        }
        const response = await axios.post('/api/cart/saveCart', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            toast.success(response.data.message);
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            toast.warning(error.response.data.message);
            return;
        }
        console.error(error);
        toast.error(error.response ? error.response.data.message : 'An error occurred.');
    }
};

export default addToCart;