import { createStore } from 'redux';
import { createAction } from './actions';
import counterReducer from './reducer';
import ReactDOM from 'react-dom/client'

const store = createStore(counterReducer);

const App = () => {
    const fireEvent = (eventType) => {
        return () => store.dispatch(createAction(eventType));
    }

    return (
        <div>
            <div>
                <button onClick={fireEvent('GOOD')}>
                    good
                </button>
                <button onClick={fireEvent('OK')}>
                    ok
                </button>
                <button onClick={fireEvent('ZERO')}>
                    zero
                </button>
                <button onClick={fireEvent('BAD')}>
                    bad
                </button>
            </div>
            <div>
                {Object.keys(store.getState()).map((value) => {
                    return (
                        <p key={value}>{value}: {store.getState()[value]}</p>
                    )
                })}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
    root.render(<App />);
};

renderApp();
store.subscribe(renderApp);