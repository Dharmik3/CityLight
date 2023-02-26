import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { useStateValue } from '../context/StateProvider';
import { getAddress } from '../utils/FirebaseFunctions';
const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
});


const BillTo = ({ invoice,user }) => {
    const [address, setAddress] = useState({});
    const fetchAddress = async () => {
        await getAddress(user.email).then((add) => {
            setAddress(add)
        });
    }
    useEffect(() => {
        fetchAddress()
    }, [])

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.billTo}>Bill To:</Text>
            <Text>{address.name}</Text>
            <Text>{address.address}</Text>
            <Text>{address.city}</Text>
            <Text>{address.mobile}</Text>
            <Text>{address.email}</Text>
        </View>
    )
}



export default BillTo;