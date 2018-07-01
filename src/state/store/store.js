export default function() {
  if (process.env.NODE_ENV === 'production') {
    return require('./store.prod');
  } else {
    return require('./store.dev');
  }
}
