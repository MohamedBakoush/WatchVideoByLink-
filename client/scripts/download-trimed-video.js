import * as basic from "../scripts/basics.js";
import * as notify from "../scripts/notify.js";
import * as videoPlayerButtons from "../scripts/video-payer-buttons.js";

// trim video interace
export function createTrimVideo(player, downloadVideoContainer, downloadVideoMenu, downloadVideoButton, downloadVideoMenuContent, videoSrc, videoType) {
  if (player === undefined) {
    return "player undefined";
  } else if (downloadVideoContainer === undefined) {
    return "downloadVideoContainer undefined";
  } else if (downloadVideoMenu === undefined) {
    return "downloadVideoMenu undefined";
  } else if (downloadVideoButton === undefined) {
    return "downloadVideoButton undefined";
  } else if (downloadVideoMenuContent === undefined) {
    return "downloadVideoMenuContent undefined";
  } else if (typeof videoSrc !== "string") {
    return "videoSrc not string";
  } else if (typeof videoType !== "string") {
    return "videoType not string";
  } else {
    const downloadTrimButton = basic.createElement(downloadVideoMenuContent, "button", {
      classList : "vjs-menu-item downloadVideoMenuContentItem"
    });  
    downloadTrimButton.title = "Trim Video";
    basic.createElement(downloadTrimButton, "span", {
      classList : "vjs-menu-item-text",
      textContent : "Trim Video"
    }); 
    downloadTrimButton.onclick = function(){
      // if video player is in fullscreen mode when downloadTrimButton is clicked, exit full screen mode
      if(player.isFullscreen()){
        player.exitFullscreen();
      }
      // if downloadTrimButton has been clicked and then the user clicks on fullscreen mode, remove trimVideoBody
      window.addEventListener("resize", function checkIfFullscreenWhenResize() {
        if (player.isFullscreen()) {
          trimVideoBody.remove();
          // make downloadVideo option active
          downloadTrimButton.disabled = false;
          downloadVideoContainer.onmouseover = function(){
            downloadVideoMenu.style.display = "block";
          };
          downloadVideoButton.title = "Download Video";
          // remove event listener
          window.removeEventListener("resize", checkIfFullscreenWhenResize);
        }
      });
      // to stop extram trim containers to  display while active
      downloadTrimButton.disabled = true;
      downloadVideoContainer.onmouseover = function(){
        downloadVideoMenu.style.display = "none";
      };
      downloadVideoButton.title = "Trim Video Currently Active";
      // pause main video
      document.getElementById("video_html5_api").pause();
      const trimVideoBody = basic.createElement(document.body, "section", {
        classList : "trimVideoBody"
      }); 
      // close trim video button
      backToMainVideoButton(downloadVideoContainer, downloadVideoButton, downloadVideoMenu, downloadTrimButton, trimVideoBody);
  
      const trimVideoArticle = basic.createElement(trimVideoBody, "section", {
        classList : "trimVideoArticle"
      }); 
      const trimVideoContainer = basic.createElement(trimVideoArticle, "section", {
        classList : "trimVideoContainer"
      }); 
      // videoContainer
      const videoContainer = basic.createElement(trimVideoContainer, "section", {
        classList : "videoContainer"
      }); 
      const videoPlayer_active = basic.createElement(videoContainer, "video", {
        classList : "trimVideoPlayer",
        id : "video-active"
      }); 
      videoPlayer_active.src = videoSrc;
      videoPlayer_active.controls = false;
      videoPlayer_active.onloadedmetadata = () => {
          const multiRangeSlider = basic.createElement(videoContainer, "section", {
            classList : "multi-range-slider"
          }); 
          // left input for slider
          const inputLeft = basic.createElement(multiRangeSlider, "input", {
            type : "range",
            id : "input-left",
            min : 0,
            max : videoPlayer_active.duration,
            value : 0
          });
          // right input for slider
          const inputRight = basic.createElement(multiRangeSlider, "input", {
            type : "range",
            id : "input-right",
            min : 0,
            max : videoPlayer_active.duration,
            value : videoPlayer_active.duration
          });
          const slider = basic.createElement(multiRangeSlider, "section", {
            classList : "slider"
          }); 
          const track = basic.createElement(slider, "section", {
            classList : "track"
          }); 
          const range = basic.createElement(slider, "section", {
            classList : "range"
          }); 
          const thumbLeft = basic.createElement(slider, "section", {
            classList : "thumb left"
          }); 
          const thumbRight = basic.createElement(slider, "section", {
            classList : "thumb right"
          }); 
          // trimVideoControls
          const trimVideoControlsBody = basic.createElement(trimVideoContainer, "section", {
            classList : "trimVideoControlsBody"
          }); 
          const trimVideoControlsContainer = basic.createElement(trimVideoControlsBody, "section", {
            classList : "trimVideoControlsContainer"
          }); 
          const trimVideoControls = basic.createElement(trimVideoControlsContainer, "section", {
            classList : "trimVideoControls"
          }); 
          const selectedVideoTimeContainer = basic.createElement(trimVideoControls, "section", {
            classList : "selectedVideoTimeContainer"
          }); 
          // selectedVideoTimeLabel
          basic.createElement(selectedVideoTimeContainer, "label", {
            classList : "selectedVideoTimeLabel",
            textContent : "Selected Video Range"
          }); 
          // selectedVideoTimeStart
          const selectedVideoTimeStart = basic.createElement(selectedVideoTimeContainer, "section", {
            classList : "selectedVideoTimeStart"
          }); 
          basic.createElement(selectedVideoTimeStart, "label", {
            classList : "StartTime",
            textContent : "Start Time:"
          }); 
          const selectedInputLeft = basic.createElement(selectedVideoTimeStart, "input", {
            type : "text",
            value: basic.secondsToHms(inputLeft.value, true),
            id : "selected-video-time-inputLeft",
            classList : "timeInput",
            readOnly : true
          });
          // selectedVideoTimeEnd
          const selectedVideoTimeEnd = basic.createElement(selectedVideoTimeContainer, "section", {
            classList : "selectedVideoTimeEnd"
          }); 
          basic.createElement(selectedVideoTimeEnd, "label", {
            classList : "EndTime",
            textContent : "End Time:"
          }); 
          const selectedInputRight = basic.createElement(selectedVideoTimeEnd, "input", {
            type : "text",
            value: basic.secondsToHms(inputRight.value, true),
            id : "selected-video-time-inputRight",
            classList : "timeInput",
            readOnly : true
          });
          // trimVideoButtonContainer
          const trimVideoButtonBodyContainer = basic.createElement(trimVideoControlsContainer, "section");
          const trimVideoButtonBody = basic.createElement(trimVideoButtonBodyContainer, "section", {
            id : "trimVideoButtonBody"
          }); 
          const trimVideoButtonContainer = basic.createElement(trimVideoButtonBody, "section", {
            classList : "trimVideoButtonContainer"
          }); 
          // trimVideoButton
          const trimVideoButton = basic.createElement(trimVideoButtonContainer, "input", {
            type : "submit",
            value: "Trim Video",
            classList : "button trimVideoButton",
            title : "Trim Video"
          });
          trimVideoButton.onclick = async function(){
            const response = await videoPlayerButtons.getDownloadConfirmation();
            const downloadConfirmationResponse = response.trimVideo;
            let downloadConfirm;
            if (typeof downloadConfirmationResponse == "boolean") {
              if (downloadConfirmationResponse === true) {
                downloadConfirm = downloadConfirmationResponse;
              } else {
                downloadConfirm = confirm("Press OK to Download Trimed Video from "  + basic.secondsToHms(inputLeft.value, true) + " to " + basic.secondsToHms(inputRight.value, true));
                if (downloadConfirm) {
                    videoPlayerButtons.updateDownloadConfirmation("trimVideo", true);
                }
              }
            } else {
              downloadConfirm = confirm("Press OK to Download Trimed Video from "  + basic.secondsToHms(inputLeft.value, true) + " to " + basic.secondsToHms(inputRight.value, true));
              if (downloadConfirm) {
                    videoPlayerButtons.updateDownloadConfirmation("trimVideo", true);
              }
            }
            if (downloadConfirm) {
              notify.message("success",`Start Trimed Video Download: ${basic.secondsToHms(inputLeft.value, true)} - ${basic.secondsToHms(inputRight.value, true)}`);
             //Logic to download video
              trimVideo(videoSrc, videoType, inputLeft.value, inputRight.value).then( (returnValue) => {
                let number_of_errors = 0;
                let isDownloading = true;
                if (returnValue ==  "failed download trimed video file") {
                  console.log("failed download trimed video file");
                  notify.message("error","Error: Connection Refused");
                } else if (returnValue == "Cannot-find-ffmpeg-ffprobe") {
                  console.log("Encoding Error: Cannot find ffmpeg and ffprobe in WatchVideoByLink directory");
                  notify.message("error","Encoding Error: Cannot find ffmpeg and ffprobe");
                } else if (returnValue == "Cannot-find-ffmpeg") {
                  console.log("Encoding Error: Cannot find ffmpeg in WatchVideoByLink directory");
                  notify.message("error","Encoding Error: Cannot find ffmpeg");
                } else if (returnValue == "Cannot-find-ffprobe") {
                  console.log("Encoding Error: Cannot find ffprobe");
                  notify.message("error","Encoding Error: Cannot find ffprobe");
                } else if (returnValue == "ffmpeg-failed") {
                  console.log("Encoding Error: ffmpeg failed");
                  notify.message("error","Encoding Error: ffmpeg failed");
                } else {
                 console.log("Download Trimed Video Start");
                 const checkDownloadStatus = setInterval( async function(){
                   try {
                     const response = await fetch(`../video-data/${returnValue}`);
                     if (response.ok) {
                       const downloadStatus = await response.json();
                       if (downloadStatus.video.download == "completed") { // if the video portion has finished downloading
                         if (downloadStatus.thumbnail.download == "completed") {// completed thumbnail download
                           clearInterval(checkDownloadStatus);
                           if (isDownloading) {
                             isDownloading = false;
                             notify.message("success",`Trimed Video Download Completed: ${basic.secondsToHms(inputLeft.value, true)} - ${basic.secondsToHms(inputRight.value, true)}`);
                             console.log(returnValue, `Trimed Video Download from ${basic.secondsToHms(inputLeft.value, true)} to ${basic.secondsToHms(inputRight.value, true)} Completed`);
                           }
                         } else if (downloadStatus.thumbnail.download == "starting"){ // starting thumbnail download
                           console.log(returnValue, "Thumbnail Progress: preparing to create thumbnails");
                         } else { // downloading thumbnails
                           console.log(returnValue, `Thumbnail Progress: ${Math.trunc(downloadStatus.thumbnail.download)}%`);
                         }
                       } else if(downloadStatus.video.download == "starting full video download") { // starting full video downloa msg
                         console.log(returnValue, "Video Progress: preparing to download video");
                       } else { // the percentage for video fthat has been  downloaded msg
                         console.log(returnValue, `Video Progress: ${Math.trunc(downloadStatus.video.download)}%`);
                       }
                       return "downloading";
                     } else {
                       return "failed";
                     }
                   } catch (e) { // when an error occurs
                     number_of_errors = number_of_errors + 1;
                     console.log(returnValue, "number_of_errors", number_of_errors);
                     // when number of error become one
                     // number_of_errors == 1 is created becouse setInterval could try to run the async function more then once and fail
                     // since it could cause more then one error the change record buttons/notify would also run more then once
                     if (number_of_errors == 1) {
                       clearInterval(checkDownloadStatus);
                       console.log(returnValue, "Error Connection Refused.");
                       notify.message("error","Error: Connection Refused.");
                     }
                   }
                 }, 500);
               }
                trimVideoBody.remove();
                // make downloadVideo option active
                downloadTrimButton.disabled = false;
                downloadVideoContainer.onmouseover = function(){
                  downloadVideoMenu.style.display = "block";
                };
                downloadVideoButton.title = "Download Video";
              });
            }
          };
          function setLeftValue() {
            const _this = inputLeft,
              min = parseInt(_this.min),
              max = parseInt(_this.max);
  
            _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
  
            const percent = ((_this.value - min) / (max - min)) * 100;
  
            thumbLeft.style.left = percent + "%";
            range.style.left = percent + "%";
          }
          setLeftValue();
          function setRightValue() {
            const _this = inputRight,
              min = parseInt(_this.min),
              max = parseInt(_this.max);
  
            _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);
  
            const percent = ((_this.value - min) / (max - min)) * 100;
  
            thumbRight.style.right = (100 - percent) + "%";
            range.style.right = (100 - percent) + "%";
          }
          setRightValue();
          inputLeft.addEventListener("input", setLeftValue);
          inputRight.addEventListener("input", setRightValue);
          
          // when mouseover thumbLeft activate inputLeft, deactivate inputRight
          thumbLeft.addEventListener("mouseover", function() {
            inputLeft.style.pointerEvents = null;
            inputRight.style.pointerEvents = "none";
          }); 
          
          // when mouseover thumbRight activate inputRight, deactivate inputLeft
          thumbRight.addEventListener("mouseover", function() {
            inputLeft.style.pointerEvents = "none";
            inputRight.style.pointerEvents = null;
          });  
          
          // when mouseover track deactivate inputRight, deactivate inputLeft
          track.addEventListener("mouseover", function() { 
            inputRight.style.pointerEvents = "none";
            inputLeft.style.pointerEvents = "none";
          }); 
  
          // when mouseover range deactivate inputRight, deactivate inputLeft
          range.addEventListener("mouseover", function() { 
            inputRight.style.pointerEvents = "none";
            inputLeft.style.pointerEvents = "none";
          }); 
   
          inputLeft.addEventListener("mouseover", function() {
            thumbLeft.classList.add("hover");
          });
          inputLeft.addEventListener("mouseout", function() {
            thumbLeft.classList.remove("hover"); 
            inputRight.style.pointerEvents = "none";
            inputLeft.style.pointerEvents = "none";
          });
  
          let liveselectedInputLeft;
          inputLeft.addEventListener("mousedown", function() {
            thumbLeft.classList.add("active");
            // update inputLeft time and video player time
            liveselectedInputLeft = setInterval( function() {
              videoPlayer_active.currentTime = inputLeft.value;
              selectedInputLeft.value = basic.secondsToHms(inputLeft.value, true);
            },50);
  
          });
          inputLeft.addEventListener("mouseup", function() {
            // stop update inputLeft time and video player time
            clearInterval(liveselectedInputLeft);
  
            thumbLeft.classList.remove("active");
            // one last update for inputLeft time and video player time
            videoPlayer_active.currentTime = inputLeft.value;
            videoPlayer_active.pause();
            selectedInputLeft.value = basic.secondsToHms(inputLeft.value, true);
          });
  
          inputRight.addEventListener("mouseover", function() {
            thumbRight.classList.add("hover"); 
          });
          inputRight.addEventListener("mouseout", function() {
            thumbRight.classList.remove("hover"); 
            inputRight.style.pointerEvents = "none";
            inputLeft.style.pointerEvents = "none";
          });
  
  
          let liveselectedInputRight;
          inputRight.addEventListener("mousedown", function() {
            thumbRight.classList.add("active");
            // update inputRight time and video player time
            liveselectedInputRight = setInterval( function() {
              videoPlayer_active.currentTime = inputRight.value;
              selectedInputRight.value = basic.secondsToHms(inputRight.value, true);
            },50);
          });
          inputRight.addEventListener("mouseup", function() {
            // stop update inputRight time and video player time
            clearInterval(liveselectedInputRight);
  
            thumbRight.classList.remove("active");
            // one last update for inputRight time and video player time
            videoPlayer_active.currentTime = inputRight.value;
            videoPlayer_active.pause();
            selectedInputRight.value = basic.secondsToHms(inputRight.value, true);
          });
      };
    };
    return "createTrimVideo";
  }
}

