import {
    ICollectionFailureAction,
    ICollectionStartAction,
    ICollectionState,
    ICollectionSuccessAction,
} from 'src/modules/web-shop/redux/shop/IShop';
import { FETCH_COLLECTIONS_FAILURE, FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS } from './shop.types';

type IReducer = ICollectionFailureAction & ICollectionStartAction & ICollectionSuccessAction;

const INITIAL_STATE: ICollectionState = {
    collections: null,
    errorMessage: null,
    isFetching: false,
};

const shopReducer = (state = INITIAL_STATE, action: IReducer) => {
    switch (action.type) {
        case FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                collections: action.payload,
                errorMessage: null,
                isFetching: false,
            };
        case FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isFetching: false,
            };
        default:
            return state;
    }
};

export { shopReducer };
