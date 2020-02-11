// const extract = require("pdf-text-extract"); 
const path =  require ("path"); 
const fs = require ("fs"); 
// const hummus = require("hummus"); 
const PDFImage = require("pdf-image").PDFImage; 


const outputFolder = path.join(__dirname, "/output"); 



//code to move file to different folder: 
    // const dest = path.resolve(path.join(__dirname, "/tmp"), pdfFile); 

    // fs.rename(pdfFile, dest, (err)=>{
    //     if (err) throw err; 
    //     else console.log("Successfully moved"); 
    // }); 

//Code to erase folder contents
    // fs.readdirSync(outputFolder).filter((file) => {
    //     fs.unlinkSync(path.join(outputFolder, file));
    //   });

class PdfHandling { 
//Code to split pdf into different images

    createTempBookFolder(bookId){
        const dir = `./tmp/${bookId}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    }

    addBookToFolder(bookPDF, bookId){
        const file = path.basename(bookPDF); 
        const dir = `./tmp/${bookId}`;
        const dest = `./tmp/${bookId}/source.pdf`;
        fs.rename(bookPDF, dest, (err) =>{
            if (err) throw err; 
        }); 
    }

    createImages(bookId){
        const pdfFile = path.join(__dirname, `/tmp/${bookId}/source.pdf`); 
        const pdfImage = new PDFImage(pdfFile);
        pdfImage.convertFile().then(function (imagePaths) {
// Don't need this code if they are in the same temp file, only to move the files
            // console.log(imagePaths); 
            // for (let i=0; i<imagePaths.length; i++){
            //     const file = path.basename(imagePaths[i]); 
            //     //Code to create new folder
            //     const dir = `./tmp/${bookId}`;
            //     // if (!fs.existsSync(dir)){
            //     //     fs.mkdirSync(dir);
            //     // }
            //     const dest = path.resolve(dir, file);
            //     fs.rename(imagePaths[i], dest, (err) =>{
            //         if (err) throw err; 
            //     }); 
            // }
        });
    }

    deleteTempBookFolder(bookId){
        const tempFolder = path.join(__dirname, `/tmp/${bookId}`); 
        fs.readdirSync(tempFolder).filter((file) => {
            fs.unlinkSync(path.join(tempFolder, file));
        });
        fs.rmdirSync(tempFolder); 
    }

}

module.exports= PdfHandling; 

//Code to split pdf and then save as png
// extract (pdfFile, (err, pages) => {
//     if (err) console.dir(err); 
//     for (let i=0; i<pages.length; i++){
//         const pdfWriter = hummus.createWriter(path.join(outputFolder, `Page${i}.pdf`)); 
//         pdfWriter.appendPDFPagesFromPDF(pdfFile, {type: hummus.eRangeTypeSpecific, specificRanges: [ [i, i]]}); 
//         pdfWriter.end(); 
//     }

//     fs.readdirSync(outputFolder).filter((file) => {
//         console.log(`${outputFolder}/${file}`); 
//         const pdfImage= new PDFImage(`${outputFolder}/${file}`);
//         pdfImage.convertPage(0).then(function (outputFolder){
//             console.log(`converted ${file}`); 
//             fs.existsSync(path.join(outputFolder, `${file}.png`)); 
//         });
//       });
// }); 

