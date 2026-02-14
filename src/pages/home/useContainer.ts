import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import {
  CameraDialogAtom,
  CapturedFileAtom,
  CapturedImageAtom,
} from "../../store/app.store";

type PredictResponse = {
  predicted_label: string;
  confidence: number;
};

const useContainer = () => {
  const setShowCameraDialog = useSetAtom(CameraDialogAtom);
  const image = useAtomValue(CapturedImageAtom);
  const file = useAtomValue(CapturedFileAtom);
  const [result, setResult] = useState<
    | {
        label: string;
        confidence: number;
      }
    | undefined
  >(undefined);
  const { mutate: handlePredict, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (!file) {
        throw new Error("No file selected");
      }
      formData.append("file", file);
      return await axios.post<PredictResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/predict-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: (response) => {
      setResult({
        label: response.data.predicted_label,
        confidence: response.data.confidence,
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Something went wrong. Please try again!!",
        color: "red",
        withBorder: true,
      });
    },
  });
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return {
    image,
    handlePredict,
    isPending,
    result,
    isMobile,
    setShowCameraDialog,
  };
};
export default useContainer;
