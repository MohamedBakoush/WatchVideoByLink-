const availableVideos = require("../../../backend/scripts/available-videos");
const availableVideos_json_path = "__tests__/data/available-videos.test.json";
const { v4: uuidv4 } = require("uuid");

beforeAll(() => {    
    availableVideos.update_available_videos_path(availableVideos_json_path); 
    availableVideos.resetAvailableVideos();
});

afterEach(() => {    
    availableVideos.resetAvailableVideos();
}); 

describe("update_json_path_validity", () =>  {  
    it("invalid path", () =>  {
        const updated = availableVideos.update_json_path_validity();
        expect(updated).toBe("invalid path");  
    });

    it("input path not json", () =>  {
        const updated = availableVideos.update_json_path_validity("__tests__/backend/scripts/available-videos.test.js");
        expect(updated).toBe("input path not json");  
    }); 

    it("valid path", () =>  {
        const updated = availableVideos.update_json_path_validity(availableVideos_json_path);
        expect(updated).toBe("valid path");  
    }); 
}); 

describe("update_available_videos_path", () =>  {  
    afterAll(() => { 
        availableVideos.update_available_videos_path(availableVideos_json_path);
    });

    it("invalid path", () =>  {
        const updated = availableVideos.update_available_videos_path();
        expect(updated).toBe("invalid path");  
    });

    it("input path not json", () =>  {
        const updated = availableVideos.update_available_videos_path("__tests__/backend/scripts/available-videos.test.js");
        expect(updated).toBe("input path not json");  
    }); 

    it("availableVideos updated", () =>  {
        const updated = availableVideos.update_available_videos_path(availableVideos_json_path);
        expect(updated).toBe("availableVideos updated");  
    }); 
}); 

describe("getAvailableVideos", () =>  {   
    it("No input - path array", () =>  {
        const getAvailableVideos = availableVideos.getAvailableVideos();
        expect(getAvailableVideos).toMatchObject({}); 
    }); 

    it("Invalid path array", () =>  {
        const getAvailableVideos = availableVideos.getAvailableVideos([]);
        expect(getAvailableVideos).toBe("invalid array path"); 
    }); 

    it("Get Specified Video Data", () =>  { 
        const fileName = uuidv4();
        const updateAvailableVideos = availableVideos.updateAvailableVideoData([fileName], {
            "info": {
                "title": fileName,
                "videoLink": {
                    "src": `/video/${fileName}`,
                    "type": "video/mp4"
                },
                "thumbnailLink": {
                    "1": `/thumbnail/${fileName}/1`,
                    "2": `/thumbnail/${fileName}/2`,
                    "3": `/thumbnail/${fileName}/3`,
                    "4": `/thumbnail/${fileName}/4`,
                    "5": `/thumbnail/${fileName}/5`,
                    "6": `/thumbnail/${fileName}/6`,
                    "7": `/thumbnail/${fileName}/7`,
                    "8": `/thumbnail/${fileName}/8`
                }
            }
        });
        expect(updateAvailableVideos).toBe("updateAvailableVideoData");  
        const get_data = availableVideos.getAvailableVideos([fileName]);
        expect(get_data).toMatchObject({
            "info": {
                "title": fileName,
                "videoLink": {
                    "src": `/video/${fileName}`,
                    "type": "video/mp4"
                },
                "thumbnailLink": {
                    "1": `/thumbnail/${fileName}/1`,
                    "2": `/thumbnail/${fileName}/2`,
                    "3": `/thumbnail/${fileName}/3`,
                    "4": `/thumbnail/${fileName}/4`,
                    "5": `/thumbnail/${fileName}/5`,
                    "6": `/thumbnail/${fileName}/6`,
                    "7": `/thumbnail/${fileName}/7`,
                    "8": `/thumbnail/${fileName}/8`
                }
            }
        });   
    });
}); 

describe("resetAvailableVideos", () =>  {  
    it("resetAvailableVideos", () =>  {
        const reset = availableVideos.resetAvailableVideos();
        expect(reset).toBe("resetAvailableVideos");  
        const data = availableVideos.getAvailableVideos();
        expect(data).toMatchObject({}); 
    });
}); 

