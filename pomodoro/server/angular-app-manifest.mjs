
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'D:/Git/quarto-projeto/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/D:/Git/quarto-projeto"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 526, hash: '82cd3fd5a3107dbea5153338f7c4406894385302c3cbb0cefc60e177483c5ea6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1039, hash: '65198edd65c17e51bd3843f3c335c923b15e4a51953950d9db8d371bdb4f67af', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 2815, hash: 'c6e2d007ef9ea52f126bf15b123634854694f0858374e79093791b1374ccc20b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
