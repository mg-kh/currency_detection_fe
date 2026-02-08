import axios from "axios";
import { Camera } from "feather-icons-react";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import CameraDialog from "./components/CameraDialog/CameraDialog";
import CustomButton from "./components/CustomButton/CustomButton";
import {
  CameraDialogAtom,
  CapturedFileAtom,
  CapturedImageAtom,
} from "./store/app.store";

function App() {
  const [_showCameraDialog, setShowCameraDialog] = useAtom(CameraDialogAtom);
  const image = useAtomValue(CapturedImageAtom);
  const file = useAtomValue(CapturedFileAtom);
  const [result, setResult] = useState<string | undefined>(undefined);
  const handlePredit = () => {
    const formData = new FormData();
    if (!file) return;
    formData.append("file", file);
    axios
      .post(`${import.meta.env.BASE_URL}/predict-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setResult(response.data.predicted_label);
      })
      .catch((e) => {
        const error = e;
        setResult(error.toString());
      });
  };
  return (
    <>
      <CameraDialog />
      <div className="container mx-auto bg-slate-800 px-2">
        <div className="flex w-full h-screen items-center  justify-center">
          <div className="w-full md:w-6/12 h-full mx-auto space-y-5 py-10">
            <div className="bg-white h-[60px] flex items-center justify-center rounded-xl">
              {!!result && <p className="text-2xl font-bold">{result} THB</p>}
            </div>
            <div className="w-full h-[300px] bg-gray-100 overflow-hidden rounded-xl">
              {!!image && (
                <img
                  src={image}
                  alt=""
                  className="object-contain w-full h-full"
                />
              )}
            </div>

            {!!image ? (
              <div className="flex gap-3">
                <CustomButton
                  onClick={() => {
                    handlePredit();
                  }}
                  className="w-full"
                >
                  Predit the photo
                </CustomButton>
                <button
                  onClick={() => {
                    setShowCameraDialog(true);
                  }}
                  className="flex justify-center gap-3 items-center px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 w-full"
                >
                  <Camera size={20} /> Retake photo
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowCameraDialog(true);
                }}
                className="flex justify-center gap-3 items-center px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 w-full"
              >
                <Camera size={20} /> Take photo
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
