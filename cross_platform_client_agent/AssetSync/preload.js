const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire ipcRenderer object
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: ipcRenderer
});
