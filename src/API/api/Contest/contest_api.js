import axios from "axios";
export const fetchMonthContest = async (count) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/contest/month/${count}`);
        return response.data.month_contest;   

    } catch(error){
        return error
    }
}

export const fetchAcceptableContest = async (count) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/contest/acceptable/${count}`);
        return response.data.acceptable_contest;   
    } catch(error){
        return error
    }
}

export const fetchCalendarContest = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/contest/calendar`);
        return response.data.calendar;   

    } catch(error){
        return error
    }
}

export const fetchPopularContest = async (count) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/contest/popular/${count}`);
        return response.data.contest;   

    } catch(error){
        return error
    }
}

export const fetchContestDetail = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/contest/detail/${id}`,header);
        return response.data.contest;   

    } catch(error){
        return error
    }
}

export const fetchSearchContest = async (query) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/contest/search${query}`);
        return response.data.contest;   

    } catch(error){
        return error
    }
}

export const UpdateContestView = async (session,id) =>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/contest/view`,
            {  
                "postId" : id
            }
            ,
            {
            headers:{
                    "Authorization":`Bearer `+`${session}`
                }
            }
        );
        return response.data.contest;   

    } catch(error){
        return error
    }
}

export const ContestBookMark = async (id,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const body ={
                "postId":id
            }
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/contest/bookmark`,body,header);
        return response;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const FetchContestComment = async (id,sessionid) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/contest/comment/${id}`,header);
        return response;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}