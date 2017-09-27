const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

export const getSafeDate = mmddyy_no_slashes => {
  let mm = mmddyy_no_slashes.substring(0, 2)
  let dd = mmddyy_no_slashes.substring(3, 5)
  let yyyy = mmddyy_no_slashes.substring(6, 10)

  dd = `${ Math.min(Math.max(1, dd), 31)  }`
  dd = dd.length === 1 ? `0${ dd }` : dd

  mm = `${ Math.min(Math.max(1, mm), 12)  }`
  mm = mm.length === 1 ? `0${ mm }` : mm

  yyyy = Math.min(Math.max(1960, yyyy), 2060)

  if ( mm === '02' ) {
    dd = Math.min(isLeapYear(yyyy) ? 29 : 28, dd)
  } else if ( dd === '31' && !['01', '03', '05', '07', '08', '10', '12'].includes(mm) ) {
    dd = '30'
  }
  return `${ mm }/${ dd }/${ yyyy }`
}
