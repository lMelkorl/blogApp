import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Context } from "../Context/Context";
import "./Write.css";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cats,setCats] = useState([]);
  const [catDisabled,setCatDisabled] = useState(true);

  const { user } = useContext(Context);

  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    }
    fetchCats();
  }, []);

  const handleCat = () =>{
    setCatDisabled(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: [
        document.getElementById("categorySelect1").value,
        document.getElementById("categorySelect2").value
    ]
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };


  return (
    <Container className="container">
      <div className="write">
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon far fa-images"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <input
              className="writeInput"
              type="text"
              placeholder="Başlık"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <button className="writeSubmit btn btn-success" type="submit">
              Yayınla
            </button>
          </div>
          <div className="selectCat">
              <select id="categorySelect1" onChange={handleCat} className="form-select-sm" required>
              <option value={""}>Kategori 1</option>
              {cats.map(c=>(
              <option value={c.name}>{c.name}</option>
              ))}
            </select>
            <select id="categorySelect2" className="form-select-sm" disabled={catDisabled}>
              <option value={""}>Kategori 2</option>
              {cats.map(c=>(
              <option value={catDisabled ? "" : c.name}>{catDisabled ? "Kategori 2" : c.name}</option>
              ))}
            </select>
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Konuyu yazın..."
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              required
            ></textarea>
          </div>
        </form>
      </div>
    </Container>
  );
}
