import { atom } from "recoil";

export const RunnerTalk_Write_Header = atom({
    key: 'RunnerTalk_Write_Header', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});

export const RunnerTalk_Write_Content = atom({
    key: 'RunnerTalk_Write_Content', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});

export const RunnerTalk_Write_Category = atom({
    key: 'RunnerTalk_Write_Category', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});

export const RunnerTalk_Write_Image = atom({
    key: 'RunnerTalk_Write_Image', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});