import data from "../database/data.json";
import Commander from "commander";
import chalk from "chalk";
import chalkTable from "chalk-table";
import FluentSQLBuilder from "./fluentSQL.js";
import FormatQuery from "./FormatQuery.js";

class TerminalController {
  #database;
  #defaultColumns = [
    { field: "_id", name: chalk.cyan("ID") },
    { field: "category", name: chalk.cyan("category") },
    { field: "name", name: chalk.cyan("name") },
    { field: "company", name: chalk.cyan("company") },
    { field: "phone", name: chalk.cyan("phone") },
    { field: "address", name: chalk.cyan("address") },
    { field: "registered", name: chalk.cyan("registered") },
  ];
  #options = {
    leftPad: 2,
    columns: this.#defaultColumns,
  };
  #Commander = Commander;

  constructor({ database }) {
    this.#database = database;
    this.#setCommanderConfig();
  }

  #setCommanderConfig() {
    this.#Commander
      .version("v1")
      .option("-w, --where [value...]", "condition to select a user")
      .option("-s, --select [value...]", "fields to select from data")
      .option("-o, --orderBy, [value]", "field from data to orderBy")
      .option("-l, --limit [value]", "results limit")
      .option("-b, --build", "finish query")
      .parse(process.argv);
  }

  init() {
    try {
      if (this.#Commander._optionValues.build) {
        const { where, select, orderBy, limit } = FormatQuery.execute(
          Commander._optionValues
        );

        if (select && select.length !== 0) {
          const columns = select.map((field) => ({
            field,
            name: chalk.cyan(field),
          }));

          this.#options.columns = columns;
        }

        const result = FluentSQLBuilder.for(this.#database)
          .where(where)
          .select(select)
          .orderBy(orderBy)
          .limit(limit)
          .build();

        const table = chalkTable(this.#options, result);
        console.log(table);
      }
    } catch (err) {
      console.error("Error ocurred", err);
    }
  }
}

const app = new TerminalController({ database: data });

app.init();
