import {
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

  return (
    <Box
      height={"360px"}
      background={
        "linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.22) 100%), rgb(244, 100, 36)"
      }
    >
      <Container maxW={"3xl"} height={"100%"}>
        <Flex height={"100%"} alignItems={"center"}>
          <Grid
            templateColumns="repeat(6, 1fr)"
            gap={{
              base: 4,
              md: 20,
            }}
          >
            <GridItem colSpan={2} w="100%">
              <Image
                alt={productDetail?.title}
                src={productDetail?.imageUrl}
                width={200}
                height={260}
                rounded="lg"
                borderWidth="1px"
                shadow="lg"
              />
            </GridItem>
            <GridItem colSpan={4} flexDirection="column">
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
              <Box w={"400px"}>
                <Text
                  fontWeight="bold"
                  fontSize={"28px"}
                  color={"white"}
                  noOfLines={2}
                >
                  {productDetail?.name}
                </Text>
              </Box>
              <Flex mt={"10px"} alignItems="center">
                <BiGridAlt size={20} color="white" />
                <Text
                  ml={"6px"}
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
                  ml={"6px"}
                  fontSize={"20px"}
                  fontWeight="thin"
                  color="white"
                >
                  {productDetail?.duration}
                </Text>
              </Flex>
              <Button
                background={
                  "linear-gradient(to right, rgb(255, 166, 89) 0%, rgb(255, 109, 109) 100%);"
                }
                color="white"
                rounded={"full"}
              >
                Nghe chương đầu miễn phí trên app
              </Button>
            </GridItem>
          </Grid>
        </Flex>
      </Container>
    </Box>
  );
};

export default Detail;
``;
