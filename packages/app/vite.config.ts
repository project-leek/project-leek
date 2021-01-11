export default {
  proxy: {
    '/api': {
      target: 'http://localhost:3030',
      ws: true,
    },
  },
  optimizeDeps: {
    exclude: ['@fortawesome/fontawesome-free'],
  },
};
