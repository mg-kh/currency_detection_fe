import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { IconCamera, IconRotateClockwise, IconWand } from "@tabler/icons-react";
import CameraDialog from "../../components/CameraDialog/CameraDialog";
import useContainer from "./useContainer";

function Home() {
  const {
    image,
    handlePredict,
    isPending,
    result,
    isMobile,
    setShowCameraDialog,
  } = useContainer();

  return (
    <>
      <CameraDialog />
      <Container size={"md"} py={30}>
        <Flex
          align="start"
          gap={30}
          direction={isMobile ? "column-reverse" : "row"}
        >
          <Stack w={isMobile ? "100%" : "70%"}>
            <Box w="100%" h={300} bg="gray.7">
              {image ? (
                <Image
                  w="100%"
                  h="100%"
                  src={image}
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Stack w="100%" h="100%" align="center" justify="center">
                  <IconCamera />
                  <Text c="gray.5">PLEASE TAKE A PHOTO</Text>
                </Stack>
              )}
            </Box>
            <Flex justify="end" gap={20}>
              {image && (
                <Button
                  disabled={isPending}
                  onClick={() => {
                    handlePredict();
                  }}
                  leftSection={<IconWand size={20} />}
                >
                  Predict Currency Value
                </Button>
              )}
              {image ? (
                <Button
                  onClick={() => {
                    setShowCameraDialog(true);
                  }}
                  leftSection={<IconRotateClockwise size={20} />}
                >
                  Re-take Photo
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShowCameraDialog(true);
                  }}
                  leftSection={<IconCamera size={20} />}
                >
                  Take Photo
                </Button>
              )}
            </Flex>
          </Stack>

          <Stack w={isMobile ? "100%" : "40%"} bg={"gray.1"} p={20}>
            <Text c="gray.9" fw="bold">
              Prediction Result
            </Text>
            <Text c="gray.9">Currency : Thai Baht (THB)</Text>
            <Group px={5} style={{ borderLeft: "3px solid #5b5b5b" }} gap={5}>
              <Text c="gray.9">Denomination :</Text>
              <Text c="gray.9" fw="bold">
                {result?.label}
              </Text>
              <Text c="gray.9">THB</Text>
            </Group>
            <Divider color="gray.5" />
            <Stack>
              <Text c="gray.9">
                Confidience :{" "}
                <span>
                  {result?.confidence
                    ? `${(result?.confidence * 100).toFixed(2)}%`
                    : "-"}
                </span>
              </Text>
              {result?.confidence && (
                <Progress
                  value={Number((result?.confidence * 100)?.toFixed(2))}
                  radius={0}
                  color="green"
                  bg="gray.3"
                />
              )}
            </Stack>
          </Stack>
        </Flex>
      </Container>
    </>
  );
}

export default Home;
