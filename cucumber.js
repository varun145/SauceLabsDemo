module.exports = {
  default: {
    require: [
      'step-definitions/*.ts',
      'hooks/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ['progress'],
    paths: ['features/*.feature']
  }
};