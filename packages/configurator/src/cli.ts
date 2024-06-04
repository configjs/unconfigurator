import { stdout } from "node:process";
import Chalk from "chalk";
import { description, version } from "../package.json";
import { createConfigureServer } from "./vite/server";

(async () => {
  console.clear();
  console.log();
  console.log(
    `  ${Chalk.bold("🛠️  unconfigurator")}  ${Chalk.dim(
      `v${version} - ${description}`
    )}`
  );
  console.log();
  const uncliServer = await createConfigureServer();
  await uncliServer.listen();
  uncliServer.printUrls();
  uncliServer.bindCLIShortcuts({ print: true });
  console.log(`${Chalk.dim("-".repeat(stdout.columns))}`);
})();
