import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GetStaticProps} from "next";
import {Container, Grid, TextField, Typography,} from '@mui/material';
import {ApiResponse, HomeProps, Vehicle} from "./types";
import GridCard from "../components/gridCard/GridCard";

const Home: React.FC<HomeProps> = ({cars}) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
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


  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Car Listing
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder={"Search by make, model, or trim"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid container spacing={4}>
        {filteredCars.map((car, index) => (
          <GridCard key={`car-${index}`} car={car} onClick={() => router.push(`/car/${car.id}`)}/>
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

