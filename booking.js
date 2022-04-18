// getting loggedin user info here
const user = JSON.parse(localStorage.getItem("user"));

if (!user?.userName) {
  window.location.href = "index.html";
}

// getting all the seats class here
const seats = document.querySelectorAll(".seat");
const bookBtn = document.getElementById("book-btn");
const cancelBtn = document.getElementById("cancel-btn");

// date here
let today = new Date().toLocaleDateString();

for (let i = 0; i < seats?.length; i++) {
  const seat = seats[i];

  // highlighting booked seats here
  const bookedTicket = JSON.parse(localStorage.getItem("bookedTicket"));
  if (bookedTicket?.length) {
    for (let i = 0; i < bookedTicket?.length; i++) {
      if (bookedTicket[i].seatNo === seat.innerText) {
        seat.classList.add("btn-danger");
      } else {
        seat?.classList.add("btn-primary");
      }
    }
  }

  seat.addEventListener("click", () => {
    const selectedSeat = JSON.stringify(seat.innerText);
    localStorage.setItem("seatInfo", selectedSeat);
  });
}

bookBtn.addEventListener("click", async () => {
  // getting seat info here
  const seatInfo = await JSON.parse(localStorage.getItem("seatInfo"));
  //   getting ticket info here
  const bookedTicket = await JSON.parse(localStorage.getItem("bookedTicket"));

  if (bookedTicket?.length) {
    for (let i = 0; i < bookedTicket?.length; i++) {
      if (seatInfo === bookedTicket[i]?.seatNo) {
        return alert("This ticket is already sold !");
      }
    }
  }

  // booking ticket here
  let ticketInfo = {
    seatNo: seatInfo,
    name: user?.userName,
    data: today,
  };

  if (seatInfo && user?.userName) {
    let allTickets = [];
    if (bookedTicket) {
      localStorage.removeItem("bookedTicket");
      allTickets = [...bookedTicket, ticketInfo];
    } else {
      allTickets.push(ticketInfo);
    }

    const ticketInfoJson = JSON.stringify(allTickets);

    localStorage.setItem("bookedTicket", ticketInfoJson);
    localStorage.removeItem("seatInfo");
    alert("Ticket booked successfully !!!");
    for (let i = 0; i < seats?.length; i++) {
      const seat = seats[i];
      if (seatInfo === seat.innerText) {
        seat.classList.add("btn-danger");
      }
    }
    ticketInfo = {};
  } else {
    return alert("Please select a seat for book !");
  }
});

cancelBtn.addEventListener("click", () => {
  //  booked seats here
  const bookedTicket = JSON.parse(localStorage.getItem("bookedTicket"));
  const seatInfo = JSON.parse(localStorage.getItem("seatInfo"));
  if (seatInfo) {
    const newAllData = bookedTicket.filter((item) => item?.seatNo !== seatInfo);
    const allDataJson = JSON.stringify(newAllData);
    localStorage.setItem("bookedTicket", allDataJson);
    alert("Deleted succesfully !");
    localStorage.removeItem("seatInfo");
    window.location.reload();
  }
});
