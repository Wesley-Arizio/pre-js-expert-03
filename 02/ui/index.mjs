import { database } from "../shared/data.mjs";

(async () => {
  const plataform = globalThis.window ? "browser" : "console";

  const { default: ViewFactory } = await import(
    `../plataforms/${plataform}/index.mjs`
  );

  const app = new ViewFactory();
  app.render(database);
})();
