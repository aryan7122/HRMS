import axios from 'axios';
import { useState, useEffect } from 'react';

const useLocationData = () => {
    const [locationsapi, setLocationsapi] = useState({
        countries: [],
        states: [],
        cities: [],
        countryName:[]
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchCountriesName = async (id) => {
        try {
            const response = await axios.post('https://devstronauts.com/public/api/getcountryname', {
                country_id:id
            });
            const countryDataName = response.data.country[0].name;
            console.log('countryDataName', countryDataName)
            setLocationsapi((prev) => ({
                ...prev,
                countries: countryDataName,
            }));
        } catch (err) {
            setError('Failed to fetch countries');
        }
    };
    const fetchCountries = async () => {
        try {
            const response = await axios.post('https://devstronauts.com/public/api/getcountry',);
            const countryData = response.data.country;
            // console.log('countryData', countryData)
            setLocationsapi((prev) => ({
                ...prev,
                countries: countryData,
            }));
        } catch (err) {
            setError('Failed to fetch countries');
        }
    };

    const fetchStates = async (id) => {
        try {
            const response = await axios.post('https://devstronauts.com/public/api/getstate', {
                country_id: 11,
            });
            // console.log('response', response)
            const stateData = response.data.country;
            setLocationsapi((prev) => ({
                ...prev,
                states: stateData,
            }));
        } catch (err) {
            setError('Failed to fetch states');
        }
    };

    const fetchCities = async (id) => {
        try {
            const response = await axios.post('https://devstronauts.com/public/api/getcity', {
                state_id: id,
            });
            const cityData = response.data.country;
            setLocationsapi((prev) => ({
                ...prev,
                cities: cityData,
            }));
        } catch (err) {
            setError('Failed to fetch cities');
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchCountries();
            await fetchStates()
            await fetchCities()
            await fetchCountriesName()
            setLoading(false);
        };
        loadData();
    }, []);

    return {
        locationsapi,
        fetchStates,
        fetchCities,
        loading,
        error,
        fetchCountriesName
    };
};

export default useLocationData;
