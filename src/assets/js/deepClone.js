export function deepClone(obj) {
    /** 判断要拷贝的数据是基本数据类型还是引用数据类型 */
    // 如果是基本数据类型，不需要深拷贝直接返回
    if(typeof obj !== 'object' || !obj) {
        return obj;
    }
    // 如果是引用数据类型，判断是 数组 还是 对象，分类进行初始化
    let newObj = Array.isArray(obj) ? [] : {};

    for( let key in obj ) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]); 
        }
    }
    return newObj;
}