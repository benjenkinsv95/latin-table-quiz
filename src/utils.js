// https://stackoverflow.com/a/37511463/3500171
export const removeMacrons = word => word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
export const loadBooleanOption = (name, defaultValue) => (localStorage.getItem(name) || `${defaultValue}`) === 'true'
export const saveBooleanOption = (name, value) => localStorage.setItem(name, `${value}`)
