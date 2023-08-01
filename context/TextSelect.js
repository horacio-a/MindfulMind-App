import React from 'react';
const TextSelect = React.createContext({
    SelectedText: false,
    setSelectedText: () => { },
});
export { TextSelect };