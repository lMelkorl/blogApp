import Home from "./components/Pages/Home/Home";
import Topbar from "./components/Topbar/Topbar";
import Single from './components/Single/Single';
import Write from "./components/Write/Write";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {Switch,Route} from 'react-router-dom';
import { useContext } from "react";
import { Context } from "./components/Context/Context";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import TopButton from "./components/TopButton/TopButton";

function App() {
  const {user} = useContext(Context); 
  
  return (
    <>
      <Topbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/register" exact component={user ? Home : Register }/>
        <Route path="/login" exact component={user ? Home : Login }/>
        <Route path="/write" exact component={user ? Write : Register }/>
        <Route path="/settings" exact component={user ? Settings : Register }/>
        <Route path="/post/:postId" exact component={Single}/>
        <Route path="/about" exact component={About}/>
        <Route path="/contact" exact component={Contact}/>
        <Route exact component={NotFound}/>
      </Switch>
      <TopButton/>
      <Footer/>
    </>
  );
}

export default App;
