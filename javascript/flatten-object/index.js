const input = {
  prop0: 'value0',
  prop1: {
    nested0: 'nv0',
    nested1: {
      supernested0: 'sn0',
      supernested1: ['sn1'],
    },
  },
  prop2: 'value2',
}

// const expectedOutput = {
//   prop0: 'value0',
//   prop1_nested0: 'nv0',
//   prop1_nested1_supernested0: 'sn0',
//   prop1_nested1_supernested1: ['sn1'],
//   prop2: 'value2',
// }

const prefexFlattenObject = (obj, prefix = '') => {
  const keys = Object.keys(obj)
  return keys.reduce((result, key) => {
    const isArray = Array.isArray(obj[key])
    const isObject = typeof obj[key] === 'object'
    const newKey = prefix.length > 0 ? prefix + '_' + key : key

    if (isObject && !isArray) {
      Object.assign(result, prefexFlattenObject(obj[key], newKey))
    } else {
      result[newKey] = obj[key]
    }

    return result
  }, {})
}

const flattened = prefexFlattenObject(input)

console.log(flattened)
