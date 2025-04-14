const phoneHunter = async (itemName,findMore) => {
    const ref = await fetch(`https://openapi.programming-hero.com/api/phones?search=${itemName}`)
    const data = await ref.json()
    const phones = data.data
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerText=''
    displayPhone(phones,findMore)
    



}


const displayPhone = (phones,findMore) => {
    const length=phones.length
    console.log(length)
   if(!findMore){
    phones=phones.slice(0,12) 
   }
  
    const showMore=document.getElementById('show-more')
    if(length>12 && !findMore){
        showMore.classList.remove('hidden')
    }
    else{
        showMore.classList.add('hidden')
    }
    const phoneContainer = document.getElementById('phone-container')
    phones.forEach(phone => {
       
        const div = document.createElement('div')
        div.innerHTML = `
         <div class="card bg-gray-200 p-6 rounded-2xl shadow-sm">
                <figure>
                    <img src=${phone.image} alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>There are many variations of passages of available, but the majority have suffered</p>
                    <div class="card-actions justify-end">
                        <button onClick="showMoreHandler('${phone.slug}')" id=${phone.slug} class="btn btn-primary">Show Details</button>
                    </div>
                </div>
            </div>
        `
        phoneContainer.appendChild(div)



    }
    )
loadingContainer(false)
}



const search=(findMore)=>{
const searchField=  document.getElementById('search-field')
const itemName=searchField.value
loadingContainer(true)
phoneHunter(itemName,findMore)



}

const loadingContainer=(isLoading)=>{
    const loading=document.getElementById('loading')
    if(isLoading){
        loading.classList.remove('hidden')
    }
    else{
        loading.classList.add('hidden')
    }
    
}

const showMore=()=>{
  search(true)
  loadingContainer(true)
}

const showMoreHandler= async (id)=>{
   const ref= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
   const data= await ref.json()
   const phone=data.data
   phoneDetails(phone)
}

const phoneDetails=(phone)=>{
    console.log(phone)
    my_modal_5.showModal()

    const phoneDetailsAll=document.getElementById('phone-details-all')
    phoneDetailsAll.innerHTML=`
    <img src="${phone.image}" alt="">
    <h3 class="text-lg font-bold">${phone.name}</h3>
    <p><span>Chipset:</span>${
        phone.mainFeatures.chipSet}</p>
    <p><span>Display Size:</span>${
        phone.mainFeatures.displaySize}</p>
    <p><span>Memory:</span>${
        phone.mainFeatures.memory}</p>
    
    `
    

}