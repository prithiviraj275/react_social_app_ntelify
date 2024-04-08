import {FaLaptop, FaTabletAlt,FaMobileAlt} from 'react-icons/fa';

const Header = (props) => {
  return (
    <header className='Header'>
        <h1>{props.title}</h1>
        {props.width < 768 ? <FaMobileAlt />
          : props.width < 992 ? <FaTabletAlt />
          : <FaLaptop/> }
      
    </header>
  )
}

export default Header