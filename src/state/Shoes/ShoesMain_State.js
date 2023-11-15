import {atom} from 'recoil';

export const ShoesMain_UseageLoading = atom({
    key: 'ShoesMain_UseageLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});

export const ShoesMain_BrandLoading = atom({
    key: 'ShoesMain_BrandLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});

export const ShoesMain_ShoesBookMark = atom({
    key: 'ShoesMain_ShoesBookMark', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
});

export const ShoesMain_FeatureLoading = atom({
    key: 'ShoesMain_FeatureLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});

export const ShoesMain_AllShoesLoading = atom({
    key: 'ShoesMain_AllShoesLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});

export const ShoesMain_Error = atom({
    key: 'ShoesMain_Error', // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});

export const ShoesMain_AllLoading = atom({
    key: 'ShoesMain_AllLoading', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});

export const ShoesDetail_Comment = atom({
    key: 'ShoesDetail_Comment', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const ShoesDetail_Comment_Order = atom({
    key: 'ShoesDetail_Comment_Order', // unique ID (with respect to other atoms/selectors)
    default: [0], // default value (aka initial value)
});