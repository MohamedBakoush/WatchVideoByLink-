import * as basic from "../scripts/basics.js";
import * as search from "../scripts/search.js";
import * as notify from "../scripts/notify.js";
import * as optionMenu from "../scripts/option-menu.js";
import * as folderData from "../scripts/folder-data.js";
import * as folderPath from "../scripts/folder-path.js";
import * as folderCreate from "../scripts/folder-create.js";

// try to fetch for all-available-video-data is successful send data to eachAvailableVideoDetails function else show error msg
export async function loadVideoDetails(initalFolderPath) {
  try {
    const response = await fetch("../all-available-video-data", {cache: "no-store"});
    if (response.ok) {
      const availablevideoDetails = await response.json(); 
      basic.setNewAvailablevideoDetails(availablevideoDetails);
      eachAvailableVideoDetails(availablevideoDetails, initalFolderPath);
      return "Video details loaded";
    } else {
      return "Failed to load video details";
    }
  } catch (error) { // when an error occurs
    // if responseErrorAvailableVideo id dosent exist
    if (!document.getElementById("responseErrorAvailableVideo")) {
      // show error msg
      const responseError = basic.createElement(basic.websiteContentContainer(), "section", {
        classList : "responseErrorAvailableVideo",
        id : "responseErrorAvailableVideo"
      });
      basic.createElement(responseError, "h1", {
        textContent : "Error Connection Refused."
      });
    }
    return "Fetch Request Failed";
  }
}

// if there is available videoDetails then get each video Details and send the data to showDetails
// if there are no videoDetails then show  noAvailableVideos msg
export function eachAvailableVideoDetails(videoDetails, initalFolderPath) {
  try {
    if (typeof videoDetails == "object") {
      // search bar
      search.searchBar(); 
      // folder path 
      const pathContainer = basic.createElement(basic.websiteContentContainer(), "section", {
        classList : "dragDropContainer pathContainer",
        id : "pathContainer"
      });
      folderPath.homepagePath(pathContainer);
      // videos tumbnails contailer 
      let savedVideosThumbnailContainer; 
      if (document.getElementById("savedVideosThumbnailContainer")) { 
        document.getElementById("savedVideosThumbnailContainer").innerHTML = "";
        savedVideosThumbnailContainer = basic.createElement(basic.websiteContentContainer(), "section", {
          classList : "dragDropContainer savedVideosThumbnailContainer",
          id : "savedVideosThumbnailContainer"
        });
      } else { 
        savedVideosThumbnailContainer = basic.createElement(basic.websiteContentContainer(), "section", {
          classList : "dragDropContainer savedVideosThumbnailContainer",
          id : "savedVideosThumbnailContainer"
        });
      }
      // make sure searchable video is empty
      if(search.getSearchableVideoDataArray().length !== 0){ 
        search.resetSearchableVideoDataArray();
      } 
      // create folder button 
      const createFolderButton = basic.createElement(search.searchBarContainer(), "a", {
        href : "javascript:;",
        classList : "button category-link",
        textContent : "Create Folder"
      });
      createFolderButton.onclick = function(e){
        e.preventDefault(); 
        folderCreate.createFolderOnClick();
      };
      folderData.resetInsideFolderID();  
      // reset search bar value
      search.resetSearchBarValue();
      // activate drag drop for available video details
      dragDropAvailableVideoDetails(savedVideosThumbnailContainer);
      if (initalFolderPath !== undefined) {
        const availableVideosFolderIDPath = folderData.getAvailableVideoDetailsByFolderPath(initalFolderPath);
        if (availableVideosFolderIDPath !== undefined) {
          folderData.newfolderIDPath(initalFolderPath);
          // get folder contet from specified path
          let folderPathString = "";
          for (let i = 0; i < initalFolderPath.length; i++) {  
              if (i === 0) {
                folderPathString = folderPathString.concat("videoDetails[\"",initalFolderPath[i],"\"].content");
                folderPath.folderPath(savedVideosThumbnailContainer, document.getElementById("pathContainer"), initalFolderPath[i], videoDetails[initalFolderPath[i]]["info"]["title"]); 
              } else {
                folderPath.folderPath(savedVideosThumbnailContainer, document.getElementById("pathContainer"), initalFolderPath[i], eval(folderPathString)[initalFolderPath[i]]["info"]["title"]); 
                folderPathString = folderPathString.concat("[\"",initalFolderPath[i],"\"].content");
              } 
          }  
          // display video details
          displayVideoDetails(savedVideosThumbnailContainer, availableVideosFolderIDPath);  
        } else {
          history.replaceState(null, "", "/saved/videos");
          notify.message("error", "Invalid Folder Path"); 
          // display video details
          displayVideoDetails(savedVideosThumbnailContainer, videoDetails);
        }
      } else {
        // display video details
        displayVideoDetails(savedVideosThumbnailContainer, videoDetails);
      }
      return "available videos"; 
    } else {
      return "input not an object";
    }
  } catch (error) {
    return error;
  }
}

// display noAvailableVideosDetails no if exits
export function noAvailableVideosDetails() {
  if (!document.getElementById("noAvailableVideosContainer")) {
    const noAvailableVideosContainer = basic.createElement(basic.websiteContentContainer(), "section", {
      classList : "noAvailableVideosContainer",
      id : "noAvailableVideosContainer"
    });
    basic.createElement(noAvailableVideosContainer, "h1", {
      classList : "noAvailableVideosHeader",
      textContent : "There has been no recorded/downloaded videos."
    });
  } 
}

// remove noAvailableVideosDetails if exits
export function removeNoAvailableVideosDetails() {
  if (document.getElementById("noAvailableVideosContainer")) {
    document.getElementById("noAvailableVideosContainer").remove();
  }
}

// display folder or video details to client
export function displayVideoDetails(savedVideosThumbnailContainer, videoDetails) { 
  if (Object.keys(videoDetails).length == 0) { // no available videos
    noAvailableVideosDetails();
    return "no available videoDetails";
  } else {
    search.resetSearchableVideoDataArray();
    Object.keys(videoDetails).reverse().forEach(function(videoInfo_ID) {
      if (videoInfo_ID.includes("folder-")) {  
        search.pushDataToSearchableVideoDataArray(videoDetails[videoInfo_ID]);
        showFolderDetails(savedVideosThumbnailContainer, videoInfo_ID, videoDetails[videoInfo_ID]);
      } else {
        if (videoDetails[videoInfo_ID].hasOwnProperty("info")) {  // eslint-disable-line
          // add video details into searchableVideoDataArray array 
          videoDetails[videoInfo_ID]["info"]["id"] = videoInfo_ID; 
          search.pushDataToSearchableVideoDataArray(videoDetails[videoInfo_ID]);
          // display video details
          showDetails(savedVideosThumbnailContainer, videoInfo_ID, videoDetails[videoInfo_ID]);
        } 
      }
    }); 
    return "available videoDetails";
  }
}

// load video details to user which include thumbnail image, video id as title and option menu
export function showDetails(savedVideosThumbnailContainer, videoInfo_ID, videoDetails) {
  try {
    if (savedVideosThumbnailContainer === undefined) {
      return "savedVideosThumbnailContainer undefined";
    } else if (typeof videoInfo_ID !== "string") {  
      return "videoInfo_ID not string";
    } else if (videoDetails === undefined) {
      return "invalid videoDetails";
    } else {
      let videoSrc, videoType;
      try {
        if (videoDetails.info.videoLink.compressdSrc !== undefined && videoDetails.info.videoLink.compressedType !== undefined) {
          videoSrc = videoDetails.info.videoLink.compressdSrc; // compressed src
          videoType = videoDetails.info.videoLink.compressedType; // video/webm
        } else {
          videoSrc = videoDetails.info.videoLink.src; // original src
          videoType = videoDetails.info.videoLink.type; // video/mp4
        }
      } catch (error) {
        videoSrc = videoDetails.info.videoLink.src; // original src
        videoType = videoDetails.info.videoLink.type; // video/mp4
      }
      let video_name = videoDetails.info.title;
      const numberOfThumbnails = Object.keys(videoDetails.info.thumbnailLink).length;
      const mainThumbnail = `${window.location.origin}${videoDetails.info.thumbnailLink[1]}`;
      const linkContainer = basic.createElement(savedVideosThumbnailContainer, "a", {
        href : `${window.location.origin}/?t=${videoType}?v=${window.location.origin}${videoSrc}`,
        id : videoInfo_ID,
        classList : "videoThumbnailContainer",
        draggable : true
      });
      const thumbnailContainer = basic.createElement(linkContainer, "section", {
        id : `${videoInfo_ID}-container`
      });
      const imageContainer = basic.createElement(thumbnailContainer, "section", {
        classList : "thumbnail-image-container",
        id : `${videoInfo_ID}-image-container`
      });
      const thumbnail = basic.appendImg(imageContainer, {
        src : mainThumbnail,
        id : `${videoInfo_ID}-img`,
        classList : "thumbnail-image"
      }, videoInfo_ID);
      thumbnail.draggable = false;
      // menu options
      const option_menu = basic.createElement(thumbnailContainer, "button", {
        classList : "thumbnail-option-menu fa fa-bars",
        id : `${videoInfo_ID}-menu`,
        title : "menu"
      });
      option_menu.onmouseenter = () => {
        linkContainer.draggable = false;
      };
      option_menu.onmouseleave = () => {
        linkContainer.draggable = true;
      };
      option_menu.onclick = function(e){
        e.preventDefault();
        //optionMenu.optionVideoMenuOnClick(videoSrc, videoType, videoInfo_ID, video_name, option_menu, linkContainer, thumbnailContainer, thumbnailTitleContainer);
        optionMenu.optionMenuOnClick(videoInfo_ID, video_name, option_menu, linkContainer, thumbnailContainer, thumbnailTitleContainer, videoSrc, videoType);
      };
      // video duration
      if (videoDetails.info.duration !== undefined && !isNaN(videoDetails.info.duration)) {
        const video_time = basic.createElement(imageContainer, "section", {
          classList : "thumbnail-video-duration",
          id : `${videoInfo_ID}-video-duration`
        });
        basic.createElement(video_time, "section", {
          textContent : basic.secondsToHms(Math.floor(videoDetails.info.duration))
        });
      }
      // video title container - if user want to be redirected to video player even if menu is active when onclick
      const thumbnailTitleContainer = basic.createElement(thumbnailContainer, "a", {
        href : `${window.location.origin}/?t=${videoType}?v=${window.location.origin}${videoSrc}`,
        id : `${videoInfo_ID}-title-container`,
        classList : "thumbnailTitleContainer"
      });
      basic.createElement(thumbnailTitleContainer, "h1", {
        id : `${videoInfo_ID}-title`,
        textContent : video_name
      });
      let loopTroughThumbnails, mainThumbnailNumber = 1;
      thumbnail.addEventListener("mouseover", ( ) => { 
        if (typeof loopTroughThumbnails != "number"){
          loopTroughThumbnails = setInterval( () => {
            if (linkContainer.classList.contains("dragging")) { 
              clearInterval(loopTroughThumbnails);
              if (typeof loopTroughThumbnails == "number"){
                loopTroughThumbnails = undefined;
              }
              mainThumbnailNumber = 1;
              thumbnail.src =  `${window.location.origin}${videoDetails.info.thumbnailLink[mainThumbnailNumber]}`;
            } else { 
              if (mainThumbnailNumber == numberOfThumbnails) {
                thumbnail.src =  mainThumbnail;
                mainThumbnailNumber = 1;
              } else {
                mainThumbnailNumber = mainThumbnailNumber + 1;
                thumbnail.src =  `${window.location.origin}${videoDetails.info.thumbnailLink[mainThumbnailNumber]}`;
              }
            }
          }, 500); 
        }
      });
    
      thumbnail.addEventListener("mouseout", ( ) => {
       clearInterval(loopTroughThumbnails);
       if (typeof loopTroughThumbnails == "number"){
        loopTroughThumbnails = undefined;
       }
       mainThumbnailNumber = 1;
       thumbnail.src =  `${window.location.origin}${videoDetails.info.thumbnailLink[mainThumbnailNumber]}`;
      });
      return "showDetails";
    }
  } catch (error) { 
    return "showDetails didnt work";
  } 
}

