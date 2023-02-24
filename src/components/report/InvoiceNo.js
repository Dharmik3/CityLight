import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { InvoiceNumber } from 'invoice-number'

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 'auto'
    }

});


const InvoiceNo = ({ invoice }) => (
    <Fragment>
        <View style={styles.invoiceNoContainer}>
            <Text style={styles.label}>Invoice No: </Text>
            <Text style={styles.invoiceDate}>{1 + Math.floor(Math.random() * 999999999)}</Text>
        </View >
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Date: </Text>
            <Text >{invoice.trans_date}</Text>
        </View >
    </Fragment>
);

export default InvoiceNo