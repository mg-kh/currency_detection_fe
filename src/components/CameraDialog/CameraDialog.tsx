import { Box, Button, em, Flex, Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCamera } from "@tabler/icons-react";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  CameraDialogAtom,
  CapturedFileAtom,
  CapturedImageAtom,
} from "../../store/app.store";
import dataURLtoFile from "../../utils/dataURLtoFile";

const CameraDialog = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [showCameraDialog, setShowCameraDialog] = useAtom(CameraDialogAtom);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const setImage = useSetAtom(CapturedImageAtom);
  const setFile = useSetAtom(CapturedFileAtom);
  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    const file = dataURLtoFile(imageSrc, "capture.jpg");
    setImage(imageSrc);
    setFile(file);
  }, [webcamRef]);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const handleCapture = () => {
    try {
      capture();
      setShowCameraDialog(false);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    console.log(isMobile);
    if (isMobile) {
      setAspectRatio(9 / 16);
    } else {
      setAspectRatio(16 / 9);
    }
  }, [isMobile]);

  return (
    <Modal
      opened={showCameraDialog}
      onClose={() => {
        setShowCameraDialog(false);
      }}
      title="Take Currency Photo"
    >
      <Box
        style={{
          width: "100%",
          aspectRatio: 16 / 9,
        }}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: { ideal: "environment" },
            aspectRatio: aspectRatio,
          }}
          forceScreenshotSourceSize={false}
          style={{
            width: "100%",
          }}
        />
      </Box>

      <Flex justify="space-between">
        <Button
          bg="gray.8"
          c="gray.1"
          onClick={() => {
            setShowCameraDialog(false);
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={() => {
            handleCapture();
          }}
          leftSection={<IconCamera size={20} />}
        >
          Take photo
        </Button>
      </Flex>
    </Modal>
  );
};

export default CameraDialog;
