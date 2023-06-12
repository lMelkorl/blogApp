import "./Post.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../Context/Context";

export default function Post({ post }) {

  const PF = process.env.PF;
  const {user} = useContext(Context);

  const addView = async() => {
    try {
      if(user.username !== post.username){
        await axios.put(`/posts/${post._id}/view`);
      }else{
        console.log('olmuyo')
      }
    } catch (err) {}
  }

  return (
    <div className="container post">
      {post.photo && <img src={PF + post.photo} alt="" className="postImg" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span key={c} className="postCat">
              {c}
            </span>
          ))}
        </div>
        <Link
          onClick={addView}        
          to={`/post/${post._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span className="postTitle">{post.title}</span>
        </Link>
        <div className="smallInf">
        <span className="postDate">
          {new Date(post.createdAt).toLocaleDateString("tr-TR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          </span>
          <span className="postViews">
            {post.views} &nbsp;
            <i className="fas fa-eye"></i>
        </span>
        </div>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
