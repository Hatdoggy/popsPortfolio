import React,{useEffect} from 'react';
import {remove} from './functions'
import { useMediaQuery } from 'react-responsive';

const contents = [
	{
		src:'./images/img1.jpg',
		alt:'des1',
	},
	{
		src:'./images/img2.jpg',
		alt:'des2',
	},
	{
		src:'./images/img3.jpg',
		alt:'des3',
	},
	{
		src:'./images/img4.jpg',
		alt:'des4',
	},
	{
		src:'./images/img5.jpg',
		alt:'des5',
	},
	{
		src:'./images/img6.jpg',
		alt:'des6',
	},
	{
		src:'./images/img7.jpg',
		alt:'des7',
	},
]

const desData = [
	{
		src:'./images/img1.jpg',
		alt:'des1',
	},
	{
		src:'./images/img2.jpg',
		alt:'des2',
	},
	{
		src:'./images/img3.jpg',
		alt:'des3',
	},
	{
		src:'./images/img4.jpg',
		alt:'des4',
	},
	{
		src:'./images/img5.jpg',
		alt:'des5',
	},
	{
		src:'./images/img6.jpg',
		alt:'des6',
	},
	{
		src:'./images/img7.jpg',
		alt:'des7',
	},
	{
		src:'./images/img8.jpg',
		alt:'des8',
	},
]

const sktData = [
	{
		src:'./images/skt1.jpg',
		alt:'skt1',
	},
	{
		src:'./images/skt2.jpg',
		alt:'skt2',
	},
	{
		src:'./images/skt3.jpg',
		alt:'skt3',
	},
	{
		src:'./images/skt4.jpg',
		alt:'skt4',
	},
	{
		src:'./images/skt5.jpg',
		alt:'skt5',
	},
	{
		src:'./images/skt6.jpg',
		alt:'skt6',
	},
	{
		src:'./images/skt7.jpg',
		alt:'skt7',
	},
	{
		src:'./images/skt8.jpg',
		alt:'skt8',
	},
	{
		src:'./images/skt9.jpg',
		alt:'skt9',
	},
	{
		src:'./images/skt10.jpg',
		alt:'skt10',
	},
	{
		src:'./images/skt11.jpg',
		alt:'skt11',
	},
]

const Wheel = ()=>{

	useEffect(()=>{
		let disp = document.querySelectorAll('.dispImg');

		disp.forEach((elem,ndx)=>{
			elem.style.animation = `${(1+ndx/2) +"s"} fadeInLeft`;
		})
	})

	return(
		contents.map((elem,ndx)=>(
			<div key={ndx} className="dispImg over-hide mr-5">
				<img src={elem.src} alt={elem.alt} className="fit"/>				
			</div>
		))
	);
}

export default Wheel;

export const Grid = (props)=>{

	const mobile = useMediaQuery({
   		query: '(max-width: 800px)'
  	})

	const show = (val)=>{
		props.mod({
	   		show:true,
    		src:[val.src],
    		alt:[val.alt]		
		})
	}

	useEffect(()=>{
		let targets = document.querySelectorAll('.cont');
		targets.forEach((elem,ndx)=>{
			elem.style.animation = `${.5+(ndx/5)}+'s' fadeDown`;
		});
	})

	return(
		<div className={`sn-ce grid des-grid z-mid overy-flow grd-p fade`} onMouseOver={remove} id="grid">
			{props.view.img?
				desData.map((elem,ndx)=>(
					<div className={`${mobile?"mt-2":"fit"} cont hov`} key={ndx} >
						<img src={elem.src} alt={elem.alt} onClick={()=>show(elem)} className="fit hov"/>
					</div>
				))
				:
				sktData.map((elem,ndx)=>(
					<div className={`${mobile?"mt-2":"fit"} cont hov`} key={ndx} >
						<img src={elem.src} alt={elem.alt} onClick={()=>show(elem)} className="fit"/>
					</div>
				))
			}
		</div>
	);
};

export const Modal = (props)=>{

	const close = ()=>{
		props.close({
   		 show:false,
   		 src:'',
    	 alt:''			
		})
	}

	return(
		<div className="h-100 w-100 flex jc-ce al-ce modal-cont pos-fix" onClick={()=>close()}>
			<div className="modal">
				<img src={props.modal.src} className="fit" alt={props.modal.alt}/>
			</div>
		</div>
	);
}