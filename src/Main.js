import React,{useState,useEffect} from 'react';
import Wheel,{Grid} from './Wheel'
import func,{dispNext,adjust,change,navUpd,scroll,horScrll,disp,copy} from './functions'
import './icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

const Nav = (props)=>{

  const clicked = (val,event)=>{

      func(val);

      props.upd({
       abt:false,
        des:false,
        cont:false,
        [val]:true
      });

      navUpd(val);

      if(val === "cont"){
        adjust();
      }      
    

  }

  return(
    <header className="flex jc-e al-ce p-10 pos-rel z-top">

      <Router>
        <Link to="/" className="lato bold hov clr-wht nav" onClick={()=>clicked('abt')} id="abt">About Me</Link>
        <Link to="/des" className="lato bold mr-2 ml-2 hov nav" onClick={()=>clicked('des')} id="des">Designs</Link>
        <Link to="/cont" className="lato bold hov mr-2 nav" onClick={()=>clicked('cont')} id="cont">Contact</Link>
        <h4 className="lato bold fs-m clr-wht">IO</h4>
      </Router>

    </header>
  );
}

const about = [
  {
    head:'About',
    desc:'I am a Filipino Furniture designer full of passion in innovation and designing with a 26 years of experience under three different companies',
    id:"about"
  },
  {
    head:'Work Experience',
    desc:'The following is my most recent experience: 13 years under carolyn kinder international, 4 year at Berman Industries, and 8 years at Maitland Cebu Inc.',
    id:"exp"
  },
  {
    head:'Skills',
    desc:'The following are my skills accumulated from my years of work, Free-hand sketching, prisma manual color rendering, and knowledge of the following softwares, Autocad, sketchUp, and CorelDraw',
    id:"skill"
  },
];

/* Descriptions on left */

const Greet = (props)=>{

  const [ctr,updCtr] = useState(0);
  const history = useHistory();

  let check = (!props.cur.abt&&!props.cur.des);
  const upd = (val)=>{
    props.view({
      skt:false,
      img:false,
      [val]:true    
    })

    let target = document.querySelector('.'+val);
    let deact = document.querySelectorAll('button.btn');

    deact.forEach((elem)=>elem.classList.remove('active'));

    target.classList.toggle('active');
  }

  const set = ()=>{
    let target = document.querySelector('#root');
    target.onwheel = (scroll)=>{
      change(history,scroll,props.upd,props.test)
    }
  }

  return(
    <div className={`greet flex flx-col jc-ce al-e clr-wht h-vh ${check||props.mobile?"p-5 w-100":"p-20 w-50"} z-mid fadeInRight`} onMouseOver={props.mobile?undefined:set} id="greet">
      <h1 className={`robo ${check?"txt-ce w-100 fadeInRight":"txt-r"} fs-head head pos-rel h-70`}>Isidro Ondap</h1>

      {props.cur.abt&&//About display
          <div className="mt-10 flex flx-col al-e jc-ar w-100 h-30" id="abt-scrll">

            {props.mobile?
              <div className="flex over-hide overx-flow snap scr-sm hide-bar" onScroll={horScrll}>
                {about.map((elem,ndx)=>(
                  <div className={`flex flx-col jc-e al-e flex-shr w-100 sn-ce ${elem.id}`} key={ndx}>
                    <h3 className="lato bold txt-r fadeInRight trans">{elem.head}</h3>
                    <p className="lato w-30 lato txt-r mt-2 fadeInRight trans">{elem.desc}</p>
                  </div>
                ))}
              </div>
              :
              <div className="flex flx-col jc-e al-e">
                <h3 className="lato bold txt-r fadeInRight trans">{about[ctr].head}</h3>
                <p className="lato w-50 lato txt-r mt-2 fadeInRight trans">{about[ctr].desc}</p>
              </div>
            }

            <div className={`flex al-ce mt-2 w-30 trans ${props.mobile?"jc-ce":"jc-e p-10"}`}>
              {about.map((elem,ndx)=>(
                <span key={ndx} id={elem.id} className={`desc hov circ p-5 mt-2 ${ndx===0&&"clr-m"} ${(ndx<2)&&"mr-5"}`} onClick={()=>props.mobile?scroll(elem.id):dispNext(ndx,updCtr,"btn",elem.id)}></span>
              ))}
              <FontAwesomeIcon icon={["far","arrow-alt-circle-right"]} className={`arr hov ${props.mobile?"none":"ml-5"} fs-l`} onClick={()=>dispNext(ctr,updCtr,"arr")}/>
            </div>

          </div>
      }

      {props.cur.des&&//Designs Display
        <div className="mt-15 flex jc-ar  flx-col al-e w-100 trans h-30">
          <h3 className="lato bold txt-r fadeInRight trans">Designs</h3>
          <p className="lato w-75 lato txt-r mt-2 fadeInRight trans">These are my best design sketches and designs that were commercialized, mostly under carolyn kinder international.</p>
          <div className="mt-5 flex jc-e w-100">
            <button className="btn w-20 fadeInRight lato hov mr-2 img" onClick={()=>upd('img')}>Products</button>
            <button className="btn w-20 fadeInRight lato hov skt" onClick={()=>upd('skt')}>Sketches</button>
          </div>
        </div>
      }

      {check&&//Contact Display
        <div className="mt-5 flex jc-ar  flx-col al-ce jc-ce w-100 trans h-30">
          <h3 className="lato bold txt-r fadeInRight trans">Contact Me</h3>
          <p className="lato w-30 lato txt-ce mt-2 fadeInRight trans">You may contact me through Gmail, LinkedIn or Facebook and connect with me for future collaborations</p>
          <div className="flex p-20 jc-ce al-ce mt-2 fadeInRight">
            <FontAwesomeIcon className="clr-wht fs-m hov google" icon={["fab","google"]} onClick={(elem)=>copy("google")} data-clipboard-text="sidstab20s@gmail.com"/>
            <FontAwesomeIcon className="clr-wht fs-m hov ml-10 mr-10" icon={["fab","linkedin"]} onClick={(elem)=>copy("linked")}/>
            <FontAwesomeIcon className="clr-wht fs-m hov" icon={["fab","facebook"]} onClick={(elem)=>copy("fb")}/>
          </div>

          <div className="clr-m flex jc-ce al-ce p-10 w-50 brd-15 none" id="alert">
            <p className="lato bold clr-wht">Copied to Clipboard!</p>
            <FontAwesomeIcon icon="times-circle" className="ml-auto clr-wht" onClick={(elem)=>copy("google","exit")}/>
          </div>

        </div>
      }

    </div>   
  );
}

