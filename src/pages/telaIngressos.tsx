import { Header } from "../components/Header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Pencil } from "phosphor-react";
import { Menu } from "../components/Menu";
import { MainContainer } from "./telaIngressos.styles";
import { Button } from "../components/button/Button";
import { Card } from "../components/CardIngresso/Card";
import { IngressoModal, Ingresso } from "../components/modais/IngressoModal";
import { auth } from "../components/auth/auth";


export function TelaIngressos() {
  const MySwal = withReactContent(Swal);
  const [userList, setUserList] = useState<Ingresso[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Ingresso[]>(`${auth.CONEXAO}/ingressos`).then((response) => {
      setUserList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Cadastrar Ingresso</strong>,
      html: <IngressoModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };


  const gerarPdf = () => {
    window.location.href=`${auth.CONEXAO}/ingressos/pdf`;
      }
    
  

  return (
    <div>
      <Header label="Ingressos" />
      
      <MainContainer>
        <Button label="Gerar" width={90} height={50} onClick={showSwal} />
        {userList.map((tarefa) => {
          return <Card data={tarefa} />;
        })}
        <Button label="Gerar Pdf"  width={90} height={50} onClick={gerarPdf} />
       
      </MainContainer>
    </div>
  );
}