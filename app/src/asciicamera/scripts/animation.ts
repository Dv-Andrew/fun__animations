export default class Animation {

  private _canvas: any;
  private _context: any;
  private _hiddenCanvas: any;
  private _hiddenContext: any;

  private _previousTime: number;
  private _fps: number;

  private _video: any;
  private _charset: string;

  constructor(canvas, hiddenCanvas) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
    this._canvas.focus();

    this._hiddenCanvas = hiddenCanvas;
    this._hiddenContext = hiddenCanvas.getContext('2d');

    this._charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

    this.setup();
    window.requestAnimationFrame(this.frame.bind(this));
  }

  frame(timestamp: number) {
    if (!this._previousTime) {
      this._previousTime = timestamp;
    }
    let elapsedTime = timestamp - this._previousTime;
    this._previousTime = timestamp;
    this._fps = 1000 / elapsedTime;

    this.update(elapsedTime / 1000);
    this.draw();

    window.requestAnimationFrame(this.frame.bind(this));
    // window.addEventListener('resize', () => {console.log('resize');});
  }

  private setup() {
    //  setup video
    this._video = document.querySelector('.video');
    const constraints = {
      video: {
        width: 512,
        height: 512
      }
    };
    navigator.getUserMedia(constraints,
      (stream) => {
        this._video.srcObject = stream;
        this._video.play().then();
    },
      (error) => {
      alert('Error when getting media');
      console.warn(error);
    });

  }

  private draw() {
  }

  private update(elapsedTime: number) {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

    const fontHeight = 8;
    const { videoWidth: width, videoHeight: height } = this._video;

    this._context.textBaseline = 'top';
    this._context.font = `${fontHeight}px Consolas`;

    const text = this._context.measureText('@');
    const fontWidth = parseInt(text.width);

    if (width && height) {
      this._hiddenCanvas.width = width;
      this._hiddenCanvas.height = height;
      this._hiddenContext.drawImage(this._video, 0, 0, width, height);

      for (let y = 0; y < height; y += fontHeight) {
        for (let x = 0; x < width; x += fontWidth) {
          const frameSection = this._hiddenContext.getImageData(x, y, fontWidth, fontHeight);
          const { r, g, b } = this.getAverageRGB(frameSection);
          const randomCharacter = this._charset[Math.floor(Math.random() * this._charset.length)];

          this._context.fillStyle = `rgb(${r},${g},${b})`;
          this._context.fillText(randomCharacter, x, y);
        }
      }
    }
  }

  private getAverageRGB = (frame) => {
    const length = frame.data.length / 4;

    let r = 0;
    let g = 0;
    let b = 0;

    for (let i = 0; i < length; i++) {
      r += frame.data[i * 4 + 0];
      g += frame.data[i * 4 + 1];
      b += frame.data[i * 4 + 2];
    }

    return {
      r: r / length,
      g: g / length,
      b: b / length,
    };
  };

}
