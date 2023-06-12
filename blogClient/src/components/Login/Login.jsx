import alertify from "alertifyjs";
import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../Context/Context";
import "./Login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();

  const {dispatch, isFetching} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      alertify.error("Doğru bilgileri girdiğinizden emin olun !");
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Giriş Yap</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Kullanıcı Adı</label>
        <input
          className="loginInput"
          type="text"
          ref={userRef}
          placeholder="Kullanıcı Adı Giriniz..."
        />
        <label>Şifre</label>
        <input
          className="loginInput"
          type="password"
          ref={passwordRef}
          placeholder="Şifre Giriniz..."
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Giriş Yap
        </button>
      </form>
      <small className="form-text text-muted">
        Bir hesabın yok mu?{" "}
        <a href="/register" className="registerInfo form-text text-info"> Kayıt Ol</a>
      </small>
    </div>
  );
}