/* Component displayed on App (App, Description / contact is shown) */

function About(props) {

  const [cur,updCur] = useState({
    abt:true,
    des:false,
    cont:false,
  })

  const mobile = useMediaQuery({
   query: '(max-width: 800px)'
  })

  return (
      <div className="w-auto mr-5 ml-5 h-vh">
        {!mobile&&<Nav upd={updCur} cur={cur} mobile={mobile}/>}
        <Router>
        {
          mobile?
          <div className="h-auto flex over-hide flx-col">
              <Greet cur={cur} view={props.updView} upd={updCur} test={cur} mobile={mobile}/>
              
              <div className="flex flx-col p-20 sn-ce" id="des-head">
                <h2 className="lato bold w-100 clr-wht txt-ce">Designs</h2>
                <p className="lato clr-wht w-100 txt-ce mt-2">These are my best design sketches and designs that were commercialized, mostly under carolyn kinder international.</p>
                {props.filt&&
                  <div className="flex w-100 mt-5 jc-ce al-ce clr-wht trans fade">
                    <h4 className="lato clr-wht bold w-50 fadeInRight">Adjust Display</h4>
                    <div className="flex ml-auto w-50 jc-e fadeInRight">
                      <FontAwesomeIcon className="clr-wht mr-5" icon="align-justify" onClick={()=>disp("flx")}/>
                      <FontAwesomeIcon className="clr-wht" icon="th-large" onClick={()=>disp("grd")}/>
                    </div>
                  </div>
                }
              </div>

              <Grid view={props.view} mod={props.showMod} mobile={mobile}/>
          </div>
          :
          <div className="h-100 flex over-hide sn-ce" id="scroll">
            <Route path="/" exact>
              <div className="wheel w-50 pos-rel flex over-hide p-20 wrap">
                <Wheel/>
              </div>
            </Route>
            <Route path="/des">
              <Grid view={props.view} mod={props.showMod}/>
            </Route>
            <Greet cur={cur} view={props.updView} upd={updCur} test={cur}/>
          </div>
        }
        </Router>
      </div>
  );
}

export default About;