// import _ from 'lodash';
import './style.css';
import Icon from './icon1.png';
// import printMe from './print.js';
// import { cube } from './math.js';

if(process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {
  // var element = document.createElement('div');
  // var btn = document.createElement('button');

  //- Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // Lodash, now imported by this script
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // element.classList.add('hello');

  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;
  // element.appendChild(btn);

  // var myIcon = new Image();
  // myIcon.src = Icon;
  // element.appendChild(myIcon);

  var element = document.createElement('pre');
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to '
  ].join('\n\n');

  return element;
}

document.body.appendChild(component());
// let element = component(); //当print.js改变导致页面重新渲染时，重新获取渲染的元素
// document.body.appendChild(element);


// if(module.hot){
//   module.hot.accept('./print.js',function(){
//     console.log('Accepting the updated printMe module');
//     // printMe();
//     document.body.removeChild(element);
//     element = component(); //重新渲染页面后，component 更新 click 事件处理
//     document.body.appendChild(element);
//   })
// }

//注册Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
        })
      });
}