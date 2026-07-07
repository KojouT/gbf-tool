fetch("data/weapons.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });