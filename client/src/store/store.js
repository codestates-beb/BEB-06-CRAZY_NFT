import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accountSlice from './accountSlice';
import { persistStore } from 'redux-persist';
import clubSlice from './clubSlice';


const persistConfig = {
    key: 'root',
    storage,
}

let rootReducer = combineReducers({
    account: accountSlice.reducer,
    club: clubSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);	// redux-persist

const store = configureStore({
    reducer: persistedReducer ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

  const persistor = persistStore(store);
export   {store,persistor};