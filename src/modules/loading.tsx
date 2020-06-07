import { createAction } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING' as const;
const FINISH_LOADING = 'loading/FINISH_LOADING' as const;

export const startLoading = createAction(
    START_LOADING,
    (requestType: string) => requestType,
);

export const finishLoading = createAction(
    FINISH_LOADING,
    (requestType: string) => requestType,
);

type LoadingAction =
    | ReturnType<typeof startLoading>
    | ReturnType<typeof finishLoading>;

interface LoadingState {
    [variable: string]: boolean;
}
const initialState: LoadingState = {};

const loading = (state = initialState, action: LoadingAction): LoadingState => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, [action.payload]: true };
        case FINISH_LOADING:
            return { ...state, [action.payload]: false };
        default:
            return { ...state };
    }
};

export default loading;
