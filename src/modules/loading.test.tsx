import loading, * as counterActions from './loading';

describe('loading', () => {
    describe('actions', () => {
        it('should create actions', () => {
            const expectedActions = [
                { type: 'loading/START_LOADING', payload: 'start' },
                { type: 'loading/FINISH_LOADING', payload: 'finish' },
            ];
            const actions = [
                counterActions.startLoading('start'),
                counterActions.finishLoading('finish'),
            ];
            expect(actions).toEqual(expectedActions);
        });
    });
    describe('reducer', () => {
        let state = loading(undefined, { type: '', payload: '' });
        it('should start loading ', () => {
            state = loading(state, counterActions.startLoading('start'));
            expect(state).toHaveProperty('start', true);
        });
        it('should finish loading ', () => {
            state = loading(state, counterActions.startLoading('finish'));
            expect(state).toHaveProperty('finish', true);
        });
    });
});
