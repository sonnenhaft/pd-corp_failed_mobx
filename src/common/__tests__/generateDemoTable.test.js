import generateDemoTable, { keyFunctions } from '../generateDemoTable'

const demoField1 = `demoField1${  Date.now() }`
const demoField2 = `demoField2${  Date.now() }`
const generatableKeys = Object.keys(keyFunctions)

test('generateDemoTable should create demo data with demo fields', () => {
  const data = generateDemoTable([
    { key: demoField1 },
    { key: demoField2 },
    ...generatableKeys.map(key => ({ key }))
  ])

  const firstRow = data[0]
  const outputFields = Object.keys(firstRow)
  expect(data.length).toBeGreaterThan(1)
  expect(outputFields).toContain(demoField1)
  expect(outputFields).toContain(demoField2)
  expect(firstRow[demoField2]).toBeDefined()
  expect(firstRow[generatableKeys[0]]).toBeDefined()
})
