export default class Language {
  constructor(symbol, name, dictinary = null) {
    this.name = name;
    this.symbol = symbol;
    this.dictinary = dictinary;
  }

  isLoaded() {
    return Boolean(this.dictinary);
  }
}
