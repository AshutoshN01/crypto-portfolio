export function currency(value = 0) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value)
}

export function percent(value = 0) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

export function compact(value = 0) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(value)
}
