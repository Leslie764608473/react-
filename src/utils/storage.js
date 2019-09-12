
/*
*
* */

function setItem(key,value) {
    window.localStorage.setItem(key,JSON.stringify(value))
}

function getItem(key) {
    let a = window.localStorage.getItem(key)
    return JSON.parse(a)
}

function removeItem(key) {
    window.localStorage.removeItem(key)
}

export {
    setItem,
    getItem,
    removeItem
}