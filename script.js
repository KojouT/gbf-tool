Promise.all([
    fetch("data/weapons.json")
        .then(response => response.json()),
    fetch("data/skills.json")
        .then(response => response.json())
])
    .then(([weapons, skills]) => {
        console.log(weapons);
        console.log(skills);

        const weaponList = document.getElementById("weapon-list");

        for (let i = 1; i <= 10; i++) {
            const label = document.createElement("p");
            label.textContent = `武器 ${i}:`;

            // プルダウンを作成
            const select = document.createElement("select");

            // 武器を追加
            weapons.forEach(weapon => {

                const option = document.createElement("option");

                option.value = weapon.id;
                option.textContent = weapon.name;

                select.appendChild(option);

            });

            select.addEventListener("change", function () {

                console.log(select.value);

                const selectedWeapon = weapons.find(weapon => weapon.id === select.value);

                console.log(selectedWeapon);

                console.log(selectedWeapon.skills);

                selectedWeapon.skills.forEach(skillName => {

                    const skillData = skills.find(skill => skill.name === skillName);

                    console.log(skillData);

                    console.log(skillData.effects);

                    skillData.effects.forEach(effect => {

                        console.log(effect);

                    });

                });

            });

            weaponList.appendChild(label);
            weaponList.appendChild(select);

        }
    });