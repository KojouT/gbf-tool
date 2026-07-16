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

        const effectNames = {
            normal_attack: "攻刃",
            magna_attack: "M攻刃",
            ex_attack: "EX攻刃",
            strength: "渾身",
            critical: "クリティカル",
            additional_attack: "追撃",
            skill_boost: "スキル効果量UP",
            DA_probability: "ダブルアタック確率",
            TA_probability: "トリプルアタック確率",
            HP: "HP",
            vs_advantage_damage_up: "対有利与ダメ",
            ab_limit_up: "アビD上限",
            charge_attack_damage_cap_up: "奥義D上限"
        };

        const weaponSelects = [];

        function calculateResult() {

            const totals = {};

            Object.keys(effectNames).forEach(effectType => {
                totals[effectType] = 0;

            });

            weaponSelects.forEach(select => {

                const selectedWeapon = weapons.find(weapon => weapon.id === select.value);

                selectedWeapon.skills.forEach(skillName => {

                    const skillData = skills.find(skill => skill.name === skillName);

                    skillData.effects.forEach(effect => {

                        totals[effect.type] += effect.value;

                    });

                });

                let resultText = "";

                Object.entries(totals).forEach(([key, value]) => {

                    if (value === 0) {
                        return;
                    }

                    const label = effectNames[key] ?? key;

                    resultText += `${label} : ${value}%\n`;

                });

                result.textContent = resultText;

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