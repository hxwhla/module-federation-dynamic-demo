// import Home from './Home';
//
// const home = document.createElement('h1');
// home.textContent = '这里是 main 的 Home模块';
// document.body.appendChild(home);
// document.body.innerHTML += Home(5);

import Home from './Home';

/**
 *  需要异步导入
 *  remoteApp1 为 remotes 中定义的资源别名
 *  ./Header 为 remoteApp1 exposes 定义的 ./Header
 */

// eslint-disable-next-line import/no-unresolved
// import('remoteApp1/Header').then((Header) => {
//   const body = document.createElement('div');
//   body.appendChild(Header.default());
//   document.body.appendChild(body);
//
//   const home = document.createElement('h1');
//   home.textContent = '这里是 main 的 Home 模块：';
//   document.body.appendChild(home);
//   document.body.innerHTML += Home(5);
// });


const home = document.createElement('h1');
home.textContent = '这里是 main 的 Home 模块：';
document.body.appendChild(home);
document.body.innerHTML += Home(5);




function loadRemoteApp() {
  const allRemote = `/remote.js?remoteApps=remoteApp1,remoteApp2`;
  const script = document.createElement('script')
  script.src = allRemote
  script.id = "remote-script"
  script.onload = () => {
    console.log('loaded')

    
    setTimeout(() => {
      
    import('remote/remoteApp1/Header')
    .then((Header) => {
      console.log(Header)
      const body = document.createElement('div');
      body.appendChild(Header.default());
      document.body.appendChild(body);
    });

    import('remote/remoteApp2/Footer')
      .then((Footer) => {
        const body = document.createElement('div');
        body.appendChild(Footer.default());
        document.body.appendChild(body);

      });
    }, 3000);

  }
  // 将script的src设置为版本化的remoteEntry.js
  document.head.appendChild(script);
}

loadRemoteApp()

