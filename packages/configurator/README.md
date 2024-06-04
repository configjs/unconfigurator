<div align="center">
  <br />
  <br />
  <img src="https://github.com/configjs/unconfigurator/blob/v2/ph-command.svg?raw=true" />
  <h1>unconfigurator</h1>
  <p>Try to make a web page to managing all frontend project configurations.</p>
</div>

> Project is developing, not ready for use, please contact me if you are interested in this project: [zero@naily.cc](mailto:zero@naily.cc)

Try to make a simple command: just run `unconfigurator` or `configure` command in the project root directory, and then you can manage all the configurations of the project through the web page.

## Features

- [x] **Plugin System**
- [x] **Command Line Interface**
- [x] **Web Interface**

## Integration

- [x] **package.json management**
- [ ] **configure.json management**
- [ ] **.gitignore management**
- [ ] **.npmignore management**
- [ ] **.editorconfig management**
- [ ] **.eslintrc management**
- [ ] **.prettierrc management**
- [ ] **.stylelintrc management**
- [ ] **.browserslistrc management**
- [ ] **.babelrc management**
- [ ] **tsconfig.json management**
- [ ] **.env management**

## Problem

Now, although there are tools like `c12` that can easily read `xx.config.js` / `xx.config.ts` configuration, but there is no good tool to programmatically edit these configuration files. So currently, we can only do `json` / `yaml` configuration files, but these configuration files are not as flexible as `js` / `ts` configuration files.
