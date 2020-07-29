import { useContext as useContextHook, useStore as useStoreHook } from './hooks';
export { default as createStore } from './createStore';
export const useContext = (context: React.Context<any>) => useContextHook(context);
export const useStore = useStoreHook;
