import "./Navbar.css";

import vivLogo from  '../Navbar/image/logoIcon.svg';
import schedule from "../Navbar/image/scheduleIcon.svg";
import summary from '../Sidebar/images/summaryicon.png';
import tip from '../../../assets/tip-topic.png'
import loginIcon from '../Navbar/image/loginIcon.png'
import { NavLink } from "react-router-dom";
import { getToken, logout } from '../../Login/services/auth';
import { useNavigate} from 'react-router-dom'

const Navbar = () => {

    //for redirect to another page
    const navigate = useNavigate();
    
    return (
        <div className="Navbar-container">
            <NavLink to="/">
            <div className="logo">
                
                <img id="logoIcon" src={vivLogo} alt="logo icon" />
                {/* link Page1 */}
                    <h2 id="text-viv">Viv Application</h2>
                    
            </div>
            </NavLink>

            <NavLink to="/schedule">
            <div className="schedule"> 
                <img id="scheduleIcon" src={schedule} alt="schedule icon" />
                {/* link schedule page */}
                <h3 id="text-schedule">Schedule</h3>
            </div>
            </NavLink>

            {/* link to tip to the source page?? */}

            <NavLink to="/tip" id="restip">
            <div className="tip"> 
                <img id="tipIcon" src={tip} alt="tip icon" />
                {/* link tip page */}
                <h3 id="text-tip">Tips</h3>
            </div>
            </NavLink>

            <NavLink to="/summary-Month" id="ressummary">
            <div className="summary"> 
                <img id="summaryIcon" src={summary} alt="summary icon" />
                {/* link summary page */}
                <h3 id="text-summary">Summary</h3>
            </div>
            </NavLink>
            {getToken() && (
                        <div class="logout">
                            <button onClick={()=>logout(()=>navigate("/"))}>
                            <img id="loginIcon" src={loginIcon} alt="logout icon" />
                                <p>Logout</p>
                            </button>
                        </div>
                    )}
            {!getToken() && (
                        <div class="login">
                            <button onClick={() => navigate("/login")}>
                            <img id="loginIcon" src={loginIcon} alt="login icon" />
                                <p>Login</p>
                            </button>
                        </div>
                    )}

        </div>
    );

}

export default Navbar;