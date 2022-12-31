import {
  Button,
  ButtonGroup,
  HStack,
  Input,
  StatArrow,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.first);

  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);
  useEffect(() => {
    dispatch({
      type: "dataInput",
      payload: value,
    });
  }, [value]);
  // console.log(data);
  return (
    <HStack
      p={"4"}
      mr={"12"}
      shadow={"base"}
      w="full"
      justifyContent={"space-between"}
      bgColor={"blackAlpha.900"}
    >
      <ButtonGroup>
        <Button variant={"unstyled"} color={"white"}>
          <Link to="/">Home</Link>
        </Button>

        <Button variant={"unstyled"} color={"white"}>
          <Link to="/exchanges">Exchanges</Link>
        </Button>
        <Button variant={"unstyled"} color={"white"}>
          <Link to="/coins">Coins</Link>
        </Button>
      </ButtonGroup>
      <Input
        right={"12"}
        value={value}
        onChange={handleChange}
        bgColor={"white"}
        color="black"
        h={"8"}
        w={"18"}
        pr="4.5rem"
        type={"text"}
        _placeholder={{ opacity: 0.4, color: "inherit" }}
        placeholder={"Search"}
        borderRadius={"12"}
      ></Input>
    </HStack>
  );
};

export default Header;
