import Chance from 'chance'

const chance = new Chance()

const keyFunctions = {
  assetNumber: () => chance.integer({ min: 70000, max: 80000 }),
  assetName: () => chance.hashtag()+chance.hashtag()+chance.hashtag()+chance.hashtag(),
  key_location_id: () => `B0209-${chance.integer({ min: 1, max: 100 })}`,
  key_location_name: () => `Room "${ chance.province({ full: true })}"`,
  asset_type: () => chance.domain(),
  model_name: () => chance.name()
}

export default labels => {
  return chance.n(() => labels.reduce((obj, { key }) => {
    obj[key] = (keyFunctions[key] || chance.name.bind(chance))()
    return obj
  }, {}), chance.integer({ min: 5, max: 12 }))
}
