import axios from "axios";

export const fetchCrewAll = async (query,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningcrew/all${query}`,header);
        return response.data.crew;   

    } catch(error){
        return error
    }
}

export const fetchCrewLocation = async (value,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningcrew/${value}`,header);
        return response.data.crew;   

    } catch(error){
        return error
    }
}

export const fetchCrewDetail = async (id,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningcrew/detail/${id}`,header);
        return response.data.crew_detail;   

    } catch(error){
        return error
    }
}

export const runningCrewBookMark = async (id,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const body ={
                "postId":id
            }
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningcrew/bookmark`,body,header);
        return response;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const fetchCrewSearch = async (query,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningcrew/search${query}`,header);
        return response.data.crew;   

    } catch(error){
        return error
    }
}

export const AddCrew = async (data,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningcrew/manage`,data,header);
        return response.data.message;   

    } catch(error){
        return error
    }
}