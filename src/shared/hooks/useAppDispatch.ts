import { useDispatch } from "react-redux";
import type { AppDispatch } from "@app/store/store.types"; 

export const useAppDispatch = () => useDispatch<AppDispatch>();
