import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(/res\.status\(400\)\.json\(\{ success: false, error: e\.message \|\| "Unknown database error"/g, 'res.status(500).json({ success: false, error: e.message || "Unknown database error"');
code = code.replace(/res\.status\(400\)\.json\(\{ success: false, error: err\.message \|\| 'Internal Server Error'/g, "res.status(500).json({ success: false, error: err.message || 'Internal Server Error'");
fs.writeFileSync('server.ts', code);
console.log("Reverted 400 to 500");
