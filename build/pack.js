const pack = require('packapp');
const { join } = require('path');
const { readFile } = require('fs');
const { promisify } = require('util');
const read = promisify(readFile);
const simpleInno = require('simple-inno-setup-script');

(async () => {
  let _package = await read(join(process.cwd(), 'package.json'));
  _package = JSON.parse(_package.toString());
  const name = _package.name;
  const version = _package.version;
  const author = _package.author;
  const supportURL = _package.bugs.url;
  const updatesURL = _package.homepage;
  const publisherURL = _package.homepage;
  try {
    const script = await read(join(__dirname, 'win', 'carlo-plate-setup.iss'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      const result = await simpleInno({
      name,
      version,
      author,
      url: {
        supportURL,
        updatesURL,
        publisherURL
      },
      outputDir: '../',
      sourceDir: "../executables/carlo-plate-win-x64.exe",
      sourceDirX86: "../executables/carlo-plate-win-x86.exe",
      vbsPath: '../../node_modules/simple-inno-setup-script/templates/vbs.vbs',
      signTool: false//,
      // include: ['Source: "../../node_modules/go-ipfs-dep/go-ipfs/ipfs.exe"; DestDir: "{pf}/test";']
    });
    await result.write(__dirname + '/win/carlo-plate-setup.iss', result.script);
    }
  }
  try {
    await pack({
      main: 'carlo-plate.js',
      targets: ['node10-win-x64', 'node10-win-x86', 'node10-linux-x64', 'node10-linux-x86', 'node10-macos-x64', 'node10-macos-x86'],
      assets: 'www',
      output: 'build/executables',
      verbose: true,
      winExe: {
        scripts: 'build/win/carlo-plate-setup.iss'
      }
    })
  } catch (e) {
    console.error(e);
  }
})()
