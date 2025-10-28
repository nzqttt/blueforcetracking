const { app, BrowserWindow } = require("electron");
const path = require("path");

const PORT = 3001; // Our fixed port

function createWindow() {
  const win = new BrowserWindow({
    title: "BFT Map App",
    width: 1280,
    height: 800,
    icon: path.resolve(__dirname, "public/icons/kemalak.ico"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true, // safer: allow MapTiler but keep security on
    },
  });

  // Load Next.js dev server
  win.loadURL(`http://localhost:${PORT}`);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
