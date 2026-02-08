import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Camera } from "feather-icons-react";
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

  const handleCapture = () => {
    try {
      capture();
      setShowCameraDialog(false);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    const updateRatio = () => {
      if (window.innerWidth < 640) {
        setAspectRatio(9 / 16);
      } else {
        setAspectRatio(16 / 9);
      }
    };

    updateRatio();
    window.addEventListener("resize", updateRatio);
    return () => window.removeEventListener("resize", updateRatio);
  }, []);

  return (
    showCameraDialog && (
      <Dialog
        open={showCameraDialog}
        onClose={() => {
          setShowCameraDialog(false);
        }}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-md" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-lg space-y-4 bg-white rounded-xl overflow-hidden">
            <DialogTitle className="font-bold px-5 py-2 pt-5">
              Take photo
            </DialogTitle>

            <section className="px-5">
              <div className="rounded-xl overflow-hidden relative">
                <div className="absolute rounded-xl w-[90%] h-[90%] -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
                  {/* top-left */}
                  <span className="absolute top-px left-px w-10 h-10 border-t-4 border-l-4 border-white rounded-tl-[10px] z-1" />

                  {/* top-right */}
                  <span className="absolute top-px right-px w-10 h-10 border-t-4 border-r-4 border-white rounded-tr-[10px] z-1" />

                  {/* bottom-left */}
                  <span className="absolute bottom-px left-px w-10 h-10 border-b-4 border-l-4 border-white rounded-bl-[10px] z-1" />

                  {/* bottom-right */}
                  <span className="absolute bottom-px right-px w-10 h-10 border-b-4 border-r-4 border-white rounded-br-[10px] z-1" />
                </div>
                <div className="w-full aspect-video">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                      facingMode: { ideal: "environment" },
                      aspectRatio: aspectRatio,
                    }}
                    className="w-full h-full object-cover rounded-xl"
                    forceScreenshotSourceSize={false}
                  />
                </div>
              </div>
            </section>

            <div className="flex">
              <button
                onClick={() => {
                  setShowCameraDialog(false);
                }}
                className="px-4 py-4 rounded-none w-full bg-gray-100 text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleCapture();
                }}
                className="px-8 py-4 w-full flex gap-3 items-center justify-center rounded-none bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
              >
                <Camera size={20} /> Take photo
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    )
  );
};

export default CameraDialog;
