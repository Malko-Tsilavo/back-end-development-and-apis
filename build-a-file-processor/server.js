const http = require('http');
const fs = require('fs');
const fsPromises = require('fs/promises')
const crypto = require("crypto");
const os = require("os");
const path = require("path")

// Reading files with fs.readFile
fs.readFile('assets/poem.txt', { encoding: 'utf8' }, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    //console.log(data);
});

// Reading files with fs.promises
async function main() {
  const data = await fsPromises.readFile("assets/poem.txt", {
    encoding: "utf8",
  });
}

// Checking if folder exist
const exists = fs.existsSync("assets");

// Showing the tree in a directory
const entries = fs.readdirSync("assets");

fs.writeFileSync("assets/output.txt", "Hello, freeCodeCamp!");
fs.appendFileSync("assets/output.txt","\nWelcome to your session");

const buf = Buffer.from("Hello, Node!");
//console.log(buf)
//console.log(buf.toString("hex")); // 48656c6c6f
//console.log(buf.toString("base64"))

const buf2 = Buffer.alloc(8, 0xff);
//console.log(buf2)

const decoded = Buffer.from("ZnJlZUNvZGVDYW1w", "base64").toString("utf8");
//console.log(decoded);

const hash = crypto.createHash("sha256").update("freeCodeCamp!").digest("hex");
//console.log(hash);

const random = crypto.randomBytes(16).toString("hex");
console.log(random);

const id = crypto.randomUUID();
console.log(id);

/*
// System information
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("Hostname:", os.hostname());

// Memory information
console.log("Total memory:", os.totalmem());
console.log("Free memory:", os.freemem());

// System uptime
console.log("Uptime:", os.uptime());

// CPU information
console.log("CPU cores:", os.cpus().length);
*/

const filePath = path.join(__dirname, "assets", "poem.txt");
console.log(filePath);

// Inspect file component
console.log(path.basename(filePath))
console.log(path.dirname(filePath))
console.log(path.extname(filePath))

// Build path
console.log(path.join("assets", "..", "server.js"));
// Show absolute path
console.log(path.resolve("assets", "..", "server.js"));

// Show an object with root, dir, base, ext, and name
const parts = path.parse(filePath);
console.log(parts);

// Process information
console.log("Node.js version:", process.version);
console.log("Platform:", process.platform);
console.log("Environment:", process.env.NODE_ENV);

// Command-line arguments
console.log("Arguments:", process.argv);
console.log("First custom argument:", process.argv[2]);

process.stdout.write("Hello from stdout\n");
process.stderr.write("Hello from stderr\n");

/*const readable = fs.createReadStream("assets/poem.txt", { encoding: "utf8" });

readable.on("data", (chunk) => {
  console.log(chunk);
});

readable.on("end", () => {
  console.log("Done reading");
});
/*
const writable = fs.createWriteStream("assets/stream-output.txt");
writable.write("First chunk\n");
writable.write("Second chunk\n");
writable.end();
*/
const readable = fs.createReadStream("assets/poem.txt");
const writable = fs.createWriteStream("assets/stream-output.txt");
readable.pipe(writable);

main();