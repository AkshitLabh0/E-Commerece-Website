const payBtn = document.querySelector(".btn-buy");

payBtn.addEventListener("click", () => {
  fetch("/stripe-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: JSON.parse(localStorage.getItem("cartItems")),
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      if (data && data.url) {
        // Redirect to the Stripe checkout URL
        window.location.href = data.url;
      } else {
        throw new Error("Invalid response from server");
      }
    })
    .catch((err) => {
      console.error("Error initiating Stripe checkout:", err);
      // Handle error: show an alert or log to console
      // For debugging purposes
    });
});

// const payBtn = document.querySelector(".btn-buy");

// payBtn.addEventListener("click", () => {
//   fetch("/stripe-checkout", {
//     method: "post",
//     headers: new Headers({ "Content-Type": "application/Json" }),
//     body: JSON.stringify({
//       items: JSON.parse(localStorage.getItem("cartItems")),
//     }),
//   })
//     .then((res) => res.json())
//     .then((url) => {
//       location.href = url;
//     })
//     .catch((err) => console.log(err));
// });
