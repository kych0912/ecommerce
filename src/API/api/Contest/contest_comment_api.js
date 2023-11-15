import axios from "axios";

export const FetchContestCommentPopular = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/contest/comment/${id}/popular`,header);
        return response.data.comments.reverse();   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const FetchContestCommentLatest = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/contest/comment/${id}/latest`,header);
        return response.data.comments.reverse();   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const FetchContestCommentReplies = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/contest/comment/${id}/replies`,header);
        return response.data;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const ContestCommentLike = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = null;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/contest/comment/${id}/like`,request,header);
        return response.data.message;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}


export const AddContestComment = async (sessionid,data) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = data;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/contest/comment`,request,header);
        return response.data;   
    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const AddContestChildComment = async (sessionid,data) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = data;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/contest/comment`,request,header);
        return response.data;   
    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}