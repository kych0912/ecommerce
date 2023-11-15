import {atom} from 'recoil';

export const RunnerTalkFiltering_LoadingAll =atom({
    key:'RunnerTalkFiltering_LoadingAll',
    default:true,
})

export const RunnerTalkFiltering_Category =atom({
    key:'RunnerTalkFiltering_Category',
    default:[],
})

export const RunnerTalkFiltering_List =atom({
    key:'RunnerTalkFiltering_List',
    default:[],
})

export const RunnerTalkFiltering_Error =atom({
    key:'RunnerTalkFiltering_Error',
    default:undefined,
})

export const RunnerTalkFiltering_FilterLoading = atom({
    key: 'RunnerTalkFiltering_Filter', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
})

export const RunnerTalkFiltering_ListLoading = atom({
    key: 'RunnerTalkFiltering_ListLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
})
