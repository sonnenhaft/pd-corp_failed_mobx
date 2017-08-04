export const ASSET_FETCH_LIST = 'ASSET_FETCH_LIST'
export const ASSET_FETCH_LIST_SUCCESS = 'ASSET_FETCH_LIST_SUCCESS'
export const ASSET_FETCH_LIST_FAILURE = 'ASSET_FETCH_LIST_FAILURE'

export const ASSET_FETCH = 'ASSET_FETCH'
export const ASSET_FETCH_SUCCESS = 'ASSET_FETCH_SUCCESS'
export const ASSET_FETCH_FAILURE = 'ASSET_FETCH_FAILURE'

export const ASSET_CREATE = 'ASSET_CREATE'
export const ASSET_CREATE_SUCCESS = 'ASSET_CREATE_SUCCESS'
export const ASSET_CREATE_FAILURE = 'ASSET_CREATE_FAILURE'

export const ASSET_UPDATE = 'ASSET_UPDATE'
export const ASSET_UPDATE_SUCCESS = 'ASSET_UPDATE_SUCCESS'
export const ASSET_UPDATE_FAILURE = 'ASSET_UPDATE_FAILURE'

export const ASSET_DELETE = 'ASSET_DELETE'
export const ASSET_DELETE_SUCCESS = 'ASSET_DELETE_SUCCESS'
export const ASSET_DELETE_FAILURE = 'ASSET_DELETE_FAILURE'

export const fetchAssets = payload => ({ type: ASSET_FETCH_LIST, payload })
export const fetchAssetsSuccess = payload => ({ type: ASSET_FETCH_LIST_SUCCESS, payload })
export const fetchAssetsFailure = payload => ({ type: ASSET_FETCH_LIST_FAILURE, payload })

export const fetchAsset = payload => ({ type: ASSET_FETCH, payload })
export const fetchAssetSuccess = payload => ({ type: ASSET_FETCH_SUCCESS, payload })
export const fetchAssetFailure = payload => ({ type: ASSET_FETCH_FAILURE, payload })

export const createAsset = payload => ({ type: ASSET_CREATE, payload })
export const createAssetSuccess = payload => ({ type: ASSET_CREATE_SUCCESS, payload })
export const createAssetFailure = payload => ({ type: ASSET_CREATE_FAILURE, payload })

export const updateAsset = payload => ({ type: ASSET_UPDATE, payload })
export const updateAssetSuccess = payload => ({ type: ASSET_UPDATE_SUCCESS, payload })
export const updateAssetFailure = payload => ({ type: ASSET_UPDATE_FAILURE, payload })

export const deleteAsset = payload => ({ type: ASSET_DELETE, payload })
export const deleteAssetSuccess = payload => ({ type: ASSET_DELETE_SUCCESS, payload })
export const deleteAssetFailure = payload => ({ type: ASSET_DELETE_FAILURE, payload })
