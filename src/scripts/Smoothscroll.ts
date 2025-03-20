// SmoothScroll 滚动优化
import { LoadScript } from "@/utils/index";
declare const SmoothScroll: any;
export default async () => {
  await LoadScript("/assets/js/smoothscroll.min.js");
  SmoothScroll({ stepSize: 118, animationTime: 666 })
};