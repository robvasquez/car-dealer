import React, {useContext} from 'react';
import {useRouter} from 'next/router';
import {Container, Typography} from '@mui/material';
import CarDetailsCard from "../../components/carDetailsCard/CarDetailsCard";
import {CarContext} from "../../context/CarContext";

const CarDetailsPage: React.FC = () => {
  const router = useRouter();
  const {selectedCar} = useContext(CarContext);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Car Details
      </Typography>
      <CarDetailsCard selectedCar={selectedCar}/>
    </Container>
  );
};

export default CarDetailsPage;
