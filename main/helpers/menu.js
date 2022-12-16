import { join } from "path";
import { app, Menu, shell } from "electron";
import {
  is,
  appMenu,
  aboutMenuItem,
  openUrlMenuItem,
  openNewGitHubIssue,
  debugInfo,
} from "electron-util";

const showPreferences = () => {
  // Show the app's preferences here
};

const helpSubmenu = [
  openUrlMenuItem({
    label: "Website",
    url: "https://github.com/sindresorhus/electron-boilerplate",
  }),
  openUrlMenuItem({
    label: "Source Code",
    url: "https://github.com/sindresorhus/electron-boilerplate",
  }),
  {
    label: "Report an Issue…",
    click() {
      const body = `
<!-- Please succinctly describe your issue and steps to reproduce it. -->


---

${debugInfo()}`;

      openNewGitHubIssue({
        user: "sindresorhus",
        repo: "electron-boilerplate",
        body,
      });
    },
  },
];

if (!is.macos) {
  helpSubmenu.push(
    {
      type: "separator",
    },
    aboutMenuItem({
      icon: join(__dirname, "static", "icon.png"),
      text: "Created by Your Name",
    })
  );
}

const debugSubmenu = [
  {
    label: "Show Settings",
    click() {
      // openInEditor();
    },
  },
  {
    label: "Show App Data",
    click() {
      shell.openItem(app.getPath("userData"));
    },
  },
  {
    type: "separator",
  },
  {
    label: "Delete Settings",
    click() {
      clear();
      app.relaunch();
      app.quit();
    },
  },
  {
    label: "Delete App Data",
    click() {
      shell.moveItemToTrash(app.getPath("userData"));
      app.relaunch();
      app.quit();
    },
  },
];

const macosTemplate = [
  appMenu([
    {
      label: "Preferences…",
      accelerator: "Command+,",
      click() {
        showPreferences();
      },
    },
  ]),
  {
    role: "fileMenu",
    submenu: [
      {
        label: "Custom",
      },
      {
        type: "separator",
      },
      {
        role: "close",
      },
    ],
  },
  {
    role: "editMenu",
  },
  {
    role: "viewMenu",
  },
  {
    role: "windowMenu",
  },
  {
    role: "help",
    submenu: helpSubmenu,
  },
];

// Linux and Windows
const otherTemplate = [
  {
    role: "fileMenu",
    submenu: [
      {
        label: "Custom",
      },
      {
        type: "separator",
      },
      {
        label: "Settings",
        accelerator: "Control+,",
        click() {
          showPreferences();
        },
      },
      {
        type: "separator",
      },
      {
        role: "quit",
      },
    ],
  },
  {
    role: "editMenu",
  },
  {
    role: "viewMenu",
  },
  {
    role: "help",
    submenu: helpSubmenu,
  },
];

const template = is.macos ? macosTemplate : otherTemplate;

if (is.development) {
  template.push({
    label: "Debug",
    submenu: debugSubmenu,
  });
}

export default Menu.buildFromTemplate(template);
