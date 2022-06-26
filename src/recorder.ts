export default class Recorder {
  constructor () {}

  //TODO: https://stackoverflow.com/questions/27846392/access-microphone-from-a-browser-javascript

  initialize () {
    navigator.webkitGetUserMedia(
      { audio: true }, 
      (localMediaStream: unknown) => {
        console.log(localMediaStream);
      }, 
      (error: unknown) => {
        console.error(error);
      }
    );
  }
}

const recorder = new Recorder();
recorder.initialize();