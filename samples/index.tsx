import * as React from 'react';
import { render } from 'react-dom';
import '../src/index';
import './demo.scss';

import { EventEmitter } from 'events';
// const img1 = require('./img/img1.png');
import img1 from './img/img1.png';
// const whiteicon = require('./img/white.png');
import whiteicon from './img/white.png';
// const blackicon = require('./img/black.png');
import blackicon from './img/black.png';


export default function RenderDemo(list: JSX.Element[], navList: any[], kitsList: any[]) {
  const iconMap = new Map<string, any[]>();
  iconMap.set('common', []);


  const event = new EventEmitter();

  render(
    <div key='demo' style={{ height: '100%' }}>
      {/* 头部图片  */}
      <div style={{
        width: '100%', height: '760px', backgroundColor: '#F8FAFF', backgroundImage: `url(${img1})`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '75%',
      }}>
      </div>
      <div className='ui-title'> <span className='title-num'>01</span> <span className='title-text'>UI Resource</span> </div>
      {/* 左侧锚点导航 */}

      {/* 颜色分类 */}
      <dl id='anchor-icons'>
        <dt>Icon</dt>
        <dt className='ui-name'>图标</dt>
        <dd className='ui-desc'>图标遵循化繁为简的原则，避免喧宾夺主而干扰到用户的注意力，同时需遵循相应的比重及数学关系。</dd>
        <dd>
          <div className={'icon-demo'}>
            {
              [...iconMap.keys()].map(key => {
                return <React.Fragment key={key}>
                  <h2 style={{ color: '#333' }}>{key}</h2>
                  {
                    iconMap.get(key)!.map(iconName => {
                      return <div key={iconName}>
                      </div>;
                    })
                  }
                </React.Fragment>;
              })
            }

          </div>
        </dd>
      </dl>

      {/* LOGO标志 */}
      <dl id='anchor-logo' >
        <dt style={{ marginTop: '50px' }}>LOGO</dt>
        <dt className='ui-name'>标志</dt>
        <dd className='ui-desc'>LOGO是徽标或者商标的英文说法，起到对徽标拥有公司的识别和推广的作用，通过形象的logo可以让消费者记住公司主体和品牌文化。</dd>
        <dd>
          <div className='ui-logo1'>
            <img src={whiteicon} style={{ width: '100%', height: '100%' }} alt='whiteicon' />
          </div>
          <div className='ui-logo2'>
            <img src={blackicon} style={{ width: '100%', height: '100%' }} alt='blackicon' />
          </div>
        </dd>
      </dl>

      <div className='ui-title'> <span className='title-num'>02</span> <span className='title-text'>UI Elements</span> </div>

      {list}
    </div>,
    document.getElementById('demo-app')
    ,
    () => {
      const resourceList = [
        {
          anchor: '#color',
          nameEnglish: 'Color',
          name: '颜色',
          title: '颜色',
          children: [
            {
              anchor: '#color',
              name: '品牌色',
            },
            {
              anchor: '#color',
              name: '辅助色',
            },
            {
              anchor: '#color',
              name: '其他颜色',
            },
          ],
        },
        {
          anchor: '#anchor-icons',
          nameEnglish: 'Icon',
          name: '图标',
          title: '图标',
        },
        {
          anchor: '#anchor-logo',
          nameEnglish: 'LOGO',
          name: '标志',
          title: '标志',
        },
      ];
      const navTopList = [...resourceList, ...navList, ...kitsList].map(nav => {
        const dom = document.getElementById(nav.anchor.substr(1));
        if (dom) {
          return {
            top: dom.offsetTop,
            id: nav.anchor,
          };
        }
        return {
          top: 0,
          id: 'demo-app',
        };
      });
      navTopList.sort((a, b) => a.top - b.top);

      const box = document.getElementById('demo-app');
      if (box) {
        box.onscroll = (e) => {
          const scrollTop = box.scrollTop;
          // navTopList
          let id = '';
          for (let i = 0; i < navTopList.length - 1; i++) {
            if (navTopList[i].top < scrollTop && navTopList[i + 1].top > scrollTop) {
              id = navTopList[i].id;
              break;
            }
          }
          event.emit('scrollId', id, e);
        };
      }
    },
  );
}
