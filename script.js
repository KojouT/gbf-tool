fetch("data/weapons.json")
    .then(response => response.json())
    .then(data => {

        console.log(data);

        const weaponList = document.getElementById("weapon-list");
    
        for (let i = 1; i <= 10; i++) {

        // プルダウンを作成
        const select = document.createElement("select");

        // 武器を追加
        data.forEach(weapon => {

            const option = document.createElement("option");

            option.value = weapon.id;
            option.textContent = weapon.name;

            select.appendChild(option);

        });

        weaponList.appendChild(select);

       }
    });