// load folder details to user 
export function showFolderDetails(savedVideosThumbnailContainer, folderInfoID, videoDetails) {
  let folder_name = videoDetails.info.title;
  videoDetails["info"]["id"] = folderInfoID;
  search.pushDataToSearchableVideoDataArray(videoDetails[folderInfoID]); 
  
  let folderURL;
  if (document.location.search == "") { 
    folderURL = `${window.location.origin}/saved/videos?=${folderInfoID}`;
  } else {
    folderURL = `${window.location.origin}/saved/videos${document.location.search}&${folderInfoID}`;
  }

  const folderContainerLink = basic.createElement(savedVideosThumbnailContainer, "a", {
    href : folderURL,
    id : folderInfoID,
    classList : "folderContainer",
    draggable : true
  });
  folderContainerLink.onclick = function(e){
    e.preventDefault();  
    folderOnClick(savedVideosThumbnailContainer, videoDetails);
  };

  folderContainerLink.onmouseenter = function(e){
    e.preventDefault();
    folderContainerLink.style.cursor = "pointer";
    folderTitleContainer.style["text-decoration"] = "underline";
  };
  
  folderContainerLink.onmouseleave = function(e){
    e.preventDefault();
    folderContainerLink.style.cursor = "default";
    folderTitleContainer.style["text-decoration"] = "none";
  };

  const folderContainer = basic.createElement(folderContainerLink, "section", {
    id : `${folderInfoID}-container`
  });
  basic.createElement(folderContainer, "section", {
    classList : "folder-image-container fa fa-folder",
    id : `${folderInfoID}-image-container`
  });
  const folderTitleContainer = basic.createElement(folderContainer, "a", {
    href : folderURL,
    id : `${folderInfoID}-title-container`,
    classList : "folderTitleContainer"
  });
  basic.createElement(folderTitleContainer, "h1", {
    id : `${folderInfoID}-title`,
    textContent : folder_name
  });

  // menu options
  const option_menu = basic.createElement(folderContainer, "button", {
    classList : "thumbnail-option-menu fa fa-bars",
    id : `${folderInfoID}-menu`
  });
  option_menu.onmouseenter = () => {
    folderContainerLink.onclick = null;
    folderContainer.draggable = false;
  };
  option_menu.onmouseleave = () => {
    folderContainerLink.onclick = function(e){
      e.preventDefault();  
      folderOnClick(savedVideosThumbnailContainer, videoDetails);
    };
    folderContainer.draggable = true;
  };
  option_menu.title = "menu";
  option_menu.onclick = function(e){
    e.preventDefault();
    optionMenu.optionFolderMenuOnClick(folderInfoID, folder_name, option_menu, folderContainerLink, folderContainer, folderTitleContainer, videoDetails, savedVideosThumbnailContainer);
  };

  return "showFolderDetails";
}

// when folder element is click on 
export function folderOnClick(savedVideosThumbnailContainer, videoDetails) {
  search.resetSearchableVideoDataArray();
  search.resetSearchBarValue();
  savedVideosThumbnailContainer.remove();
  savedVideosThumbnailContainer = basic.createElement(basic.websiteContentContainer(), "section", {
    classList : "dragDropContainer savedVideosThumbnailContainer",
    id : "savedVideosThumbnailContainer"
  });
  folderData.pushNewFolderIDToFolderIDPath(videoDetails.info.id); 
  folderPath.folderPath(savedVideosThumbnailContainer, document.getElementById("pathContainer"), videoDetails.info.id, videoDetails.info.title); 
  const availableVideosFolderIDPath = folderData.getAvailableVideoDetailsByFolderPath(folderData.getFolderIDPath());   
  dragDropAvailableVideoDetails(savedVideosThumbnailContainer);
  displayVideoDetails(savedVideosThumbnailContainer, availableVideosFolderIDPath);
}

