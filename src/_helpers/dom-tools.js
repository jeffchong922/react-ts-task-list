/**
 * @param {String} classes 类名集合
 * @returns {Array<string>}
 */
function getClassArr (classes) {
  return classes.split(/\s+/)
}

/**
 * @param {HTMLElement} element 元素
 * @param {String} className 类名
 */
function addClass (element, className) {
  if (element.classList) {
    element.classList.add(className)
  } else {
    var existClasses = getClassArr(element.className)
    var idx = existClasses.indexOf(className)
    if (!(~idx)) {
      existClasses.push(className)
    }
    element.className = existClasses.join(' ')
  }
}

/**
 * @param {HTMLElement} element 元素
 * @param {String} className 类名
 */
function removeClass (element, className) {
  if (element.classList) {
    element.classList.remove(className)
  } else {
    var existClasses = getClassArr(element.className)
    var idx = existClasses.indexOf(className)
    if (~idx) {
      existClasses.splice(idx, 1)
    }
    element.className = existClasses.join(' ')
  }
}

export {
  addClass,
  removeClass
}