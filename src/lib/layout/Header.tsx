import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import { BiBook, BiSearch } from "react-icons/bi";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
type Props = {};
const Header = (props: Props) => {
  return (
    <Box
      borderBottom={"1px"}
      borderColor={"rgba(0,0,0,.1)"}
      background={
        "linear-gradient(0deg, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.2) 100%), rgb(244, 100, 36)"
      }
    >
      <Container maxW={"4xl"}>
        <Box
          height={"80px"}
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box display="flex">
            <BiBook size={34} color="white" />
            <Text fontSize={"24px"} ml={"10px"} color="white">
              Audio Book
            </Text>
          </Box>
          <Box display="flex">
            <Input
              placeholder="Tìm kiếm sách"
              w={"400px"}
              background={"white"}
            />
            <Button ml={"10px"}>
              <BiSearch size={20} />
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
