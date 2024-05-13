"use client";

import { Avatar, Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function WithLargeQuote() {
  return (
    <Stack
      bg={useColorModeValue("gray.50", "gray.800")}
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={"center"}
      direction={"column"}
    >
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        textAlign={"center"}
        maxW={"3xl"}
      >
        Zdaj lahko berem skoraj tako hitro kot moji prijatelji v šoli
      </Text>
      <Box textAlign={"center"}>
        <Avatar
          src={
"https://images.unsplash.com/photo-1715041432689-71f41dad0187?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg3fHxib3l8ZW58MHx8Mnx8fDA%3D"          }
          mb={2}
        />

        <Text fontWeight={600}>Tim</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")}>
          10 let
        </Text>
      </Box>
    </Stack>
  );
}
