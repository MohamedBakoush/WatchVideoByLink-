const ffmpegPath = require("../../../backend/scripts/ffmpeg-path");
const ffmpeg_installer = require("@ffmpeg-installer/ffmpeg");
const ffprobe_installer = require("@ffprobe-installer/ffprobe");

const ffprobe_path = ffprobe_installer.path;
const ffmpeg_path = ffmpeg_installer.path;
const untrunc_path = "__tests__/backend/scripts/ffmpeg-path.test.js";
const working_video_path = "./media/working-video/video.mp4";

afterEach(() => {    
    ffmpegPath.update_ffprobe_path(ffprobe_path);
    ffmpegPath.update_ffmpeg_path(ffmpeg_path);
    ffmpegPath.update_untrunc_path(untrunc_path);
    ffmpegPath.update_working_video_path(working_video_path);
}); 

describe("get_ffprobe_path", () =>  {  
    it("update path", () =>  {
        const updated = ffmpegPath.update_ffprobe_path(ffprobe_path);
        expect(updated).toBe(ffprobe_path);  
        const getFFprobePath = ffmpegPath.get_ffprobe_path();
        expect(getFFprobePath).toBe(ffprobe_path); 
    }); 

    it("ffprobe_path", () =>  {
        const getFFprobePath = ffmpegPath.get_ffprobe_path();
        expect(getFFprobePath).toBe(ffprobe_path);  
    }); 
}); 

describe("update_ffprobe_path", () =>  {  
    it("Invalid: undefind", () =>  {
        const updated = ffmpegPath.update_ffprobe_path(undefined);
        expect(updated).toBe(undefined);  
    }); 

    it("Invalid: Empty Array", () =>  {
        const updated_empty_array = ffmpegPath.update_ffprobe_path([]);
        expect(updated_empty_array).toBe(undefined);
    }); 
    
    it("Invalid: Array", () =>  {
        const updated_array = ffmpegPath.update_ffprobe_path([undefined]);
        expect(updated_array).toBe(undefined);  
    }); 

    it("Invalid: Numbers", () =>  {
        const updated_number = ffmpegPath.update_ffprobe_path(123);
        expect(updated_number).toBe(undefined);  
    }); 

    it("Invalid: Object", () =>  {
        const updated_object = ffmpegPath.update_ffprobe_path({});
        expect(updated_object).toBe(undefined);  
    }); 

    it("Invalid: Path", () =>  {
        const updated = ffmpegPath.update_ffprobe_path("test_path");
        expect(updated).toBe(undefined);  
    }); 

    it("Valid: Path", () =>  {
        const updated = ffmpegPath.update_ffprobe_path(ffprobe_path);
        expect(updated).toBe(ffprobe_path);  
    }); 
}); 

describe("get_ffmpeg_path", () =>  {  
    it("update path", () =>  {
        const updated = ffmpegPath.update_ffmpeg_path(ffmpeg_path);
        expect(updated).toBe(ffmpeg_path);  
        const getFFmpegPath = ffmpegPath.get_ffmpeg_path();
        expect(getFFmpegPath).toBe(ffmpeg_path); 
    }); 

    it("ffmpeg_path", () =>  {
        const getFFmpegPath = ffmpegPath.get_ffmpeg_path();
        expect(getFFmpegPath).toBe(ffmpeg_path);  
    }); 
}); 

describe("update_ffmpeg_path", () =>  {  
    it("Invalid: undefind", () =>  {
        const updated = ffmpegPath.update_ffmpeg_path(undefined);
        expect(updated).toBe(undefined);  
    }); 

    it("Invalid: Empty Array", () =>  {
        const updated_empty_array = ffmpegPath.update_ffmpeg_path([]);
        expect(updated_empty_array).toBe(undefined);
    }); 
    
    it("Invalid: Array", () =>  {
        const updated_array = ffmpegPath.update_ffmpeg_path([undefined]);
        expect(updated_array).toBe(undefined);  
    }); 

    it("Invalid: Numbers", () =>  {
        const updated_number = ffmpegPath.update_ffmpeg_path(123);
        expect(updated_number).toBe(undefined);  
    }); 

    it("Invalid: Object", () =>  {
        const updated_object = ffmpegPath.update_ffmpeg_path({});
        expect(updated_object).toBe(undefined);  
    }); 

    it("Invalid: Path", () =>  {
        const updated = ffmpegPath.update_ffmpeg_path("test_path");
        expect(updated).toBe(undefined);  
    }); 

    it("Valid: Path", () =>  {
        const updated = ffmpegPath.update_ffmpeg_path(ffmpeg_path);
        expect(updated).toBe(ffmpeg_path);  
    }); 
}); 

describe("get_untrunc_path", () =>  {  
    it("Update Path", () =>  {
        const updated = ffmpegPath.update_untrunc_path(ffmpeg_path);
        expect(updated).toBe(ffmpeg_path);  
        const getUntruncPath = ffmpegPath.get_untrunc_path();
        expect(getUntruncPath).toBe(ffmpeg_path); 
    }); 

    it("untrunc_path", () =>  {
        const getUntruncPath = ffmpegPath.get_untrunc_path();
        expect(getUntruncPath).toBe(untrunc_path);  
    }); 
}); 

describe("update_untrunc_path", () =>  {  
    it("Invalid: undefind", () =>  {
        const updated = ffmpegPath.update_untrunc_path(undefined);
        expect(updated).toBe(undefined);  
    }); 

    it("Invalid: Empty Array", () =>  {
        const updated_empty_array = ffmpegPath.update_untrunc_path([]);
        expect(updated_empty_array).toBe(undefined);
    }); 
    
    it("Invalid: Array", () =>  {
        const updated_array = ffmpegPath.update_untrunc_path([undefined]);
        expect(updated_array).toBe(undefined);  
    }); 

    it("Invalid: Numbers", () =>  {
        const updated_number = ffmpegPath.update_untrunc_path(123);
        expect(updated_number).toBe(undefined);  
    }); 

    it("Invalid: Object", () =>  {
        const updated_object = ffmpegPath.update_untrunc_path({});
        expect(updated_object).toBe(undefined);  
    }); 

    it("Invalid: Path", () =>  {
        const updated = ffmpegPath.update_untrunc_path("test_path");
        expect(updated).toBe(undefined);  
    }); 

    it("Valid: Path", () =>  {
        const updated = ffmpegPath.update_untrunc_path("__tests__/backend/scripts/ffmpeg-path.test.js");
        expect(updated).toBe("__tests__/backend/scripts/ffmpeg-path.test.js");  
    }); 
}); 

describe("get_working_video_path", () =>  {  
    it("Update Path", () =>  {
        const updated = ffmpegPath.update_working_video_path(ffmpeg_path);
        expect(updated).toBe(ffmpeg_path);  
        const getWorkingVideoPath = ffmpegPath.get_working_video_path();
        expect(getWorkingVideoPath).toBe(ffmpeg_path); 
    }); 

    it("working_video_path", () =>  {
        const getWorkingVideoPath = ffmpegPath.get_working_video_path();
        expect(getWorkingVideoPath).toBe(working_video_path);  
    }); 
}); 