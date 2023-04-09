import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

import React from "react";
import Link from "next/link";

const CardProduct = (props: any) => {
  const { item } = props;
  return (
    <Link href={`detail/${item.id}`}>
      <Box alignItems="center" justifyContent="center" w={"100%"}>
        <Box width={"100%"} height={"70%"}>
          {item?.imageUrl && (
            <Image
              src={item?.imageUrl}
              alt={`Picture of ${item.name}`}
              width={"100%"}
              rounded="lg"
              height={"100%"}
            />
          )}
        </Box>
        <Box mt="4" height={"30%"} w={"100%"}>
          <Box w={"100%"}>
            <Text fontSize="lg" fontWeight="semibold" noOfLines={[2, 2, 2]}>
              {item?.name}
            </Text>
          </Box>
          <Box w={"100%"}>
            <Text
              mt="2"
              fontSize="m"
              fontWeight="normal"
              noOfLines={[2, 2, 2]}
              w={"100%"}
              color="rgb(106, 121, 144)"
            >
              {item?.authorRef?.name}
            </Text>
          </Box>

          <Flex mt="2" alignItems="center" w={"100%"}>
            <TimeIcon color="rgb(255, 137, 99)" />
            <Box w={"100%"}>
              <Text
                color={"rgb(255, 137, 99)"}
                ml="2"
                fontSize="sm"
                fontWeight="normal"
                noOfLines={[2, 2, 2]}
                w={"100%"}
              >
                {item?.duration}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default CardProduct;
