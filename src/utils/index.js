/**
 * @deprecated 只能输入小数 可保留小数点后n位
 * @params {Obejct} 表单对象
 * @params {String} 设置表单对象属性
 * @params {Number} 保留多少位小数
 * @return {void}
 */

export const keepLastDecimal = (obj, prop, n) => {
  //先把非数字的都替换掉，除了数字和.
  obj[prop] = obj[prop].replace(/[^\d.]/g, "");

  //保证只有出现一个.而没有多个.
  obj[prop] = obj[prop].replace(/\.{2,}/g, ".");

  //必须保证第一个为数字而不是.
  obj[prop] = obj[prop].replace(/^\./g, "");

  //保证.只出现一次，而不能出现两次以上
  obj[prop] = obj[prop]
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");

  // 只能输入n个小数
  if (n) {
    const reg = new RegExp(`^(\\-)*(\\d+)\\.(\\d{${n}}).*$`);
    obj[prop] = obj[prop].replace(reg, "$1$2.$3");
  }
};

/**
 * @description 只能输入整数
 * @params {Object} 表单对象
 * @params {String} 表单属性
 * @params {Boolean} 是否包含0
 * @returns {void}
 */
export const onlyInputNumber = (obj, prop, isIncludeZero = true) => {
  if (!isIncludeZero) obj[prop] = obj[prop].replace(/^0/g, "");
  obj[prop] = obj[prop].replace(/[^\d]/g, "");
};