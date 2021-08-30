const streamVideo = require("./streamVideo");
const { v4: uuidv4 } = require("uuid");
const ffprobe_path = "./ffprobe.exe";
const ffmpeg_path = "./ffmpeg.exe";
const untrunc_path = "untrunc.exe";
const working_video_path = "./media/working-video/video.mp4";

describe("update_ffprobe_path", () =>  {  
    afterAll(() => { 
        streamVideo.update_ffprobe_path(ffprobe_path);
    });

    it("update", () =>  {
        const updated = streamVideo.update_ffprobe_path("yaya");
        expect(updated).toBe("yaya");  
    }); 
}); 

describe("update_ffmpeg_path", () =>  {  
    afterAll(() => { 
        streamVideo.update_ffmpeg_path(ffmpeg_path);
    });

    it("update", () =>  {
        const updated = streamVideo.update_ffmpeg_path("test");
        expect(updated).toBe("test");  
    }); 
}); 

describe("update_untrunc_path", () =>  {  
    afterAll(() => { 
        streamVideo.update_untrunc_path(untrunc_path);
    });

    it("update", () =>  {
        const updated = streamVideo.update_untrunc_path("test");
        expect(updated).toBe("test");  
    }); 
}); 

describe("update_working_video_path", () =>  {  
    afterAll(() => { 
        streamVideo.update_working_video_path(working_video_path);
    });

    it("update", () =>  {
        const updated = streamVideo.update_working_video_path("test");
        expect(updated).toBe("test");  
    }); 
}); 

describe("getAllVideoData", () =>  {  
    it("JSON Object", () =>  {
        const getAllVideoData = streamVideo.getAllVideoData();
        expect.objectContaining(getAllVideoData);
        expect(getAllVideoData).toMatchObject({});
    }); 
}); 

describe("resetVideoData", () =>  {   
    it("reset", () =>  {
        const resetVideoData = streamVideo.resetVideoData();
        expect(resetVideoData).toBe("resetVideoData"); 
        const getAllVideoData = streamVideo.getAllVideoData();
        expect(Object.keys(getAllVideoData).length).toBe(0); 
        expect.objectContaining(getAllVideoData);
        expect(getAllVideoData).toMatchObject({});
    }); 
}); 

describe("findVideosByID", () =>  {
    const id = uuidv4();
    beforeAll(() => {       
        streamVideo.updateVideoDataByID(id, {
            "video": { 
                "download": "completed"
            },
            "thumbnail": { 
                "download": "completed"
            }
        });
    });

    afterAll(() => { 
        streamVideo.resetVideoData();
    });

    it("Avaiable Video Data", () =>  {
        const findVideosByID = streamVideo.findVideosByID(id);
        expect(findVideosByID).toBeDefined(); 
        expect(findVideosByID.video.download).toBe("completed"); 
        expect(findVideosByID.thumbnail.download).toBe("completed"); 
        streamVideo.deleteVideoDataByID(id);
    });

    it("UnAvaiable Video Data", () =>  {
        const findVideosByID = streamVideo.findVideosByID();
        expect(findVideosByID).toBeUndefined();
    });
}); 

describe("updateVideoDataByID", () =>  { 
    afterAll(() => {  
        streamVideo.resetVideoData();
    });

    it("Update Video Data", () =>  {
        const id = uuidv4();
        const updateVideoDataByID = streamVideo.updateVideoDataByID(id, {
            "video": { 
                "download": "completed"
            },
            "thumbnail": { 
                "download": "completed"
            }
        });
        expect(updateVideoDataByID).toBeDefined(); 
        expect(updateVideoDataByID.video.download).toBe("completed"); 
        expect(updateVideoDataByID.thumbnail.download).toBe("completed"); 
        streamVideo.deleteVideoDataByID(id);
    });
}); 

