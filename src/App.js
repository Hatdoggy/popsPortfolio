import React,{useState} from 'react';
import About from './Main';
import Slide from './Slide';
import {Modal} from './Wheel';
import { useMediaQuery } from 'react-responsive';
import './icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {MobNav,onView} from './functions'

function App() {

  const [modal,showMod] = useState({
    show:false,
    src:'',
    alt:''
  });

  const [view,updView] = useState({
    skt:false,
    img:true
  });

  const upd = (val)=>{
    updView({
      skt:false,
      img:false,
      [val]:true    
    })
  }

  const [nav,showNav] = useState(false);
  const [filt,showFilt] = useState(false);

  const mobile = useMediaQuery({
   query: '(max-width: 800px)'
  })

  return (
    <div className={`h-100 pos-rel ${mobile?"overy-flow":"over-hide"} main snap flex flx-col`} onScroll={(val)=>mobile?onView(val,showFilt):undefined}>
      {mobile&&
        <div className="flex al-ce p-20 mob-nav z-top pos-stk top-0 bg-op fadeDown">
          <h4 className="lato bold fs-m clr-wht">IO</h4>
          {filt&&
            <div className="ml-auto mr-5 flex clr-wht">
              <button className="btn fadeInRight lato hov mr-2 skt" onClick={()=>upd('skt')}>Sketches</button>
              <button className="btn fadeInRight lato hov img" onClick={()=>upd('img')}>Products</button>
            </div>
          }
          <FontAwesomeIcon icon="bars" className={`clr-wht ${!filt&&"ml-auto"}`} onClick={()=>showNav(true)}/>
        </div>
      }
      {!mobile&&<Slide/>}
      <About showMod={showMod} filt={filt} view={view} updView={updView}/>
      {modal.show&&<Modal modal={modal} close={showMod}/>}
      {nav&&<MobNav upd={showNav}/>}
    </div>
  );
}

export default App;


