import { useContext, useState } from "react";
import axios from "axios";
import { Container } from "reactstrap";
import { Context } from "../Context/Context";
import Sidebar from "../Sidebar/Sidebar";
import "./Settings.css";
import defaultPP from "../defaultPP/default.png";

export default function Settings() {
  const PF = process.env.PF;
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.profilePic = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${user._id}`, {
        data: { userId: user._id }
      });
      localStorage.clear();
      window.location.replace("/");
    } catch (err) {}
  };

  return (
    <div className="settings">
      <Container>
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Hesabınızı Güncelleyin</span>
            <span className="settingsDeleteTitle" onClick={handleDelete}>
              Hesabı Sil &nbsp;<i className="fas fa-trash-alt"></i>
            </span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profil Fotoğrafı</label>
            <div className="settingsPP">
              <img
            //   file ? URL.createObjectURL(file) : PF
                src={
              file ? URL.createObjectURL(file) : (
                user.profilePic === "default.png" ? defaultPP : PF + user.profilePic
              )
                }
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon fas fa-user-circle"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
                />
            </div>
            {success && (
              <div class="alert alert-success" role="alert">
                Hesap başarıyla güncellendi.
              </div>
            )}
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              required={true}
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
              />
            <label>Email</label>
            <input
              type="email"
              required={true}
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Şifre</label>
            <input
              type="password"
              required={true}
              placeholder="Yeni Şifre"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="settingsSubmit" type="submit">
              Güncelle
            </button>
            <br />
          </form>
        </div>
      </Container>
      <Sidebar />
    </div>
  );
}
