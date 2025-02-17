"use strict";
const FileSystem = require("fs");
const { v4: uuidv4 } = require("uuid");
const ffmpeg = require("fluent-ffmpeg");
const deleteData = require("./delete-data");
const userSettings = require("./user-settings");
const ffmpegImageDownload = require("./ffmpeg-download-image");
const currentDownloadVideos = require("./current-download-videos");
const ffmpegDownloadResponse = require("./ffmpeg-download-response");
const ffmpegCompressionDownload = require("./ffmpeg-download-compression");
const videoData = require("./data-videos");
const ffmpegPath = require("./ffmpeg-path");

// downlaod trimed video
async function trimVideo(videoSrc, videoType, newStartTime, newEndTime) {
    if (typeof videoSrc !== "string") {
        return "videoSrc not string";
    } else if (typeof videoType !== "string") {
        return "videoType not string";
    } else if (isNaN(newStartTime)) {
        return "newStartTime not number";
    } else if (isNaN(newEndTime)) {
        return "newEndTime not number";
    } else {
        const command = new ffmpeg();
        const videofile = await videoData.checkIfVideoSrcOriginalPathExits(videoSrc);
        const compressTrimedVideo = userSettings.checkIfVideoCompress("trimVideo");
        const filepath = "media/video/";
        const fileName = uuidv4();
        const fileType = ".mp4";
        const newFilePath = `${filepath}${fileName}/`;
        const videoDetails = await videoData.findVideosByID(fileName);
        const ffmpegAvaiable = ffmpegPath.checkIfFFmpegFFprobeExits();
        if (ffmpegAvaiable == "ffmpeg-ffprobe-exits") {  
            if (videoDetails == undefined) {
                if (!FileSystem.existsSync(`${filepath}${fileName}/`)){
                    FileSystem.mkdirSync(`${filepath}${fileName}/`);
                }
                ffmpegDownloadResponse.updateDownloadResponse([fileName], {
                    "fileName": fileName,
                    "message": "initializing"
                });
                command.addInput(videofile)
                    .on("start", function() {
                        const startDownload = start_trimVideo(fileName, videoSrc, videoType, newStartTime, newEndTime, compressTrimedVideo);
                        if (startDownload == "start download") {
                            if (ffmpegDownloadResponse.getDownloadResponse([fileName, "message"]) !== undefined) {
                                ffmpegDownloadResponse.updateDownloadResponse([fileName, "message"], fileName);
                            }
                        } else {
                            if (ffmpegDownloadResponse.getDownloadResponse([fileName, "message"]) !== undefined) {
                                ffmpegDownloadResponse.updateDownloadResponse([fileName, "message"], "ffmpeg-failed");
                            }
                            ffmpegPath.SIGKILL(command);
                            deleteData.deleteAllVideoData(fileName);
                        }
                    })
                    .on("progress", function(data) {
                        progress_trimVideo(fileName, data, videoSrc, videoType, newStartTime, newEndTime, compressTrimedVideo);
                    })
                    .on("end", function() {
                        end_trimVideo(fileName, newFilePath, fileType, videoSrc, videoType, newStartTime, newEndTime, compressTrimedVideo);
                        const path = newFilePath+fileName+fileType;
                        if (compressTrimedVideo === true) { // compress video
                            ffmpegCompressionDownload.compression_VP9(path, newFilePath, fileName); 
                        }
                        ffmpegImageDownload.createThumbnail(path, newFilePath, fileName);
                    })
                    .on("error", function(error) {
                        console.log(`Encoding Error: ${error.message}`);
                        if (error.message === "Cannot find ffmpeg") {
                            if (ffmpegDownloadResponse.getDownloadResponse([fileName, "message"]) !== undefined) {
                                ffmpegDownloadResponse.updateDownloadResponse([fileName, "message"], "Cannot-find-ffmpeg");
                            }
                        } else {
                            if (ffmpegDownloadResponse.getDownloadResponse([fileName, "message"]) !== undefined) {
                                ffmpegDownloadResponse.updateDownloadResponse([fileName, "message"], "ffmpeg-failed");
                            }
                        }
                        deleteData.deleteAllVideoData(fileName);
                    })
                    // .addInputOption("-y")
                    .outputOptions([`-ss ${newStartTime}`, `-t ${(newEndTime-newStartTime)}`, "-vcodec copy", "-acodec copy"])
                    .output(`${newFilePath}${fileName}${fileType}`)
                    .run();
                return {
                    "fileName": fileName,
                    "message": "initializing"
                };
            } else {
                return await trimVideo(videoSrc, videoType, newStartTime, newEndTime);
            }
        } else { 
            return {
                "message": ffmpegAvaiable
            };
        } 
    }
}

