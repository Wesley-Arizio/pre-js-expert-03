export default class FluentSQLBuilder {
  #database = [];
  #limit = 0;
  #select = [];
  #where = [];
  #orderBy = "";
  constructor({ database }) {
    this.#database = database;
  }

  static for(database) {
    return new FluentSQLBuilder({ database });
  }

  limit(max) {
    this.#limit = max;

    return this;
  }

  select(props) {
    this.#select = props;

    return this;
  }

  where(query) {
    const [[prop, selectedValue]] = Object.entries(query);

    const isInstanceOfRegex = selectedValue instanceof RegExp;
    const whereFilter = isInstanceOfRegex ? selectedValue : new RegExp(query);

    this.#where.push({
      prop,
      filter: whereFilter,
    });

    return this;
  }

  orderBy(field) {
    this.#orderBy = field;

    return this;
  }

  #performSelect(item) {
    const currentItem = {};
    const entries = Object.entries(item);

    for (const [key, value] of entries) {
      if (this.#select.length && !this.#select.includes(key)) continue;

      currentItem[key] = value;
    }

    return currentItem;
  }

  #performWhere(item) {
    for (const { filter, prop } of this.#where) {
      if (!filter.test(item[prop])) return false;
    }
    return true;
  }

  #performLimit(results) {
    return this.#limit && results.length === this.#limit;
  }

  #performOrderBy(results) {
    const fieldToOrderBy = this.#orderBy;

    if (!fieldToOrderBy) return results;

    return results.sort((prev, next) => {
      return prev[fieldToOrderBy].localeCompare(next[fieldToOrderBy]);
    });
  }

  build() {
    const results = [];

    for (const item of this.#database) {
      if (!this.#performWhere(item)) continue;

      const currentItem = this.#performSelect(item);

      results.push(currentItem);

      if (this.#performLimit(results)) break;
    }

    const finalResult = this.#performOrderBy(results);

    return finalResult;
  }
}
