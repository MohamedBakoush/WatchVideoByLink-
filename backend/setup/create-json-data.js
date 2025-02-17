"use strict";
const FileSystem = require("fs");

// available videos initial data
function available_videos_init_data() {
    const dataVideosData = {};
    return dataVideosData;
}

// create available videos main/test json files
function create_available_videos() {
    const availableVideosData = available_videos_init_data();
    createJsonFile("./data/available-videos.json", availableVideosData);
    createJsonFile("./__tests__/data/available-videos.test.json", availableVideosData);
}

// current download initial data
function current_download_init_data() {
    const dataVideosData = {};
    return dataVideosData;
}

// create current download videos main/test json files
function create_current_download_videos() {
    const currentDownloadVideosData = current_download_init_data();
    createJsonFile("./data/current-download-videos.json", currentDownloadVideosData);
    createJsonFile("./__tests__/data/current-download-videos.test.json", currentDownloadVideosData);
}

// data videos initial data
function data_videos_inti_data() {
    const dataVideosData = {};
    return dataVideosData;
}

// create data videos main/test json files
function create_data_videos() {
    const dataVideosData = data_videos_inti_data();
    createJsonFile("./data/data-videos.json", dataVideosData);
    createJsonFile("./__tests__/data/data-videos.test.json", dataVideosData);
}

// user settings initial data
function user_settings_init_data() {
    const userSettingsData = {
        "videoPlayer": {
            "volume": 1,
            "muted": false,
            "chromecast": false,
            "seekForward": 30,
            "seekBackward": 10
        },
        "download": {
            "compression": {
                "downloadVideoStream": false,
                "downloadVideo": false,
                "trimVideo": false,
                "downloadUploadedVideo": false
            },
            "confirmation": {
              "downloadVideoStream": false,
              "trimVideo": false,
              "downloadVideo": false
            }
        }
    };
    return userSettingsData;
}

// create user settings main/test json files
function create_user_settings() {
    const userSettingsData = user_settings_init_data();
    createJsonFile("./data/user-settings.json", userSettingsData);
    createJsonFile("./__tests__/data/user-settings.test.json", userSettingsData);
}

// create json file with provided data
function createJsonFile(path, data) {
    FileSystem.writeFile(path, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.log(err); 
            return err;
        } else {
            console.log(`${path} has been created`);
            return `${path} has been created`;
        }
    });   
}

module.exports = { // export modules 
    available_videos_init_data,
    create_available_videos,
    current_download_init_data,
    create_current_download_videos,
    data_videos_inti_data,
    create_data_videos,
    user_settings_init_data,
    create_user_settings
};