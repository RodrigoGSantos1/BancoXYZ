import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logger = (config: any) => (set: any, get: any, api: any) =>
  config(
    (...args: any[]) => {
      console.log('State Update:', args[0]);
      set(...args);
    },
    get,
    api
  );

export const createStore = <T extends object>(
  name: string,
  initialState: T,
  actions: (set: any, get: any) => any
) =>
  create<T & ReturnType<typeof actions>>()(
    devtools(
      persist(
        immer(
          logger((set: any, get: any) => ({
            ...initialState,
            ...actions(set, get),
          }))
        ),
        {
          name,
          storage: createJSONStorage(() => AsyncStorage),
          partialize: (state: any) => {
            const {
              // sensitiveData,
              ...persistData
            } = state as any;
            return persistData;
          },
        }
      ),
      { name }
    )
  );
