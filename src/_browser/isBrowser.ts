/**
 * isBrowserFn
 * 检测代码是否运行在浏览器环境
 */
export const isBrowserFn = (): boolean => {
  return typeof window === 'object' && typeof document === 'object'
}
