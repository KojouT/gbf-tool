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
        const result = document.getElementById("result");

        const weaponSelects = [];

        function calculateResult() {

            const totals = {
                normalAttack: 0
            };

            weaponSelects.forEach(select => {

                const selectedWeapon = weapons.find(weapon => weapon.id === select.value);

                selectedWeapon.skills.forEach(skillName => {

                    const skillData = skills.find(skill => skill.name === skillName);

                    skillData.effects.forEach(effect => {

                        if (effect.type === "normal_attack") {

                            totals.normalAttack += effect.value;

                        }

                    });

                });

                result.textContent = `攻刃 : ${totals.normalAttack}%`;

            });

        }

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

                calculateResult();

            });

            weaponList.appendChild(label);
            weaponList.appendChild(select);
            weaponSelects.push(select);

        }

    });