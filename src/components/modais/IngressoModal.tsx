import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "../button/Button";
import { DivContainer, ItemsFormContainer } from "./Estilo.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { Select } from "../select/Select";
import { Tipo } from "./TipoModal";
import { auth } from "../auth/auth";
import { Categorium } from "./CategoriaModal";

interface IngressoModalProps {
  closeModal: Function;
  userData?: Ingresso;
}


export type Ingresso = {
  id: number;
  date: string;
  valor: string;
  tipo_id: number;
  categoria_id: number;
  Tipo: Tipo;
  Categorium: Categorium ;
  

};

export function IngressoModal({ closeModal, userData }: IngressoModalProps) {
  const methods = useForm<Ingresso>({
    defaultValues: {
      date: "",
      valor: "",
      tipo_id: undefined,
      categoria_id: undefined,

    },
  });

  const { handleSubmit, formState, setValue, getValues, watch } = methods;


  const [tipos, setTipos] = useState(undefined);
  const [categorias, setCategorias] = useState(undefined);

  const tipoId = watch("tipo_id");
  watch("categoria_id");

  useEffect(() => {
    async function getData() {
      await axios.get(`${auth.CONEXAO}/tipos`).then((response) => {
        setTipos(response.data);
      });
    }
    getData();
  }, []);


  useEffect(() => {
    async function getData() {
      await axios.get(`${auth.CONEXAO}/categorias`).then((response) => {
        setCategorias(response.data);
      });
    }
    getData();
  }, []);

  console.log(formState);

  useEffect(() => {
    if (userData) {
      setValue("date", userData.date);
      setValue("valor", userData.valor);
      setValue("tipo_id", userData.tipo_id);
      setValue("categoria_id", userData.categoria_id);


    }
  }, [userData]);

  const { errors } = formState;

  async function handleCrateNewUser(data: Ingresso) {
    console.log("acessou");
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`${auth.CONEXAO}/ingressos/${userData.id}`, {
          date: data.date,
          valor: data.valor,
          tipo_id: data.tipo_id,
          categoria_id: data.categoria_id,


        });

        toast.success("Ingresso editado com sucesso!");
      } else {
        await axios.post(`${auth.CONEXAO}/ingressos`, {
          date: data.date,
          valor: data.valor,
          tipo_id: data.tipo_id,
          categoria_id: data.categoria_id,


        });

        toast.success("ingresso gerado");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao gerar novo ingresso");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="Data" id="date" errorMessage={errors.date?.message} />
          <Input label="Valor" id="valor" errorMessage={errors.valor?.message} />
          <Select
            label={"Tipo"}
            id={"tipo_id"}
            errorMessage={errors.tipo_id?.message}
            data={tipos}
          />
          <Select
            label={"Categoria"}
            id={"categoria_id"}
            errorMessage={errors.categoria_id?.message}
            data={categorias}
          />

          <Button label="Gerar" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}