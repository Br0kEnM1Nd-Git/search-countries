import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const region = searchParams.get('query');
    if (!region) return;
    const getByRegion = async () => {
      setError(null);
      setLoader(true);
      try {
        const resp = await fetchByRegion(region);
        setCountryList(resp);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    getByRegion();
  }, [searchParams]);

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={setSearchParams} />
        {error && <Heading>error</Heading>}
        {!error && <CountryList countries={countryList} />}
        {loader && <Loader />}
      </Container>
    </Section>
  );
};
