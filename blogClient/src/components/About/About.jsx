/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/alt-text */
import "./About.css";

export default function About() {
  return (
    //https://pbs.twimg.com/media/EfEnrWJWAAA4YIe.jpg
    <div className="about container">
      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">
            Hakkımda <span class="text-muted">-Kimim ?</span>
          </h2>
          <p class="lead">
            Asırlardır kayıp olan yüzük bulunur ve kaderin garip bir cilvesi
            sonucu, küçük bir Hobbit olan Frodonun eline geçer. İhtiyar Gandalf,
            bu yüzüğün Kara Lord Saurona ait özel yüzük olduğunu anlar. Frodonun
            yapması gereken, Kıyametin Çatlakları olarak anılan diyara dalarak
            epik bir mücadeleye girişmek ve bu yüzüğü ebediyen ortadan
            kaldırmaktır.
          </p>
        </div>
        <div class="col-md-5">
          <img
            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto aboutImg"
            src="https://pbs.twimg.com/media/EfEnrWJWAAA4YIe.jpg"
            focusable="false"
            role="img"
          />
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-7 order-md-2">
          <h2 class="featurette-heading">
            Hakkımda2 <span class="text-muted">-Kimim2</span>
          </h2>
          <p class="lead">
            Yüzüklerin Efendisi serisinin ikinci filmi olan iki kule filmi 2002
            yılında yayınlanmış ver dönemin gişe rekorlarını alt üst etmiş bir
            yapımdır. Filmde orta dünya'da unutulan yeni ırklar kardeşlik
            bozulup herkesin yoluna gitmesi konu alınıyor. Yüzüğü yüzüğün
            kötülük dolu merkezine götürmeleri gerekmektedir. Frodo ve sam'de
            ona eşlik edeceklerdir yolda saruhanla karşılacaklardır. Bitmek
            bilmeyen yolculukları konu alınan muhteşem bir film sizlerle.
          </p>
        </div>
        <div class="col-md-5 order-md-1">
          <img
            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto aboutImg"
            src="https://pbs.twimg.com/media/EqBZR4AWMAUCszR.jpg"
            focusable="false"
            role="img"
          >
          </img>
        </div>
      </div>
    </div>
  );
}
