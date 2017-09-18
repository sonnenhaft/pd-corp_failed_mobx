const addLeadingZero = number => number < 10 ? `0${  number }` : number

export const formatDate = stringOrDateDate => {
  if ( stringOrDateDate ) {
    const v = new Date(stringOrDateDate)
    return `${ addLeadingZero(v.getMonth() + 1) }/${ addLeadingZero(v.getDate()) }/${ v.getFullYear() }`
  } else {
    return stringOrDateDate
  }
}
