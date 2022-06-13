import DateDiff from 'date-diff'

export default function dateDiff(date1, date2) {
  const diff = new DateDiff(date1, date2)

  if (diff.years() > 1) {
    return `${diff.years().toFixed(0)} years ago`
  } else if (diff.months() > 1) {
    return `${diff.months().toFixed(0)} months ago`
  } else if (diff.weeks() > 1) {
    return `${diff.weeks().toFixed(0)} weeks ago`
  } else if (diff.days() > 1) {
    return `${diff.days().toFixed(0)} days ago`
  } else if (diff.hours() > 1) {
    return `${diff.hours().toFixed(0)} hours ago`
  } else {
    return `just now`
  }
}
