import data from "../database/data.json";
import FluentSQLBuilder from "./fluentSQL.js";

const result = FluentSQLBuilder.for(data)
  .where({ registered: /^(2019|2020)/ })
  .where({ category: /^(security|developer|quality assurance)$/ })
  .where({ phone: /\((852|890|810)\)/ })
  .select(["name", "company", "phone", "category"])
  .orderBy("category")
  .limit(2)
  .build();

console.table(result);
