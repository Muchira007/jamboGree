import axios from 'axios';

// Function to fetch and print a PDF
export const fetchAndPrintPDF = async (pdfUrl: string): Promise<void> => {
    try {
      // Fetch the PDF from the given URL
      const response = await axios.get(pdfUrl, {
        responseType: 'blob', // Important to get the PDF as a blob
      });
  
      // Create a URL for the PDF blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank'; // Open in a new tab
      link.download = 'document.pdf'; // Optional: set the default file name
      link.click(); // Trigger download
  
      // Optional: Open in a new window for printing
      window.open(url, '_blank');
  
      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error fetching or printing PDF:', error);
    }
  };
  
// Function to fetch and download an Excel file
export const fetchAndPrintExcel = async (excelUrl: string): Promise<void> => {
  try {
    // Fetch the Excel file URL from the given endpoint
    const response = await axios.get(excelUrl, {
      responseType: 'blob', // Important to get the file as a blob
    });

    // Create a URL for the Excel blob
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Open the Excel file in a new tab
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank'; // Open in a new tab
    link.download = 'document.xlsx'; // Optional: set the default file name
    link.click(); // Trigger download

    // Clean up
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error fetching or printing Excel file:', error);
  }
};

// Example usage
// const handleDownloadExcel = async () => {
//     try {
//       // Fetch the URL from your API
//       const response = await axios.get('http://localhost:3000/download-excel');
//       const { excelUrl } = response.data;
  
//       // Fetch and print the Excel file
//       await fetchAndPrintExcel(excelUrl);
//     } catch (error) {
//       console.error('Error fetching Excel URL:', error);
//     }
//   };
  