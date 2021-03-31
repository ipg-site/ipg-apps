import React from 'react';
import {Document, Page} from 'react-pdf';
import {pdfjs} from 'react-pdf';
import classes from '../styles/PDFViewer.module.scss';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({file, width, pageNumber, scale, onReachMax}) => (
  <Document file={file} error="">
    <Page error="" pageNumber={pageNumber} width={width} scale={scale} renderMode="canvas" renderAnnotationLayer={false} onLoadError={
      (error) => {
        if (error.message === 'Invalid page request') {
          // ページの上限に到達
          if (onReachMax) {
            onReachMax();
          }
        }
      }
    } className={classes.page}/>
  </Document>
);

export default PdfViewer;
