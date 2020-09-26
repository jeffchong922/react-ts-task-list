function stringify (data) {
  return JSON.stringify(data)
}

function parse (data) {
  return JSON.parse(data)
}

/**
 * 存储数据
 * @param {String} key 键名
 * @param {Object} value 字符串键值
 * @param {String} site 调用形式'session'为sessionStorage
 */
function setItem(key, value, site = '') {
  const data = stringify(value);
  if (site && site === "session") {
    sessionStorage.setItem(key, data);
  } else {
    localStorage.setItem(key, data);
  }
}

/**
 * 读取数据
 * @param {String} key 键名
 * @param {String} site 调用形式'session'为sessionStorage
 */
function getItem(key, site = '') {
  let data;
  if (site && site === "session") {
    data = sessionStorage.getItem(key);
  } else {
    data = localStorage.getItem(key);
  }
  return parse(data);
}

/**
 * 删除数据
 * @param {String} key 键名
 * @param {String} site 调用形式'session'为sessionStorage
 */
function removeItem(key, site) {
  if (site && site === "session") {
    sessionStorage.removeItem(key);
  } else {
    localStorage.removeItem(key);
  }
}

/**
 * 清空全部数据
 * @param {String} site 调用形式'session'为sessionStorage
 */
function clearStorage(site) {
  if (site && site === "session") {
    sessionStorage.clear();
  } else {
    localStorage.clear();
  }
}

export { setItem, getItem, removeItem, clearStorage };