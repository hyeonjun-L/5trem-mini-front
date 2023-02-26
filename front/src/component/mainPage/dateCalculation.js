function dateCalculation(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let monthDate = new Array(firstDay).fill(0);
  for (let day = 1; day < lastDate + 1; day++) {
    monthDate.push(day);
  }
  const dateWithout = 42 - monthDate.length;
  for (let i = 0; i < dateWithout; i++) {
    monthDate.push(0);
  }

  return monthDate;
}

export default dateCalculation;
