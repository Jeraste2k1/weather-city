import React, { useState } from 'react';
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api"; // Import des constantes pour l'URL et les options de l'API

const Search = ({ onSearchChange, countryCode = null }) => {
  const [search, setSearch] = useState(null);

  /**
   * Fonction pour charger les options de recherche depuis l'API
   * @param {string} inputValue - La valeur saisie par l'utilisateur
   * @returns {Promise<object>} - Un objet contenant les options formatées pour AsyncPaginate
   */
  const loadOptions = (inputValue) => {
    // Créer l'URL dynamique en fonction du pays, si un code pays est fourni
    const countryFilter = countryCode ? `&countryIds=${countryCode}` : '';
    const url = `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}${countryFilter}`;

    return fetch(url, geoApiOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        if (!response.data || !Array.isArray(response.data)) {
          console.warn("Données inattendues :", response);
          return { options: [] };
        }

        return {
          options: response.data.map((city) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          })),
        };
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des données :", err);
        return { options: [] };
      });
  };

  /**
   * Gestionnaire pour les changements dans la barre de recherche
   * @param {object} searchData - Les données sélectionnées par l'utilisateur
   */
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for City" // Texte affiché dans le champ avant la saisie
      debounceTimeout={1000} // Délai avant d'envoyer une requête API pour éviter les appels trop fréquents
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions} // Fonction pour charger les options dynamiquement depuis l'API
    />
  );
};

export default Search;
