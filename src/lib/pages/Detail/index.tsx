import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { handleProductDetailRq } from "lib/redux/actions/productAction";
import { productDetailSelector } from "lib/redux/selector/productSelector";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiGridAlt, BiTimeFive } from "react-icons/bi";
import { saveBookListen } from "lib/redux/reducers/bookSlice";
type Props = {};

const Detail = (props: Props) => {
  const dispatch = useDispatch();
  const route: any = useRouter();
  const productDetail = useSelector(productDetailSelector);
  const { id } = route?.query;
  useEffect(() => {
    if (id) {
      dispatch(handleProductDetailRq(id));
    }
  }, [route]);

  if (!productDetail) {
    return null;
  }

  const html = () => ({
    __html: productDetail?.description?.toString("html"),
  });

  const handleClickBook = () => {
    dispatch(saveBookListen(productDetail));
  };

  return (
    <>
      <Box
        height={{ base: "320px", md: "360px" }}
        background={
          "linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.22) 100%), rgb(244, 100, 36)"
        }
      >
        <Container maxW={"3xl"} height={"100%"}>
          <Flex height={"100%"} pt={{ base: 4, md: 10 }}>
            <Grid
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(6, 1fr)"
              rowGap={{ base: 6, md: 0 }}
              columnGap={{ base: 4, md: 16 }}
            >
              <GridItem
                rowSpan={{ base: 1, md: 2 }}
                colSpan={{ base: 3, md: 2 }}
                w="100%"
              >
                <Image
                  alt={productDetail?.title}
                  src={productDetail?.imageUrl}
                  width={{ base: 160, md: 200 }}
                  height={{ base: 220, md: 260 }}
                  rounded="lg"
                  borderWidth="1px"
                  shadow="lg"
                />
              </GridItem>
              <GridItem colSpan={{ base: 3, md: 3 }} flexDirection="column">
                <Box
                  mb="6px"
                  p={"6px"}
                  borderRadius={"6px"}
                  backgroundColor={"hsla(0,0%,100%,.3)"}
                  textAlign={"center"}
                  w={"100px"}
                >
                  <Text color={"white"}>Sách nói</Text>
                </Box>
                <Box>
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: "18px", md: "28px" }}
                    color={"white"}
                    noOfLines={2}
                  >
                    {productDetail?.name}
                  </Text>
                </Box>
                <Flex mt={"10px"} alignItems="center">
                  <BiGridAlt size={28} color="white" />
                  <Text
                    ml={"10px"}
                    fontSize={"20px"}
                    fontWeight="thin"
                    color="white"
                  >
                    {productDetail?.categoryRef?.name}
                  </Text>
                </Flex>
                <Flex mb="10px" alignItems="center">
                  <BiTimeFive size={20} color="white" />
                  <Text
                    ml={"10px"}
                    fontSize={"20px"}
                    fontWeight="thin"
                    color="white"
                  >
                    {productDetail?.duration}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 6, md: 3 }}>
                <Flex justifyContent={"center"} w={"100%"}>
                  <Button
                    onClick={handleClickBook}
                    w={"100%"}
                    background={
                      "linear-gradient(to right, rgb(255, 166, 89) 0%, rgb(255, 109, 109) 100%);"
                    }
                    color="white"
                    rounded={"full"}
                  >
                    Nghe chương đầu miễn phí trên app
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </Flex>
        </Container>
      </Box>
      <Box>
        <Container maxW={"3xl"}>
          <Text fontWeight="bold" fontSize={"28px"} mt={10}>
            Giới thiệu nội dung
          </Text>
          <Box mt={4}>
            <div dangerouslySetInnerHTML={html()} />
          </Box>
          <Text fontWeight="bold" fontSize={"28px"} mt={10}>
            Về tác giả
          </Text>
          <Box mt={4} display={"flex"}>
            <Avatar src="https://bit.ly/broken-link" />
            <Box ml={4}>
              <Text>{productDetail?.authorRef?.name}</Text>
              <Text color={"rgb(106, 121, 144)"}>
                {productDetail?.authorRef?.description}
              </Text>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Detail;
