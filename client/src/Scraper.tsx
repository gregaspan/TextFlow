import React from "react";
import { Input, InputGroup, InputLeftElement, Textarea } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

export default function Scraper() {
  return (
    <>
      <div>Scraper</div>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <PhoneIcon color="gray.300" />
        </InputLeftElement>
        <Input type="tel" placeholder="Phone number" />{" "}
      </InputGroup>
      <Textarea placeholder="Here is a sample placeholder" />
    </>
  );
}
