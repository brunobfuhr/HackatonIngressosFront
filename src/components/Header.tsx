import { FormEvent, useContext } from "react";

import { User } from "phosphor-react";
import {
  ContentContainer,
  SidebarContainer,
  UserContainer,
  UserData,
} from "./Header.styles";
import { Button } from "./button/Button";

interface SidebarProps {
  label: string;
}

export function Header({ label }: SidebarProps) {
 

  return (
    <SidebarContainer>
      <ContentContainer>
        <h1>{label}</h1>
        <UserContainer>
          
        </UserContainer>
      </ContentContainer>
    </SidebarContainer>
  );
}