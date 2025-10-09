// redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import couponReducer from "../features/coupon/couponSlice";
import deliveryReducer from "../features/delevery/slice";
import itemReducer from "../features/item/ItemSlice";
import orderReducer from "../features/orders/orderSlice";
import outletReducer from "../features/outlet/slice";
import reportReducer from "../features/report/reportSlice";
import userReducer from "../features/users/userSlice";

// 🔑 Only persist auth slice
const persistConfig = {
  key: "auth", 
  storage,
  whitelist: ["user","isAuthenticated"], 
};

// Reducers
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer), 
  user:userReducer,
  category:categoryReducer,
  outlet:outletReducer,
  order:orderReducer,
  item:itemReducer,
  coupon:couponReducer,
  delivery:deliveryReducer,
  report:reportReducer,
});

// Store
 export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

// Persistor
export const persister = persistStore(store);
