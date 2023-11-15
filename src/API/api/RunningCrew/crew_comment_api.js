import axios from "axios";

export const FetchCrewCommentPopular = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningcrew/comment/${id}/popular`,header);
        return response.data.comments.reverse();   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const FetchCrewCommentLatest = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningcrew/comment/${id}/latest`,header);
        return response.data.comments.reverse();   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const FetchCrewCommentReplies = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningcrew/comment/${id}/replies`,header);
        return response.data;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const CrewCommentLike = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = null;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningcrew/comment/${id}/like`,request,header);
        return response.data.message;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}


export const AddCrewComment = async (sessionid,data) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = data;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningcrew/comment`,request,header);
        return response.data;   
    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const AddCrewChildComment = async (sessionid,data) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = data;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningcrew/comment`,request,header);
        return response.data;   
    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}