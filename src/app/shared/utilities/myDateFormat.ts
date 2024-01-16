export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'dd/MM/yyyy'
    },
    display: {
        dateInput: <Intl.DateTimeFormatOptions> {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        },
        monthYearLabel: <Intl.DateTimeFormatOptions> {
            month: 'short',
            year: 'numeric'
        },
        dateA11yLabel: { 
            day: 'numeric'
        },
        monthYearA11yLabel: <Intl.DateTimeFormatOptions> {
            month: 'long',
            year: 'numeric'
        },
    }
 };
