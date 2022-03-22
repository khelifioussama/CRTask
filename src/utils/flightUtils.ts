import _ from 'lodash';
import airportsRaw from '@constants/airports.json';
import {AirportData} from '@types';

const airportsData = airportsRaw as {[key: string]: AirportData};
/* remove !! operator */
const filteredAirports = _.filter(
  airportsData,
  (airport: AirportData) =>
    !!airport.iata && airport.iata !== '0' && !!airport.city && !!airport.name,
);
const airports = _.uniqBy(filteredAirports, 'iata');
/* - we could make this filter function by creating Array with the filter condition const iata = ['ATL','PEK','DXB','LAX','LHR'] and check iata.includes(airport.iata)
   - use TS in this function
*/
const autocompleteListInitialState = _.filter(airports, (airport) => {
  return (
    airport.iata === 'ATL' ||
    airport.iata === 'PEK' ||
    airport.iata === 'DXB' ||
    airport.iata === 'LAX' ||
    airport.iata === 'LHR'
  );
});

const searchCityAutocomplete = (searchText: string) =>
  _.filter(
    airports,
    (airport) =>
      airport.city.toLowerCase().includes(searchText.toLowerCase()) ||
      airport.name.toLowerCase().includes(searchText.toLowerCase()),
  );

export default {searchCityAutocomplete, autocompleteListInitialState};
