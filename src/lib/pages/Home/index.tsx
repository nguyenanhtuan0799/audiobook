import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Select,
  Text,
} from "@chakra-ui/react";
import { getCategoriesRq, getProductsRq } from "lib/redux/actions/homeAction";
import {
  listCategorySelector,
  listProductSelector,
} from "lib/redux/selector/homeSelector";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from "./CardProduct";

type Props = {};

const HomePage = (props: Props) => {
  const dispatch = useDispatch();
  const listProduct: any[] = useSelector(listProductSelector);
  const listCategory: any[] = useSelector(listCategorySelector);
  const [category, setCategory] = useState<any>("tat-ca");
  console.log(category, "???1", listCategory);
  useEffect(() => {
    dispatch(getProductsRq({ id: category }));
  }, []);

  useEffect(() => {
    dispatch(getCategoriesRq());
  }, []);

  const handleChange = (e: any) => {
    setCategory(e.target.value);
    dispatch(getProductsRq({ id: e.target.value }));
  };

  return (
    <Container maxW={"5xl"} mt="14">
      <Grid templateColumns="repeat(6, 1fr)" gap="4" mb={8}>
        {/* <GridItem colSpan={{ base: 4, md: 4, lg: 2 }} mt="20px">
          <Text fontSize="24px" fontWeight="600" mb="2">
            Sách nói
          </Text>
        </GridItem> */}
        <GridItem colSpan={{ base: 6, md: 6, lg: 6 }}>
          <Box>
            <Select
              value={category}
              variant="filled"
              width={"300px"}
              onChange={handleChange}
            >
              {listCategory?.map((item: any, index: number) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        </GridItem>
      </Grid>

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
