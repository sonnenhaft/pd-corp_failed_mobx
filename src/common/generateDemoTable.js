import Chance from 'chance'

const chance = new Chance()

const keyFunctions = {
  searchTerms: () => chance.integer({ min: 70000, max: 80000 }),
  rfidAssigned: () => chance.hashtag() + chance.hashtag() + chance.hashtag() + chance.hashtag() + chance.hashtag() + chance.hashtag() + chance.hashtag() + chance.hashtag() + chance.hashtag() + chance.hashtag() + chance.hashtag() + chance.hashtag(),
  location: () => `B0209-${ chance.integer({ min: 1, max: 100 }) }`,
  location_name: () => `Room "${ chance.province({ full: true }) }"`,
  asset_type: () => chance.domain(),
  model_name: () => chance.name()
}

export const generateLine = labels => () => labels.reduce((obj, { key }) => {
  obj[key] = (keyFunctions[key] || chance.name.bind(chance))()
  return obj
}, {})

export default (labels, size) => {
  return chance.n(generateLine(labels), chance.integer({ min: Math.min(2, size), max: size }))
}
