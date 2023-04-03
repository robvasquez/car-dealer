import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import {CheckCircle, HighlightOff} from "@mui/icons-material";
import React from "react";
import {CarDetailsCardProps} from "./CarDetailsCardProps";

const CarDetailsCard: React.FC<CarDetailsCardProps> = ({selectedCar}) => {
  if (!selectedCar) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Error: No car selected
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={selectedCar.details_image}
        alt={`${selectedCar.make} ${selectedCar.model}`}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {`${selectedCar.make} ${selectedCar.model} ${selectedCar.trim} ${selectedCar.model_year}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Start Fee: {selectedCar.product_financials[0].start_fee_cents / 100}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Monthly Fee: {selectedCar.product_financials[0].monthly_payment_cents / 100}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {selectedCar.new_used_flag === 'USED' ? (
            <span><HighlightOff color="error"/> Used</span>
          ) : (
            <span><CheckCircle color="success"/> New</span>
          )}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Mileage: {selectedCar.mileage}
        </Typography>
        <Typography variant="body1" gutterBottom>
          VIN: {selectedCar.id}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CarDetailsCard;
