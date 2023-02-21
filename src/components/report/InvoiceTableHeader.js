import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#00122E'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#001246',
        backgroundColor: '#001246',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        color:'white'
    },
    description: {
        width: '60%',
        borderRightColor: 'white',
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: 'white',
        borderRightWidth: 1,
    },
    rate: {
        width: '15%',
        borderRightColor: 'white',
        borderRightWidth: 1,
    },
    amount: {
        width: '15%'
    },
});

const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Item Description</Text>
        <Text style={styles.qty}>Qty</Text>
        <Text style={styles.rate}>Rate</Text>
        <Text style={styles.amount}>Amount</Text>
    </View>
);

export default InvoiceTableHeader