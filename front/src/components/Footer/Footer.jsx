const Footer = () => {
    return (
        <footer className="py-5">
            <div className="row">
            <div className="col-6 col-md-2 mb-3">
                <h5>Nuestras Redes</h5>
                <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Youtube</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">X</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Instagram</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Facebook</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Tik Tok</a></li>
                </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
                <h5>Contáctanos</h5>
                <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Únete ahora</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Sobre nosotros</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Contacto</a></li>
                </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
                <h5>Legales</h5>
                <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Terminos y Condiciones</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Politica de Privacidad</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Defensa del Consumidor estamos</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Cómo cuidamos tu privacidad</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Ayuda</a></li>
                </ul>
            </div>

            <div className="col-md-5 offset-md-1 mb-3">
                <form>
                <h5>Suscribete a nuestro newsletter</h5>
                <p>Resumen mensual de nuestras novedades y novedades.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label htmlFor="newsletter1" className="visually-hidden">Email</label>
                    <input id="newsletter1" type="text" className="form-control" placeholder="Email address"></input>
                    <button className="btn btn-primary" type="button">Suscribirse</button>
                </div>
                </form>
            </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-center align-content-center py-4 my-4 border-top">
            <p>© 2024 AusA Company, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
                <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></a></li>
                <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></a></li>
                <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"></use></svg></a></li>
            </ul>
            </div>
        </footer>
    );
};

export default Footer
