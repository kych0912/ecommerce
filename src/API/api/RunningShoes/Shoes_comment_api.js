import axios from "axios";

export const FetchRunningshoesCommentPopular = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/comment/${id}/popular`,header);
        return response.data.comments.reverse();   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const FetchRunningshoesCommentLatest = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/comment/${id}/latest`,header);
        return response.data.comments.reverse();   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const FetchRunningshoesCommentReplies = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningshoes/comment/${id}/replies`,header);
        return response.data;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const RunningshoesCommentLike = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = null;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningshoes/comment/${id}/like`,request,header);
        return response.data.message;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}


export const AddRunningshoesComment = async (sessionid,data) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = data;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningshoes/comment`,request,header);
        return response.data;   
    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const AddRunningshoesChildComment = async (sessionid,data) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = data;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningshoes/comment`,request,header);
        return response.data;   
    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}