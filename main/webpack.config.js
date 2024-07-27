const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    remote: './src/remote.js',
  },
  output: {
    clean: true,
  },
  devtool: false,
  devServer: {
    port: '4000',
    client: {
      logging: 'none',
    },
  },
  plugins: [
    new HtmlWebpackPlugin(),

    // new ModuleFederationPlugin({
    //   // 模块联邦名字，提供给其他模块使用
    //   name: 'main',
    //   // 提供给外部访问的资源入口
    //   filename: 'App1RemoteEntry.js',
    //   // 引用的外部资源列表
    //   remotes: {
    //     /**
    //      * [remoteApp] 引用其他应用模块的资源别名
    //      * [remoteApp] 是[remoteApp] 的模块联邦名字
    //      *  http://localhost:3001 是[remoteApp] 运行的地址
    //      *  remoteApp1RemoteEntry.js 是 remoteApp1 提供的外部访问的资源名字
    //      *  可以访问到 remoteApp1 通过 exposes 暴露给外部的资源
    //      */
    //     remoteApp1: 'remoteApp1@http://localhost:3001/remoteApp1RemoteEntry.js',
    //   },
    //   // 暴露给外部的资源列表
    //   exposes: {},
    //   // 共享模块，如lodash
    //   shared: {},
    // }),

    new ModuleFederationPlugin({
      name: 'main',
      remotes: {
        remote: `promise new Promise(resolve => {
  // TODO
  // 可以在这里设计和实现你的 模块联邦 版本化，这里简单的从URL获取version
  // const urlParams = new URLSearchParams(window.location.search)
  // const remoteApps = urlParams.get('remoteApps')
  const script = document.getElementById('remote-script');
  const remoteApps = script.src.split('=')[1];
  console.log('remoteApps', remoteApps);
  const promiseArr = remoteApps?.split(',').map(loadRemoteApp)
  window.promiseArr = promiseArr;
  Promise.all(promiseArr).then((proxyArr) => {
    // 注入的脚本已经加载并在window上可用
    // 我们现在可以解析这个Promise
    const proxy = {
      get: (request) => {
        console.log('request', request);
        const remoteApp = request?.split('/')[1]
        return window[remoteApp].get(request)
      },
      init: (arg) => {
      }
    }
      console.log(proxy)
    resolve(proxy)
  })
  function loadRemoteApp(remoteApp) {
    return new Promise (loadResolve => {
      const remoteUrl = 'http://localhost:3000/remote/' + remoteApp + '.js'
      console.log('remoteUrl', remoteUrl);
      const script = document.createElement('script')
      script.src = remoteUrl
      script.onload = () => {
        loadResolve()
      }
      // 将script的src设置为版本化的remoteEntry.js
      document.head.appendChild(script);
      
    })
  }
})
       
       `,
      },
    }),
  ],
};
