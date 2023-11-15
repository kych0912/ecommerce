import {atom} from 'recoil';

export const RunnerTalkMain_LoadingAll =atom({
    key:'RunnerTalkMain_LoadingAll',
    default:true,
})

export const RunnerTalkMain_Category =atom({
    key:'RunnerTalkMain_Category',
    default:[],
})

export const RunnerTalkMain_List =atom({
    key:'RunnerTalkMain_List',
    default:[],
})

export const RunnerTalkMain_Error =atom({
    key:'RunnerTalkMain_Error',
    default:undefined,
})

export const RunnerTalkMain_FilterLoading = atom({
    key: 'RunnerTalkMain_Filter', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
})

export const RunnerTalkMain_HotLoading = atom({
    key: 'RunnerTalkMain_HotLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
})

export const RunnerTalkMain_ListLoading = atom({
    key: 'RunnerTalkMain_ListLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
})
