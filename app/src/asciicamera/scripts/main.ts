import Animation from "./animation";

const hiddenCanvas = document.querySelector('.hidden-canvas');
const canvas = document.querySelector('.canvas');

const animation = new Animation(canvas, hiddenCanvas);