describe("deleteVideoDataByID", () =>  { 
    const id_1 = uuidv4();
    beforeAll(() => {       
        streamVideo.updateVideoDataByID(id_1, {
            "video": { 
                "download": "completed"
            },
            "thumbnail": { 
                "download": "completed"
            }
        });
    });

    afterAll(() => {  
        streamVideo.resetVideoData();
    });

    it("Delete Video Data", () =>  {
        const deleteVideoDataByID = streamVideo.deleteVideoDataByID(id_1);
        expect(deleteVideoDataByID).toBe(`Deleted ${id_1}`);   
    });

    it("VideoID Unavaiable", () =>  {
        const id_2 = uuidv4();
        const deleteVideoDataByID = streamVideo.deleteVideoDataByID(id_2);
        expect(deleteVideoDataByID).toBe(`${id_2} Unavaiable`);   
    });
}); 

describe("getAllAvailableVideos", () =>  {  
    it("JSON Object", () =>  {
        const getAllAvailableVideos = streamVideo.getAllAvailableVideos();
        expect(getAllAvailableVideos).toBeDefined();   
        expect.objectContaining(getAllAvailableVideos);
    }); 
}); 


describe("resetAvailableVideos", () =>  {  
    it("reset", () =>  {
        const resetAvailableVideos = streamVideo.resetAvailableVideos();
        expect(resetAvailableVideos).toBe("resetAvailableVideos"); 
        const getAllAvailableVideos = streamVideo.getAllAvailableVideos();
        expect(Object.keys(getAllAvailableVideos).length).toBe(0); 
        expect(getAllAvailableVideos).toMatchObject({});
    }); 
}); 


describe("currentDownloads", () =>  {  
    it("JSON Object", () =>  {
        const currentDownloads = streamVideo.currentDownloads();
        expect(currentDownloads).toBeDefined();   
        expect.objectContaining(currentDownloads);
    }); 
}); 

describe("resetCurrentDownloadVideos", () =>  {  
    it("reset", () =>  {
        const resetCurrentDownloadVideos = streamVideo.resetCurrentDownloadVideos();
        expect(resetCurrentDownloadVideos).toBe("resetCurrentDownloadVideos"); 
        const currentDownloads = streamVideo.currentDownloads();
        expect(Object.keys(currentDownloads).length).toBe(0); 
        expect(currentDownloads).toMatchObject({});
    }); 
}); 

describe("updateCurrentDownloadByID", () =>  { 
    const id = uuidv4();
    afterAll(() => { 
        streamVideo.resetCurrentDownloadVideos();
    });

    it("Update Video Data", () =>  {
        const updateCurrentDownloadByID = streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "unfinished download"
            },
            "thumbnail": {
                "download-status": "waiting for video"
            }
        });
        expect(updateCurrentDownloadByID).toBeDefined(); 
        expect(updateCurrentDownloadByID.video["download-status"]).toBe("unfinished download"); 
        expect(updateCurrentDownloadByID.thumbnail["download-status"]).toBe("waiting for video"); 
        streamVideo.deleteCurrentDownloadByID(id);
    });
}); 

describe("deleteCurrentDownloadByID", () =>  { 
    const id_1 = uuidv4();
    beforeAll(() => {       
        streamVideo.updateCurrentDownloadByID(id_1, { 
            "video": {
                "download-status": "unfinished download"
            },
            "thumbnail": {
                "download-status": "waiting for video"
            }
        });
    });

    afterAll(() => { 
        streamVideo.resetCurrentDownloadVideos();
    });

    it("Delete Video Data", () =>  {
        const deleteCurrentDownloadByID = streamVideo.deleteCurrentDownloadByID(id_1);
        expect(deleteCurrentDownloadByID).toBe(`Deleted ${id_1}`);   
    });  

    it("VideoID Unavaiable", () =>  {
        const id_2 = uuidv4();
        const deleteCurrentDownloadByID = streamVideo.deleteCurrentDownloadByID(id_2);
        expect(deleteCurrentDownloadByID).toBe(`${id_2} Unavaiable`);   
    });
}); 