// rearange available videos by drag and drop
export function dragDropAvailableVideoDetails(section){
  let dragEl, target, prevtarget, dragElTargetPosition;
  const dragDropContainers = document.querySelectorAll(".dragDropContainer");
  if (section === undefined) {
    return "section undefined";
  } else { 
    section.addEventListener("dragstart", function(e){
      e.stopPropagation();
      dragEl = e.target; 
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("Text", dragEl.textContent);
      dragDropContainers.forEach(container => {  
        container.addEventListener("drop", _onDragDrop, false);  
        container.addEventListener("dragover", _onDragOver, false);  
        container.addEventListener("dragend", _onDragEnd, false);  
      });
      dragEl.classList.add("dragging");
    });
    return "dragDropAvailableVideoDetails";
  }
  
  function _onDragDrop(e) { 
    e.preventDefault();  // Stops browsers from redirecting.
    e.stopPropagation();
  }
  
  function _onDragOver(e){
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    if (e.target.id.includes("-img")) { 
      target = document.getElementById(e.target.id.replace("-img",""));  
    } else if (e.target.id.includes("-menu")) { 
      target = document.getElementById(e.target.id.replace("-menu",""));  
    } else if (e.target.id.includes("-image-container")) { 
      target = document.getElementById(e.target.id.replace("-image-container",""));  
    } else if (e.target.id.includes("-container")) {
      target = document.getElementById(e.target.id.replace("-container",""));
    } else if (e.target.id.includes("-title")) { 
      target = document.getElementById(e.target.id.replace("-title",""));   
    } else { 
      target = e.target; 
    }
    if(target.nodeName == "A" || e.target.id.includes("path-folder-")){ 
      var rect = target.getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var y = e.clientY - rect.top;  //y position within the element.
      const maxWidth = rect.right - rect.left;
      const maxHight = rect.bottom - rect.top;  
      if (prevtarget !== undefined) { 
        if ((folderData.getFolderIDPath().length == 0 && target.id == "path-folder-main") ||
          (folderData.getFolderIDPath()[folderData.getFolderIDPath().length - 1] === target.id.replace("path-","")) ||
          (prevtarget.id !== target.id)
        ) {    
          prevtarget.classList.remove("dragging-target");
          prevtarget.classList.remove("dragging-target-left");
          prevtarget.classList.remove("dragging-target-middle"); 
          prevtarget.classList.remove("dragging-target-right"); 
          prevtarget.classList.remove("dragging-target-top"); 
          prevtarget.classList.remove("dragging-target-bottom"); 
        } else { 
          if ( e.target.id.includes("path-folder-")) { 
            target.classList.add("dragging-target"); 
          } else {
            if (target.id === dragEl.id) {
              target.classList.add("dragging-target-middle"); 
            } else {
              if (window.innerWidth <= 749) {
                if (target.id.includes("folder-")) {  
                  if (y > (maxHight / 3) * 2) { 
                    dragElTargetPosition = "bottom";
                    prevtarget.classList.remove("dragging-target-middle"); 
                    prevtarget.classList.remove("dragging-target-top"); 
                    target.classList.add("dragging-target-bottom"); 
                  } else if (y > (maxHight / 3) * 1) { 
                    dragElTargetPosition = "inside-folder";
                    prevtarget.classList.remove("dragging-target-bottom"); 
                    prevtarget.classList.remove("dragging-target-top"); 
                    target.classList.add("dragging-target-middle"); 
                  } else if (y > 0) {  
                    dragElTargetPosition = "top";
                    prevtarget.classList.remove("dragging-target-bottom"); 
                    prevtarget.classList.remove("dragging-target-middle"); 
                    target.classList.add("dragging-target-top"); 
                  }  
                } else {    
                  if (y > (maxHight / 2) * 1) { 
                    dragElTargetPosition = "bottom";
                    prevtarget.classList.remove("dragging-target-top"); 
                    target.classList.add("dragging-target-bottom");
                  } else if (y > 0) {  
                    dragElTargetPosition = "top";
                    prevtarget.classList.remove("dragging-target-bottom"); 
                    target.classList.add("dragging-target-top");
                  } 
                } 
              } else {
                if (target.id.includes("folder-")) { 
                  if (x > (maxWidth / 4) * 3) { 
                    dragElTargetPosition = "right";
                    prevtarget.classList.remove("dragging-target-middle"); 
                    prevtarget.classList.remove("dragging-target-left"); 
                    target.classList.add("dragging-target-right"); 
                  } else if (x > (maxWidth / 4) * 1) {   
                    dragElTargetPosition = "inside-folder";
                    prevtarget.classList.remove("dragging-target-left"); 
                    prevtarget.classList.remove("dragging-target-right"); 
                    target.classList.add("dragging-target-middle"); 
                  } else if (x > 0) { 
                    dragElTargetPosition = "left"; 
                    prevtarget.classList.remove("dragging-target-middle"); 
                    prevtarget.classList.remove("dragging-target-right"); 
                    target.classList.add("dragging-target-left");  
                  } 
                } else {  
                  if (x > (maxWidth / 2)) { 
                    dragElTargetPosition = "right"; 
                    prevtarget.classList.remove("dragging-target-left"); 
                    target.classList.add("dragging-target-right"); 
                  } else if (x > 0) {    
                    dragElTargetPosition = "left"; 
                    prevtarget.classList.remove("dragging-target-right"); 
                    target.classList.add("dragging-target-left");  
                  }  
                }
              } 
            } 
          }
        }   
        prevtarget = target;
      } else  {
        prevtarget = target;
      }
    } else  { 
      prevtarget.classList.remove("dragging-target");
      prevtarget.classList.remove("dragging-target-left");
      prevtarget.classList.remove("dragging-target-middle"); 
      prevtarget.classList.remove("dragging-target-right"); 
      prevtarget.classList.remove("dragging-target-top"); 
      prevtarget.classList.remove("dragging-target-bottom"); 
    }
  } 

  function _onDragEnd(e){
    e.preventDefault();
    e.stopPropagation();
    dragEl.classList.remove("dragging"); 
    target.classList.remove("dragging-target");
    target.classList.remove("dragging-target-left");
    target.classList.remove("dragging-target-middle"); 
    target.classList.remove("dragging-target-right");   
    target.classList.remove("dragging-target-top");     
    target.classList.remove("dragging-target-bottom");
    prevtarget.classList.remove("dragging-target-left");
    prevtarget.classList.remove("dragging-target-middle"); 
    prevtarget.classList.remove("dragging-target-right");   
    prevtarget.classList.remove("dragging-target-top");     
    prevtarget.classList.remove("dragging-target-bottom");
    dragDropContainers.forEach(container => {  
      container.removeEventListener("dragover", _onDragOver, false);
      container.removeEventListener("dragend", _onDragEnd, false);
    });     
    
    if (
        (target && target !== dragEl && target.id.includes("path-folder-")) === true &&
        (folderData.getFolderIDPath().length == 0 && target.id == "path-folder-main") === false &&
        (folderData.getFolderIDPath()[folderData.getFolderIDPath().length - 1] === target.id.replace("path-","")) === false
      ) {  
      folderData.inputSelectedIDOutOfFolderID(dragEl.id, target.id.replace("path-",""));
      document.getElementById(dragEl.id).remove();
    } else if( target && target !== dragEl && target.nodeName == "A"){
      if (dragElTargetPosition == "inside-folder") {
        document.getElementById(dragEl.id).remove();
        folderData.inputSelectedIDIntoFolderID(dragEl.id, target.id);
      } else if (dragElTargetPosition == "left") { 
        if ([...section.children].indexOf(target) !== [...section.children].indexOf(dragEl) + 1) {
          section.insertBefore(dragEl, target); 
          search.searchableVideoDataArray_move_before(dragEl.id, target.id);
          moveSelectedIdBeforeTargetIdAtAvailableVideoDetails(dragEl.id, target.id);
        }
      } else if (dragElTargetPosition == "right") { 
        if ([...section.children].indexOf(target) !== [...section.children].indexOf(dragEl) - 1) { 
          section.insertBefore(dragEl, target.nextSibling);  
          search.searchableVideoDataArray_move_after(dragEl.id, target.id);
          moveSelectedIdAfterTargetIdAtAvailableVideoDetails(dragEl.id, target.id);
        }
      } else if (dragElTargetPosition == "top") {
        if ([...section.children].indexOf(target) !== [...section.children].indexOf(dragEl) + 1) {
          section.insertBefore(dragEl, target); 
          search.searchableVideoDataArray_move_before(dragEl.id, target.id);
          moveSelectedIdBeforeTargetIdAtAvailableVideoDetails(dragEl.id, target.id);
        } 
      }  else if (dragElTargetPosition == "bottom") { 
        if ([...section.children].indexOf(target) !== [...section.children].indexOf(dragEl) - 1) { 
          section.insertBefore(dragEl, target.nextSibling); 
          search.searchableVideoDataArray_move_after(dragEl.id, target.id);
          moveSelectedIdAfterTargetIdAtAvailableVideoDetails(dragEl.id, target.id);
        } 
      } 
    }    
  }
}

