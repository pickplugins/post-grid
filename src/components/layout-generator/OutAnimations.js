import { applyFilters } from '@wordpress/hooks';
var OutAnimations = {
  backOutDown: { label: "backOutDown", value: "backOutDown" },
  backOutLeft: { label: "backOutLeft", value: "backOutLeft" },
  backOutRight: {
    label: "backOutRight",
    value: "backOutRight",
    isPro: true,
  },
  backOutUp: { label: "backOutUp", value: "backOutUp", isPro: true },
  bounceOut: { label: "bounceOut", value: "bounceOut" },
  bounceOutDown: {
    label: "bounceOutDown",
    value: "bounceOutDown",
    isPro: true,
  },
  bounceOutLeft: {
    label: "bounceOutLeft",
    value: "bounceOutLeft",
    isPro: true,
  },
  bounceOutRight: {
    label: "bounceOutRight",
    value: "bounceOutRight",
    isPro: true,
  },
  bounceOutUp: { label: "bounceOutUp", value: "bounceOutUp", isPro: true },
  fadeOut: { label: "fadeOut", value: "fadeOut" },
  fadeOutDown: { label: "fadeOutDown", value: "fadeOutDown", isPro: true },
  fadeOutDownBig: {
    label: "fadeOutDownBig",
    value: "fadeOutDownBig",
    isPro: true,
  },
  fadeOutLeft: { label: "fadeOutLeft", value: "fadeOutLeft", isPro: true },
  fadeOutLeftBig: {
    label: "fadeOutLeftBig",
    value: "fadeOutLeftBig",
    isPro: true,
  },
  fadeOutRight: {
    label: "fadeOutRight",
    value: "fadeOutRight",
    isPro: true,
  },
  fadeOutRightBig: {
    label: "fadeOutRightBig",
    value: "fadeOutRightBig",
    isPro: true,
  },
  fadeOutUp: { label: "fadeOutUp", value: "fadeOutUp", isPro: true },
  fadeOutUpBig: {
    label: "fadeOutUpBig",
    value: "fadeOutUpBig",
    isPro: true,
  },
  fadeOutTopLeft: {
    label: "fadeOutTopLeft",
    value: "fadeOutTopLeft",
    isPro: true,
  },
  fadeOutTopRight: {
    label: "fadeOutTopRight",
    value: "fadeOutTopRight",
    isPro: true,
  },
  fadeOutBottomRight: {
    label: "fadeOutBottomRight",
    value: "fadeOutBottomRight",
    isPro: true,
  },
  fadeOutBottomLeft: {
    label: "fadeOutBottomLeft",
    value: "fadeOutBottomLeft",
    isPro: true,
  },
  rotateOut: { label: "rotateOut", value: "rotateOut" },
  rotateOutDownLeft: {
    label: "rotateOutDownLeft",
    value: "rotateOutDownLeft",
    isPro: true,
  },
  rotateOutDownRight: {
    label: "rotateOutDownRight",
    value: "rotateOutDownRight",
    isPro: true,
  },
  rotateOutUpLeft: {
    label: "rotateOutUpLeft",
    value: "rotateOutUpLeft",
    isPro: true,
  },
  rotateOutUpRight: {
    label: "rotateOutUpRight",
    value: "rotateOutUpRight",
    isPro: true,
  },
  zoomOut: { label: "zoomOut", value: "zoomOut", isPro: true },
  zoomOutDown: { label: "zoomOutDown", value: "zoomOutDown", isPro: true },
  zoomOutLeft: { label: "zoomOutLeft", value: "zoomOutLeft", isPro: true },
  zoomOutRight: {
    label: "zoomOutRight",
    value: "zoomOutRight",
    isPro: true,
  },
  zoomOutUp: { label: "zoomOutUp", value: "zoomOutUp", isPro: true },
  slideOutDown: {
    label: "slideOutDown",
    value: "slideOutDown",
    isPro: true,
  },
  slideOutLeft: {
    label: "slideOutLeft",
    value: "slideOutLeft",
    isPro: true,
  },
  slideOutRight: {
    label: "slideOutRight",
    value: "slideOutRight",
    isPro: true,
  },
  slideOutUp: { label: "slideOutUp", value: "slideOutUp", isPro: true },
};
OutAnimations = applyFilters('PostGridBuilderElements', OutAnimations);
export default OutAnimations;