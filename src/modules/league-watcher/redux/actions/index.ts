import axios from 'axios';
import { Dispatch } from 'redux';
import { routes } from 'src/common/globals/routes/routes';
import { showAlert } from 'src/common/state/actions';
import { IShowAlertAction, IToggleProgressBarAction } from 'src/common/state/actions/IActions';
import { AlertType, FETCH_USER, TOGGLE_PROGRESS_BAR } from 'src/common/state/actions/types';
import {
    ILoadMoreAction,
    IMatchHistoryAction,
    ISetPaginationAction,
} from 'src/modules/league-watcher/redux/actions/IActions';
import { FETCH_MATCH_HISTORY, LOAD_MORE, SET_PAGINATION } from 'src/modules/league-watcher/redux/actions/types';

export const fetchMatchHistory = (summonerName: string, position: number) => async (
    dispatch: Dispatch<IMatchHistoryAction | ISetPaginationAction | IToggleProgressBarAction | IShowAlertAction>,
) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: true });

    try {
        dispatch({ type: SET_PAGINATION, payload: { summonerName, position: 0 } });
        const response = await axios.post(routes.api.league, { summonerName, position });

        dispatch({ type: SET_PAGINATION, payload: { summonerName, position } });
        dispatch({ type: FETCH_MATCH_HISTORY, payload: response.data });
        dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false });
    } catch (error) {
        dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false });
        dispatch(showAlert(error.response.data.message, AlertType.error));
    }
};

export const loadMore = (summonerName: string, position: number) => async (
    dispatch: Dispatch<ILoadMoreAction | ISetPaginationAction | IToggleProgressBarAction | IShowAlertAction>,
) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: true });

    try {
        const response = await axios.post(routes.api.league, { summonerName, position });
        dispatch({ type: LOAD_MORE, payload: response.data });
        dispatch({ type: SET_PAGINATION, payload: { summonerName, position } });
        dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false });
    } catch (error) {
        dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false });
        dispatch(showAlert(error.response.data.message, AlertType.error));
    }
};

export const updateFavorites = (summonerName: string, type: string) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: true });

    try {
        const response = await axios.post(routes.api.leagueFavorites, { summonerName, type });
        dispatch({ type: FETCH_USER, payload: response.data });
        dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false });
    } catch (error) {
        dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false });
        dispatch(showAlert(error.response.data.message, AlertType.error));
    }
};
