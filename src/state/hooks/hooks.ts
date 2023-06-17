// useDispatch および useSelector フックの型付きバージョンを作成する
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// このuseAppDispatchを利用して各UIコンポーネントにdispatch関数を持ってくる
export const useAppDispatch: () => AppDispatch = useDispatch;
// useAppSelectorは各UIコンポーネントでstateを持ってくる
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
