import styles from "./Card.module.css";
import { CardInfo } from "../CardInfo";
import axios from "axios";
import { ContentContainer, DivContainer, Edit, Remove } from "../Cards.styles";
import { AppWindow, Pencil, Trash } from "phosphor-react";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Ingresso, IngressoModal } from "../modais/IngressoModal";
import { auth } from "../auth/auth";



interface CardProps {
  data: Ingresso;
}



export function Card({ data }: CardProps) {
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Editar Ingresso</strong>,
      html: <IngressoModal closeModal={MySwal.close} userData={data} />,
      showConfirmButton: false,
    }).then(() => window.location.reload());
  };


  const fDelete = async (id:any) => {
    if (!confirm('Confirma a exclusão?'))
    {
     return;
    }
     axios.delete(` ${auth.CONEXAO}/ingressos/` + data.id)
         .then((response) => {
             Swal.fire(`Ingresso ${data.id} deletado`);
         }, (error) => {
             Swal.fire(`Erro ao deletar Ingresso: ${error.response.data.error} `);
         });
 };

console.log(data.Categorium.descricao)
// console.log(data.Categorium)

  return (
    <DivContainer>
      <ContentContainer>
        <strong>{data.id}</strong>

        <CardInfo title="Data" data={data.date} />
        <CardInfo title="Valor" data={data.valor} />
        <CardInfo title="Tipo" data={data.Tipo.descricao} />
        {/* <CardInfo title="Categoria" data={data.Categorium.descricao} /> */}
     
      

        <Edit title="Editar" onClick={showSwal}>
          {<Pencil size={32} />}
        </Edit>
        <Remove title="Excluir" onClick={fDelete} >
          {<Trash size={32} />}
        </Remove>
      </ContentContainer>
    </DivContainer>
  );
}