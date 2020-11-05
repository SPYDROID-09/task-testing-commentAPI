import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/home'
import Signin from './components/signin'
import Menu from './components/menu'
import Signup from './components/signup';
import {reducer,initialState} from './reducer/userReducer'
export const UserContext = createContext()


const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" >
      <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/menu">
        <Menu/>
      </Route>
      
      
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;