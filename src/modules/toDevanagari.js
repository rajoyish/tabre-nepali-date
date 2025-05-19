export function toDevanagari(str) {
  return str.replace(/\d/g, (d) => '०१२३४५६७८९'.charAt(Number(d)));
}
