import { Button } from "../components/button/Button";
import { Header } from "../components/Header";
import { MainContainer } from "./telaIngressos.styles";
import Nav from 'react-bootstrap/Nav';


export function Home() {
  

  return (
    <>
      <div>
      <Header label="Hackathon Ingressos" />
      
      <MainContainer>
        {/* <Button label="Ingressos" width={90} height={50} /> */}
        <Nav.Link href="/ingressos">Ingressos</Nav.Link>
        <Nav.Link href="/tipos">Tipos</Nav.Link>
        <Nav.Link href="/categorias">Categorias</Nav.Link>
        {/* <Button label="Gerar Pdf"  width={90} height={50} onClick={gerarPdf} /> */}
       
      </MainContainer>
    </div>
    </>

  );
}