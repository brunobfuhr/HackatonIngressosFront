import { Header } from "../components/Header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Pencil } from "phosphor-react";
import { Menu } from "../components/Menu";
import { MainContainer } from "./telaIngressos.styles";
import { Button } from "../components/button/Button";
import { Card } from "../components/CardTipo/Card";
import { TipoModal, Tipo } from "../components/modais/TipoModal";
import { auth } from "../components/auth/auth";


export function TelaTipos() {
  const MySwal = withReactContent(Swal);
  const [userList, setUserList] = useState<Tipo[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Tipo[]>(`${auth.CONEXAO}/tipos`).then((response) => {
      setUserList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Cadastrar Tipo</strong>,
      html: <TipoModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };


  const gerarPdf = () => {
    window.location.href=`${auth.CONEXAO}/tipos/pdf`;
      }
    
  

  return (
    <div>
      <Header label="Tipos" />
      
      <MainContainer>
        <Button label="Cadastrar" width={90} height={50} onClick={showSwal} />
        {userList.map((tarefa) => {
          return <Card data={tarefa} />;
        })}
        <Button label="Gerar Pdf"  width={90} height={50} onClick={gerarPdf} />
       
      </MainContainer>
    </div>
  );
}