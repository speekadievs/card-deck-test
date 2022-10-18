export default class DataObject<T> {
  constructor(params: Partial<T>) {
    for (const entry of Object.entries(params)) {
      const [key, value] = entry

      this[key] = value
    }
  }
}
