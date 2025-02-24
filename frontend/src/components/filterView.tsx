import { bodyFont, darkMainColor } from 'frontend/constants';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Filters = () => {
    const [selectedRating] = useState("any");
    const [selectedHours] = useState("any");
    const [selectedDistance] = useState("any");
    const [selectedFilters] = useState<string[]>([]);

    
}

export default Filters;

