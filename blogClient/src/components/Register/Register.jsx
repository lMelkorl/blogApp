import axios from "axios";
import { useState } from "react";
import "./Register.css";
import alertify from 'alertifyjs';

export default function Register() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  // const [error,setError] = useState(false);

  const handleSubmit = async (e)=>{
     e.preventDefault();
     try {       
       const res = await axios.post("/auth/register",{
         username,
         email,
         password
       });
       res.data && window.location.replace('/login');
     } catch (err) {
       alertify.error("Bu hesap zaten var !")
     }
    }

  return (
    <div className="register">
      <span className="registerTitle">Kayıt Ol</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Kullanıcı Adı</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Kullanıcı Adı Giriniz..."
          onChange={(e)=>setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Email Giriniz..."
          onChange={(e)=>setEmail(e.target.value)}
        />
        <label>Şifre</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Şifre Giriniz..."
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit ">Kayıt Ol</button>
      </form>
      <small className="form-text text-muted">
          Zaten bir hesabın var mı?
        <a href="/login" className="registerInfo form-text text-info"> Giriş Yap</a>
      </small>
    </div>
  );
}