describe("updateAvailableVideoData", () =>  {  
    it("invalid path_array", () =>  {
        const fileName = uuidv4();
        const updateAvailableVideos = availableVideos.updateAvailableVideoData(fileName, {});
        expect(updateAvailableVideos).toBe("invalid path_array");  
    }); 

    it("invalid data", () =>  {
        const fileName = uuidv4();
        const updateAvailableVideos = availableVideos.updateAvailableVideoData([fileName], undefined);
        expect(updateAvailableVideos).toBe("invalid data");  
    }); 

    it("updateAvailableVideoData", () =>  { 
        const fileName = uuidv4();
        const updateAvailableVideos = availableVideos.updateAvailableVideoData([fileName], {
            "info": {
                "title": fileName,
                "videoLink": {
                    "src": `/video/${fileName}`,
                    "type": "video/mp4"
                },
                "thumbnailLink": {
                    "1": `/thumbnail/${fileName}/1`,
                    "2": `/thumbnail/${fileName}/2`,
                    "3": `/thumbnail/${fileName}/3`,
                    "4": `/thumbnail/${fileName}/4`,
                    "5": `/thumbnail/${fileName}/5`,
                    "6": `/thumbnail/${fileName}/6`,
                    "7": `/thumbnail/${fileName}/7`,
                    "8": `/thumbnail/${fileName}/8`
                }
            }
        });
        expect(updateAvailableVideos).toBe("updateAvailableVideoData");  
        const get_data = availableVideos.getAvailableVideos([fileName]);
        expect(get_data).toMatchObject({
            "info": {
                "title": fileName,
                "videoLink": {
                    "src": `/video/${fileName}`,
                    "type": "video/mp4"
                },
                "thumbnailLink": {
                    "1": `/thumbnail/${fileName}/1`,
                    "2": `/thumbnail/${fileName}/2`,
                    "3": `/thumbnail/${fileName}/3`,
                    "4": `/thumbnail/${fileName}/4`,
                    "5": `/thumbnail/${fileName}/5`,
                    "6": `/thumbnail/${fileName}/6`,
                    "7": `/thumbnail/${fileName}/7`,
                    "8": `/thumbnail/${fileName}/8`
                }
            }
        });   
    });
}); 

describe("availableVideosfolderPath_String", () =>  {   
    it("invalid folderIDPath", () =>  { 
        const string = availableVideos.availableVideosfolderPath_String();
        expect(string).toBe("invalid folderIDPath");  
    }); 

    it("folderIDPath array input empty", () =>  { 
        const string = availableVideos.availableVideosfolderPath_String([]);
        expect(string).toBe("folderIDPath array input empty");  
    }); 

    it("folder content string path", () =>  { 
        const string = availableVideos.availableVideosfolderPath_String(["folder_test"]);
        expect(string).toBe("availableVideos[\"folder_test\"].content");  
    }); 

    it("folder in a folder string path", () =>  { 
        const string = availableVideos.availableVideosfolderPath_String(["folder_test_1", "folder_test_2"]);
        expect(string).toBe("availableVideos[\"folder_test_1\"].content[\"folder_test_2\"].content");  
    }); 
}); 

describe("availableVideosfolderPath_Array", () =>  {   
    it("invalid folderIDPath", () =>  { 
        const string = availableVideos.availableVideosfolderPath_Array();
        expect(string).toBe("invalid folderIDPath");  
    }); 

    it("folderIDPath array input empty", () =>  { 
        const string = availableVideos.availableVideosfolderPath_Array([]);
        expect(string).toBe("folderIDPath array input empty");  
    }); 

    it("folder content array path", () =>  { 
        const string = availableVideos.availableVideosfolderPath_Array(["folder_test"]);
        expect(string).toEqual(["folder_test", "content"]);  
    }); 

    it("folder in a folder array path", () =>  { 
        const string = availableVideos.availableVideosfolderPath_Array(["folder_test_1", "folder_test_2"]);
        expect(string).toEqual(["folder_test_1", "content", "folder_test_2", "content"]);  
    }); 
}); 

