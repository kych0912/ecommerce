import {atom} from 'recoil';

export const CrewMain_List =atom({
    key:'CrewMain_List',
    default:[],
})

export const CrewMain_Loading =atom({
    key:'CrewMain_Loading',
    default:true,
})

export const CrewMain_Error =atom({
    key:'CrewMain_Error',
    default:undefined,
})

export const CrewMain_Location = atom({
    key: 'CrewFilter_Location', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
})

export const CrewMain_CrewBookMark = atom({
    key: 'CrewMain_CrewBookMark', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
});

