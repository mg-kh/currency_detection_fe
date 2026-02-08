import { atom } from "jotai";

export const CameraDialogAtom = atom(false);
export const PreditDialogAtom = atom(false);

export const CapturedImageAtom = atom<string | null>(null);
export const CapturedFileAtom = atom<File | null>(null);
