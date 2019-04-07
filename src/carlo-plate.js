import { launch } from 'carlo';
import { join } from 'path';
import { homedir } from 'os';

const HOME = homedir();
const USER_DATA = join(HOME, '.carlo-plate');

(async () => {

  const app = await launch({
    bgcolor: '#fff',
    width: 1400,
    height: 840,
    userDataDir: USER_DATA,
    title: 'carlo-plate'
  });

  app.serveFolder(join(__dirname , 'www'));

  await app.load('loading.html');

  app.on('exit', () => {
    process.exit()
  });

  app.on('window', window => {
    window.load('index.html')
  });

  await app.exposeFunction('hello', () => 'hello!');

  // timeout, there is nothing to wait for, so loading screen is basicly skipped otherwise
  setTimeout(async () => {
    await app.load('index.html');
  }, 2000);
})();
