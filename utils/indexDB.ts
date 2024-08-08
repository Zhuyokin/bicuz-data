import { Toast } from "vant";

interface Result {
  name: string;
  content: string;
}

interface Get {
  result: Result;
  onsuccess: () => void;
  onerror: (reason?: any) => void;
}

interface Put {
  onsuccess: (target: { result: Result }) => void;
  onerror: (reason?: any) => void;
}

const SQL_NAME = "tuantuan-h5";
const DB_NAME = "h5";
let request: any;
let db: any;

// 初始化数据库
function init() {
  return new Promise((resolve, reject) => {
    request = window.indexedDB.open(SQL_NAME);
    request.onerror = (event: any) => {
      reject(event);
      Toast("缓存获取失败");
    };
    request.onsuccess = (event: any) => {
      resolve(event.target.result);
      db = event.target.result;
    };
    request.onupgradeneeded = (event: any) => {
      db = event.target.result;
      let objectStore;
      if (!db.objectStoreNames.contains(DB_NAME)) {
        // 创建数据库
        objectStore = db.createObjectStore(DB_NAME, {
          keyPath: "name",
          unique: true, // 使用name名称作为主键，且不允许重复
        });
        objectStore.createIndex("content", "content", { unique: false }); // 建立索引
      }
    };
  });
}

// get操作，读取数据
export async function get(name: string): Promise<Result> {
  return new Promise<Result>((resolve, reject) => {
  const select: Get = db
    .transaction([DB_NAME], "readonly")
    .objectStore(DB_NAME)
    .get(name);

  select.onsuccess = function () {
    resolve(select.result);
  };
  select.onerror = reject;
});
}

// add操作，添加数据
export async function add(name: string, content: string): Promise<Result> {
  return new Promise<Result>((resolve, reject) => {
  const select: Put = db
    .transaction([DB_NAME], "readwrite")
    .objectStore(DB_NAME)
    .add({ name: name, content });

  select.onsuccess = (event: any) => {
    resolve(event.target.result);
  };
  select.onerror = reject;
});
}

// update操作，更新数据
export async function update(name: string, content: string): Promise<Result> {
  return new Promise((resolve, reject) => {
  const select: Put = db
    .transaction([DB_NAME], "readwrite")
    .objectStore(DB_NAME)
    .put({ name, content });

  select.onsuccess = (event: any) => {
    resolve(event.target.result);
  };
  select.onerror = reject;
});
}

// remove操作，删除数据
export async function remove(name: string): Promise<Result> {
  return new Promise((resolve, reject) => {
  const select: Put = db
    .transaction([DB_NAME], "readwrite")
    .objectStore(DB_NAME)
    .delete(name);

  select.onsuccess = (event: any) => {
    resolve(event.target.result);
  };
  select.onerror = reject;
});
}

export default {
  init,
  add,
  get,
  update,
  remove,
};


