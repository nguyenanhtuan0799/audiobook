import { Box, Button, Container, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {};

const Detail = (props: Props) => {
  return (
    <Box
      height={"360px"}
      background={
        "linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.22) 100%), rgb(255 127 71)"
      }
    >
      <Container maxW={"3xl"}>
        <Box>
          <Image src="" alt="Dan Abramov" width={100} height={300} />
        </Box>
        <Box>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Button></Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Detail;
``;
