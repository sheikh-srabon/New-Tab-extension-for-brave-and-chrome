# ✦ New Tab Pro — DEV PHENTOM

Turn every new browser tab into a personal productivity dashboard.

**New Tab Pro** replaces the default new-tab page with a modern dark dashboard featuring a live analog and digital clock, quick shortcuts, tasks, notes, a focus timer, daily motivation, and Quranic reminders.

<p align="center">
  <strong>Built with ❤️ by DEV PHENTOM</strong>
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🕒 **Dual Clock** | Live analog clock with moving hands and a digital 12-hour clock with AM/PM |
| 🔎 **Brave Search** | Search the web directly from the dashboard using Brave Search |
| 🔗 **Quick Shortcuts** | Open popular websites and add or remove your own shortcuts |
| ✅ **Task List** | Add, complete, and delete daily tasks |
| 🗓️ **Calendar & Events** | See the current date and add simple personal event reminders |
| ⏱️ **Focus Timer** | Built-in 25-minute Pomodoro-style focus timer |
| 📖 **Quran Reminder** | Quranic Arabic, Bengali meaning, and Surah/Ayah reference |
| ✦ **Daily Motivation** | Inspirational quotes to keep you moving |
| 📝 **Quick Notes** | Write notes and have them saved locally |
| ↔️ **Drag & Drop Layout** | Rearrange dashboard widgets to suit your workflow |
| ⚙️ **Settings** | Reset the widget layout when needed |

> **Weather widget:** A visual placeholder is included. Live weather data is not connected yet.

## 🖥️ Preview

The dashboard uses a dark navy interface with subtle purple and teal accents, rounded glass-style cards, and a responsive layout.

<img width="1241" height="644" alt="image" src="https://github.com/user-attachments/assets/5f48d552-1582-46c6-938a-588a2998d585" />



## 📦 Installation

New Tab Pro is a Chromium Manifest V3 extension and can be loaded in **Google Chrome** and **Brave**.

### Google Chrome

1. Download the latest ZIP from the project's **Releases** page (or download this repository).
2. Extract the ZIP file.
3. Open `chrome://extensions` in Chrome.
4. Turn on **Developer mode**.
5. Click **Load unpacked**.
6. Select the extracted `new-tab-pro` folder—the folder containing `manifest.json`.
7. Open a new tab to see your dashboard.

### Brave

1. Extract the ZIP file.
2. Open `brave://extensions`.
3. Turn on **Developer mode**.
4. Click **Load unpacked**.
5. Select the `new-tab-pro` folder.
6. Open a new tab.

## 🗂️ Project Structure

```text
new-tab-pro/
├── manifest.json   # Extension configuration (Manifest V3)
├── index.html      # Dashboard structure
├── style.css       # Layout, theme, and responsive styling
├── app.js          # Clock, widgets, interactions, and local storage
└── README.md       # Project documentation
```

## 💾 Data & Privacy

- Tasks, shortcuts, events, notes, and widget layout are saved using the browser's local extension storage (`chrome.storage.local`).
- This project does not require an account or a personal API key for its core dashboard features.
- Your locally saved dashboard data stays in the browser profile where the extension is installed.
- Removing the extension or clearing its extension data may remove locally stored dashboard information.
- The search box sends your search query to Brave Search when you submit it.
- The project loads web fonts from Google Fonts when an internet connection is available.

## 🛠️ Development

1. Clone or download this repository.
2. Open the project folder in your code editor.
3. Make your changes to `index.html`, `style.css`, or `app.js`.
4. Open `chrome://extensions` or `brave://extensions`.
5. Click the extension's **Reload** button.
6. Open a new tab to test your changes.

No build step is required for the current version.

## 🧭 Roadmap

Ideas for future improvements:

- [ ] Live weather integration
- [ ] More customizable themes and accent colors
- [ ] More clock styles and time zones
- [ ] Editable widget visibility and sizing
- [ ] More shortcut customization options
- [ ] Quran translation/source selection
- [ ] Import and export dashboard settings

## 🤝 Contributing

Suggestions, bug reports, and pull requests are welcome.

1. Fork the repository.
2. Create a branch for your change.
3. Make and test your update in Chrome or Brave.
4. Submit a pull request with a clear description.

## 📄 License

No license has been specified yet. Unless a license is added to this repository, the default copyright rules apply. Please contact the project owner before redistributing or using this project beyond the permissions granted by applicable law.

---

<p align="center">
  <strong>NEW TAB PRO</strong><br>
  <sub>BUILT BY DEV PHENTOM</sub>
</p>
