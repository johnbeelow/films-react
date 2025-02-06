export default {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  
  testEnvironment: 'jest-fixed-jsdom',
  extensionsToTreatAsEsm: ['.jsx']

}
