export default class ValueObject<T> {
  constructor(params: Partial<T>) {
    for (const entry of Object.entries(params)) {
      const [key, value] = entry

      this[key] = value
    }
  }

  public serialize() {
    return Object.entries(this).reduce((result, entry) => {
      const [key, value] = entry

      result[key] = value

      return result
    }, {})
  }
}
