import { configureStore, combineReducers } from "@reduxjs/toolkit";
import legislationReducer from "../components/Dashboard/DashboardSlice";

export const store = configureStore({
  reducer: {
    legislation: legislationReducer,
  },
});

const rootReducer = combineReducers({
  legislation: legislationReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
