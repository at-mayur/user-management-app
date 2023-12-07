import { useState } from "react";
import userStyles from "./userStyles.module.css";
import { updateUser } from "./fetchData";

function User(props) {

    const [formDisplay, setFormDisplay] = useState(false);

    const [userName, setUserName] = useState(props.userProp.userName);
    const [email, setEmail] = useState(props.userProp.userEmail);
    const [contact, setContact] = useState(props.userProp.userContact);
    const [role, setRole] = useState(props.userProp.userRole.split("_"));
    const [position, setPosition] = useState(props.userProp.userPosition);
    const [password, setPassword] = useState("");

    const updateAction = async (event) => {
        event.preventDefault();
        if(password.length<8){
            alert("Password too small..!!");
            return;
        }
        const newUser = {
            "userName": userName,
            "userEmail": email,
            "userContact": contact,
            "userPosition": position,
            "userRole": role.join("_"),
            "userPassword": password
        };

        let userUpdateResult = await updateUser(props.userProp.userId, newUser);
        if(userUpdateResult && userUpdateResult.isUpdated){
            if(userUpdateResult.user){
                setUserName(userUpdateResult.user.userName);
                setEmail(userUpdateResult.user.userEmail);
                setContact(userUpdateResult.user.userContact);
                setRole(userUpdateResult.user.userRole);
                setPosition(userUpdateResult.user.userPosition);
            }
        }

        setFormDisplay(false);
    };


    const getAllSelectedOptions = (event) => {
        const multiOptions = Array.from(event.target.selectedOptions);
        const multiValues = multiOptions.map((option) => {
            return option.value;
        });

        setRole(multiValues);
    };

    return (

        <div className={userStyles.userContainer}>

            <div className={userStyles.userDetails}>
                <p>{props.userProp.userId}</p>
                <p>{userName}</p>
                <p>{email}</p>
                <p>{contact}</p>
                <p>{role.join(", ")}</p>
                <p>{position}</p>
                <div className={userStyles.userActions}>
                    <span onClick={() => { setFormDisplay(!formDisplay) }} className={userStyles.edit}><i className="fa-solid fa-user-pen"></i></span>
                    <span onClick={props.delUser} className={userStyles.delete}><i className="fa-solid fa-trash"></i></span>
                </div>
            </div>

            {
                formDisplay ? (
                    <div className={userStyles.updateUserForm}>
                        <form onSubmit={updateAction}>
                            <div>
                                <label htmlFor='userName'>User Name</label>
                                <input value={userName} onChange={(event) => {setUserName(event.target.value)}} id='userName' type='text' required />
                            </div>

                            <div>
                                <label htmlFor='userEmail'>Email</label>
                                <input value={email} onChange={(event) => {setEmail(event.target.value)}} id='userEmail' type='email' required />
                            </div>

                            <div>
                                <label htmlFor='userPasswd'>Password</label>
                                <input onChange={(event) => {setPassword(event.target.value)}} id='userPasswd' type='password' required />
                            </div>
                            
                            <div>
                                <label htmlFor='userContact'>Contact No.</label>
                                <input value={contact} onChange={(event) => {setContact(event.target.value)}} id='userContact' type='tel' />
                            </div>

                            <div>
                                <label htmlFor='userRole'>Role</label>
                                <select onChange={getAllSelectedOptions} id='userRole' multiple required>
                                <option value={'Administrator'}>Administrator</option>
                                <option value={'Support'}>Support</option>
                                <option value={'Assistant'}>Assistant</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor='userPosition'>Position</label>
                                <select onChange={(event) => {setPosition(event.target.value)}} id='userPosition' required>
                                <option value={'Auditor'}>Auditor</option>
                                <option value={'Administrator'}>Administrator</option>
                                <option value={'Developer'}>Developer</option>
                                <option value={'Manager'}>Manager</option>
                                </select>
                            </div>

                            <button type='submit'>Update User</button>
                        </form>
                    </div>
                ) : ""
            }

        </div>
        
    );
}

export default User;