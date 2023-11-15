import axios from "axios";

export const FetchRunningtalkCommentPopular = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/comment/${id}/popular`,header);
        return response.data.comments.reverse();   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const FetchRunningTalkCommentLatest = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/comment/${id}/latest`,header);
        return response.data.comments.reverse();   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const FetchRunningTalkCommentReplies = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/comment/${id}/replies`,header);
        return response.data;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const RunningTalkCommentLike = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = null;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningtalk/comment/${id}/like`,request,header);
        return response.data.message;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}


export const AddRunningTalkComment = async (sessionid,data) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = data;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningtalk/comment`,request,header);
        return response.data;   
    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const AddRunningTalkChildComment = async (sessionid,data) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const request = data;

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningtalk/comment`,request,header);
        return response.data;   
    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}