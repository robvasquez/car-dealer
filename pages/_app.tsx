import {AppProps} from 'next/app';
import {useState} from "react";
import {CarContext} from "../context/CarContext";
import {Vehicle} from "./types";


const MyApp = ({Component, pageProps}: AppProps) => {
  const [selectedCar, setSelectedCar] = useState<Vehicle | null>(null);

  return (
    <CarContext.Provider value={{selectedCar, setSelectedCar}}>
      <Component {...pageProps} />
    </CarContext.Provider>
  );
}

export default MyApp
