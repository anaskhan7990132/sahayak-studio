import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
mkdirSync('.sites-runtime/test-build',{recursive:true});
execFileSync(process.execPath,['node_modules/typescript/bin/tsc','--target','ES2022','--module','commonjs','--esModuleInterop','--skipLibCheck','--outDir','.sites-runtime/test-build','lib/agents.ts','lib/types.ts'],{stdio:'inherit'});
writeFileSync('.sites-runtime/test-build/package.json','{"type":"commonjs"}');
execFileSync(process.execPath,['tests/core.cjs'],{stdio:'inherit'});
