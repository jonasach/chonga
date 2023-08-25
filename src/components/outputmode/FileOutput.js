// FileOutput.js
import { Document, Page, pdfjs } from 'react-pdf';
import React, { useContext, useEffect, useState } from 'react';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import AppContext from 'src/contexts/ArenaContext';
import axios from 'axios';


// The workerSrc property shall be specified.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


export default function FileOutput() {
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const {
    selectedGUID,arenaEndPoint, arenaSessionId
  } = useContext(AppContext);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };


  const scaleFactor = 0.6;

// if we are getting a file
useEffect(() => {
  if (selectedGUID && arenaEndPoint ) {
       const fetchData = async () => {
        try {
          const response = await axios.get(`/api/arenafilecontent?guid=${selectedGUID}`, {
            headers: { 'arena-session-id': arenaSessionId },
            responseType: 'arraybuffer',
          });
          setPdfData(new Blob([response.data], { type: 'application/pdf' }));
        } catch (error) {
          console.error('Error fetching PDF data:', error);
        }
      };  
      fetchData();
  }
}, [selectedGUID, arenaEndPoint, arenaSessionId]);

  return (
    <div style={{ height: 'calc(100% - 48px)', overflowY: 'auto' }}>
    {pdfData ? (
      <Document 
        file={pdfData}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page 
            key={`page_${index + 1}`} 
            pageNumber={index + 1} 
            width={window.innerWidth * scaleFactor}
          />
        ))}
      </Document>
    ) : (
      <></>
    )}
  </div>
  );
}
