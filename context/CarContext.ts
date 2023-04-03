import React from 'react';
import {Vehicle} from "../pages/types";

interface ISelectedCarContext {
  selectedCar: Vehicle | null | undefined;
  setSelectedCar: React.Dispatch<React.SetStateAction<Vehicle | null>>;
}

export const CarContext = React.createContext<ISelectedCarContext>({
  selectedCar: null,
  setSelectedCar: () => null
});
