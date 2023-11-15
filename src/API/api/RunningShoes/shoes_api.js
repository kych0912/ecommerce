import axios from "axios";

export const fetchPopularShoes = async (count,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/popular/${count}`,header);
        return response.data.shoes;   

    } catch(error){
        return error
    }
}

export const fetchShoesDetail = async (id,session) =>{
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

export const fetchBrandShoes = async (brand,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/brand/${brand}`,header);
        return response.data.shoes;   

    } catch(error){
        return error
    }
}

export const fetchFeatureShoes = async (feature,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/feature/${feature}`,header);
        return response.data.shoes;   
    } catch(error){
        return error
    }
}

export const fetchPurposeShoes = async (feature,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/purpose/${feature}`,header);
        return response.data.shoes;   
    } catch(error){
        return error
    }
}

export const fetchFeatureTag = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/feature-tag`);
        return response.data.tag;   

    } catch(error){
        return error
    }
}

export const fetchBrandTag = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/brand-tag`);
        return response.data.tag;   

    } catch(error){
        return error
    }
}

export const fetchPurPoseTag = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/purpose-tag`);
        return response.data.tag;   

    } catch(error){
        return error
    }
}

export const fetchSearchShoes = async (query,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/search${query}`,header);
        return response.data.shoes;   

    } catch(error){
        return error
    }
}

export const runningShoesBookMark = async (id,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const body ={
                "postId":id
            }
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningshoes/bookmark`,body,header);
        return response;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const fetchUserName = async (session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/users/name`,header);

        return response.data.name;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}