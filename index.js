const generateform = document.getElementsByClassName('generate-form')[0];
const imageGallery = document.getElementsByClassName('image-gallery')[0];

const UpdateImageCard(imgDataArray){
    imgDataArray.forEach((imgObject ,index) => {
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector('img');
        const aiGeneratedImg ;
        
    });

}


async function generateAiImages(userPrompt , userimgQuantity){
    const OPENAI_API_KEY="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"
    let options={
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            'prompt':userPrompt,
            'n':parseInt(userimgQuantity), 
            'size':'512x512',
            'response_format':'b64_json', 
        })
        
    }
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations",options );   
        if (!response.ok) {
            console.log('Response Status:', response.status);
            console.log('Status Text:', response.statusText);
            const responseBody = await response.text();
            console.log('Response Body:', responseBody);
            throw new Error("Failed to Generate image! Please try again");
        }
        const data = await response.json(); 
        console.log(data)
        UpdateImageCard ([...data])
    } catch (error) {
      console.error(error);
        
    }
    
    
}

function handleformSubmission(e){
    e.preventDefault();
   
    const userPrompt = e.srcElement[0].value; 
    const userimgQuantity = e.srcElement[1].value  
    console.log(userPrompt, userimgQuantity)

    const imgcardMarkup = Array.from( {length:userimgQuantity},()=>  
    `<div class="image-card loading">
        <img src="spinner.svg" alt="image" >
        <a href="#" class="download-btn">
            <img src="download.svg" alt="download-btn" > 
        </a>
    </div>`
    )
// let imgcardMarkup=""
// for(let i=1 ; i<=userimgQuantity ; i++){
   
//      imgcardMarkup += `<div class="image-card loading">
//              <img src="spinner.svg" alt="image" >
//              <a href="#" class="download-btn">
//                  <img src="download.svg" alt="download-btn" > 
//            </a>
//        </div>`
// }


    imageGallery.innerHTML = imgcardMarkup;  
    generateAiImages(userPrompt , userimgQuantity)
}


generateform.addEventListener('submit', handleformSubmission) 