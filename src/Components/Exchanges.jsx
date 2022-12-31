import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../index";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { search } = useSelector((state) => state.first);
  // console.log(search);
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          `${server}/exchanges?page=1&per_page=100`
        );
        setExchanges(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
      // console.log(data);
    };
    fetchExchanges();
  }, []);

  const newExchanges = exchanges.filter((exchange) =>
    exchange.name.toLowerCase().includes(search.toLowerCase())
  );
  // console.log(newExchanges);
  if (error) return <ErrorComponent message={"Error While Fetching"} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {newExchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                image={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};
const ExchangeCard = ({ name, image, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={image}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"Exchange"}
        />
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};
export default Exchanges;
