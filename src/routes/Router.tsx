import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TelaCategorias } from "../pages/telaCategorias";
import { TelaIngressos } from "../pages/telaIngressos";
import { TelaTipos } from "../pages/telaTipos";
import { Home } from "../pages/Home";




export function Router() {
  
  return (
    <Routes>
       <Route path="/home" element={<Home />} />
        <Route path="/" element={<TelaIngressos />} />
        <Route path="/categorias" element={<TelaCategorias />} />
        <Route path="/tipos" element={<TelaTipos />} />
     
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


