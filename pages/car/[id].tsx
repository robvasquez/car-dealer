import React from 'react';
import {useRouter} from 'next/router';
import {Vehicle} from '../index';
import {Card, CardContent, CardMedia, Container, Typography} from '@mui/material';

interface CarDetailsPageProps {
  car: Vehicle | null;
}

const CarDetailsPage: React.FC<CarDetailsPageProps> = ({car}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Car Details
      </Typography>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={car.details_image}
          alt={`${car.make} ${car.model}`}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {`${car.make} ${car.model} ${car.trim} ${car.model_year}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Start Fee: {car.product_financials[0].start_fee_cents / 100}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Monthly Fee: {car.product_financials[0].monthly_payment_cents / 100}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {car.new_used_flag === 'USED' ? 'Used' : 'New'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Mileage: {car.mileage}
          </Typography>
          <Typography variant="body1" gutterBottom>
            VIN: {car.id}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CarDetailsPage;
