var app = require('app');
var BrowserWindow = require('browser-window');
var fs = require('fs');

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    resizable: true
  });

  mainWindow.loadUrl('https://www.wanikani.com/dashboard');

  mainWindow.webContents.on('did-finish-load', function() {
    var getApiKey = fs.readFileSync(__dirname + '/extensions/api_key.js', 'utf8');
    var dashboardProgress = fs.readFileSync(__dirname + '/extensions/progress.js', 'utf8');
    var realNumbers = fs.readFileSync(__dirname + '/extensions/real_numbers.js', 'utf8');

    mainWindow.webContents.executeJavaScript(getApiKey);
    mainWindow.webContents.executeJavaScript(dashboardProgress);
    mainWindow.webContents.executeJavaScript(realNumbers);
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
