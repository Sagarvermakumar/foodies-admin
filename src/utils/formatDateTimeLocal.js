/**
 * Formats a date string to local datetime format (yyyy-MM-ddTHH:mm)
 * @param {*} dateString 
 * @returns local datetime string
 */


export const formatDateTimeLocal = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
  };
