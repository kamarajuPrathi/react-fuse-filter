module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactFuseFilter',
      externals: {
        react: 'React'
      }
    }
  }
}
