import { inRouter, outRouter } from "@/utils/updateRouter";
// 初始化文章代码块
import codeInit from "@/scripts/Code";
// 初始化视频播放器
import videoInit from "@/scripts/Video";
// 初始化音乐播放器
import musicInit from "@/scripts/Music";
// 初始化 LivePhoto
import livePhotoInit from '@/scripts/LivePhoto'
// 初始化BackTop组件
import BackTopInitFn from "@/scripts/BackTop";
// 搜索
import { searchFn, vhSearchInit } from "@/scripts/Search";
// 图片懒加载
import vhLzImgInit from "@/scripts/vhLazyImg";
// 顶部导航 Current 状态
import initLinkCurrent from "@/scripts/Header";
// 底部网站运行时间
import initWebSiteTime from "@/scripts/Footer";
// 友情链接初始化
import initLinks from "@/scripts/Links";
// 朋友圈 RSS 初始化
import initFriends from "@/scripts/Friends";
// 动态说说初始化
import initTalking from "@/scripts/Talking";
// 文章评论初始化
import initComment from "@/scripts/Comment";
// 移动端侧边栏初始化
import initMobileSidebar from "@/scripts/MobileSidebar";
// Google 广告
import GoogleAdInit from "@/scripts/GoogleAd";
// Han Analytics 统计
import HanAnalyticsInit from "@/scripts/HanAnalytics";
// SmoothScroll 滚动优化
import SmoothScroll from "@/scripts/Smoothscroll";

// ============================================================

// 页面初始化 Only
const videoList: any[] = [];
const MusicList: any[] = [];
const indexInit = async (only: boolean = true) => {
  // 预加载搜索数据
  only && searchFn("");
  // 初始化搜索功能
  only && vhSearchInit();
  // 初始化网站运行时间
  only && initWebSiteTime();
  // 初始化BackTop组件
  only && BackTopInitFn();
  // 移动端侧边栏初始化
  only && initMobileSidebar();
  // SmoothScroll 滚动优化
  only && SmoothScroll();
  // 顶部导航 Current 状态
  initLinkCurrent()
  // 初始化文章代码块
  codeInit();
  // 文章评论初始化
  initComment();
  // 图片懒加载初始化
  vhLzImgInit();
  // 友情链接初始化
  initLinks();
  // 朋友圈 RSS 初始化
  initFriends();
  // 动态说说初始化
  initTalking();
  // Google 广告
  GoogleAdInit();
  // Han Analytics 统计
  HanAnalyticsInit();
  // 文章视频播放器初始化
  videoInit(videoList);
  // 文章音乐播放器初始化
  musicInit(MusicList);
  // 初始化 LivePhoto
  livePhotoInit();
};

export default () => {
  // 首次初始化
  indexInit();
  // 进入页面时触发
  inRouter(() => indexInit(false));
  // 离开当前页面时触发
  outRouter(() => {
    // 销毁播放器
    videoList.forEach((i: any) => i.destroy());
    videoList.length = 0;
    // 销毁音乐
    MusicList.forEach((i: any) => i.destroy());
    MusicList.length = 0;
  });
  console.log(
    "%c\u4E3B\u9898\uFF1AvhAstro-Theme%c https://github.com/uxiaohan/vhAstro-Theme ",
    "background: linear-gradient(90deg, #030307, #1a1a2e); color: #fadfa3; padding: 4px;",
    "background: #EDEDED; padding: 4px;"
  );
  console.log("%c\u521D\u59CB\u5316\u5B8C\u6BD5.", "color: #ffffff; background: #000; padding:5px");
}