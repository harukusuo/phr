import "../styles/Header.css";
import { useNavigate } from 'react-router-dom';


const Header = ({ text, hasBackButton = true }) => {

    const navigate = useNavigate();

    return (
        <header className="header">
            {hasBackButton ? <button className="backButton" onClick={() => navigate(-1)}>&#8592;</button> : null}
            <h1 className="headerText">{text}</h1>
        </header>
    );
}

export default Header;