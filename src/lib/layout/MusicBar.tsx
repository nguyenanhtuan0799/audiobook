import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { bookSelector } from "lib/redux/selector/bookListenSelector";
import { isEmpty } from "lodash";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
type Props = {};

const MusicBar = (props: Props) => {
  const bookInfo = useSelector(bookSelector);

  if (isEmpty(bookInfo)) {
    return null;
  }
  return (
    <Box
      position="fixed"
      bottom={0}
      right={0}
      left={0}
      borderWidth={1}
      zIndex={9999}
      borderTopLeftRadius="lg"
      borderTopRightRadius="lg"
      shadow="xl"
      boxShadow="xl"
      height={120}
      backgroundColor={"white"}
    >
      <Container maxW={"3xl"} height={"100%"}>
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Image
            alt={bookInfo?.name}
            src={bookInfo?.imageUrl}
            width={{ base: "60px", md: "60px" }}
            height={{ base: "64px", md: "80px" }}
            rounded="lg"
            borderWidth="1px"
            shadow="lg"
          />
          <Box display={{ base: "none", md: "block" }} ml={6}>
            <Text>{bookInfo?.name}</Text>
            <Text color={"rgb(106, 121, 144)"}>
              {bookInfo?.authorRef?.name}
            </Text>
          </Box>
          <Flex ml={4} alignItems={"center"} height={"100%"}>
            <ReactPlayer
              url={bookInfo?.fileUrl}
              controls
              width={300}
              height={70}
            />
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default MusicBar;
