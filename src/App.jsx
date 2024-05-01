import {useState, useEffect} from "react";
import personService from "./services/persons";
import loginService from "./services/login";
import Navbar from "./components/Navbar";
import PersonList from "./components/PersonList";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import LoginForm from "./components/LoginForm";
import Hero from "./components/Hero";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    personService.getAll().then(initialName => setPersons(initialName));
  }, [user]);

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      personService.setToken(user.token);
    }
  }, []);

  // event handlers

  const submitHandler = event => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      const id = persons.find(person => person.name === newName).id;

      confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
        ? personService
            .update(id, {
              name: newName,
              number: newNumber,
            })
            .then(changedPerson => {
              setPersons(persons.map(p => (p.id !== id ? p : changedPerson)));
              setNewName("");
              setNewNumber("");
              setErrorMessage(`${newName}'s old number has changed`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);
            })
            .catch(error => {
              setErrorMessage(error.response.data.error);
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);
            })
        : null;
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then(initialName => {
        setPersons(persons.concat(initialName));
        setNewName("");
        setNewNumber("");
        setErrorMessage(`${newName} is added`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        console.log(error.response.data.error);
      });
  };

  const deleteHandler = id => {
    confirm(`Delete ${persons.find(person => person.id === id).name}?`)
      ? personService.deletePerson(id).then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== id));
          setErrorMessage(`${deletedPerson.name} has been deleted`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        })
      : null;
  };

  const nameChangeHandler = event => {
    setNewName(event.target.value);
  };

  const numberChangeHandler = event => {
    setNewNumber(event.target.value);
  };

  const searchHandler = event => {
    const search = event.target.value;
    setSearch(search);
  };

  const usernameChangeHandler = event => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = event => {
    setPassword(event.target.value);
  };

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));

      personService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage("null");
      }, 5000);
    }
  };

  // const loginForm = () => {
  //   const hideWhenVisible = {display: loginVisible ? "none" : ""};
  //   const showWhenVisible = {display: loginVisible ? "" : "none"};
  // };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div className="App">
      <Navbar onSearch={searchHandler} onClick={handleLogout} user={user} />
      {/* person form */}
      {user === null ? (
        <div className="first">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            usernameChangeHandler={usernameChangeHandler}
            password={password}
            passwordChangeHandler={passwordChangeHandler}
            message={errorMessage}
          />
        </div>
      ) : (
        <div className="second">
          <Hero user={user} />
          <PersonForm
            submitHandler={submitHandler}
            newName={newName}
            nameChangeHandler={nameChangeHandler}
            newNumber={newNumber}
            numberChangeHandler={numberChangeHandler}
          />
          {/* notification */}
          <Notification message={errorMessage} />
          {/* number lists */}
          <PersonList persons={filteredPersons} onDelete={deleteHandler} />
          {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
      )}
    </div>
  );
}

export default App;
