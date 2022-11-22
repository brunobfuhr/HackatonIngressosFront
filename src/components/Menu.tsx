import { User, ArrowUDownLeft, Car } from "phosphor-react";
import { Navbar } from "react-bootstrap";

import {
  ContentContainer,
  MenuContainer,
  NavbarLink,
  NavLinkContainer,
} from "./Menu.styles";

export function Menu() {
  return (
    <MenuContainer>
      <ContentContainer>
        <NavbarLink to="/home">
          <ArrowUDownLeft size={42} />

        </NavbarLink>
        {/* <Car size={52} color="#56CCF2"/> */}
        <NavLinkContainer>
          {/* <NavbarLink to="/users">
            <User size={32} />
          </NavbarLink> */}
        </NavLinkContainer>
      </ContentContainer>
    </MenuContainer>
  );
}