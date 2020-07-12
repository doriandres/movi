export default function groupBillsByMonthAndYear(bills) {
  return !bills || !bills.length ? {} : bills
    .map(bill => ({ ...bill, date: new Date(bill.date) }))
    .map(bill => ({ ...bill, group: `${bill.date.getMonth() + 1 < 10 ? '0' : ''}${bill.date.getMonth() + 1}/${bill.date.getFullYear()}` }))
    .reduce((host, bill) => (!host[bill.group] ? { [bill.group]: [bill] } : { ...host, [bill.group]: [...host[bill.group], bill] }), {});
}