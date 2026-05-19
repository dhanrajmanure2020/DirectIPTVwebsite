import fs from 'fs';

let code = fs.readFileSync('server.ts', 'utf8');

// replace res.status(500).json({ success: false, error... }) with res.status(400).json({ success: false, error... })
code = code.replace(/res\.status\(500\)\.json\(/g, "res.status(400).json(");

fs.writeFileSync('server.ts', code);
console.log("Replaced 500 with 400 for debugging");
