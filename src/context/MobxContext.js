/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
// src/context/MobxContext.js
import React from 'react';
import RootStore from '../stores/RootStore';

export const MobxContext = React.createContext(RootStore);
export const useStore = () => React.useContext(MobxContext);

export const MobxProvider = ({ children }) => {
    return (
        <MobxContext.Provider value={RootStore}>
            {children}
        </MobxContext.Provider>
    );
};