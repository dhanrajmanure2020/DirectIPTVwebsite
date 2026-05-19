import fs from 'fs';

let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/res\.status\(500\)\.json\(\{ error: e\.message \}\);/g, 
`console.error(e);
      if (e && e.stack) console.error(e.stack);
      res.status(500).json({ success: false, error: e.message || "Unknown database error", fullError: e });`);

fs.writeFileSync('server.ts', code);
console.log("Fixed more");
