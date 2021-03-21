import { describe, it, expect, test } from "@jest/globals";
import FluentSQLBuilder from "../src/fluentSQL";

import data from "./mock/data.json";

const mocks = {
  data,
};

describe("Test Suit for fluentSQL builder", () => {
  it("#for should return a FluentSQLBuilder instance", () => {
    const fluentBuilder = FluentSQLBuilder.for(mocks.data);

    expect(fluentBuilder).toBeInstanceOf(FluentSQLBuilder);
  });

  it("#build should return the empty object instance", () => {
    const fluentBuilder = FluentSQLBuilder.for(mocks.data).build();
    const expected = mocks.data;

    expect(fluentBuilder).toStrictEqual(expected);
  });

  it("#limit given a collection it should limit results", () => {
    const fluentBuilder = FluentSQLBuilder.for(mocks.data).limit(1).build();
    const [expected] = mocks.data;

    expect(fluentBuilder).toStrictEqual([expected]);
  });

  it("#where given a collection it should filter data", () => {
    const fluentBuilder = FluentSQLBuilder.for(mocks.data)
      .where({
        category: /^dev/,
      })
      .build();

    const expected = mocks.data.filter(
      ({ category }) => category.slice(0, 3) === "dev"
    );

    expect(fluentBuilder).toStrictEqual(expected);
  });

  it("#select given a collection it should return only specific fields", () => {
    const fluentBuilder = FluentSQLBuilder.for(mocks.data)
      .select(["name", "category"])
      .build();

    const expected = mocks.data.map(({ name, category }) => ({
      name,
      category,
    }));

    expect(fluentBuilder).toStrictEqual(expected);
  });

  it("#orderBy given a collection it should order results by field", () => {
    const fluentBuilder = FluentSQLBuilder.for(mocks.data)
      .orderBy("name")
      .build();

    const [first, second, third] = mocks.data;

    const expected = [first, third, second];

    expect(fluentBuilder).toStrictEqual(expected);
  });

  it("pipeline", () => {
    const fluentBuilder = FluentSQLBuilder.for(mocks.data)
      .where({ category: "developer" })
      .where({ name: /^M/ })
      .select(["name", "category"])
      .orderBy("name")
      .build();

    const [_, expected] = mocks.data;

    delete expected.id;

    expect(fluentBuilder).toStrictEqual([expected]);
  });
});