// request to update selected available video details orientation
async function moveSelectedIdBeforeTargetIdAtAvailableVideoDetails(selectedID, targetID) {
  try {
    if (selectedID === undefined && targetID === undefined) {
      notify.message("error", "selectedID & targetID undefined"); 
      return "selectedID & targetID undefined";
    } else if (selectedID === undefined) {
      notify.message("error", "selectedID undefined"); 
      return "selectedID undefined";
    } else if (targetID === undefined) {
      notify.message("error", "targetID undefined"); 
      return "targetID undefined";
    } else {
      const payload = {
        folderIDPath: folderData.getFolderIDPath(),
        selectedID: selectedID,
        targetID: targetID
      }; 
      let requestResponse;
      const response = await fetch("../moveSelectedIdBeforeTargetIdAtAvailableVideoDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) { 
        requestResponse = await response.json();   
        if (requestResponse.message === "successfully-moved-selected-before-target"){
          notify.message("success", `Position updated: ${document.getElementById(`${selectedID}-title`).textContent}`);     
          const availablevideoDetails = requestResponse.availableVideos; 
          basic.setNewAvailablevideoDetails(availablevideoDetails);
          return "successfully-moved-selected-before-target"; 
        } else{
          notify.message("error", `Failed Moved: ${selectedID} before ${targetID}`); 
          return "failed-to-moved-selected-before-target"; 
        } 
      } else {        
        notify.message("error","Failed to update rearanged available video details"); 
        return "Failed to update rearanged available video details";
      }
    }
  } catch (error) {
    notify.message("error","Failed to update rearanged available video details"); 
    return error;
  } 
}

