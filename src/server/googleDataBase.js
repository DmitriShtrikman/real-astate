import { ref } from "firebase/storage";
import { storage } from "./googleFirebase";


export const storageRef = ref(storage);
export const imagesRef = ref(storage, 'images');
export const imgRef = ref(storage, 'images/10.jpg');

const metadata = {
    contentType: 'image/jpeg',
  };