describe("changeTitle", () =>  {
    it("Change Title: Video", async () =>  { 
        const id = uuidv4();
        availableVideos.updateAvailableVideoData([id], {
            "info": {
                "title": id,
                "videoLink": {
                    "src": `/video/${id}`,
                    "type": "video/mp4"
                },
                "thumbnailLink": {
                    "1": `/thumbnail/${id}/1`,
                    "2": `/thumbnail/${id}/2`,
                    "3": `/thumbnail/${id}/3`,
                    "4": `/thumbnail/${id}/4`,
                    "5": `/thumbnail/${id}/5`,
                    "6": `/thumbnail/${id}/6`,
                    "7": `/thumbnail/${id}/7`,
                    "8": `/thumbnail/${id}/8`
                }
            }
        });

        const changeTitle = await availableVideos.changeTitle(id, "Test: new video title");
        expect(changeTitle.message).toBe("video-title-changed",);  
        expect(changeTitle.availableVideos[id]["info"]["title"]).toBe("Test: new video title"); 
    });

    it("Change Title: Video inside Folder", async () =>  { 
        const createFolder = availableVideos.createFolder(undefined, "title_folder_test");
        expect(createFolder.message).toBe("folder-created"); 
        expect(createFolder.availableVideos[createFolder.folderID]["info"]["title"]).toBe("title_folder_test");  
        
        const id = uuidv4();
        availableVideos.updateAvailableVideoData([id], {
            "info": {
                "title": id,
                "videoLink": {
                    "src": `/video/${id}`,
                    "type": "video/mp4"
                },
                "thumbnailLink": {
                    "1": `/thumbnail/${id}/1`,
                    "2": `/thumbnail/${id}/2`,
                    "3": `/thumbnail/${id}/3`,
                    "4": `/thumbnail/${id}/4`,
                    "5": `/thumbnail/${id}/5`,
                    "6": `/thumbnail/${id}/6`,
                    "7": `/thumbnail/${id}/7`,
                    "8": `/thumbnail/${id}/8`
                }
            }
        });

        availableVideos.inputSelectedIDIntoFolderID(id, createFolder.folderID,);

        const changeTitle = await availableVideos.changeTitle(id, "Test: new video title", [createFolder.folderID]);
        expect(changeTitle.message).toBe("video-title-changed",);  
        expect(changeTitle.availableVideos[createFolder.folderID]["content"][id]["info"]["title"]).toBe("Test: new video title"); 
    });

    it("Change Title: Folder", async () =>  { 
        const createFolder = availableVideos.createFolder(undefined, "title_folder_test");
        expect(createFolder.message).toBe("folder-created"); 
        expect(createFolder.availableVideos[createFolder.folderID]["info"]["title"]).toBe("title_folder_test");   
        const changeTitle = await availableVideos.changeTitle(createFolder.folderID, "Test: new folder title");
        expect(changeTitle.message).toBe("video-title-changed",);  
        expect(changeTitle.availableVideos[createFolder.folderID]["info"]["title"]).toBe("Test: new folder title"); 
    });

    it("Change Title: Folder inside Folder", async () =>  { 
        const createFolder1 = availableVideos.createFolder(undefined, "title_folder_test_1");
        expect(createFolder1.message).toBe("folder-created"); 
        expect(createFolder1.availableVideos[createFolder1.folderID]["info"]["title"]).toBe("title_folder_test_1");   
        const createFolder2 = availableVideos.createFolder([createFolder1.folderID], "title_folder_test_2");
        expect(createFolder2.message).toBe("folder-created");
        expect(createFolder2.availableVideos[createFolder1.folderID]["content"][createFolder2.folderID]["info"]["title"]).toBe("title_folder_test_2");   
        const changeTitle = await availableVideos.changeTitle(createFolder2.folderID, "Test: new folder title", [createFolder1.folderID]);
        expect(changeTitle.message).toBe("video-title-changed",);  
        expect(changeTitle.availableVideos[createFolder1.folderID]["content"][createFolder2.folderID]["info"]["title"]).toBe("Test: new folder title"); 
    });

    it("Change Title: Invalid ID", async () =>  {  
        const changeTitle = await availableVideos.changeTitle("invalid folderID", "Test: new title");
        expect(changeTitle.message).toBe("failed-to-change-video-title");   
    });

    it("Change Title: Invalid folder path", async () =>  {  
        const changeTitle = await availableVideos.changeTitle("invalid folderID", "Test: new title", ["invalid folderID2"]);
        expect(changeTitle.message).toBe("failed-to-change-video-title");   
    });

    it("Change Title: Invalid ID inside valid folder path", async () =>  {  
        const createFolder = availableVideos.createFolder(undefined, "title_folder_test");
        expect(createFolder.message).toBe("folder-created"); 
        expect(createFolder.availableVideos[createFolder.folderID]["info"]["title"]).toBe("title_folder_test");   
        const changeTitle = await availableVideos.changeTitle("invalid folderID", "Test: new title", [createFolder.folderID]);
        expect(changeTitle.message).toBe("failed-to-change-video-title");   
    });
   
    it("Change Title: ID undefined, newVideoTitle undefined", async () =>  {  
        const changeTitle = await availableVideos.changeTitle(undefined, undefined);
        expect(changeTitle.message).toBe("failed-to-change-video-title");   
    });

    it("Change Title: ID defined, newVideoTitle undefined", async () =>  {  
        const createFolder = availableVideos.createFolder(undefined, "title_folder_test");
        expect(createFolder.message).toBe("folder-created"); 
        expect(createFolder.availableVideos[createFolder.folderID]["info"]["title"]).toBe("title_folder_test");   
        const changeTitle = await availableVideos.changeTitle(createFolder.folderID, undefined);
        expect(changeTitle.message).toBe("failed-to-change-video-title");   
    });

    it("Change Title: ID undefined, newVideoTitle defined", async () =>  {  
        const changeTitle = await availableVideos.changeTitle(undefined, "title_folder_test");
        expect(changeTitle.message).toBe("failed-to-change-video-title");   
    });

    it("Change Title: Inside folder - ID undefined, newVideoTitle undefined", async () =>  {  
        const changeTitle = await availableVideos.changeTitle(undefined, "title_folder_test", ["undefined"]);
        expect(changeTitle.message).toBe("failed-to-change-video-title");   
    });

    it("Change Title: Inside folder - ID defined, newVideoTitle undefined", async () =>  {      
        const createFolder1 = availableVideos.createFolder(undefined, "title_folder_test");
        expect(createFolder1.message).toBe("folder-created"); 
        expect(createFolder1.availableVideos[createFolder1.folderID]["info"]["title"]).toBe("title_folder_test");   
        const createFolder2 = availableVideos.createFolder([createFolder1.folderID], "title_folder_test");
        expect(createFolder2.message).toBe("folder-created"); 
        expect(createFolder2.availableVideos[createFolder1.folderID]["content"][createFolder2.folderID]["info"]["title"]).toBe("title_folder_test");        
        const changeTitle = await availableVideos.changeTitle(createFolder2.folderID, undefined, [createFolder1.folderID]);
        expect(changeTitle.message).toBe("failed-to-change-video-title");   
    });

    it("Change Title: Inside folder - ID undefined, newVideoTitle defined", async () =>  {  
        const createFolder = availableVideos.createFolder(undefined, "title_folder_test");
        expect(createFolder.message).toBe("folder-created"); 
        expect(createFolder.availableVideos[createFolder.folderID]["info"]["title"]).toBe("title_folder_test");   
        const changeTitle = await availableVideos.changeTitle(undefined, "title_folder_test", [createFolder.folderID]);
        expect(changeTitle.message).toBe("failed-to-change-video-title");   
    });
}); 

