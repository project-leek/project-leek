export default {
  proxy: {
    '/api': {
      target: 'http://localhost:3030',
      ws: true,
    },
  },
};
