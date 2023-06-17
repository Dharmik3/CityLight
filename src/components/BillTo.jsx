import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';


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


const BillTo = () => {
    const address = JSON.parse(localStorage.getItem('address'));
   
    console.log(address)

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.billTo}>Bill To:</Text>
            <Text>{address.name }</Text>
            <Text>{address.addresses}</Text>
            <Text>{address.city}</Text>
            <Text>{address.mobile}</Text>
            <Text>{address.email}</Text>
        </View>
    )
}



export default BillTo;