fetch("data/weapons.json")
    .then(response => response.json())
    .then(data => {

        console.log(data);

        const weaponList = document.getElementById("weapon-list");

        for (let i = 1; i <= 10; i++) {
            const label = document.createElement("p");
            label.textContent = `武器 ${i}:`;

            // プルダウンを作成
            const select = document.createElement("select");

            // 武器を追加
            data.forEach(weapon => {

                const option = document.createElement("option");

                option.value = weapon.id;
                option.textContent = weapon.name;

                select.appendChild(option);

            });

            select.addEventListener("change", function () {

                console.log(select.value);

                const selectedWeapon = data.find(weapon => weapon.id === select.value);

                console.log(selectedWeapon);

            });

            weaponList.appendChild(label);
            weaponList.appendChild(select);

        }
    });