describe("cheackForAvailabeUnFinishedVideoDownloads", () =>  {    
    afterAll(() => { 
        streamVideo.resetCurrentDownloadVideos();
    });

    it("video unavailable", () =>  {  
        const id = uuidv4();
        streamVideo.updateCurrentDownloadByID(id, {  
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeUndefined(); 
        streamVideo.deleteCurrentDownloadByID(id);   
    }); 

    it("video - starting stream download", () =>  {  
        const id = uuidv4();
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "starting stream download"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeUndefined();   
        streamVideo.deleteCurrentDownloadByID(id);
    }); 

    it("video - starting full video download", () =>  {  
        const id = uuidv4();
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "starting full video download"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeUndefined();  
        streamVideo.deleteCurrentDownloadByID(id);
    }); 

    it("video - starting trim video download", () =>  {  
        const id = uuidv4();
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "starting trim video download"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeUndefined();   
        streamVideo.deleteCurrentDownloadByID(id);
    });

    it("video - starting uploaded video download", () =>  {  
        const id = uuidv4();
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "starting uploaded video download"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeUndefined();    
        streamVideo.deleteCurrentDownloadByID(id);
    });

    it("video - 0.00%", () =>  {  
        const id = uuidv4();
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "0.00%"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeUndefined();    

        streamVideo.deleteCurrentDownloadByID(id);
    });
 
    it("video - untrunc is unavailable", () =>  {   
        const id = uuidv4();
        streamVideo.update_untrunc_path("");
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "20.00%"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("untrunc unavailable");   
   
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_untrunc_path(untrunc_path);
    }); 
 
    it("video - working-video/video.mp4 is unavailable", () =>  {  
        const id = uuidv4();
        streamVideo.update_working_video_path("");
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "20.00%"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("working video for untrunc is unavailable");   
   
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_working_video_path(working_video_path);
    }); 
    
    it("video - unfinnished", () =>  {  
        const id = uuidv4();
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "20.00%"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("unfinished download");   
   
        streamVideo.deleteCurrentDownloadByID(id);
    }); 

    it("thumbnail false compression false - unavailable ffmpeg & ffprobe", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffmpeg_path("");
        streamVideo.update_ffprobe_path("");
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.thumbnail["download-status"]).toBe("ffmpeg and ffprobe unavailable");   
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path);
        streamVideo.update_ffprobe_path(ffprobe_path);
    }); 

    it("thumbnail false compression false - unavailable ffmpeg", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffmpeg_path("");
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.thumbnail["download-status"]).toBe("ffmpeg unavailable");   
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path);
    }); 

    it("thumbnail false compression false - unavailable ffprobe", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffprobe_path("");
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.thumbnail["download-status"]).toBe("ffprobe unavailable");   
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffprobe_path(ffprobe_path);
    }); 

    it("thumbnail false compression false - update thumbanil unfinnished", () =>  {  
        const id = uuidv4();
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed");
        expect(check.thumbnail["download-status"]).toBe("unfinished download");   
   
        streamVideo.deleteCurrentDownloadByID(id);
    }); 

    it("thumbnail false compression true - compression completed - unavailable ffmpeg & ffprobe", () =>  {  
        const id = uuidv4();
        streamVideo.update_ffmpeg_path("");
        streamVideo.update_ffprobe_path("");
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
                "download-status": "completed"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("completed");
        expect(check.thumbnail["download-status"]).toBe("ffmpeg and ffprobe unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path);
        streamVideo.update_ffprobe_path(ffprobe_path);
    }); 

    it("thumbnail false compression true - compression unfinnised - unavailable ffmpeg & ffprobe", () =>  {  
        const id = uuidv4();
        streamVideo.update_ffmpeg_path("");
        streamVideo.update_ffprobe_path("");
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
                "download-status": "20.00%"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("ffmpeg and ffprobe unavailable");
        expect(check.thumbnail["download-status"]).toBe("ffmpeg and ffprobe unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path);
        streamVideo.update_ffprobe_path(ffprobe_path);
    }); 

    it("thumbnail false compression true - compression completed - unavailable ffmpeg", () =>  {  
        const id = uuidv4();
        streamVideo.update_ffmpeg_path(""); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
                "download-status": "completed"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("completed");
        expect(check.thumbnail["download-status"]).toBe("ffmpeg unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path); 
    }); 

    it("thumbnail false compression true - compression unfinnised - unavailable ffmpeg", () =>  {  
        const id = uuidv4();
        streamVideo.update_ffmpeg_path(""); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
                "download-status": "20.00%"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("ffmpeg unavailable");
        expect(check.thumbnail["download-status"]).toBe("ffmpeg unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path); 
    });  

    it("thumbnail false compression true - compression completed - unavailable ffprobe", () =>  {  
        const id = uuidv4();
        streamVideo.update_ffprobe_path(""); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
                "download-status": "completed"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("completed");
        expect(check.thumbnail["download-status"]).toBe("ffprobe unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffprobe_path); 
    }); 

    it("thumbnail false compression true - compression unfinnised - unavailable ffprobe", () =>  {  
        const id = uuidv4();
        streamVideo.update_ffprobe_path(""); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
                "download-status": "20.00%"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("ffprobe unavailable");
        expect(check.thumbnail["download-status"]).toBe("ffprobe unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffprobe_path(ffprobe_path); 
    });   

    it("thumbnail false compression true - compression completed", () =>  {  
        const id = uuidv4();
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "completed"
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("completed");
        expect(check.thumbnail["download-status"]).toBe("unfinished download");   
        streamVideo.deleteCurrentDownloadByID(id);
    }); 

    it("thumbnail false compression true - compression unfinnished", () =>  {  
        const id = uuidv4();
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "20.00%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("unfinished download");
        expect(check.thumbnail["download-status"]).toBe("unfinished download");   
        streamVideo.deleteCurrentDownloadByID(id);
    }); 

    it("thumbnail true compression false - unavailable ffmpeg & ffprobe", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffmpeg_path(""); 
        streamVideo.update_ffprobe_path(""); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "thumbnail": {
              "download-status": "20.00%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed");   
        expect(check.thumbnail["download-status"]).toBe("ffmpeg and ffprobe unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path); 
        streamVideo.update_ffprobe_path(ffprobe_path);     
    }); 

    it("thumbnail true compression false - unavailable ffmpeg", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffmpeg_path("");  
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "thumbnail": {
              "download-status": "20.00%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed");   
        expect(check.thumbnail["download-status"]).toBe("ffmpeg unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path);     
    }); 

    it("thumbnail true compression false - unavailable ffprobe", () =>  {   
        const id = uuidv4(); 
        streamVideo.update_ffprobe_path(""); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "thumbnail": {
              "download-status": "20.00%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed");   
        expect(check.thumbnail["download-status"]).toBe("ffprobe unavailable");      
        streamVideo.deleteCurrentDownloadByID(id); 
        streamVideo.update_ffprobe_path(ffprobe_path);
    }); 

    it("thumbnail true compression false - thumbnail completed", () =>  {   
        const id = uuidv4(); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "thumbnail": {
              "download-status": "completed"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeUndefined();  
        streamVideo.deleteCurrentDownloadByID(id);
    }); 

    it("thumbnail true compression false - thumbnail unfinnished", () =>  {   
        const id = uuidv4(); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "thumbnail": {
              "download-status": "20.00%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.thumbnail["download-status"]).toBe("unfinished download");   
        streamVideo.deleteCurrentDownloadByID(id);
    }); 

    it("thumbnail && compression true - thumbnail completed compression not completed - unavailable ffmpeg & ffprobe", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffmpeg_path(""); 
        streamVideo.update_ffprobe_path(""); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "20%"  
            },
            "thumbnail": {
              "download-status": "completed"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("ffmpeg and ffprobe unavailable");
        expect(check.thumbnail["download-status"]).toBe("completed");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path); 
        streamVideo.update_ffprobe_path(ffprobe_path);    
    }); 

    it("thumbnail && compression true - thumbnail completed not compression completed - unavailable ffmpeg & ffprobe", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffmpeg_path(""); 
        streamVideo.update_ffprobe_path(""); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "completed"  
            },
            "thumbnail": {
              "download-status": "20%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("completed");
        expect(check.thumbnail["download-status"]).toBe("ffmpeg and ffprobe unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path); 
        streamVideo.update_ffprobe_path(ffprobe_path);    
    }); 
    
    it("thumbnail && compression true - thumbnail compression not completed - unavailable ffmpeg & ffprobe", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffmpeg_path(""); 
        streamVideo.update_ffprobe_path(""); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "20%" 
            },
            "thumbnail": {
              "download-status": "20%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("ffmpeg and ffprobe unavailable");
        expect(check.thumbnail["download-status"]).toBe("ffmpeg and ffprobe unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path); 
        streamVideo.update_ffprobe_path(ffprobe_path);    
    }); 

    it("thumbnail && compression true - thumbnail completed compression not completed - unavailable ffmpeg", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffmpeg_path("");  
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "20%"  
            },
            "thumbnail": {
              "download-status": "completed"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("ffmpeg unavailable");
        expect(check.thumbnail["download-status"]).toBe("completed");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path);    
    }); 

    it("thumbnail && compression true - thumbnail completed not compression completed - unavailable ffmpeg", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffmpeg_path("");  
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "completed"  
            },
            "thumbnail": {
              "download-status": "20%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("completed");
        expect(check.thumbnail["download-status"]).toBe("ffmpeg unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path);    
    }); 
    
    it("thumbnail && compression true - thumbnail compression not completed - unavailable ffmpeg", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffmpeg_path("");   
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "20%" 
            },
            "thumbnail": {
              "download-status": "20%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("ffmpeg unavailable");
        expect(check.thumbnail["download-status"]).toBe("ffmpeg unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffmpeg_path(ffmpeg_path);   
    }); 

    it("thumbnail && compression true - thumbnail completed compression not completed - unavailable ffprobe", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffprobe_path("");  
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "20%"  
            },
            "thumbnail": {
              "download-status": "completed"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("ffprobe unavailable");
        expect(check.thumbnail["download-status"]).toBe("completed");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffprobe_path(ffprobe_path);    
    }); 

    it("thumbnail && compression true - thumbnail completed not compression completed - unavailable ffprobe", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffprobe_path("");  
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "completed"  
            },
            "thumbnail": {
              "download-status": "20%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("completed");
        expect(check.thumbnail["download-status"]).toBe("ffprobe unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffprobe_path(ffprobe_path);    
    }); 
    
    it("thumbnail && compression true - thumbnail compression not completed - unavailable ffprobe", () =>  {   
        const id = uuidv4();
        streamVideo.update_ffprobe_path("");   
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "20%" 
            },
            "thumbnail": {
              "download-status": "20%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeDefined();   
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("ffprobe unavailable");
        expect(check.thumbnail["download-status"]).toBe("ffprobe unavailable");      
        streamVideo.deleteCurrentDownloadByID(id);
        streamVideo.update_ffprobe_path(ffprobe_path);   
    });    

    it("thumbnail && compression true - thumbnail compression completed", () =>  {   
        const id = uuidv4();
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "completed"  
            },
            "thumbnail": {
              "download-status": "completed"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check).toBeUndefined();   
    });
        
    it("thumbnail && compression true - thumbnail completed compression unfinnished", () =>  {   
        const id = uuidv4(); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "20.00%"  
            },
            "thumbnail": {
              "download-status": "completed"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("unfinished download");   
        expect(check.thumbnail["download-status"]).toBe("completed");   
        streamVideo.deleteCurrentDownloadByID(id);
    });
        
    it("thumbnail && compression true - thumbnail unfinnished compression completed", () =>  {   
        const id = uuidv4(); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "completed"  
            },
            "thumbnail": {
              "download-status": "20.00%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("completed");   
        expect(check.thumbnail["download-status"]).toBe("unfinished download");   
        streamVideo.deleteCurrentDownloadByID(id);
    });
    
    it("thumbnail && compression true - thumbnail compression unfinnished", () =>  {   
        const id = uuidv4(); 
        streamVideo.updateCurrentDownloadByID(id, { 
            "video": {
                "download-status": "completed"
            },
            "compression": {
              "download-status": "20.00%"    
            },
            "thumbnail": {
              "download-status": "20.00%"  
            }
        });
        streamVideo.cheackForAvailabeUnFinishedVideoDownloads();
        const check = streamVideo.findCurrentDownloadByID(id);
        expect(check.video["download-status"]).toBe("completed"); 
        expect(check.compression["download-status"]).toBe("unfinished download");   
        expect(check.thumbnail["download-status"]).toBe("unfinished download");   
        streamVideo.deleteCurrentDownloadByID(id);
    });
}); 