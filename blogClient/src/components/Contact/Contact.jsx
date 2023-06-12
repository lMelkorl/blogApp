/* eslint-disable jsx-a11y/anchor-has-content */
import "./Contact.css";
import { Card, CardTitle, CardImg, CardImgOverlay } from "reactstrap";

export default function Contact() {
  return (
    <>
      <Card inverse>
        <CardImg
          src="https://www.teahub.io/photos/full/59-593917_spacex-dragon-capsule-uhd-4k-wallpaper-spacex-dragon.jpg"
          className="dragonImg"
        />
        <CardImgOverlay>
          <div className="contact">
            <div className="socialMedia">
              <a
                href="https://www.instagram.com/kensriii?utm_medium=copy_link"
                className="fab fa-instagram"
              ></a>
              <CardTitle tag="h2">Bana Instagramdan ulaşabilirsiniz 👍</CardTitle>
              <br />
              <a
                href="https://github.com/lMelkorl"
                className="fab fa-github"
              ></a>
              <CardTitle tag="h2">Github hesabım 👨‍💼</CardTitle>
            </div>
          </div>
        </CardImgOverlay>
      </Card>
    </>
  );
}
