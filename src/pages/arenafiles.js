import React, { useContext, useState, useEffect } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
// Import the text layer styles
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


// The workerSrc property shall be specified.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ArenaFiles() {
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const { arenaSessionId, selectedGUID } = useContext(AppContext); 
  const scaleFactor = 1;
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  console.log('ArenFiles.selectedGUID', selectedGUID)

  useEffect(() => {
    if (arenaSessionId && selectedGUID) { // Make sure selectedGUID is available


      console.log('ArenFiles.arenaSessionId', arenaSessionId)

      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/arenafilecontent?guid=${selectedGUID}`, { // Include selectedGUID as a query parameter
            headers: { 'arena-session-id': arenaSessionId },
            responseType: 'arraybuffer', // Change this to 'arraybuffer'
          });

          setPdfData(new Blob([response.data], { type: 'application/pdf' }));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [arenaSessionId, selectedGUID]); // Include selectedGUID in the dependency array

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {pdfData ? (
        <Document 
          file={pdfData}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
                      <Page 
                      key={`page_${index + 1}`} 
                      pageNumber={index + 1} 
                      width={window.innerWidth * scaleFactor} // Apply the scale factor here
                    />
          ))}
        </Document>
      ) : (
        <div>Loading my PDF file...</div>
      )}
    </div>
  );
}
//export default React.memo(ArenaFiles);

export default ArenaFiles;
