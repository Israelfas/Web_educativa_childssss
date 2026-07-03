import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav" aria-label="Navegacion principal">
      <NavLink to="/" end>
        Actividades
      </NavLink>
      <NavLink to="/reto">Reto</NavLink>
      <NavLink to="/progreso">Progreso</NavLink>
    </nav>
  );
}
