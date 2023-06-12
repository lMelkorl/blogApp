/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Footer() {
  return (
    // style={{marginTop:"calc(100vh - 50px)"}}
    <div >
      <footer className="bg-light text-center text-white">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <a
              className="btn btn-primary btn-floating m-1"
              style={{backgroundColor: '#ac2bac'}}
              href="https://www.instagram.com/kensriii?utm_medium=copy_link"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-primary btn-floating m-1"
              style={{backgroundColor: '#0082ca'}}
              href="#!"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              className="btn btn-primary btn-floating m-1"
              style={{backgroundColor: '#333333'}}
              href="https://github.com/lMelkorl"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>
        <div
          className="text-center p-3"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
        >
          © 2020 Copyright: 
          <a className="text-white" href="#">
              MelkorBlog.com
          </a>
        </div>
      </footer>
    </div>
  );
}
