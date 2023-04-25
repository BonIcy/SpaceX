document.addEventListener("DOMContentLoaded", getCards)
function getCards(){
    let url =`https://api.spacexdata.com/v3/launches`
    fetch(url)
    .then(result=>{
        console.log(result);
        return result.json()
    })
    .then(data=>{
        console.log(data);
        show(data);
    })
}
function show(cards){
    let cont = document.querySelector("#cards")
    let plantilla= ""
    cards.forEach(card=>{
        let {flight_number, mission_name,links,launch_year, rocket} = card
        plantilla+=`
        <div class="card bg-dark" style="width: 28rem;">
        <div class="card-body bg-dark">
            <h5 class="card-title" style="color:white;">Mission name: ${mission_name}</h5>
        </div>
        <img src="${links.mission_patch}"  alt="...">

        <ul class="list-group list-group-flush bg-dark">
            <li class="list-group-item bg-dark"style="border-color:transparent; color:white;">Rocket name: ${rocket.rocket_name}</li>
            <li class="list-group-item bg-dark"style="border-color:transparent; color:white;">Flight number: ${flight_number}</li>
            <li class="list-group-item bg-dark"style="border-color:transparent; color:white;">Launch Year: ${launch_year}</li>
        <button class="btn btn-primary btnDetail" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" vid="${links.youtube_id}" title="${mission_name}" year="${launch_year}" id="${rocket.rocket_id}" type="${rocket.rocket_type} launch=${rocket.first_stage.cores.landing_intent}">More about this...</button>
     </ul>
    </div>`
    })
    cont.innerHTML = plantilla
    cont.addEventListener(`click`,(e)=>{
        let htmlTitle="";
        let htmlModal="";
        let htmlTable="";
        let modalTitle = document.querySelector(".modal-title");
        let modalBody = document.querySelector(".modal-body");

        let btnDetail = e.target.classList[2]
        if(btnDetail == `btnDetail`){
            let vid = e.target.getAttribute(`vid`);
            let title = e.target.getAttribute(`title`);
            let year = e.target.getAttribute(`year`)
            let id = e.target.getAttribute(`id`)
            let type = e.target.getAttribute(`type`)
            let launch = e.target.getAttribute(`launch`)
            htmlModal+=`
            <table class="table text-light">
                  <thead>
                  <iframe width="460" height="315" src="https://www.youtube.com/embed/${vid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <tr>
                      <th scope="col">Mission name</th>
                      <th scope="col">Launch Year</th>
                      <th scope="col">Rocket id</th>
                      <th scope="col">Rocket type</th>
                      <th scope="col">Launch success</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${title}</td>
                      <td>${year}</td>
                      <td>${id}</td>
                      <td>${type}</td>
                      <td>${launch}</td>
                    </tr>
                  </tbody>
                </table>
          `
          htmlTitle += `${title}`
          modalBody.innerHTML = htmlModal + htmlTable;
          modalTitle.innerHTML = htmlTitle;
  
        }
    })
}