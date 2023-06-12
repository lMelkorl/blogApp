import './NotFound.css'

export default function NotFound() {
    return (
        <div className="notFound container text-center"> 
        <i class="notFoundIcon fa fa-ban"></i>
        <br />
        <h2>Sayfa Bulunamadı</h2>
        <button onClick={()=>window.location.href="/"}className="btn btn-outline-secondary">Eve dön</button>
        <br />
        </div>
    )
}
