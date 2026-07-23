Promise.all([
    fetch("data/weapons.json")
        .then(response => response.json()),
    fetch("data/skills.json")
        .then(response => response.json())
])
    .then(([weapons, skills]) => {

        const weaponList = document.getElementById("weapon-list");
        const result = document.getElementById("result");
        const baseAttackInput = document.getElementById("base-attack");
        const normalAuraInput = document.getElementById("normal-aura");
        const magnaAuraInput = document.getElementById("magna-aura");

        console.log("通常加護:", normalAuraInput.value);
        console.log("マグナ加護:", magnaAuraInput.value);

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

        function calculateAttackMultiplier(totals, auras) {
            const normalAttackMultiplier = 1 +
                (totals.normal_attack / 100) *
                (1 + auras.normal / 100);

            const magnaAttackMultiplier = 1 +
                (totals.magna_attack / 100) *
                (1 + auras.magna / 100);

            const exAttackMultiplier = 1 + totals.ex_attack / 100;

            const attackMultiplier =
                normalAttackMultiplier *
                magnaAttackMultiplier *
                exAttackMultiplier;

            return {
                normal: normalAttackMultiplier,
                magna: magnaAttackMultiplier,
                ex: exAttackMultiplier,
                total: attackMultiplier
            };
        }

        function calculateAttackPower(baseAttack, attackMultiplier) {
            return baseAttack * attackMultiplier;
        }

        //計算と表示
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

            });

            let resultText = "";

            Object.entries(totals).forEach(([key, value]) => {

                if (value === 0) {
                    return;
                }

                const label = effectNames[key] ?? key;

                resultText += `${label} : ${value}%\n`;
            });

            const auras = {
                normal: Math.max(
                    0,
                    Number(normalAuraInput.value) || 0
                ),

                magna: Math.max(
                    0,
                    Number(magnaAuraInput.value) || 0
                )
            };

            const attackMultipliers = calculateAttackMultiplier(
                totals,
                auras
            );

            const attackMultiplier = attackMultipliers.total;

            const baseAttack = Math.max(
                0,
                Number(baseAttackInput.value) || 0
            );

            const attackPower = calculateAttackPower(
                baseAttack,
                attackMultiplier
            );

            const roundedAttackPower = Math.round(attackPower);

            resultText += `\n総合攻撃力倍率: ${attackMultiplier.toFixed(3)}倍\n`
            resultText += `\n仮の攻撃力: ${roundedAttackPower.toLocaleString("ja-JP")}\n`;

            result.textContent = resultText;
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

        //攻撃力のイベントリスナー
        baseAttackInput.addEventListener("input", () => {
            calculateResult();
        });
        normalAuraInput.addEventListener("input", () => {
            calculateResult();
        });
        magnaAuraInput.addEventListener("input", () => {
            calculateResult();
        });


        // ページを開いた直後の初回計算
        calculateResult();

    });