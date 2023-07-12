const fs = require("fs");
const readline = require("readline");
const inject = (path, data, tag) => {
  let str1 = "";
  const userDirectory = process.cwd();
  const fileStream = fs.createReadStream(userDirectory + "/" + path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  console.log(tag);
  rl.on("line", (line) => {
    // console.log(`Line: ${line}`);

    console.log(line, tag);
    console.log(line == tag);
    let line1 = line.replace(/\s/g, "");
    let tag1 = tag.replace(/\s/g, "");
    if (line1 == tag1) {
      console.log("data");
      str1 += "\n" + data + "\n" + line;
    } else {
      str1 += "\n" + line;
    }
  });

  rl.on("close", () => {
    fs.writeFile(userDirectory + "/" + path, str1.toString(), (err) => {
      console.log(err);
    });
    console.log("Finished reading the file.");
  });

  delete require.cache[require.resolve(userDirectory + "/" + path)];
  return;
};
module.exports = {
  inject,
};
