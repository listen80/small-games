export default class Loader {
  constructor() {
    this.imgs = {};
    this.audios = {};
  }

  loadResource({ imgList, audioList }, fn) {
    let downloaded = 0;
    this.loadImages(imgList, () => {
      downloaded++;
      if (downloaded === 2) {
        fn();
      }
    });
    this.loadAudio(audioList, () => {
      downloaded++;
      if (downloaded === 2) {
        fn();
      }
    });
  }

  loadAudio(audioes, fn) {
    const audioList = Object.entries(audioes);
    for (var i = 0, audioLength = audioList.length; i < audioLength; i++) {
      const audio = document.createElement("audio");
      const [key, src] = audioList[i];
      audio.onloadstart = () => {
        i--;
        this.audios[key] = audio;
        if (!i) {
          fn(this.audios);
        }
      };
      audio.src = "audio/" + src;
    }
  }

  loadImages(imgs, fn) {
    const imgList = Object.entries(imgs);
    for (var j = 0, imgsLength = imgList.length; j < imgsLength; j++) {
      const img = new Image();
      const [key, src] = imgList[j];
      img.onload = () => {
        j--;
        if (!j) {
          fn(this.imgs);
        }
        this.imgs[key] = img;
      };
      img.src = "images/" + src;
    }
  }
}
