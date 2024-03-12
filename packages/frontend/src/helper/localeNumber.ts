export function localeNumber(value: number) {
  if (Number.isInteger(value)) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const [integer, fraction] = value.toString().split('.');
  return `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${fraction}`;
}