// request to update selected available video details orientation
async function moveSelectedIdAfterTargetIdAtAvailableVideoDetails(selectedID, targetID) { 
  try {
    if (selectedID === undefined && targetID === undefined) {
      notify.message("error", "selectedID & targetID undefined"); 
      return "selectedID & targetID undefined";
    } else if (selectedID === undefined) {
      notify.message("error", "selectedID undefined"); 
      return "selectedID undefined";
    } else if (targetID === undefined) {
      notify.message("error", "targetID undefined"); 
      return "targetID undefined";
    } else {
      const payload = {
        folderIDPath: folderData.getFolderIDPath(),
        selectedID: selectedID,
        targetID: targetID
      }; 
      let requestResponse;
      const response = await fetch("../moveSelectedIdAfterTargetIdAtAvailableVideoDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) { 
        requestResponse = await response.json();   
        if (requestResponse.message === "successfully-moved-selected-after-target"){
          notify.message("success", `Position updated: ${document.getElementById(`${selectedID}-title`).textContent}`);     
          const availablevideoDetails = requestResponse.availableVideos; 
          basic.setNewAvailablevideoDetails(availablevideoDetails);
          return "successfully-moved-selected-after-target"; 
        } else{
          notify.message("error", `Failed Moved: ${selectedID} after ${targetID}`); 
          return "failed-to-moved-selected-after-target"; 
        }
      } else {        
        notify.message("error","Failed to update rearanged available video details"); 
        return "Failed to update rearanged available video details";
      }
    }
  } catch (error) {
    notify.message("error","Failed to update rearanged available video details"); 
    return error;
  }
}

// load pageLoaded to html page when requested
export function pageLoaded(initalFolderPath) {
  loadVideoDetails(initalFolderPath);
  return "pageLoaded";
}
