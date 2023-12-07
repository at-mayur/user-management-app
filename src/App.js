import { useEffect, useState } from 'react';
import './App.css';
import User from './user';
import { createUser, deleteUser, getAllUsers, searchByName } from './fetchData';

function App() {

  const [searchStr, setSearchStr] = useState("");
  const [formDisplay, setFormDisplay] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState([]);
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      let userListData = await getAllUsers();

      setUserList(userListData);
    };

    fetchData();
    
  }, []);

  const createUserAction = async (event) => {
    event.preventDefault();
    if(password.length<8){
      alert("Password too small..!!");
      return;
    }
    if(password!==confPassword){
      alert("Password and Confirm password do not match");
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
    
    const usrCreationMsg = await createUser(newUser);
    alert(usrCreationMsg);


    let userListData = await getAllUsers();
    setUserList(userListData);
  };

  const userSearchAction = async () => {
    let userListData = await searchByName(searchStr);
    setUserList(userListData);
  };

  const deleteUserAction = async (id) => {
        const isUserDeleted = await deleteUser(id);

        if(isUserDeleted){
          let userListData = await getAllUsers();
          setUserList(userListData);
        }
  };

  const getAllSelectedOptions = (event) => {
    const multiOptions = Array.from(event.target.selectedOptions);
    const multiValues = multiOptions.map((option) => {
      return option.value;
    });

    setRole(multiValues);
  };

  return (
    <div className="App overScroll">
      <header className="App-header">
        <h4>User List</h4>
        <div className='user-list-header'>
          <div className='create-search-actions'>
            <div className='search-action'>
              <input onChange={(event) => {setSearchStr(event.target.value)}} type='text' placeholder='Search User' />
              <button onClick={userSearchAction} type='button'>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className='create-action'>
              <button type='button' onClick={() => {setFormDisplay(!formDisplay)}}>
                <span><i className="fa-solid fa-user-plus"></i></span>
                <span>Create User</span>
              </button>
            </div>
          </div>

          { formDisplay ? (
            <div className='create-user-form'>
              <form onSubmit={createUserAction}>
                <div>
                  <label htmlFor='userName'>User Name</label>
                  <input onChange={(event) => {setUserName(event.target.value)}} id='userName' type='text' required />
                </div>

                <div>
                  <label htmlFor='userEmail'>Email</label>
                  <input onChange={(event) => {setEmail(event.target.value)}} id='userEmail' type='email' required />
                </div>

                <div>
                  <label htmlFor='userPasswd'>Password</label>
                  <input onChange={(event) => {setPassword(event.target.value)}} id='userPasswd' type='password' required />
                </div>

                <div>
                  <label htmlFor='userConfPasswd'>Confirm Password</label>
                  <input onChange={(event) => {setConfPassword(event.target.value)}} id='userConfPasswd' type='password' required />
                </div>
                
                <div>
                  <label htmlFor='userContact'>Contact No.</label>
                  <input onChange={(event) => {setContact(event.target.value)}} id='userContact' type='tel' />
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

                <button type='submit'>Add User</button>
              </form>
            </div>
          ) : "" }
          
        </div>
      </header>

      <main>
        <div className='user-list-titles'>
          <p>User ID</p>
          <p>Name</p>
          <p>Email</p>
          <p>Contact</p>
          <p>Role</p>
          <p>Position</p>
          <p>Edit</p>
        </div>

        <div className='user-list overScroll'>
          {
            userList.map((user) => {
              return <User userProp={user} delUser={deleteUserAction} key={user.userId} />
            })
          }
        </div>
      </main>
    </div>
  );
}

export default App;
