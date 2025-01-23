/**
 * Represents an Address in the application.
 * 
 * - `street`  - string representation of the street number and name separated by a space 
 *               with proper capitalization and no punctuation
 * - `city`    - string representation of the city name with proper capitalization
 * - `state`   - string representation of the state using 
 *               all-caps abbreviation (E.g. it's not "Massachusetts", but "MA")
 * - `zipCode` - string representation of the five-digit zipcode
 * - `country` - string representation of the country's abbreviation in all-capss
 */
export type Address = {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
  
/**
 * Represents a Shelter in the application
 * 
 * - `id`                 - a unique number identifier
 * - `name`               - official (short version) name of the shelter with proper capitalization
 * - `address`            - the Address type representation of the address
 * - `latitude`           - number to represent the locational latitude accurate to 4 decimal places
 * - `longitude`          - number to represent the locational longitude accurate to 4 decimal places
 * - `description`        - string description of the shelter, typically the full unabbreviated name, 
 *                          recommended to limit to under 75 characters
 * - `overall_rating`     - number that represents the overall rating out of 5 accurate to 1 decimal place
 * - `inclusivity_rating` - number that represents the inclusivity rating out of 5 accurate to 1 decimal place
 * - `safety_rating`      - number that represents the safety rating out of 5 accurate to 1 decimal place
 * - `phone_number`       - string that represents the shelter's phone number [TODO: add format]
 * - `email_address`      - string that represents the shelter's email address according to conventional standards
 * - `opening_time`       - string in HH:mm:ss format representing the opening time of the shelter
 * - `closing_time`       - string in HH:mm:ss format representing the closing time of the shelter
 * - `picture`            - array of maximum length 3 of strings storing URLs pointing
 *                          to picture files online or in assets of or relating to the shelter
 * - `emoji`              - string containing an in-text emoji character
 */
export type Shelter = {
    id: number;
    name: string;
    address: Address;
    latitude: number;
    longitude: number;
    description: string;
    overall_rating: number;
    inclusivity_rating: number;
    safety_rating: number;
    availability: string;
    phone_number: string;
    email_address: string;
    opening_time: string;
    closing_time: string;
    picture: string[];
    emoji: string;
  };