export const setupVideo = (url, identifier) => {
  let copyVideo = false;
  const video = document.createElement("video");
  const root = document.getElementById("append-container");
  if (!root) return;
  root.appendChild(video);
  video.id = identifier;
  video.width = 600;
  video.height = 600;
  let playing = false;
  let timeupdate = false;

  video.playsInline = true;
  video.muted = true;
  video.loop = true;

  // Waiting for these 2 events ensures
  // there is data in the video

  video.addEventListener(
    "playing",
    () => {
      playing = true;
      checkReady();
    },
    true
  );

  video.addEventListener(
    "timeupdate",
    () => {
      timeupdate = true;
      checkReady();
    },
    true
  );

  video.src = url;
  video.play();

  function checkReady() {
    if (playing && timeupdate) {
      copyVideo = true;
    }
  }

  return video;
};