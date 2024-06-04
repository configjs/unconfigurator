import Chalk from 'chalk'

export class Logger {
  logBeforeViteStart(title: string, message: string) {
    console.log(
      `${Chalk.green(Chalk.bold('  ➜  '))}${Chalk.bold(
        `${title}:`,
      )} ${Chalk.cyan(message)}`,
    )
  }

  logInRuntime(prefix: string, title: string, message: string) {
    console.log(
      `${Chalk.dim(`${new Date().toLocaleTimeString()}`)} ${Chalk.cyan(
        Chalk.bold(`[${prefix.toLowerCase()}]`),
      )} ${Chalk.yellow(title)} ${Chalk.dim(message || '')}`,
    )
  }
}

export function generateComponentField(
  input: object,
  field: string = 'component',
): string {
  function stringify(value: any): string | undefined {
    // 处理字符串
    if (typeof value === 'string')
      return `"${value.replace(/"/g, '\\"')}"`

    // 处理数字和布尔值
    if (typeof value === 'number' || typeof value === 'boolean')
      return String(value)

    // 处理 null
    if (value === null)
      return 'null'

    // 处理数组
    if (Array.isArray(value)) {
      const arrayElements = value.map(
        element => stringify(element) || 'null',
      )
      return `[${arrayElements.join(',')}]`
    }

    // 处理对象
    if (typeof value === 'object') {
      const objectKeys = Object.keys(value)
      const objectElements = objectKeys
        .map((key) => {
          const keyValue = stringify(value[key])
          if (keyValue !== undefined) {
            return `"${key}":${
              key !== field ? keyValue : `() => import(${keyValue})`
            }`
          }

          return undefined
        })
        .filter(element => element !== undefined)
      return `{${objectElements.join(',')}}`
    }

    // 处理 undefined 和函数
    return undefined
  }
  return stringify(input) as any
}