// close trim video inerface button
export function backToMainVideoButton(downloadVideoContainer, downloadVideoButton, downloadVideoMenu, downloadTrimButton, trimVideoBody) {
  if (downloadVideoContainer === undefined) {
    return "downloadVideoContainer undefined";
  } else if (downloadVideoButton === undefined) {
    return "downloadVideoButton undefined";
  } else if (downloadVideoMenu === undefined) {
    return "downloadVideoMenu undefined";
  } else if (downloadTrimButton === undefined) {
    return "downloadTrimButton undefined";
  } else if (trimVideoBody === undefined) {
    return "trimVideoBody undefined";
  } else {
    const backToMainVideoButton = document.createElement("button");
    backToMainVideoButton.title = "Close Trim Video";
    backToMainVideoButton.className =  "backToMainVideoButton fa fa-times";
    backToMainVideoButton.onclick = function(){
      trimVideoBody.remove();
      downloadTrimButton.disabled = false;
      downloadVideoContainer.onmouseover = function(){
        downloadVideoMenu.style.display = "block";
      };
      downloadVideoButton.title = "Download Video";
    };
    trimVideoBody.appendChild(backToMainVideoButton);   
    return "backToMainVideoButton";
  }
}

// requet to downlaod video with specifed start and end time
export async function trimVideo(videoSrc, videoType, startTime, endTime) {
  try {
    if (typeof videoSrc !== "string") {
      return "videoSrc not string"; 
    } else if (typeof videoType !== "string") {
      return "videoType not string";
    } else if (startTime === undefined) {
      return "startTime undefined";
    } else if (endTime === undefined) {
      return "endTime undefined";
    } else {
      const payload = {
        videoSrc: videoSrc,
        videoType: videoType,
        newStartTime: startTime,
        newEndTime: endTime,
      };
      const response = await fetch("../trimVideo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const fileNameID = await response.json();
        const file_ID = videoPlayerButtons.updateFileNameID(fileNameID);
        return file_ID;
      } else {
        return "failed download trimed video file";
      }
    }
  } catch (e) { // when an error occurs
    return "failed download trimed video file";
  }
}