import { Box, Container, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import Header from "lib/layout/Header";
import MusicBar from "./MusicBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <Box position="relative" transition="0.5s ease-out">
      <Header />
      <Box mb="150">{children}</Box>
      <MusicBar />
    </Box>
  );
};

export default Layout;
