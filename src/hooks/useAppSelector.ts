import { useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState } from "~app/store/store.types"; 

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
