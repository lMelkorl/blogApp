import "./Comment.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
} from "reactstrap";
import { Context } from "../Context/Context";
import defaultPP from "../defaultPP/default.png";

export default function Comment() {
  const PF = process.env.PF;
  const PN = process.env.PN;
  
  const { user } = useContext(Context);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(`/posts/${path}/comments`);
      setAllComments(res.data);
    };
    getComments();
  });

  const addComment = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        let infos = {
          username: user.username,
          content: comment,
          profilePic: user.profilePic,
        };
        await axios.put(`/posts/${path}/comments`, infos);
        setUpdateMode(false);
        window.location.reload();
      } catch (err) {}
    } else {
      window.location.replace("/login");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${path}/comments/${id}/delete`);
      window.location.reload();
    } catch (err) {}
  };

  // const updateComment = async (e,id) =>{
  //   try {
  //     e.preventDefault();
  //     await axios.put(`/posts/${path}/comments/${id}/update`,{
  //       username: user.username,
  //       content: comment
  //     });
  //     window.location.reload();
  //   } catch (err){}
  // }

  return (
    <div className="container mb-5">
      <Card>
        <CardBody>
          <CardTitle className="text-center" tag="h5">
            Yorumlar
          </CardTitle>
          <hr />
          {allComments.map((c) => (
            <ListGroup>
              <div className="userInfo">
                <img
                  className="userImg"
                  src={
                    c.profilePic === "default.png"
                      ? defaultPP
                      : PF + c.profilePic
                  }
                  alt=""
                  onClick={() =>
                    window.location.replace(PN + `?user=${c.username}`)
                  }
                />
                {/* <ListGroupItemHeading className="text-info" tag="h5">{c.username}</ListGroupItemHeading> */}
                <h5 class="mt-0 mb-1">{c.username}</h5>
              </div>
              <ListGroupItem>
                <ListGroupItemText>
                  {updateMode ? (
                    c.username === user?.username ? (
                      <Form>
                        <Input
                          type="textarea"
                          name="text"
                          id="text"
                          placeholder={c.content}
                          onChange={(e) => setComment(e.target.value)}
                          required={true}
                        />{" "}
                        <br />
                        <center>
                          <Button type="submit" color="info text-secondary">
                            Güncelle
                          </Button>
                        </center>
                      </Form>
                    ) : (
                      <div>{c.content}</div>
                    )
                  ) : (
                    <ListGroupItemText>
                      {c.content}
                      {c.username === user?.username && (
                        <div className="singlePostEdit">
                          {/* <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i> */}
                          <i
                            className="singlePostIcon fas fa-trash"
                            onClick={() => handleDelete(c._id)}
                          ></i>
                        </div>
                      )}
                    </ListGroupItemText>
                  )}
                </ListGroupItemText>
              </ListGroupItem>
              <br />
            </ListGroup>
          ))}
        </CardBody>
        <CardBody>
          <CardTitle tag="h5">Yorum Yap</CardTitle>
          <br />
          <Form onSubmit={(e) => addComment(e)}>
            <Row>
              <FormGroup>
                <Input
                  type="textarea"
                  id="text"
                  placeholder="Yorum giriniz..."
                  onChange={(e) => setComment(e.target.value)}
                  required={true}
                />
              </FormGroup>
            </Row>
            <br />
            <Button type="submit">Yorumu ekle</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
