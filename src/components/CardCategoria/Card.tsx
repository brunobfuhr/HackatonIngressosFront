import styles from "./Card.module.css";
import { CardInfo } from "../CardInfo";
import axios from "axios";
import { ContentContainer, DivContainer, Edit, Remove } from "../Cards.styles";
import { AppWindow, Pencil, Trash } from "phosphor-react";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Categoria, CategoriaModal } from "../modais/CategoriaModal";
import { auth } from "../auth/auth";



interface CardProps {
  data: Categoria;
}



export function Card({ data }: CardProps) {
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Editar Tipo</strong>,
      html: <CategoriaModal closeModal={MySwal.close} userData={data} />,
      showConfirmButton: false,
    }).then(() => window.location.reload());
  };


  const fDelete = async (id:any) => {
    if (!confirm('Confirma a exclusão?'))
    {
     return;
    }

    
     axios.delete(` ${auth.CONEXAO}/categorias/` + data.id)
         .then((response) => {
             Swal.fire(`Categoria ${data.id} deletado`);
         }, (error) => {
             Swal.fire(`Erro ao deletar categoria: ${error.response.data.error} `);
         });
 };


  return (
    <DivContainer>
      <ContentContainer>
        <strong>{data.id}</strong>

        <CardInfo title="Descrição" data={data.descricao} />
        <CardInfo title="Preço" data={data.preco} />
        
      

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