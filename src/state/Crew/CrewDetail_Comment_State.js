import { atom } from "recoil";

export const CrewDetail_Comment = atom({
    key: 'CrewDetail_Comment', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const CrewDetail_Comment_Order = atom({
    key: 'CrewDetail_Comment_Order', // unique ID (with respect to other atoms/selectors)
    default: [0], // default value (aka initial value)
});