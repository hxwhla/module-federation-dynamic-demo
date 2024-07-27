promise new Promise(resolve => {
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
        try {
          console.log('arg', arg);
          return window['remoteApp1'].init(arg)
        } catch(e) {
          console.log('remote container already initialized')
        }
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