// Your code here
/*
let url=("http://localhost:3000/films")
let ulfilms=document.getElementById("films")
let idBuyticket =document.getElementById("but-ticket")

function show(value){
    console.log(value)
}

function grabMovie() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
ulfilms.innerText=""
for(value of data)
addMovies(value)

    })
    .catch(e => {
        show(e.message); // Handle error in fetching data
    });
}

grabMovie()

function addMovies(moivie){
    movieTitle = movie.title
    movieId = movie.id
    let liFilm = document.createElement("li");
           liFilm.innerText=movieTitle;
           //liFilm.setAttribute("id",movieId)
           ulfilms.appendChild(liFilm)
}
           liFilm.addEventListener('click',  e=> {
            show(movies.id)
            let movieImg=document.getElementById("poster")
            let idTitle=document.getElementById("title")
            let idRuntime=document.getElementById("runtime")
            let idFilmInfo=document.getElementById("Film-info")
            let idShowtime=document.getElementById("show-time")
            let idTicketnum=document.getElementById("Ticketnum")
            let idBuyticket=document.getElementByI("Buy-ticket")
           })

let remaining =movies.capacity -movies.ticket

            liFilm.addEventListener()('click', e =>{
            movieImg.src =movies.poster;
            movieImg.alt =movies.title;
            idTitle.innerText=movie.title
            idRuntime.innerText=movie.runtime+ "minutes"
            idFilmInfo.innerText=movies.description
            idShowtime.innerText=movies.idShowtime
            idTicketnum.innerText=remainig
        
           })*/

        // Function to fetch movie data and populate the films list
           function fetchAndPopulateFilms() {
                fetch("/films")
                    .then(response => response.json())
                    .then(data => {
                        filmsList.innerHTML = ""; // Clear existing list
                        data.forEach(movie => {
                            const li = document.createElement("li");
                            li.textContent = movie.title;
                            li.classList.add("film-item");
                            if (movie.tickets_sold === movie.capacity) {
                                li.classList.add("sold-out");
                            }
                            filmsList.appendChild(li);
                            li.addEventListener("click", () => showMovieDetails(movie.id));
                        });
                    })
                    .catch(error => console.error("Error fetching films:", error));
            }
        
            // Function to show movie details
            function showMovieDetails(id) {
                fetch(`/films/${id}`)
                    .then(response => response.json())
                    .then(movie => {
                        // Display movie details in the UI
                        // For example:
                        // document.getElementById("poster").src = movie.poster;
                        // document.getElementById("title").textContent = movie.title;
                        // document.getElementById("runtime").textContent = `${movie.runtime} minutes`;
                        // document.getElementById("showtime").textContent = movie.showtime;
                        // document.getElementById("description").textContent = movie.description;
                        // document.getElementById("ticket-num").textContent = movie.capacity - movie.tickets_sold;
                        // Show buy ticket button or "Sold Out" based on availability
                        // For example:
                        // const buyButton = document.getElementById("buy-ticket");
                        // if (movie.tickets_sold === movie.capacity) {
                        //     buyButton.textContent = "Sold Out";
                        //     buyButton.disabled = true;
                        // } else {
                        //     buyButton.textContent = "Buy Ticket";
                        //     buyButton.disabled = false;
                        //     buyButton.addEventListener("click", () => buyTicket(movie));
                        // }
                    })
                    .catch(error => console.error("Error fetching movie details:", error));
            }
        
            // Function to buy a ticket
            function buyTicket(movie) {
                if (movie.tickets_sold < movie.capacity) {
                    movie.tickets_sold++;
                    // Update tickets sold on the server
                    fetch(`/films/${movie.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            tickets_sold: movie.tickets_sold
                        })
                    })
                    .then(response => response.json())
                    .then(updatedMovie => {
                        // Update ticket count in the UI
                        // For example:
                        // document.getElementById("ticket-num").textContent = updatedMovie.capacity - updatedMovie.tickets_sold;
                        if (updatedMovie.tickets_sold === updatedMovie.capacity) {
                            // Movie is sold out, update UI accordingly
                            const filmItems = document.querySelectorAll(".film-item");
                            filmItems.forEach(item => {
                                if (item.textContent === updatedMovie.title) {
                                    item.classList.add("sold-out");
                                    // Disable buy button
                                    // document.getElementById("buy-ticket").textContent = "Sold Out";
                                    // document.getElementById("buy-ticket").disabled = true;
                                }
                            });
                        }
                        // Add ticket to tickets endpoint in the database
                        // You can make a POST request here if needed
                    })
                    .catch(error => console.error("Error buying ticket:", error));
                }
            }
        
            // Function to delete a film
            function deleteFilm(id) {
                fetch(`/films/${id}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (response.ok) {
                        // Remove film from the UI
                        // For example:
                        // const filmItem = document.querySelector(`[data-id="${id}"]`);
                        // if (filmItem) filmItem.remove();
                    } else {
                        console.error("Failed to delete film:", response.statusText);
                    }
                })
                .catch(error => console.error("Error deleting film:", error));
            }
        
            // Event listener for buy ticket button
            // document.getElementById("buy-ticket").addEventListener("click", () => buyTicket(movie));
        
            // Fetch and populate films on page load
            fetchAndPopulateFilms();
    
        