const textPieniazki = document.getElementById("textPieniazki");
const textJan = document.getElementById("textJan");
const textJeremiasz = document.getElementById("textJeremiasz");
const AttackButton = document.getElementById("attackbutton");
const Resp = document.getElementById("respawnbutton");
const Reset = document.getElementById("reset");
const ArmorBuy = document.getElementById("armorbuy");
const Odrodzenie = document.getElementById("odrodzenie");
const obrcrit = document.getElementById("obrcrit");
const CritBuy = document.getElementById("critbuy");
const DmgBuy = document.getElementById("dmgbuy");
const OmniBuy = document.getElementById("omnibuy");

var pieniazki = 0;
var worldlevel = 0;
var worlddmglvl = 0;
var worldomnivamp = 0;
var worldrebirth = 0;
var worldcrit = 100;
var armorjan = 0;

Resp.disabled = true;
Reset.disabled = true;

function sync() {
    textPieniazki.innerText = "Piwerko: " + pieniazki;
    textJan.innerText = "HP: " + JanZieloneDrzewo.hp;
    textJeremiasz.innerText = "Boss HP: " + Boss1.hp;
    
    if(pieniazki >= 500) {
        ArmorBuy.disabled = false;
    }
    // tego nie uzywac idzie do innej funkcji\
    // if(pieniazki >= 2000) {
    //     CritBuy.disabled = false;
    // }
    // if(pieniazki >= 10000) {
    //     DmgBuy.disabled = false;
    // }
    // if(pieniazki >= 100000) {
    //     OmniBuy.disabled = false;
    // }
}

class Boss {
    constructor(_hp, _armor, _magicresist, _armorpen, _magicpen, _nuts, _magicdmg, _width, _height, _physicaldamage, _coindrop, _omnivamp) {
        this.hp = _hp,
        this.armor = _armor,
        this.magicresist = _magicresist,
        this.armorpen = _armorpen,
        this.magicpen = _magicpen,
        this.nuts = _nuts,
        this.magicdmg = _magicdmg,
        this.width = _width,
        this.height = _height,
        this.physicaldamage = _physicaldamage,
        this.coindrop = _coindrop,
        this.omnivamp = _omnivamp,
        this.attack = (enemy) => {
            if (this.hp > 0) {
                let dmg = enemy.hp - (this.nuts / enemy.armor);
                enemy.hp = dmg < 0 ? 0 : dmg;
            }
        }
    }
}

var Boss1 = new Boss(100, 1, 1, 1, 1, 5, 1, 100, 200, 100, 500, 2);

var JanZieloneDrzewo = {
    hp: 40,
    armor: 1,
    magicresist: 0,
    armorpen: 0,
    magicpen: 0,
    nuts: 10,
    magicdmg: 0,
    width: 0,
    height: 0,
    physicaldamage: 0,
    omnivamp: 0,
    attack(enemy) {
        if (this.hp > 0) {
            let dmg = enemy.hp - (this.nuts / enemy.armor);
            enemy.hp = dmg < 0 ? 0 : dmg;
        }
    }
}; 

function zaatakuj(kto, kogo)  {
    console.log(JanZieloneDrzewo.armor);
    obrcrit.style.opacity = 0;
    document.getElementById("dmg1").innerHTML = "DMG " + JanZieloneDrzewo.nuts;
    document.getElementById("armor1").innerHTML = "ARMOR " + JanZieloneDrzewo.armor;
    document.getElementById("omnivamp1").innerHTML = "OMNIVAMP " + JanZieloneDrzewo.omnivamp;
    kto.attack(kogo);
    if (Math.random() < 0.1) {
        kogo.attack(kto);
        kogo.hp += kogo.omnivamp;
    }


        // crit dmg do sklepu

    if (Math.random() < 0.25) {
        kto.nuts = 2323232+worlddmglvl*10;
        console.log(kto.nuts)
        obrcrit.style.opacity = 1;
    }



    if (kogo.hp <= 0) {
        pieniazki += kogo.coindrop+100;
        AttackButton.disabled = true;
        Resp.disabled = false;
        sync();
    }

    if (kto.hp <= 0) {
        AttackButton.disabled = true;
        Reset.disabled = false;
        pieniazki -= 100;
        sync();
    }

    textJan.innerText = "HP: " + Math.floor(JanZieloneDrzewo.hp*10)/10;
    textJeremiasz.innerText = "Boss HP: " + Math.floor(Boss1.hp*10)/10;
    
    sync();
};

function nowyboss() {
    worldlevel += 1;
    worlddmglvl += 1;
    AttackButton.disabled = false;
    Resp.disabled = true;
    Boss1 = new Boss(100+worldlevel*20, 1, 1, 1, 1, 5+worlddmglvl*40, 1, 100, 200, 100, 500, 2+worldomnivamp*3);
    JanZieloneDrzewo = {
        hp: 40+worldlevel*10,
        armor: 1+armorjan,
        magicresist: 0,
        armorpen: 0,
        magicpen: 0,
        nuts: 10+worlddmglvl*5,
        magicdmg: 0,
        width: 0,
        height: 0,
        physicaldamage: 0,
        omnivamp: 0,
        attack(enemy) {
            if (this.hp > 0) {
                let dmg = enemy.hp - (this.nuts / enemy.armor);
                enemy.hp = dmg < 0 ? 0 : dmg;
            }
        }
    }; 
    sync()
} 

function reset() {
    AttackButton.disabled = false;
    Reset.disabled = true;
    JanZieloneDrzewo = {
        hp: 40+worldlevel*10,
        armor: 1+armorjan,
        magicresist: 0,
        armorpen: 0,
        magicpen: 0,
        nuts: 10+worlddmglvl*5,
        magicdmg: 0,
        width: 0,
        height: 0,
        physicaldamage: 0,
        omnivamp: 0,
        attack(enemy) {
            if (this.hp > 0) {
                let dmg = enemy.hp - (this.nuts / enemy.armor);
                enemy.hp = dmg < 0 ? 0 : dmg;
            }
        }
    }; 
    sync()
}

function odrodzenie() {
    Odrodzenie.disabled = true;
    AttackButton.disabled = false;
}

function buyitem1() {
    armorjan += 1;
    pieniazki -= 500;
    JanZieloneDrzewo.armor += 1;
    if(pieniazki < 500) {
        ArmorBuy.disabled = true;
    }

    //to tez 8)
    // if(pieniazki < 2000) {
    //     CritBuy.disabled = true;
    // }
    // if(pieniazki < 10000) {
    //     DmgBuy.disabled = true;
    // }
    // if(pieniazki < 100000) {
    //     OmniBuy.disabled = true;
    // }
    sync();
}

sync();
