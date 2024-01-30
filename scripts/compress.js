import fs from "fs";

const loaded = fs.readFileSync("./dist/data/db.json", { encoding: "utf-8" });
const parsed = JSON.parse(loaded);

fs.writeFileSync("./dist/data/db.json", JSON.stringify(parsed));
