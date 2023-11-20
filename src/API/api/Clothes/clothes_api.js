import axios from "axios";

export const fetchPopularClothes = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/clothes/hot`);
        return response.data;   

    } catch(error){
        return error
    }
}

export const fetchClothesAll = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/clothes/all`);
        return response.data;   
    }
    catch(error){
        return error
    }
}

export const fetchBrandClothes = async (brand) =>{
    try{
        const query = `?brand=${brand}`
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/clothes/all${query}`);
        return response.data;   
    }
    catch(error){
        return error
    }
}

export const fetchCategoryClothes = async (brand) =>{
    try{
        const query = `?category=${brand}`
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/clothes/all${query}`);
        return response.data;   
    }
    catch(error){
        return error
    }
}

export const fetchSearchClothes = async (query) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/clothes/all?${query}`);
        return response.data;   
    }
    catch(error){
        return error
    }
}

export const fetchClothesDetail = async (id) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/clothes/detail/${id}`);
        return response.data;   
    }
    catch(error){
        return error
    }
}