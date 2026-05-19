import fs from 'fs';

function fixFile(file: string, isComponent: boolean = false) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('getErrorMessage')) {
    const importStr = "import { getErrorMessage } from '../lib/utils/errorUtils';\n";
    // naive import injection
    const lines = content.split('\n');
    const lastImportIndex = lines.findLastIndex(l => l.startsWith('import'));
    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, importStr);
      content = lines.join('\n');
    }
  }

  // Generic replacements
  content = content.replace(/err\.response\?\.data\?\.error \|\| ([^)]+)/g, "getErrorMessage(err, $1)");
  content = content.replace(/e\.response\?\.data\?\.error \|\| ([^)]+)/g, "getErrorMessage(e, $1)");
  
  // Specific blocks in useUsers and AdminFreeTrials
  content = content.replace(/const errMsg = typeof .*;\s*toast\.error\(`Database Error: \$\{errMsg\}`\);/g, "toast.error(`Database Error: ${getErrorMessage(e)}`);");
  content = content.replace(/const errMsg = typeof .*;\s*toast\.error\(`Error loading trials: \$\{errMsg\}`\);/g, "toast.error(`Error loading trials: ${getErrorMessage(e)}`);");
  content = content.replace(/const errMsg = typeof .*;\s*toast\.error\(errMsg\);/g, "toast.error(getErrorMessage(e, 'Error fetching data'));");

  fs.writeFileSync(file, content);
}

fixFile('src/pages/FreeTrial.tsx');
fixFile('src/AdminPages/AdminFreeTrials.tsx');
fixFile('src/AdminPages/AdminPromoCode.tsx');
fixFile('src/AdminPages/AdminUsers.tsx');
fixFile('src/hooks/useUsers.ts');
console.log("Fixed UI errors");
