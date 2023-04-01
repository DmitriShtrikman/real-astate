import { ref } from "firebase/storage";
import { storage } from "./googleFirebase";


export const storageRef = ref(storage);
export const imagesRef = ref(storage, 'images');

const metadata = {
    contentType: 'image/jpeg',
  };
