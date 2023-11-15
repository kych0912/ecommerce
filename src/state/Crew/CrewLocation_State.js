import {atom} from 'recoil';

export const CrewLocation_List =atom({
    key:'CrewLocation_List',
    default:[],
})

export const CrewLocation_Loading =atom({
    key:'CrewLocation_Loading',
    default:true,
})

export const CrewLocation_Error =atom({
    key:'CrewLocation_Error',
    default:undefined,
})

export const CrewLocation_Location = atom({
    key: 'CrewFilter_Location_Location', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
})
