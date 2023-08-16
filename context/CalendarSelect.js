import React from 'react';
const CalendarSelect = React.createContext({
    SelectedCalendar: false,
    setSelectedCalendar: () => { },
});
export { CalendarSelect };