import { Store as ReduxStore } from 'redux';

declare global {
    interface Store {
        userlist: any;
    }

    interface Window {
        store?: ReduxStore<Store>;
    }
}
