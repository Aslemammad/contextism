import { useContext as useContextHook, useStore as useStoreHook } from './hooks';
export { default as createStore } from './createStore';
export const useContext = useContextHook.bind(null, undefined);
export const useStore = useStoreHook;
