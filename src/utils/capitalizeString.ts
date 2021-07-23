export default function capitalizeString(string: any): string {
  let captalizedString = string.toLowerCase()

  captalizedString =
    captalizedString.charAt(0).toUpperCase() + captalizedString.slice(1)

  for (let i = 0; i < captalizedString.length; i++) {
    if (captalizedString.charAt(i) === ' ') {
      const charToUper = captalizedString.charAt(i + 1).toUpperCase()

      const sliceBegin = captalizedString.slice(0, i + 1)

      const sliceEnd = captalizedString.slice(i + 2)

      captalizedString = sliceBegin + charToUper + sliceEnd
    }
  }
  return captalizedString
}
