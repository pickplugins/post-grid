import { applyFilters } from '@wordpress/hooks';
var InAnimations = {
  backInDown: { label: "backInDown", value: "backInDown" },
  backInLeft: { label: "backInLeft", value: "backInLeft" },
  backInRight: { label: "backInRight", value: "backInRight", isPro: true },
  backInUp: { label: "backInUp", value: "backInUp", isPro: true },
  bounceIn: { label: "bounceIn", value: "bounceIn" },
  bounceInDown: {
    label: "bounceInDown",
    value: "bounceInDown",
    isPro: true,
  },
  bounceInLeft: {
    label: "bounceInLeft",
    value: "bounceInLeft",
    isPro: true,
  },
  bounceInRight: {
    label: "bounceInRight",
    value: "bounceInRight",
    isPro: true,
  },
  bounceInUp: { label: "bounceInUp", value: "bounceInUp", isPro: true },
  fadeIn: { label: "fadeIn", value: "fadeIn" },
  fadeInDown: { label: "fadeInDown", value: "fadeInDown", isPro: true },
  fadeInDownBig: {
    label: "fadeInDownBig",
    value: "fadeInDownBig",
    isPro: true,
  },
  fadeInLeft: { label: "fadeInLeft", value: "fadeInLeft", isPro: true },
  fadeInLeftBig: {
    label: "fadeInLeftBig",
    value: "fadeInLeftBig",
    isPro: true,
  },
  fadeInRight: { label: "fadeInRight", value: "fadeInRight", isPro: true },
  fadeInRightBig: {
    label: "fadeInRightBig",
    value: "fadeInRightBig",
    isPro: true,
  },
  fadeInUp: { label: "fadeInUp", value: "fadeInUp", isPro: true },
  fadeInUpBig: { label: "fadeInUpBig", value: "fadeInUpBig", isPro: true },
  fadeInTopLeft: {
    label: "fadeInTopLeft",
    value: "fadeInTopLeft",
    isPro: true,
  },
  fadeInTopRight: {
    label: "fadeInTopRight",
    value: "fadeInTopRight",
    isPro: true,
  },
  fadeInBottomRight: {
    label: "fadeInBottomRight",
    value: "fadeInBottomRight",
    isPro: true,
  },
  fadeInBottomLeft: {
    label: "fadeInBottomLeft",
    value: "fadeInBottomLeft",
    isPro: true,
  },
  rotateIn: { label: "rotateIn", value: "rotateIn" },
  rotateInDownLeft: {
    label: "rotateInDownLeft",
    value: "rotateInDownLeft",
    isPro: true,
  },
  rotateInDownRight: {
    label: "rotateInDownRight",
    value: "rotateInDownRight",
    isPro: true,
  },
  rotateInUpLeft: {
    label: "rotateInUpLeft",
    value: "rotateInUpLeft",
    isPro: true,
  },
  rotateInUpRight: {
    label: "rotateInUpRight",
    value: "rotateInUpRight",
    isPro: true,
  },
  zoomIn: { label: "zoomIn", value: "zoomIn", isPro: true },
  zoomInDown: { label: "zoomInDown", value: "zoomInDown", isPro: true },
  zoomInLeft: { label: "zoomInLeft", value: "zoomInLeft", isPro: true },
  zoomInRight: { label: "zoomInRight", value: "zoomInRight", isPro: true },
  zoomInUp: { label: "zoomInUp", value: "zoomInUp", isPro: true },
  slideInDown: { label: "slideInDown", value: "slideInDown", isPro: true },
  slideInLeft: { label: "slideInLeft", value: "slideInLeft", isPro: true },
  slideInRight: {
    label: "slideInRight",
    value: "slideInRight",
    isPro: true,
  },
  slideInUp: { label: "slideInUp", value: "slideInUp", isPro: true },
};
InAnimations = applyFilters('PostGridInAnimations', InAnimations);
export default InAnimations;