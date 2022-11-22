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


interface TipoModalProps {
  closeModal: Function;
  userData?: Tipo;
}


export type Tipo = {
  id: number;
  descricao: string;
  percentual_ingresso: string;

 
};

export function TipoModal({ closeModal, userData }: TipoModalProps) {
  const methods = useForm<Tipo>({
    defaultValues: {
        descricao: "",
        percentual_ingresso: "",
     
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (userData) {
      setValue("descricao", userData.descricao);
      setValue("percentual_ingresso", userData.percentual_ingresso);

      
    }
  }, [userData]);

  const { errors } = formState;

  async function handleCrateNewUser(data: Tipo) {
    console.log("acessou");
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`${auth.CONEXAO}/tipos/${userData.id}`, {
            descricao: data.descricao,
            percentual_ingresso: data.percentual_ingresso,
          
        });

        toast.success("Tipo editado com sucesso!");
      } else {
        await axios.post(`${auth.CONEXAO}/tipos`, {
            descricao: data.descricao,
            percentual_ingresso: data.percentual_ingresso,
        
        });

        toast.success("Tipo criado");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao criar novo tipo");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="Descrição" id="descricao" errorMessage={errors.descricao?.message} />
          <Input label="Percentual do ingresso" id="percentual_ingresso" errorMessage={errors.percentual_ingresso?.message} />
          

          <Button label="Criar" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}