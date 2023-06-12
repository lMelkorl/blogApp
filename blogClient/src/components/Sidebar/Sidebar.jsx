/* eslint-disable jsx-a11y/anchor-has-content */
import "./Sidebar.css";
import { Toast, ToastBody, ToastHeader, CardImg, Container } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="p-3 my-2 rounded">
        <Toast>
          <ToastHeader style={{ justifyContent: "center", fontSize: "1rem" }}>
            <i class="fas fa-address-card"></i>
            Hakkımda
          </ToastHeader>
          <ToastBody>
            <Container>
              <CardImg
                width="100%"
                src="https://i4.hurimg.com/i/hurriyet/75/750x422/591be2e20f2544302cc7e834.jpg"
                alt=""
              />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              harum praesentium corporis beatae atque reprehenderit in delectus
              quis qui animi quae, cupiditate tenetur aspernatur perspiciatis
              nesciunt! Aperiam aspernatur iusto natus reiciendis, neque
              assumenda quidem doloribus nihil consequatur culpa deleniti eaque
              at voluptate accusamus laboriosam voluptatem, magnam beatae iste!
              Placeat, dolore.
              <hr />
              <div className="sidebarItem">
                <h5 className="text-center">Kategori</h5>
                <ul className="sidebarList">
                  {cats.map((c) => (
                    <Link
                      to={`/?cat=${c.name}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <li className="sidebarListItem">{c.name}</li>
                    </Link>
                  ))}
                </ul>
              </div>
              <hr />
              <h5 className="text-center">Takip Et</h5>
              <hr />
              <div className="sidebarItem">
                <div className="sidebarSocial">
                  <a
                    href="https://www.instagram.com/kensriii?utm_medium=copy_link"
                    class="sidebarIcon fab fa-instagram"
                  ></a>
                  <a
                    href="https://github.com/lMelkorl"
                    class="sidebarIcon fab fa-github"
                  ></a>
                </div>
              </div>
            </Container>
          </ToastBody>
        </Toast>
      </div>
    </div>
  );
}
