import path from 'path';

export default {
  alias: {
    '/@/': path.resolve(__dirname, 'src'),
  },
  resolvers: [
    {
      alias(id: string) {
        return id.replace(/^@\//, '/@/'); // add slash to particular id, then vite won't resolve it as a module
      },
    },
  ],
  proxy: {
    '/api/v1/socket': {
      target: 'ws://localhost:3030/api/v1/socket'
    },
    '/api': {
      target: 'http://localhost:3030',
      ws: true,
      // changeOrigin: true,
      // rewrite: (_path) => _path.replace(/^\/api/, ''),
    },
  },
};
