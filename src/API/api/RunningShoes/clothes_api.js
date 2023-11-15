import axios from "axios";

export const fetchPopularClothes = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/clothes/hot`);
        return response.data;   

    } catch(error){
        return error
    }
}

export const fetchClothesDetail = async (id,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/detail/${id}`,header);
        return response.data.shoes;   

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

export const fetchBrandShoes = async (brand) =>{
    try{
        const query = `?brand=${brand}`
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/clothes/all${query}`);
        return response.data;   
    }
    catch(error){
        return error
    }
}

export const fetchCategoryShoes = async (brand) =>{
    try{
        const query = `?category=${brand}`
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/clothes/all${query}`);
        return response.data;   
    }
    catch(error){
        return error
    }
}

export const fetchSearchShoes = async (query) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/clothes/all?${query}`);
        return response.data;   
    }
    catch(error){
        return error
    }
}

export const fetchShoesDetail = async (id) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/clothes/detail/${id}`);
        return response.data;   
    }
    catch(error){
        return error
    }
}