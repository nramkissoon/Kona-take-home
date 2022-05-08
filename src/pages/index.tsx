import { PageContainer } from "@/components/PageContainer";
import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Heading as="h1">Kona Admin Dashboard</Heading>
    </PageContainer>
  );
};

export default Home;
