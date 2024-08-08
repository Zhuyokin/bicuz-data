// 在需要缓存 MP4 文件的地方
export async function cacheMP4File(url) {
  try {
    const cache = await caches.open('my-cache');
    const response = await fetch(url);
    await cache.put(url, response.clone());
    console.log('MP4 file cached successfully.');
  } catch (error) {
    console.error('Error caching MP4 file:', error);
  }
}

// 在需要加载缓存的 MP4 文件的地方
export async function loadCachedMP4File(url) {
  try {
    const cache = await caches.open('my-cache');
    const response = await cache.match(url);
    if (response) {
      const blob = await response.blob();
      // 在这里使用 blob 对象，如创建视频元素并设置其 source
      return blob
    } else {
      // 缓存中没有找到该文件
      cacheMP4File(url)
    }
  } catch (error) {
    console.error('Error loading cached MP4 file:', error);
  }
}

// 批量缓存MP4
// export async function cacheMP4Files(url: string[]) {
//   try {
//     const cache = await caches.open('my-cache');
//     const response = await fetch(url);
//     await cache.addAll(url, response.clone());
//     console.log('MP4 file cached successfully.');
//   } catch (error) {
//     console.error('Error caching MP4 file:', error);
//   }
// }