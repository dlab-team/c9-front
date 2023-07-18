
import React  from 'react';

import { Page, Text, Image, Document, StyleSheet, Font} from "@react-pdf/renderer";

 
Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

export const stylesPDF = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });

//  const PDFFile = ({publication}) =>  {

//  const {finalContent, finalContent_EN} = publication;
// return(

//   <Document>
//   <Page style={styles.body}>
//     <Text style={styles.header} fixed>
//       ~ InnovaXD - {publication?.author?.name} ~
//     </Text>
//     <Text style={styles.title}>{publication?.name}</Text>
//     <Text style={styles.author}>{publication?.author?.name}</Text>
//     <Image
//       style={styles.image}
//       src={publication?.images[0]?.url}   
//     />
   
//     <Text style={styles.text}>
//       {publication?.finalContent}
//     </Text>
//     <Text style={styles.subtitle} break>
//    Traducción EN
//   </Text>
//     <Text style={styles.text}>
//      {publication?.finalContent_EN}
//     </Text>
//     <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
//       `${pageNumber} / ${totalPages}`
//     )} fixed />
//   </Page>
// </Document>
//   );
//         }


  
  
  
  