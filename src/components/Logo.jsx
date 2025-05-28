import logo from '../assets/logo.png';

function Logo({width = 25}) {
  return (
    <div>
        <img src={logo} alt="Chat App" className={`w-${width}`}/>
    </div>
  )
}

export default Logo;