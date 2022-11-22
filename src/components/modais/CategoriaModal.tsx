import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "../button/Button";
import { DivContainer, ItemsFormContainer } from "./Estilo.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { auth } from "../auth/auth";


interface CategoriaModalProps {
  closeModal: Function;
  userData?: Categorium;
}


export type Categorium = {
  id: number;
  descricao: string;
  preco: string;

 
};

export function CategoriaModal({ closeModal, userData }: CategoriaModalProps) {
  const methods = useForm<Categorium>({
    defaultValues: {
        descricao: "",
        preco: "",
     
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (userData) {
      setValue("descricao", userData.descricao);
      setValue("preco", userData.preco);

      
    }
  }, [userData]);

  const { errors } = formState;

  async function handleCrateNewUser(data: Categorium) {
    console.log("acessou");
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`${auth.CONEXAO}/categorias/${userData.id}`, {
            descricao: data.descricao,
            preco: data.preco,
          
        });

        toast.success("Categoria editada com sucesso!");
      } else {
        await axios.post(`${auth.CONEXAO}/Categorias`, {
            descricao: data.descricao,
            preco: data.preco,
        
        });

        toast.success("Categoria criada");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao criar nova Categoria");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="Descrição" id="descricao" errorMessage={errors.descricao?.message} />
          <Input label="Preço" id="preco" errorMessage={errors.preco?.message} />
          

          <Button label="Criar" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}