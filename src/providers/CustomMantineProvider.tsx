"use client";

import {
  Button,
  createTheme,
  type MantineColorsTuple,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";

interface Props {
  children: React.ReactNode;
}
const grayscale: MantineColorsTuple = [
  "#f8f9fa",
  "#f1f3f5",
  "#e9ecef",
  "#dee2e6",
  "#ced4da",
  "#adb5bd",
  "#868e96",
  "#495057",
  "#343a40",
  "#212529",
];

const theme = createTheme({
  defaultRadius: 0,
  fontFamily: "Inter, sans-serif",
  primaryColor: "gray",
  colors: {
    gray: grayscale,
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "gray.1",
        c: "gray.9",
        variant: "filled",
      },
    }),
    Text: Text.extend({
      defaultProps: {
        c: "gray.1",
      },
    }),
    Title: Title.extend({
      defaultProps: {
        c: "gray.1",
      },
    }),
  },
});

const CustomMantineProvider: React.FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  );
};

export default CustomMantineProvider;
