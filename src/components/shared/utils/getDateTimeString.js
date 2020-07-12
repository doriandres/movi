export default function getDateTimeString(date) {
  const _date = new Date(date);
  return `${_date.toLocaleDateString()} ${_date.toLocaleTimeString()}`;
}