import { compose, applyMiddleware, Middleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

/* import thunk from "redux-thunk"; */
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

//root-reducer

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendendPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

export const persistConfig: ExtendendPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

//REDUX DEV-TOOLS
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

//Redux Saga
const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
