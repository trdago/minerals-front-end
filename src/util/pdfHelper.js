
export const seePDFBase64 = async(documentos) =>
{
    for(const arch of documentos)
    {
         
        const blob = await base64ToBlob(arch.documento, arch.contentType)
        
        const url = window.URL.createObjectURL(blob) 
        try {
            window.open(url,'_blank') 
            
        } catch (error) {
            return error
        }
    }

}


export const seePDF = async(documentos) =>
{
    for(const arch of documentos)
    {
        const contentType = 'application/pdf'
        let  b64Data = JSON.parse(arch.documento)

        b64Data = b64Data.base64.split(',')[1] 
        const blob = await base64ToBlob(b64Data, contentType)
        
        const url = window.URL.createObjectURL(blob) 
        try {
            window.open(url,'_blank') 
            
        } catch (error) {
            return error
        }
    }

}


export const downloadPDF = async(documentos) =>
{
    for(const arch of documentos)
    {
        if(!arch.documento) continue

        const pdf = JSON.parse(arch.documento)  
        const downloadLink = document.createElement("a")
        downloadLink.download = pdf.name
        downloadLink.href = pdf.base64;
        downloadLink.click()  
    } 

}
export const downloadPDFBase64 = async(documentos) =>
{
    for(const arch of documentos)
    {
        if(!arch.documento) continue 

        
        let doc = await base64ToBlob(arch.documento, arch.contentType)
        
        const downloadLink = document.createElement("a")
        downloadLink.download = arch.nombre
        downloadLink.href = URL.createObjectURL(doc)
        downloadLink.click()  
    }

}



async function base64ToBlob(b64Data, contentType='', sliceSize=512) 
{  
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, {type: contentType})
    return blob 

}