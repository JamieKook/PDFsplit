const PdfHandling = require("./pdfsplit"); 
const path= require("path"); 

const pdfHandling = new PdfHandling(); 

const pdfFile = path.join(__dirname, 'The Aged Mother 2.pdf'); 

pdfHandling.deleteTempBookFolder(2); 


