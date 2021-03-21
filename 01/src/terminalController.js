import data from "../database/data.json";
import Commander from "commander";
import chalk from "chalk";
import chalkTable from "chalk-table";
import FluentSQLBuilder from "./fluentSQL.js";
import FormatQuery from "./FormatQuery.js";

(async () => {
  Commander.version("v1")
    .option("-w, --where [value...]", "condition to select a user")
    .option("-s, --select [value...]", "fields to select from data")
    .option("-o, --orderBy, [value]", "field from data to orderBy")
    .option("-l, --limit [value]", "results limit")
    .option("-b, --build", "terminar query")
    .parse(process.argv);

  const defaultColumns = [
    { field: "_id", name: chalk.cyan("ID") },
    { field: "category", name: chalk.cyan("category") },
    { field: "name", name: chalk.cyan("name") },
    { field: "company", name: chalk.cyan("company") },
    { field: "phone", name: chalk.cyan("phone") },
    { field: "address", name: chalk.cyan("address") },
    { field: "registered", name: chalk.cyan("registered") },
  ];

  try {
    if (Commander._optionValues.build) {
      const { where, select, orderBy, limit } = FormatQuery.execute(
        Commander._optionValues
      );

      const result = FluentSQLBuilder.for(data)
        .where(where)
        .select(select)
        .orderBy(orderBy)
        .limit(limit)
        .build();

      const columns = select.map((field) => ({
        field,
        name: chalk.cyan(field),
      }));

      const options = {
        leftPad: 2,
      };

      select.length === 0
        ? (options.columns = defaultColumns)
        : (options.columns = columns);

      const table = chalkTable(options, result);
      console.log(table);
    }
  } catch (err) {
    console.error("ERROR", err);
  }
})();
