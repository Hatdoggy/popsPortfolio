import { Link as Scroll} from 'react-scroll';
import './icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Clipboard from 'clipboard';

const clicked = (disp)=>{
	let slide = document.querySelector('.slide');
	if(disp === 'des' || disp === 'cont'){		
		slide.classList.add('w-slide');
	}else{
		slide.classList.remove('w-slide');
	}
}

const dispNext = (ndx,func,targ,val)=>{
	
	if(targ==="arr"&&ndx<2){
		ndx++;
	}

	func(ndx);

	let span = document.querySelectorAll('span');
	console.log(ndx)
	span.forEach((elem)=>{	
		elem.style.backgroundColor = "white";
	})
	span[ndx].style.backgroundColor = "#f5bb40";
}

const navUpd = (val)=>{
	let nav = document.querySelectorAll('a.nav');
    let target = document.querySelector('#'+val);

    nav.forEach((elem)=>elem.style.color = 'rgba(255,255,255,0.5)');
    target.style.color = 'rgba(255,255,255,1)';
}

const adjust = ()=>{
	let greet = document.querySelector('.head');
	setTimeout(()=>greet.classList.add('no-aft'),100);
}

let cur = 0;

const change = (history,scr,upd,test)=>{

	cur += scr.deltaY;
	let dest = {
		hist:'',
		nav:''
	};
	if(cur >100){
		dest.hist = "/cont"
		dest.nav="cont"		
		adjust();
		cur = 75;
	}else if(cur > 0){
		dest.hist = "/des"
		dest.nav="des"		
		console.log(cur)
	}else{
		dest.hist = "/"
		dest.nav="abt"
	}

	upd({
     abt:false,
     des:false,
     cont:false,
     [dest.nav]:true		
	});

	clicked(dest.nav);

	history.push(dest.hist);
	navUpd(dest.nav);
}

const remove = ()=>{
  let target = document.querySelector('#root');
  target.onwheel = ''
}

const scroll = (val)=>{
	let where = document.querySelector('.'+val);
	let cont = where.parentNode;
	let span = document.querySelectorAll('span');
	
	cont.scrollLeft = where.offsetLeft;

	span.forEach((elem)=>{	
		elem.style.backgroundColor = "white";
		if(elem.id === val){
			elem.style.backgroundColor = "#f5bb40";
		}
	})
}

const horScrll = (event)=>{

	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
	let bp = vw>=740?708:324;

	let cont = document.querySelector('.scr-sm').scrollLeft;
	let span = document.querySelectorAll('span');

	span.forEach((elem)=>elem.style.backgroundColor = "white")

	if(cont>bp){
		span[2].style.backgroundColor = "#f5bb40";
	}else if(cont > 0){
		span[1].style.backgroundColor = "#f5bb40";
	}else{
		span[0].style.backgroundColor = "#f5bb40";
	}
}

const onView = (val,func)=>{
	let target = document.querySelector('#des-head').offsetTop;
	let scroll = val.target.scrollTop;
	
	if(scroll > 300){
		func(true)
	}else{
		func(false)
	}
}

const copy = (id,exit)=>{
	if(id === "google"){
		let test = new Clipboard('.google');
		let alert = document.querySelector('#alert');
		console.log(test)
		if(typeof exit === "undefined"){
			alert.style.animation = ".5s fade";
			alert.classList.remove('none');
			console.log("Hello")
		}else{
			alert.classList.add('none');
			console.log("hi")
		}

	}else if(id === "linked"){
		window.location.href = "https://www.linkedin.com/in/isidro-ondap-a780a59b/"
	}else{
		window.location.href = "https://www.facebook.com/profile.php?id=100008878831128"
	}

}

const MobNav = (props)=>{

	return(
		<nav className="flex flx-col jc-ce al-ce navi h-vh w-100 trans">
			<FontAwesomeIcon className="fade clr-wht pos-abs exit" onClick={()=>props.upd(false)} icon="times-circle"/>
      	<h2 className="fs-m fade robo">Contact Me</h2>
      	<p className="mt-5 lato clr-wht">Connect with me through the following links and social media platforms</p>
          <div className="flex fade p-20 jc-ce al-ce mt-2">
            <FontAwesomeIcon className="clr-wht fs-m google" icon={["fab","google"]} onClick={(elem)=>copy("google")} data-clipboard-text="sidstab20s@gmail.com"/>
            <FontAwesomeIcon className="clr-wht fs-m ml-10 mr-10" icon={["fab","linkedin"]} onClick={(elem)=>copy("linked")}/>
            <FontAwesomeIcon className="clr-wht fs-m" icon={["fab","facebook"]} onClick={(elem)=>copy("fb")}/>
          </div>
        <div className="clr-m flex jc-ce al-ce p-10 w-50 brd-15 none" id="alert">
           <p className="lato bold clr-wht">Copied to Clipboard!</p>
           <FontAwesomeIcon icon="times-circle" className="ml-auto clr-wht" onClick={(elem)=>copy("google","exit")}/>
        </div>
		</nav>
	)
}

const disp = (disp)=>{

	let target = document.querySelector('#grid');
	let cont;

	if(disp === "flx"){
		cont = document.querySelectorAll('.cont');

		target.classList.remove('grid','des-grid');
		target.classList.add('flex','flx-col');
		cont.forEach((elem)=>{
			elem.classList.remove('cont')
			elem.classList.add('fit')
		})
	}else{
		cont = document.querySelectorAll('#grid div.fit');
		target.classList.remove('flex','flx-col');
		target.classList.add('grid','des-grid');
		cont.forEach((elem)=>{
			elem.classList.remove('fit')
			elem.classList.add('cont')
		})
	}
}	

export {change,dispNext,adjust,navUpd,remove,scroll,horScrll,MobNav,onView,disp,copy};

export default clicked;