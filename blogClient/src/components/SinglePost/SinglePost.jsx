import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./SinglePost.css";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import Comment from "../Comment/Comment";

export default function SinglePost() {
  const PF = process.env.PF;
  const [post, setpost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const { user } = useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setpost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,title,desc
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="container singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            <div className="singlePostEdit">
                <span style={{fontFamily:'Helvetica',cursor:'pointer'}}>
                    {post.views} 	&nbsp;
                   <i className="fas fa-eye"></i>
                  </span>
            {post.username === user?.username && (
              <>
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fas fa-trash"
                  onClick={handleDelete}
                ></i>
                </>
                )}
                </div>
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Sahibi:
            <Link
              to={`/?user=${post.username}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toLocaleDateString("tr-TR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        <br />
        {updateMode && (  
        <button className="singlePostButton" onClick={handleUpdate}>
          Güncelle
        </button>
        )}
      </div>
      <Comment/>
    </div>
  );
}
