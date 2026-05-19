import fs from 'fs';

let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/res\.status\(401\)\.json\(\{\s*error:\s*'Unauthorized access'/g, "res.status(401).json({ success: false, error: 'Unauthorized access'");
code = code.replace(/res\.status\(401\)\.json\(\{\s*error:\s*'Auth error'\s*\}\)/g, "res.status(401).json({ success: false, error: 'Auth error' })");
code = code.replace(/res\.status\(400\)\.json\(\{\s*error:\s*'An admin with this email already exists\.'\s*\}\)/g, "res.status(400).json({ success: false, error: 'An admin with this email already exists.' })");
code = code.replace(/res\.status\(400\)\.json\(\{\s*error:\s*'A promo code with this name already exists\.'\s*\}\)/g, "res.status(400).json({ success: false, error: 'A promo code with this name already exists.' })");

fs.writeFileSync('server.ts', code);
console.log("Fixed errors");
