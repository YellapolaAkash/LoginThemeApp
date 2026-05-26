import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { getTheme } from '../theme';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useThemeMode = () => useAppSelector((state) => state.theme.mode);

export const useAppTheme = () => {
  const mode = useThemeMode();
  return getTheme(mode);
};
