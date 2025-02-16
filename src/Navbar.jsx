import { useState } from 'react'
// import shortly from './assets/image/Shortly.svg'
// import navbar from './assets/image/navbar1.png'
// const [opened,setOpened]=useState(false);

const Navbar=()=>{
	const [nav,showNav]=useState(false)
	const shownav=()=>{
		showNav(!nav)
	}
    return(
    <>
    <header>
			{/* <img src={shortly}/> */}
			<div className="header_wrapper">
				<nav>			
				<a href="">About</a>
				<a href="">Pricing</a>
				<a href="">Resources</a>
			</nav>
			<div className="div">
				<a href="">Login</a>
				<a href="">Sign Up</a>
			</div>
			</div>
			{/* <img src={navbar} id="navbarbtn" onClick={shownav}/> */}
			
		</header>

		<div className={`hide_nav ${ nav?'show_nav':' hide_nav'}`}>
                <a href="">About</a>
				<a href="">Pricing</a>
				<a href="">Resources</a>
                <a href="">Login</a>
				<a href="">Sign Up</a>
        </div>

    </>
    )
}
export default Navbar