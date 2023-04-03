import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GetStaticProps} from "next";
import {Card, CardContent, CardMedia, Container, Grid, TextField, Typography,} from '@mui/material';
import useTranslation from "next-translate/useTranslation";

interface ApiResponse {
  status: string;
  data: {
    filtered_count: number;
    qualifying_count: number;
    vehicles: Vehicle[];
  };
}

export interface Vehicle {
  id: string;
  body_style: string;
  categories: string[];
  image: string;
  details_image: string;
  make: string;
  mileage: number;
  model: string;
  model_year: string;
  new_used_flag: string;
  product_financials: ProductFinancial[];
  trim: string;
}

interface ProductFinancial {
  monthly_payment_cents: number;
  start_fee_cents: number;
}

interface HomeProps {
  cars: Vehicle[];
}

const Home: React.FC<HomeProps> = ({cars}) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const {t} = useTranslation();
  const [carClickError, setCarClickError] = useState<Record<string, string>>({});

  const [filteredCars, setFilteredCars] = useState<Vehicle[]>([]);


  useEffect(() => {
    // Filter car data based on search criteria
    setFilteredCars(
      cars.filter(
        (car) =>
          car.make.toLowerCase().includes(search.toLowerCase()) ||
          car.model.toLowerCase().includes(search.toLowerCase()) ||
          car.trim.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, cars]);

  const handleCarClick = useCallback(
    async (carId) => {
      if (carId) {
        try {
          const response = await fetch(
            `https://private-a96f0-jumpsuitinterview.apiary-mock.com/vehicles/${carId}`
          );
          if (!response.ok) {
            throw new Error('Error fetching data from API');
          }
          const data: Vehicle = await response.json();
          if (!data.id) {
            throw new Error('Invalid car ID');
          }
          setCar(data);
          setCarClickError((prevErrors) => ({...prevErrors, [carId]: ""}));
        } catch (error) {
          console.error(error);
          setCarClickError((prevErrors) => ({...prevErrors, [carId]: error.message}));
        }

        if (!carClickError[carId]) {
          router.push(`/car/${carId}`);
        }
      }
    },
    [router, carClickError]
  );


  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {t('carListing')}
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder={t('search')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid container spacing={4}>
        {filteredCars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent
                onClick={() => handleCarClick(car.id)}
                style={{cursor: 'pointer'}}
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch("https://private-anon-d7c1126914-jumpsuitinterview.apiary-mock.com/vehicles");
    if (!response.ok) {
      throw new Error("Error fetching data from API");
    }

    const responseJson: ApiResponse = await response.json();
    const data: Vehicle[] = responseJson.data.vehicles;

    return {
      props: {
        cars: data,
      },
      revalidate: 60, // Optional: revalidate the data every 60 seconds
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        cars: [],
      },
    };
  }
};
export default Home;

