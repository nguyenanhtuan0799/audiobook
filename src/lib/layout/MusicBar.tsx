import { Box, Button, Container, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  bookSelector,
  seekSelector,
} from "lib/redux/selector/bookListenSelector";
import { isEmpty } from "lodash";
import ReactPlayer from "react-player";
import { saveSeekListen } from "lib/redux/reducers/bookSlice";

type Props = {};

const MusicBar = (props: Props) => {
  const bookInfo = useSelector(bookSelector);
  const seekInfo = useSelector(seekSelector);
  const dispatch = useDispatch();

  const [hasWindow, setHasWindow] = useState(false);

  const playerRef = useRef<ReactPlayer>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
    if (!isEmpty(seekInfo)) {
      const { id, seek } = seekInfo;
      if (id === bookInfo.id) {
        playerRef.current?.seekTo(seek, "seconds");
      }
    }
  }, []);

  const handleProgress = (state) => {
    dispatch(
      saveSeekListen({
        id: bookInfo?.id,
        seek: state?.playedSeconds,
      })
    );
  };

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
      height={100}
      backgroundColor={"white"}
    >
      <Container maxW={"3xl"} height={"100%"}>
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Image
            alt={bookInfo?.name}
            src={bookInfo?.imageUrl}
            width={{ base: "60px", md: "60px" }}
            height={{ base: "70px", md: "70px" }}
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
            {hasWindow && (
              <ReactPlayer
                ref={playerRef}
                url={bookInfo?.fileUrl}
                controls
                width={280}
                height={60}
                onProgress={handleProgress}
              />
            )}
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default MusicBar;
