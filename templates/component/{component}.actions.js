export const {NAME}_FETCH_LIST = '{NAME}_FETCH_LIST';
export const {NAME}_FETCH_LIST_SUCCESS = '{NAME}_FETCH_LIST_SUCCESS';
export const {NAME}_FETCH_LIST_FAILURE = '{NAME}_FETCH_LIST_FAILURE';

export const {NAME}_FETCH = '{NAME}_FETCH';
export const {NAME}_FETCH_SUCCESS = '{NAME}_FETCH_SUCCESS';
export const {NAME}_FETCH_FAILURE = '{NAME}_FETCH_FAILURE';

export const {NAME}_CREATE = '{NAME}_CREATE';
export const {NAME}_CREATE_SUCCESS = '{NAME}_CREATE_SUCCESS';
export const {NAME}_CREATE_FAILURE = '{NAME}_CREATE_FAILURE';

export const {NAME}_UPDATE = '{NAME}_UPDATE';
export const {NAME}_UPDATE_SUCCESS = '{NAME}_UPDATE_SUCCESS';
export const {NAME}_UPDATE_FAILURE = '{NAME}_UPDATE_FAILURE';

export const {NAME}_DELETE = '{NAME}_DELETE';
export const {NAME}_DELETE_SUCCESS = '{NAME}_DELETE_SUCCESS';
export const {NAME}_DELETE_FAILURE = '{NAME}_DELETE_FAILURE';

export const fetch{Name}s = payload => ({ type: {NAME}_FETCH_LIST, payload })
export const fetch{Name}sSuccess = payload => ({ type: {NAME}_FETCH_LIST_SUCCESS, payload })
export const fetch{Name}sFailure = payload => ({ type: {NAME}_FETCH_LIST_FAILURE, payload })

export const fetch{Name} = payload => ({ type: {NAME}_FETCH, payload })
export const fetch{Name}Success = payload => ({ type: {NAME}_FETCH_SUCCESS, payload })
export const fetch{Name}Failure = payload => ({ type: {NAME}_FETCH_FAILURE, payload })

export const create{Name} = payload => ({ type: {NAME}_CREATE, payload })
export const create{Name}Success = payload => ({ type: {NAME}_CREATE_SUCCESS, payload })
export const create{Name}Failure = payload => ({ type: {NAME}_CREATE_FAILURE, payload })

export const update{Name} = payload => ({ type: {NAME}_UPDATE, payload })
export const update{Name}Success = payload => ({ type: {NAME}_UPDATE_SUCCESS, payload })
export const update{Name}Failure = payload => ({ type: {NAME}_UPDATE_FAILURE, payload })

export const delete{Name} = payload => ({ type: {NAME}_DELETE, payload })
export const delete{Name}Success = payload => ({ type: {NAME}_DELETE_SUCCESS, payload })
export const delete{Name}Failure = payload => ({ type: {NAME}_DELETE_FAILURE, payload })
