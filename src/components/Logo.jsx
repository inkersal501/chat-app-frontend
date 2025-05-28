import logo from '../assets/logo-app.png';

function Logo({width = 25}) {
  return (
    <div>
        <img src={logo} alt="Chat App" className={`w-${width}`}/>
    </div>
  )
}

export default Logo;