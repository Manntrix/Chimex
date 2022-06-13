export default function objToArr(input) {
  if (typeof input === 'object' && input !== null) {
    const output = Object.keys(input).reduce((accumulator, key) => {
      accumulator.push(input[key])
      return accumulator
    }, [])

    return output
  }
  return input
}
