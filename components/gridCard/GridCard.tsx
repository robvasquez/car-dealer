import {Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography} from "@mui/material";
import React, {useCallback, useContext, useState} from "react";
import {DetailsResponse, Vehicle} from "../../pages/types";
import {GridCardProps} from "./gridCardProps";
import {CarContext} from "../../context/CarContext";

const GridCard: React.FC<GridCardProps> = ({car, onClick}) => {
  const [carClickError, setCarClickError] = useState<Record<string, string>>({});
  const [fetching, setFetching] = useState(false);
  const {setSelectedCar} = useContext(CarContext);

  const handleCarClick = useCallback(
    async (carId: string) => {
      if (carId && !fetching) {
        try {
          setFetching(true);
          const response = await fetch(
            `https://private-a96f0-jumpsuitinterview.apiary-mock.com/vehicles/${carId}`
          );

          if (!response.ok) {
            throw new Error('Error fetching data from API');
          }
          const responseJson: DetailsResponse = await response.json();
          if (!responseJson?.data?.vehicle?.id) {
            throw new Error('Invalid car ID');
          }

          const selectedCar: Vehicle = responseJson.data.vehicle;
          setSelectedCar(selectedCar);
          setCarClickError((prevErrors) => ({...prevErrors, [carId]: ""}));
          onClick();
        } catch (error) {
          console.error(error);
          setCarClickError((prevErrors) => ({...prevErrors, [carId]: "Error with card, try again later"}));
          setSelectedCar(null);
        } finally {
          setFetching(false);
        }
      }
    },
    [onClick, setSelectedCar, fetching]
  );

  return (
    <Grid item key={car.id} xs={12} sm={6} md={4}>
      <Card>
        <Box position="relative">
          <CardContent
            onClick={() => handleCarClick(car.id)}
            style={{cursor: "pointer", opacity: fetching ? 0.5 : 1}}
          >
            <Typography variant="h6" gutterBottom>
              {`${car.make} ${car.model} ${car.trim} ${car.model_year}`}
            </Typography>
            {carClickError[car.id] && (
              <Typography variant="body1" color="error" gutterBottom>
                {carClickError[car.id]}
              </Typography>
            )}
            <CardMedia
              component="img"
              height="200"
              image={car.image}
              alt={`${car.make} ${car.model}`}
            />
            {car.product_financials.length && (
              <ul>
                {car.product_financials.map((pf, index) => (
                  <li key={`pf-${index}`}>
                    Monthly Payment ${pf.monthly_payment_cents / 100} - Start Fee $
                    {pf.start_fee_cents / 100}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          {fetching && (
            <CircularProgress
              size={48}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.5,
              }}
            />
          )}
        </Box>
      </Card>
    </Grid>
  );
};

export default GridCard;
