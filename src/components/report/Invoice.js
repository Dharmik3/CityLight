import React from 'react';
import { Page, Document, Image, StyleSheet, View } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import BillTo from '../BillTo'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import logo from '../../img/logo.png'


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 74,
        height: 66,
    },
    view: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const Invoice = ({ invoice,user }) =>

(
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.view}>
                <Image style={styles.logo} src={logo} />
                <InvoiceTitle title='CityLight' />
            </View>
            <InvoiceNo invoice={invoice} />
            <BillTo invoice={invoice} user={user} />
            <InvoiceItemsTable invoice={invoice} />
            <InvoiceThankYouMsg />
        </Page>
    </Document>
)
    ;

export default Invoice