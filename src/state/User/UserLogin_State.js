import {atom} from 'recoil';

export const User_Name = atom({
    key: 'User_Name', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});

export const User_Number = atom({
    key: 'User_Number', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});

export const User_NickName = atom({
    key: 'User_NickName', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});

export const User_Crew = atom({
    key: 'User_Crew', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});