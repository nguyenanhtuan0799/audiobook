import { Box, Container, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import Header from "lib/layout/Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <Box transition="0.5s ease-out">
      <Header />
      <Box mb="14">{children}</Box>
    </Box>
  );
};

export default Layout;
