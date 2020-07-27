import { useContext as useContextHook, useStore as useStoreHook } from './hooks';
export { default as createState } from './createState';
export const useContext = useContextHook.bind(null, undefined);
export const useStore = useStoreHook;
