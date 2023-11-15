import axios from "axios";

export const SmsSendCode = async (number) =>{
    try{
        const sendCode = {
            "phone_number": number,
        }
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/sms/send-code`,sendCode);
        return response;   

    } catch(error){
        return error
    }
}

export const SmsCheckCode = async (otp,number) =>{
    try{
        const sendCode = {
            "phone_number": number,
            "code":otp
        }
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/sms/check-code`,sendCode);
        
        return response;   

    } catch(error){
        return error
    }
}

export const UserRegister = async (name,number,nickname,crew,terms,privacy,marketing) =>{
    try{
        const sendCode = {
            "realname":name,
            "phonenumber":number,
            "nickname":nickname,
            "runningCrew" : crew,
            "termsAccepted" : terms,
            "privacyAccepted" : privacy,
            "marketingAccepted" : marketing
          }
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/signup`,sendCode);

        return response;   

    } catch(error){
        return error
    }
}

export const UserLogin = async (number) =>{
    try{
        const sendCode = {
            "phonenumber": number
        }
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/login`,sendCode);

        return response;   
    } catch(error){
        return error
    }
}

