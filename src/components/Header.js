import "../styles/Header.css";
import { useNavigate, useLocation } from 'react-router-dom';


const Header = ({ text, hasBackButton = true }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const target = location.state && location.state.from ? location.state.from : -1;

    return (
        <header className="header">
            {hasBackButton ? <button className="backButton" onClick={() => navigate(target)}>&#8592;</button> : null}
            <h1 className="headerText">{text}</h1>
        </header>
    );
}

export default Header;