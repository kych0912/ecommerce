import {atom} from 'recoil';

export const ShoesFilter_Brand = atom({
    key: 'ShoesFilter_Brand', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const ShoesFilter_Feature = atom({
    key: 'ShoesFilter_Feature', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const ShoesFilter_Useage = atom({
    key: 'ShoesFilter_Useage', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const ShoesFilter_Price = atom({
    key: 'ShoesFilter_Price', // unique ID (with respect to other atoms/selectors)
    default: [5,100], // default value (aka initial value)
});

export const ShoesFilter_Keyword = atom({
    key: 'ShoesFilter_Keyword', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const ShoesList = atom({
    key: 'ShoesList', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const ShoesSearch_Error = atom({
    key: 'ShoesSearch_Error', // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});