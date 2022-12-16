import path from "path";
import fs from "fs";
import os from "os";
import { app, ipcMain, Menu } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import menu from "./helpers/menu";
import moment from "moment";
import Store from "electron-store";

const isProd = process.env.NODE_ENV === "production";
const store = new Store({
  notes: {
    type: "array",
  },
  tasks: {
    type: "array",
  },
});

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();
  Menu.setApplicationMenu(menu);
  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    autoHideMenuBar: true,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./index.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("get-content", (event, file) => {
  const content = fs.readFileSync(file);
  event.returnValue = content.toString();
});

ipcMain.on("get-files", (event) => {
  let notes_store = store.get("notes") ? store.get("notes") : [];
  let notes = [];
  const files = fs.readdirSync(path.join(os.homedir(), "doom-notes"));
  // check if a file was removed
  notes_store.forEach((note) => {
    const exists = files.find((element) => element == note.filename);
    if (exists) {
      notes.push(note);
    }
  });
  files.forEach((file) => {
    if (path.extname(file) == ".md") {
      const exist = notes.find((element) => element.filename == file);
      if (!exist) {
        notes.push({
          id: notes.length,
          name: path.parse(file).name,
          filename: file,
          description: "no description",
          date: moment().format("MMMM Do YYYY, h:mm:ss a"),
          user: "camilo",
          path: path.join(os.homedir(), "doom-notes", file),
        });
      }
    }
  });
  store.set("notes", notes);
  event.returnValue = notes;
});

// Get notes store
ipcMain.on("get-notes", async (event) => {
  const response = store.get("notes");
  event.returnValue = response ? response : [];
});

// Update notes store
ipcMain.on("save-notes", async (event, notes) => {
  console.log("new notes", notes);
  store.set("notes", notes);
  event.returnValue = "correct";
});

// Write Files
ipcMain.on("write-file", async (event, path, content) => {
  fs.writeFile(path, content, (err) => {
    if (err) throw err;
    console.log("file was saved");
  });
  event.returnValue = "correct";
});

// Get task store
ipcMain.on("get-tasks", async (event) => {
  const response = store.get("tasks");
  event.returnValue = response ? response : [];
});

// Update tasks store
ipcMain.on("save-tasks", async (event, tasks) => {
  console.log("new task", tasks);
  store.set("tasks", tasks);
  event.returnValue = "correct";
});
