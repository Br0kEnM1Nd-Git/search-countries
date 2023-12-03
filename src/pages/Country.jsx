import { Section, Container, CountryInfo, Loader, Heading } from 'components';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/country-service';

export const Country = () => {
  const { countryId } = useParams();
  const [countrie, setCountry] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({});
  const location = useLocation();
  const linkBack = location?.state?.from ?? '/';

  useEffect(() => {
    const currentCountry = async () => {
      setLoading(true);
      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    currentCountry();
  }, [countryId]);
  console.log(countrie);
  const {
    flag,
    capital,
    countryName,
    id,
    languages = [],
    population,
  } = countrie;
  return (
    <Section>
      <Link to={linkBack}>Go Back</Link>
      <Container>
        {loading && <Loader />}
        {!error ? (
          <CountryInfo
            flag={flag}
            capital={capital}
            country={countryName}
            id={id}
            languages={languages}
            population={population}
          />
        ) : (
          <Heading>{error}</Heading>
        )}
      </Container>
    </Section>
  );
};
