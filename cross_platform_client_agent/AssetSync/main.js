const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const si = require('systeminformation');
const axios = require('axios');

function createWindow() {
    const win = new BrowserWindow({
        title: "AssetSync",
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Listen for the "collect-hardware-data" event
ipcMain.handle('collect-hardware-data', async () => {
    const hardwareSpecs = await collectHardwareData();
    return hardwareSpecs;
});

// Listen for the "send-hardware-data" event
ipcMain.handle('send-hardware-data', async (event, hardwareSpecs) => {
    const response = await sendHardwareData(hardwareSpecs);
    return response;
});

// Function to collect hardware data
async function collectHardwareData() {
    try {
        const osInfo = await si.osInfo();
        const cpu = await si.cpu();
        const mem = await si.mem();
        const disk = await si.diskLayout();

        return {
            hostname: osInfo.hostname,
            manufacturer: getManufacturer(osInfo.platform),
            serial_number: await getSerialNumber(osInfo.platform),
            model: osInfo.arch,
            os_type: osInfo.platform,
            os_version: osInfo.release,
            cpu: cpu.brand,
            cpu_cores: cpu.physicalCores,
            cpu_threads: cpu.cores,
            ram_total_gb: Math.round(mem.total / (1024 ** 3)),
            disk_total_gb: Math.round(disk.reduce((acc, cur) => acc + cur.size, 0) / (1024 ** 3)),
            status: 'available',
        };
    } catch (error) {
        console.error('Error collecting hardware data:', error);
        return {};
    }
}

// Function to send hardware data to an endpoint
async function sendHardwareData(hardwareSpecs) {
    try {
        console.log(hardwareSpecs); // Inspect the data before sending
        const response = await axios.post('http://127.0.0.1:8080/en/devices/hardware/recevie', hardwareSpecs);

        if (response.status === 200 || response.status === 201) {
            return { success: true, message: 'Data has been sent successfully!' };
        } else {
            return { success: false, message: `Failed to send data. Server responded with status code ${response.status}.` };
        }
    } catch (error) {
        let message;
        if (error.response && error.response.status === 400 && error.response.data) {
            // Format the error message to display specific field errors
            const errors = error.response.data;
            message = 'Error sending hardware data:\n';

            if (errors.hostname) {
                message += `Hostname: ${errors.hostname.join(', ')}\n`;
            }
            if (errors.serial_number) {
                message += `Serial Number: ${errors.serial_number.join(', ')}\n`;
            }
        } else {
            message = `Error sending data: ${error.message}`;
        }

        console.error(message);
        return { success: false, message: message };
    }
}

// Function to get the serial number based on the OS
async function getSerialNumber(osType) {
    try {
        if (osType.toLowerCase() === 'windows') {
            return si.system().then(data => data.serial);
        } else if (osType.toLowerCase() === 'darwin') {  // macOS
            return si.system().then(data => data.serial);
        } else if (osType.toLowerCase() === 'linux') {
            return si.system().then(data => data.serial);
        } else {
            return 'Unsupported OS';
        }
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

function getManufacturer(osType) {
    try {
        if (osType === 'windows') {
            return execSync('wmic csproduct get vendor').toString().split("\n")[1].trim() || 'Unknown';
        } else if (osType === 'darwin') {
            return "Apple Inc.";
        } else if (osType === 'linux') {
            return execSync('cat /sys/class/dmi/id/board_vendor').toString().trim() || 'Unknown';
        } else {
            return 'Unknown';
        }
    } catch (error) {
        console.error('Error fetching manufacturer:', error);
        return 'Unknown';
    }
}
