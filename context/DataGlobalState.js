import React from 'react';
const RoutineDateGlobalState = React.createContext({
    RoutineDate: false,
    setRoutineDate: () => { },
});
export { RoutineDateGlobalState };

const CalendarDateGlobalState = React.createContext({
    CalendarDate: false,
    setCalendarDate: () => { },
});
export { CalendarDateGlobalState };

const TextDateGlobalState = React.createContext({
    TextDate: false,
    setTextDate: () => { },
});
export { TextDateGlobalState };

