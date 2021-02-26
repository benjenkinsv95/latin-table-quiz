// https://stackoverflow.com/a/37511463/3500171
export const removeMacrons = word => word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
export const loadBooleanOption = (name, defaultValue) => (localStorage.getItem(name) || `${defaultValue}`) === 'true'
export const saveBooleanOption = (name, value) => localStorage.setItem(name, `${value}`)
export const removeElementAtRandom = array => {
  const randomIndex = Math.floor(Math.random() * array.length)
  const removedElement = array.splice(randomIndex, 1)
  return removedElement[0]
}
