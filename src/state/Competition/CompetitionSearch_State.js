import {atom} from 'recoil';

export const CompetitionFilter_Month = atom({
    key: 'CompetitionFilter_Month', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const CompetitionFilter_Course = atom({
    key: 'CompetitionFilter_Course', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const CompetitionFilter_Location = atom({
    key: 'CompetitionFilter_Location', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const CompetitionFilter_Keywords = atom({
    key: 'CompetitionFileter_Keywords', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const CompetitionList = atom({
    key: 'CompetitionList', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const CompetitionSearch_Error = atom({
    key: 'CompetitionSearch_Error', // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});