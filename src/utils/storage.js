export const loadJSON = (key, value) => {
    return JSON.parse(localStorage.getItem(key))
}

export const saveJSON = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}