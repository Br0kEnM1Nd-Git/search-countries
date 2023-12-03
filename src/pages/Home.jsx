import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from 'service/country-service';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoader(true);
    setError(null);
    try {
      const resp = await getCountries();
      console.log(resp);
      setCountries(resp);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    } finally {
      setLoader(false);
    }
  };
  return (
    <Section>
      <Container>
        {loader ? (
          <Loader />
        ) : error ? (
          <Heading>{error}</Heading>
        ) : (
          <CountryList countries={countries} />
        )}
      </Container>
    </Section>
  );
};
