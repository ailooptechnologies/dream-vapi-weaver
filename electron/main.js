const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object to prevent garbage collection
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    // Set app icon
    icon: path.join(__dirname, '../public/favicon.ico'),
    // Modern look and feel
    titleBarStyle: 'hiddenInset',
    titleBarOverlay: true,
    frame: false,
  });

  // Load the app
  if (isDev) {
    // Load from dev server in development
    mainWindow.loadURL('http://localhost:8080');
    // Open DevTools automatically in development
    mainWindow.webContents.openDevTools();
  } else {
    // Load the index.html of the app in production
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Open external links in the default browser, not in Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create window when Electron is ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS where it's common
// for applications to stay open until the user quits explicitly with Cmd + Q
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for communication between the main and renderer processes
ipcMain.handle('app-version', () => app.getVersion());

// Window control handlers
ipcMain.on('minimize-window', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) mainWindow.close();
});
