import fs from 'node:fs'
import path from 'node:path'

// 递归创建目录
function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath)
  if (fs.existsSync(dirname))
    return true

  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}

/**
 * Copy all `.vue` files from the source directory to the target directory.
 *
 * @author Zero <zero@naily.cc>
 * @export
 * @param {string} sourceDir
 * @param {string} targetDir
 */
export function copyVueFiles(sourceDir: string, targetDir: string) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(sourceDir, entry.name)
    const destPath = path.join(targetDir, entry.name)

    if (entry.isDirectory()) {
      copyVueFiles(srcPath, destPath) // 递归处理子目录
    }
    else if (entry.isFile() && path.extname(entry.name) === '.vue') {
      ensureDirectoryExistence(destPath)
      fs.copyFileSync(srcPath, destPath)
    }
  }
}
