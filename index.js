const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");

(async () => {
  await fs
    .createReadStream(path.join(__dirname, "wordnet.zip"))
    .pipe(unzipper.Extract({ path: "build" }))
    .promise();
  const wordnet = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./build/wordnet.json"))
  );
  let acc = [];
  for (const i in wordnet.synset) {
    //if (wordnet.synset[i].pos==="v") {
    acc.push(wordnet.synset[i].gloss);
    //}
    //if (wordnet.synset[i].gloss.indexOf("a ")===0) {acc.push(wordnet.synset[i].gloss);}
  }
  const outputFile = path.join(__dirname, "./build/out.txt");
  fs.writeFileSync(outputFile, acc.join("\n"), "utf8");
})();
