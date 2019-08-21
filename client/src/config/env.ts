export default typeof window.env === 'string' ||
typeof window.env === 'undefined'
  ? process.env
  : window.env;
