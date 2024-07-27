promise new Promise(resolve => {
          // TODO
          // 可以在这里设计和实现你的 模块联邦 版本化，这里简单的从URL获取version
          const _script = document.getElementById('remote-script');
          const remoteApps = _script.src.split('=')[1];
          console.log('remoteApps', remoteApps);
          const remoteUrlWithVersion = 'http://localhost:3000/remote/' + remoteApps[1] + '.js'
          console.log('remoteUrlWithVersion', remoteUrlWithVersion);
          const script = document.createElement('script')
          script.src = remoteUrlWithVersion
          script.onload = () => {
            // 注入的脚本已经加载并在window上可用
            // 我们现在可以解析这个Promise
            const proxy = {
              get: (request) => {
                console.log('request', request);
                return window.remoteApp1.get(request)
              },
              init: (arg) => {
                try {
                  console.log('arg', arg);
                  return window.remoteApp1.init(arg)
                } catch(e) {
                  console.log('remote container already initialized')
                }
              }
            }
            resolve(proxy)
          }
          // 将script的src设置为版本化的remoteEntry.js
          document.head.appendChild(script);
        })
       