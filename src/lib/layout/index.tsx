import { Box, Text } from "@chakra-ui/react";
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
      <Box>
        <Header />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
