import type { RendererType } from 'lottie-web'
import type { PLAYER_FILL_MODE, PLAYER_PLAY_MODE } from 'svga/dist/types'

export enum useTypeEnum {
  show = 1, // 纯展示
  interaction = 2, // 交互型
}

export interface playerCommonType {
  // 素材链接
  url: string
  // 展示模式：纯展示、交互型
  useType: useTypeEnum
  width?: number
  height?: number
  // 是否循环
  loop?: boolean | number
  // 开始播放
  onStartPlay?: (player: any) => void
  // 播放结束
  onEnded?: (player: any) => void
  // 播放中
  onPlaying?: (player: any) => void
  // 组件销毁时回调
  onDestroy?: (player: any) => void
  // 加载失败回调
  onLoadError?: (player: any) => void
}

export interface lottiePlayerType extends playerCommonType {
  renderer?: RendererType // svg /  canvas / html
  autoplay?: boolean
}

export interface SvgaPlayerPropsType extends playerCommonType {
  // 最后停留的目标模式，默认值 forwards(首帧) backwards(尾帧)
  // 类似于 https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
  fillMode?: PLAYER_FILL_MODE
  // 播放模式，默认值 forwards（顺序播放） fallbacks（倒序播放）

  playMode?: PLAYER_PLAY_MODE
  // 开始播放的帧数，默认值 0
  startFrame?: number
  // 结束播放的帧数，默认值 0

  endFrame?: number
  // 循环播放开始的帧数，可设置每次循环从中间开始。默认值 0，每次播放到 endFrame 后，跳转到此帧开始循环，若此值小于 startFrame 则不生效
  // 类似于 https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loopStart
  loopStartFrame?: number
  // 是否开启缓存已播放过的帧数据，默认值 false
  // 开启后对已绘制的帧进行缓存，提升重复播放动画性能
  isCacheFrames?: boolean
  // 是否开启动画容器视窗检测，默认值 false
  // 开启后利用 Intersection Observer API 检测动画容器是否处于视窗内，若处于视窗外，停止描绘渲染帧避免造成资源消耗
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API
  isUseIntersectionObserver?: boolean

  // 是否使用避免执行延迟，默认值 false
  // 开启后使用 `WebWorker` 确保动画按时执行（避免个别情况下浏览器延迟或停止执行动画任务）
  // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#Policies_in_place_to_aid_background_page_performance
  isOpenNoExecutionDelay?: boolean
}

export interface VpaPlayerPropsType extends playerCommonType {
  container: HTMLElement
  // 素材配置json对象
  json: string
  // 同素材生成工具中配置的保持一致
  fps: number
  // 是否融合信息（图片/文字）
  type: number
  // 是否对视频静音
  mute?: true
  // 起始播放时间点 默认0
  beginPoint?: number
  // 精准模式默认 true
  accurate?: boolean
  imgUser?: string
  imgAnchor?: string
  textUser?: string
  textAnchor?: string
  precache?: boolean
}

export interface PlayerPropsType extends playerCommonType {
  conf: lottiePlayerType | PagPlayerPropsType | SvgaPlayerPropsType | VpaPlayerPropsType
}

export interface PagPlayerPropsType extends playerCommonType {
  /**
   * The duration of current composition in microseconds.
   */
  duration?: () => number
  /**
   * Start the animation.
   */
  play?: () => Promise<void>
  /**
   * Pause the animation.
   */
  pause?: () => void
  /**
   * Stop the animation.
   */
  stop?: (notification?: boolean) => Promise<void>
  /**
   * Set the number of times the animation will repeat. The default is 1, which means the animation
   * will play only once. 0 means the animation will play infinity times.
   */
  setRepeatCount?: (repeatCount: number) => void
  /**
   * Returns the current progress of play position, the value is from 0.0 to 1.0. It is applied only
   * when the composition is not null.
   */
  getProgress?: () => number
  /**
   * Returns the current frame.
   */
  currentFrame?: () => number
  /**
   * Set the progress of play position, the value is from 0.0 to 1.0.
   */
  setProgress?: (progress: number) => number
  /**
   * Return the value of videoEnabled property.
   */
  videoEnabled?: () => boolean
  /**
   * If set false, will skip video layer drawing.
   */
  setVideoEnabled?: (enable: boolean) => void
  /**
   * If set to true, PAG renderer caches an internal bitmap representation of the static content for
   * each layer. This caching can increase performance for layers that contain complex vector content.
   * The execution speed can be significantly faster depending on the complexity of the content, but
   * it requires extra graphics memory. The default value is true.
   */
  cacheEnabled?: () => boolean
  /**
   * Set the value of cacheEnabled property.
   */
  setCacheEnabled?: (enable: boolean) => void
  /**
   * This value defines the scale factor for internal graphics caches, ranges from 0.0 to 1.0. The
   * scale factors less than 1.0 may result in blurred output, but it can reduce the usage of graphics
   * memory which leads to better performance. The default value is 1.0.
   */
  cacheScale?: () => number
  /**
   * Set the value of cacheScale property.
   */
  setCacheScale?: (value: number) => void
  /**
   * The maximum frame rate for rendering. If set to a value less than the actual frame rate from
   * PAGFile, it drops frames but increases performance. Otherwise, it has no effect. The default
   * value is 60.
   */
  maxFrameRate?: () => number
  /**
   * Set the maximum frame rate for rendering.
   */
  setMaxFrameRate?: (value: number) => void
  /**
   * Call this method to render current position immediately. If the play() method is already
   * called, there is no need to call it. Returns true if the content has changed.
   */
  flush?: () => Promise<boolean>
  /**
   * Free the cache created by the pag view immediately. Can be called to reduce memory pressure.
   */
  freeCache?: () => void
  /**
   * Update size when changed canvas size.
   */
  updateSize?: () => void
  /**
   * Prepares the player for the next flush() call. It collects all CPU tasks from the current
   * progress of the composition and runs them asynchronously in parallel. It is usually used for
   * speeding up the first frame rendering.
   */
  prepare?: () => Promise<void>
  /**
   * Returns a ImageBitmap object capturing the contents of the PAGView. Subsequent rendering of
   * the PAGView will not be captured. Returns null if the PAGView hasn't been presented yet.
   */
  makeSnapshot?: () => Promise<ImageBitmap>
}
