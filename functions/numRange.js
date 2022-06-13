export default function numRange(from, to) {
  const arr = []

  for (let ele = from; ele < to + 1; ele++) {
    arr.push(ele)
  }

  return arr
}
