let xp=0;
let health=100;
let gold=50;
let currentWeapon=0;
let fighting;
let monsterHealth;
let inventory=["stick"];

const button1=document.querySelector('#button1');
const button2=document.querySelector('#button2');

const button3=document.querySelector('#button3');
const text=document.querySelector('#text');
const xpText=document.querySelector('#xpText');

const healthText=document.querySelector('#healthText');
const goldText=document.querySelector('#goldText');
const monsterStats=document.querySelector('#monsterStats');

const monsterNameText=document.querySelector('#monsterName');

const monsterHealthText=document.querySelector('#monsterHealth');
const weapons=[{
    name:"stick",
    power:5
},
{
    name:"dagger",
    power:30
},
{
    name:"claw",
    power:50
},
{
    name:"sword",
    power:100
}];
const monsters=[
    {
        name:"slime",
        level:2,
        health:15

    },
    {
        name:"fanged beast",
        level:8,
        health:60

    },
    {
        name:"dragon",
        level:20,
        health:300

    }
];
const locations=[
    {
        name:"town square",
        "button text":["Go to store","Go to cave","Fight dragon"],
        "button functions":[goStore,goCave,fightDragon],
        text:"you are in town square ,you see sign that says\"store\"."

    },
    {
        name:"store",
       "button text":["buy 10 health(10 gold)", "buy weapon(30 gold)","go to town square"],
       "button functions": [buyHealth,buyWeapon,goTown],
        text:"you entered store.."

    },
    {
        name:"cave",
       "button text":["fight slime", "fight beast","go to town square"],
       "button functions": [fightSlime,fightBeast,goTown],
        text:"you see monsters.."
        
    },
    {
        name:"fight",
       "button text":["attack", "dodge","run"],
       "button functions": [attack,dodge,goTown],
        text:"you are fighting monsters.."
        
    },
    {
        name:"kill monster",
       "button text":["go to towns square", "go to towns square","go to towns square"],
       "button functions": [goTown,goTown,goTown],
        text:'monster screams "Arg!" as it dies.u gain experience points and find gold.'
        
    },
    {
    name:"lose",
    "button text":["REPLAY!", "REPLAY!","REPLAY!"],
    "button functions": [restart,restart,restart],
     text:"you die."
    },
    {
        name:"win",
        "button text":["REPLAY!", "REPLAY!","REPLAY!"],
        "button functions": [restart,restart,restart],
         text:"you defeat the dragon! YOU WN THE GAME!."
        }

    
]

button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

function update(location){
    monsterStats.style.display="none";
    button1.innerHTML=location["button text"][0];
    button2.innerHTML=location["button text"][1];
    button3.innerHTML=location["button text"][2];
    button1.onclick=location["button functions"][0];
   button2.onclick=location["button functions"][1];
   button3.onclick=location["button functions"][2];
   
   text.innerHTML=location.text;

}
function goTown(){
update(locations[0]);

    
}


function goStore(){
    update(locations[1]);

}

function goCave(){
    update(locations[2]);

}



function buyHealth(){
    if( gold>=10){
gold=gold-10;
health=health+10;
goldText.innerHTML=gold;
healthText.innerHTML=health;
}
else{
    text.innerHTML="no enough gold";
}
}
function buyWeapon(){
    if(currentWeapon<weapons.length-1){
    if (gold>=30){
        gold-=30;
        currentWeapon++;
        goldText.innerHTML=gold;
        let newWeapon=weapons[currentWeapon].name;
        text.innerHTML="you have new weapon";
        text.innerHTML="you have a " +newWeapon+"."; 
        inventory.push(newWeapon);
        text.innerHTML+="In ur inventory you have:"+inventory      
     }else{
        text.innerHTML="no enough gold";
     }
    }
    else{
        text.innerHTML="you have more powerful weapon!.";
        button2.innerHTML="sell weapon for 15 gold";
        button2.onclick=sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length>1){
        gold+=15;
        goldText.innerHTML=gold;
        let currentWeapon=inventory.shift();
        text.innerHTML="you sold "+currentWeapon+".";
        text.innerHTML+="in ur inventory u have:"+inventory;
    }
    else{
        text.innerHTML="dont sell ur only weapon!";
    }
}
function fightSlime(){
  fighting=0;
  goFight();
}
function fightBeast(){
 fighting=1;
 goFight();
}

function fightDragon(){
fighting=2;
goFight();
}

function goFight(){
update(locations[3]);
monsterHealth=monsters[fighting].health;

monsterNameText.innerHTML=monsters[fighting].name;
monsterHealthText.innerHTML=monsterHealth;
}

function attack(){
text.innerHTML="the"+monsters[fighting].name+"attacks";
text.innerHTML+="you attack it ur"+weapons[currentWeapon].name+".";
if(isMonsterHit()){
    health-=getMonsterAttackValue(monsters[fighting].level);
}
else{
    text.innerHTML+="you miss";
}

monsterHealth-=weapons[currentWeapon].power+Math.floor(Math.random()*xp)+1;
healthText.innerHTML=health;
monsterHealthText.innerHTML=monsterHealth;
if(health<=0){
    lose();
}
else if(monsterHealth<=0){
if(fighting===2){
    winGame();
}
else{
    defeatMonster();
}
}
}

function getMonsterAttackValue(level){
let hit=(level*5)-(Math.floor(Math.random()*xp));
console.log(hit);
return hit;
}
function isMonsterHit(){
    return Math.random()>.2||health<20;
}

function dodge(){
text.innerHTML="u dodge attack  from "+monsters[fighting].name+".";
}
function lose(){
update(locations[5]);
}

function winGame(){
    update(locations[6]);
}
function defeatMonster(){
    gold+=Math.floor(monsters[fighting].level*6.7);
    xp+=monsters[fighting].level;
    goldText.innerHTML=gold;
    xpText.innerHTML=xp;
    update(locations[4]);

}
function restart(){
     xp=0;
 health=100;
 gold=50;
 currentWeapon=0;
 
 inventory=["stick"];
 goldText.innerHTML=gold;
 healthText.innerHTML=health;
 xpText.innerHTML=xp;
 goTown();

}