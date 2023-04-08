import { Box, Button, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import { getProductsRq } from "lib/redux/actions/homeAction";
import { listProductSelector } from "lib/redux/selector/homeSelector";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from "./CardProduct";

type Props = {};

const HomePage = (props: Props) => {
  const dispatch = useDispatch();
  const listProduct: any[] = useSelector(listProductSelector);

  useEffect(() => {
    dispatch(getProductsRq());
  }, []);
  console.log(listProduct, "???ngu");

  return (
    <Container maxW={"5xl"} mt="14">
      <Grid
        templateColumns={{
          base: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={8}
      >
        {listProduct?.map((product: any, index: any) => (
          <GridItem key={index}>
            <CardProduct item={product} type="none" />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
