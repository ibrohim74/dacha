export function reformatDateForServer(dateStr) {
  try {
    const [day, month, year] = dateStr.split("/");

    const datetimeStr = `${year}-${month}-${day}T12:00:00`;

    return datetimeStr;
  } catch (error) {
    console.error(
      "Invalid date format. Please provide a date in DD/MM/YYYY format.",
      error
    );
    return null;
  }
}