function start_trimVideo(fileName, videoSrc, videoType, newStartTime, newEndTime, compressTrimedVideo) {
    if (fileName === undefined) {
        return "fileName undefined";
    } else if (typeof videoSrc !== "string") {
        return "videoSrc not string";
    } else if (typeof videoType !== "string") {
        return "videoType not string";
    } else if (isNaN(newStartTime)) {
        return "newStartTime not number";
    } else if (isNaN(newEndTime)) {
        return "newEndTime not number";
    } else {
        videoData.updateVideoData([`${fileName}`], {
            video:{
                originalVideoSrc : videoSrc,
                originalVideoType : videoType,
                newVideoStartTime: newStartTime,
                newVideoEndTime: newEndTime,
                download : "starting trim video download"
            }
        });
        
        if (compressTrimedVideo === true) { // addition of compress video data
                currentDownloadVideos.updateCurrentDownloadVideos([`${fileName}`], {
                video : { 
                    "download-status" : "starting trim video download"
                },
                compression : { 
                    "download-status" : "waiting for video"
                },
                thumbnail : { 
                    "download-status" : "waiting for video"
                } 
            });
        } else {
            currentDownloadVideos.updateCurrentDownloadVideos([`${fileName}`], {
                video : { 
                    "download-status" : "starting trim video download"
                },
                thumbnail : { 
                    "download-status" : "waiting for video"
                } 
            });
        }
        return "start download";
    }
}

function progress_trimVideo(fileName, data, videoSrc, videoType, newStartTime, newEndTime, compressTrimedVideo) {
    if (fileName === undefined) {
        return "fileName undefined";
    } else if (typeof data !== "object") {
        return "invalid data";
    } else  if (typeof data.percent !== "number") { 
        return "invalid data.percent";
    }else {
        if (videoData.getVideoData([`${fileName}`, "video", "download"]) !== undefined && currentDownloadVideos.getCurrentDownloads([`${fileName}`, "video", "download-status"]) !== undefined) {
            videoData.updateVideoData([`${fileName}`, "video", "download"], data.percent);
            if(data.percent < 0){ 
                currentDownloadVideos.updateCurrentDownloadVideos([`${fileName}`, "video", "download-status"], "0.00%");
            } else{
                try {
                    currentDownloadVideos.updateCurrentDownloadVideos([`${fileName}`, "video", "download-status"], `${data.percent.toFixed(2)}%`);  
                } catch (error) {
                    currentDownloadVideos.updateCurrentDownloadVideos([`${fileName}`, "video", "download-status"], `${data.percent}%`);
                }
            }   
            return "update download progress";
        } else {
            const start_response = start_trimVideo(fileName, videoSrc, videoType, newStartTime, newEndTime, compressTrimedVideo);
            if (start_response == "start download") {
                videoData.updateVideoData([`${fileName}`, "video", "download"], data.percent);
                if(data.percent < 0){ 
                    currentDownloadVideos.updateCurrentDownloadVideos([`${fileName}`, "video", "download-status"], "0.00%");
                } else{
                    try {
                        currentDownloadVideos.updateCurrentDownloadVideos([`${fileName}`, "video", "download-status"], `${data.percent.toFixed(2)}%`);  
                    } catch (error) {
                        currentDownloadVideos.updateCurrentDownloadVideos([`${fileName}`, "video", "download-status"], `${data.percent}%`);
                    }
                }   
                return "update download progress";
            } else {
                return start_response;
            }
        }
    }
}

function end_trimVideo(fileName, newFilePath, fileType, videoSrc, videoType, newStartTime, newEndTime, compressTrimedVideo) {
    if (fileName === undefined) {
        return "fileName undefined";
    } else if(typeof newFilePath !== "string") {
        return "newFilePath not string";
    } else if(typeof fileType !== "string") {
        return "fileType not string";
    } else if (typeof videoSrc !== "string") {
        return "videoSrc not string";
    } else if (typeof videoType !== "string") {
        return "videoType not string";
    } else if (isNaN(newStartTime)) {
        return "newStartTime not number";
    } else if (isNaN(newEndTime)) {
        return "newEndTime not number";
    } else {
        if (compressTrimedVideo === true) { // addition of compress video data
            videoData.updateVideoData([`${fileName}`], {
                video: {
                    originalVideoSrc: videoSrc,
                    originalVideoType: videoType,
                    newVideoStartTime: newStartTime,
                    newVideoEndTime: newEndTime,
                    path: newFilePath+fileName+fileType,
                    videoType: "video/mp4",
                    download: "completed"
                },
                compression : {
                    download: "starting",
                    "temp-path": []
                },
                thumbnail: {
                    path: {},
                    download: "starting"
                }
            });
            currentDownloadVideos.updateCurrentDownloadVideos([`${fileName}`], {
                video : { 
                    "download-status" : "completed"
                },
                compression : { 
                    "download-status" : "starting video compression"
                },
                thumbnail : { 
                    "download-status" : "starting thumbnail download"
                } 
            });
        } else {
            videoData.updateVideoData([`${fileName}`], {
                video: {
                    originalVideoSrc: videoSrc,
                    originalVideoType: videoType,
                    newVideoStartTime: newStartTime,
                    newVideoEndTime: newEndTime,
                    path: newFilePath+fileName+fileType,
                    videoType: "video/mp4",
                    download: "completed"
                },
                thumbnail: {
                    path: {},
                    download: "starting"
                }
            });
            currentDownloadVideos.updateCurrentDownloadVideos([`${fileName}`], {
                video : { 
                    "download-status" : "completed"
                },
                thumbnail : { 
                    "download-status" : "starting thumbnail download"
                } 
            });
        }
        return "end download";
    }
}

module.exports = { // export modules
    trimVideo,
    start_trimVideo,
    progress_trimVideo,
    end_trimVideo
};
