import { rootReducer } from '../store/index';
import { TypedUseSelectorHook, useSelector } from "react-redux";

type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;