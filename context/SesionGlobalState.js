import React from 'react';
const SesionGlobalState = React.createContext({
    Session: false,
    setSession: () => { },
});
export { SesionGlobalState };