describe("createFolder", () =>  {  
    it("create Folder", () =>  { 
        const create = availableVideos.createFolder(undefined, "folder_test");
        expect(create.message).toBe("folder-created"); 
        const get = availableVideos.getAvailableVideos([create.folderID]);
        expect(get).toMatchObject({
            "content": {}, 
            "info": {
                "inside-folder": "folder-main", 
                "title": "folder_test"
            }
        });     
    });

    it("Create Folder Inside Folder", () =>  { 
        const create_1 = availableVideos.createFolder(undefined, "folder_test_1");
        expect(create_1.message).toBe("folder-created"); 
        const get_1 = availableVideos.getAvailableVideos([create_1.folderID]);
        expect(get_1).toMatchObject({
            "content": {}, 
            "info": {
                "inside-folder": "folder-main", 
                "title": "folder_test_1"
            }
        });   
        const create_2 = availableVideos.createFolder([create_1.folderID], "folder_test_2");
        expect(create_2.message).toBe("folder-created");
        const get_2 = availableVideos.getAvailableVideos([create_1.folderID, "content", create_2.folderID]);
        expect(get_2).toMatchObject({
            "content": {}, 
            "info": {
                "inside-folder": `${create_1.folderID}`, 
                "title": "folder_test_2"
            }
        });   
    });
}); 
