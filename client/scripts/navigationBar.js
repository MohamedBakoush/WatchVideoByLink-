import * as basic from "../scripts/basics.js";
import * as showAvailableVideos from "../scripts/showAvailableVideos.js";
import * as index from "../scripts/index.js";
"use strict";

const websiteContentContainer = document.getElementById("websiteContentContainer");

// load header details into html using header2 id
export function loadNavigationBar(path) {
  const header = document.getElementById("headerContainer");
  const navBar = basic.createSection(header, "nav", "NavigationBar", "navBar");
  const nav = basic.createSection(navBar, "ul", undefined, "headerNav");
  const item = basic.createSection(nav, "li");
  let homeButton, savedVideosPage;
  if (path == "/saved/videos") {
    homeButton = basic.createLink(item, undefined, undefined, "button category-link", "WatchVideoByLink");
    savedVideosPage = basic.createLink(item, undefined, undefined, "button is-selected", "/saved/videos");
  } else {
    homeButton = basic.createLink(item, undefined, undefined, "button is-selected", "WatchVideoByLink");
    savedVideosPage = basic.createLink(item, undefined, undefined, "button category-link", "/saved/videos");
  }

  homeButton.onclick = () => {
    websiteContentContainer.innerHTML = "";
    homeButton.classList = "button is-selected";
    savedVideosPage.classList = "button category-link";
    history.pushState(null, "", "/");
    index.showDetails();
  };
  savedVideosPage.onclick = () => {
    websiteContentContainer.innerHTML = "";
    homeButton.classList = "button category-link";
    savedVideosPage.classList = "button is-selected";
    history.pushState(null, "", "/saved/videos");
    showAvailableVideos.pageLoaded();
  };
  savedVideosPage.style.margin = "0 0 0 1.25rem";
}
