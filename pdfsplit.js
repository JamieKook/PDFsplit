const extract = require("pdf-text-extract"); 
const path =  require ("path"); 
const fs = require ("fs"); 
const hummus = require("hummus"); 
const PDFImage = require("pdf-image").PDFImage; 
const pdfFile = path.join(__dirname, 'source.pdf'); 
const outputFolder = path.join(__dirname, "/output"); 

fs.readdirSync(outputFolder).filter((file) => {
    fs.unlinkSync(path.join(outputFolder, file));
  });


extract (pdfFile, (err, pages) => {
    if (err) console.dir(err); 
    for (let i=0; i<pages.length; i++){
        const pdfWriter = hummus.createWriter(path.join(outputFolder, `Page${i}.pdf`)); 
        pdfWriter.appendPDFPagesFromPDF(pdfFile, {type: hummus.eRangeTypeSpecific, specificRanges: [ [i, i]]}); 
        pdfWriter.end(); 
    }

    fs.readdirSync(outputFolder).filter((file) => {
        console.log(`${outputFolder}/${file}`); 
        const pdfImage= new PDFImage(`${outputFolder}/${file}`);
        pdfImage.convertPage(0).then(function (outputFolder){
            console.log(`converted ${file}`); 
            fs.existsSync(path.join(outputFolder, `${file}.png`)); 
        });
      });
}); 

