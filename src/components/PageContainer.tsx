import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

export const PageContainer: React.FC<{ children?: React.ReactNode }> = (
  props
) => {
  return (
    <div>
      <Head>
        <title>Kona Admin MVP</title>
        <meta name="description" content="MVP for Kona Admin dashboard" />
        <link rel="icon" href="/kona_favicon.png" />
      </Head>
      <main>
        <Box
          w={["sm", "xl", "3xl", "5xl", "6xl", "8xl"]}
          px="0"
          mx="auto"
          mt="3em"
          display="flex"
          flexDirection="column"
        >
          {props.children}
        </Box>
      </main>
    </div>
  );
};
