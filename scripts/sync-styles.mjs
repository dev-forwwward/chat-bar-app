/**
 * Reads src/components/ChatBar.css and writes src/components/ChatBar.styles.ts.
 * Run via: npm run sync-styles
 * Called automatically by predev and prebuild hooks.
 */
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const cssPath = join(root, 'src/components/ChatBar.css')
const tsPath  = join(root, 'src/components/ChatBar.styles.ts')

const css = readFileSync(cssPath, 'utf8')
const escaped = css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')

const output = `// AUTO-GENERATED — do not edit directly.
// Edit src/components/ChatBar.css, then run: npm run sync-styles
export const chatBarStyles = \`${escaped}\`
`

writeFileSync(tsPath, output)
console.log('✓ ChatBar.styles.ts synced from ChatBar.css')
