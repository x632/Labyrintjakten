
//fart på monstren och spelaren(ms)
var spelareTimer,timernAktiv=false;
var flyttatSpelare=0;
var direction=0;
var kartan='1';
var speletSlut=true;
var mySound;
var raknare=0;

//timerfunktionen (av)aktiveras av boolvariabeln 'timernAktiv'
function sattTimer(aktiv){
if (aktiv==true) {spelareTimer=setInterval('flyttaSpelare()', 500)}
else if (aktiv==false) {clearInterval(spelareTimer)}
}
function bytKarta(kartNummer) { 
    timernAktiv=false;sattTimer(timernAktiv);
    raderaGamlaPositioner()
    document.getElementById("scriptLinkPlaceholder").innerHTML = "";
    var newScript = document.createElement("script");
    newScript.src = "map" + kartNummer + ".js";
    newScript.id = "scriptLink";
    document.getElementById("scriptLinkPlaceholder").appendChild(newScript);
    ritaUtAllt();//timernAktiv=true;sattTimer(timernAktiv);
}
function ritaUtAllt()//skapa html divarna enligt arrayn och sätt css klasserna som utgör labyrinten 
        {   document.getElementById("labyrinten").innerHTML ="";
            for (var i=0;i<karta.length;i++)//y-koordinatet

                {
                    for(var j=0;j<karta[i].length;j++)//x-kordinatet
                    {
                        if (karta[i][j]===1)//vägg
                        {
                            document.getElementById("labyrinten").innerHTML +="<div class='vagg' id=y"+i+"x"+j+"></div>"      
                        }
                        else if (karta[i][j]===2)//tomrum
                        {
                            document.getElementById("labyrinten").innerHTML +="<div class='tomt' id=y"+i+"x"+j+"></div>" 
                        }
            
                    }      
                   document.getElementById("labyrinten").innerHTML +="<br>"//ny rad
                }
          
                      
        }

function flyttamonster(m1,m2,m3,m4){
    raderaGamlaPositioner();   
                switch (m1)
                {
                case(1): monster1pos.y -= 1;
                break;
                case(2): monster1pos.y += 1;
                break;
                case(3): monster1pos.x -= 1;
                break;
                case(4): monster1pos.x += 1;
                break;
                }
                switch (m2)
                {
                case(1): monster2pos.y -= 1;
                break;
                case(2): monster2pos.y += 1;
                break;
                case(3): monster2pos.x -= 1;
                break;
                case(4): monster2pos.x += 1;
                break;
                }
                switch (m3)
                {
                case(1): monster3pos.y -= 1;
                break;
                case(2): monster3pos.y += 1;
                break;
                case(3): monster3pos.x -= 1;
                break;
                case(4): monster3pos.x += 1;
                break;
                }
                switch (m4)
                {
                case(1): monster4pos.y -= 1;
                break;
                case(2): monster4pos.y += 1;
                break;
                case(3): monster4pos.x -= 1;
                break;
                case(4): monster4pos.x += 1;
                break;
                }
            karta[monster1pos.y][monster1pos.x]=4;
            var kord = gorStrang(monster1pos.y,monster1pos.x);
            document.getElementById(kord).className = "monster";
            karta[monster2pos.y][monster2pos.x]=4;
            kord = gorStrang(monster2pos.y,monster2pos.x)
            document.getElementById(kord).className = "monster";
            karta[monster3pos.y][monster3pos.x]=4;
            kord = gorStrang(monster3pos.y,monster3pos.x)
            document.getElementById(kord).className = "monster";
            karta[monster4pos.y][monster4pos.x]=4;
            kord = gorStrang(monster4pos.y,monster4pos.x)
            document.getElementById(kord).className = "monster";
            kollaMonsterKrock();//kolla om monsterkrock..          
            }
        
        function timingmonster(){ //den timade funktionen som sätter igång monsterflyttsfunktionen
           
            flyttamonster(monster1rorelse[raknare],
            monster2rorelse[raknare],
            monster3rorelse[raknare],
            monster4rorelse[raknare]);        
            raknare+=1;//steget i monsterrörelse-arrayn.
            if (raknare==monster1rorelse.length){raknare=0}; //monstrens rörelseschema startas om
                                  
      }
       
function gorStrang(a,b){
        var korY=a.toString();
        var korX=b.toString();
        var kor="y"+korY+"x"+korX;
        return kor;
       }
            
    
    function raderaGamlaPositioner(){
        karta[monster1pos.y][monster1pos.x]=2;//"radera" platsen där monstren stod
        var kord = gorStrang(monster1pos.y,monster1pos.x);
        document.getElementById(kord).className = "tomt";
        karta[monster2pos.y][monster2pos.x]=2;
        kord = gorStrang(monster2pos.y,monster2pos.x);
        document.getElementById(kord).className = "tomt";
        karta[monster3pos.y][monster3pos.x]=2;
        kord = gorStrang(monster3pos.y,monster3pos.x);
        document.getElementById(kord).className = "tomt";
        karta[monster4pos.y][monster4pos.x]=2;
        kord = gorStrang(monster4pos.y,monster4pos.x);
        document.getElementById(kord).className = "tomt";
    }
    //Byt riktning på spelaren och/eller kolla att det inte är vägg i vägen
    //1 = upp 2 = vänster 3 = höger 4 = ner
function bytriktning(riktning)
    {  
        //kolla om spelaren försökt backa ur planen
        if (spelarePos.y==0 && riktning == 1){riktning=0}
        // Kolla om spelaren har kommit i mål
        if (speletSlut==false){if (spelarePos.y==24) {vunnit();riktning=0}}
        //kolla så det är inte är vägg åt det håll spelaren går
        if (riktning==1 && karta[spelarePos.y-1][spelarePos.x] != 1)
        {direction=1;}
        else if (riktning==2 && karta[spelarePos.y][spelarePos.x-1] != 1)
        {direction=2;}
        else if (riktning==3 && karta[spelarePos.y][spelarePos.x+1]!=1)
        {direction=3;}
        else if (riktning==4 && karta[spelarePos.y+1][spelarePos.x]!=1)
        {direction=4;}
        else {direction=0;} //0 = annars stanna
        
       kollaMonsterKrock();}
    

function flyttaSpelare (){
    {
    if (flyttatSpelare<2){flyttatSpelare+=1};//ser till så monstren håller..
    if (flyttatSpelare==2){timingmonster();flyttatSpelare=0;};//..halva hastigheten
    if (speletSlut==false)//utför endast om spelet är igång
        {   
        bytriktning(direction);//kolla om vägg eller annat i vägen först
        karta[spelarePos.y][spelarePos.x]=2;//ta bort gamla spelaren från arrayn
        var kord = gorStrang(spelarePos.y,spelarePos.x);
        document.getElementById(kord).className = "tomt";
        //samma som med monstren
        switch (direction)
        {
        case(1): spelarePos.y -= 1;
        break;
        case(2): spelarePos.x -= 1;
        break;
        case(3): spelarePos.x += 1;
        break;
        case(4): spelarePos.y += 1;
        break;
        case(0): 
        break;
        } 
        kollaMonsterKrock();       
        karta[spelarePos.y][spelarePos.x]=3;//skriv in spelaren i arrayn
        var kord = gorStrang(spelarePos.y,spelarePos.x);//gor sträng av koordinater
        document.getElementById(kord).className = "spelaren";//rita ut nya spelarpositionen
        }

    
    }
}

function kollaMonsterKrock()
    {
    if (speletSlut==false)
        {      
        if (spelarePos.y == monster1pos.y && spelarePos.x == monster1pos.x){
        slut()}
        if (spelarePos.y == monster3pos.y && spelarePos.x == monster3pos.x){
        slut()}
        if (spelarePos.y == monster2pos.y && spelarePos.x == monster2pos.x){
        slut()}
        if (spelarePos.y == monster4pos.y && spelarePos.x == monster4pos.x){
        slut()}
        }
    }
    

    function slut(){
                    speletSlut=true; 
                    mySound=new sound("spokljud.wav");mySound.play();
                    document.getElementById('gameover').src="gameover.png";
                    document.getElementById("gameover").className = "gameover";
                    karta[spelarePos.y][spelarePos.x]=2;//radera spelaren
                    var kord = gorStrang(spelarePos.y,spelarePos.x);
                    document.getElementById(kord).className = "tomt";
                    direction=0;flyttatSpelare=0;
                    
                }
    
                    
    function vunnit(){

        speletSlut=true;
        mySound=new sound("applad.wav");mySound.play();
        //byt ut pilupp styrbilden med "Du vann"-texten
        document.getElementById('gameover').src="vinst.png";
        document.getElementById("gameover").className = "gameover";
        karta[spelarePos.y][spelarePos.x]=2;//radera spelaren
        document.getElementById(y24x18).className = "tomt";
        direction=0;flyttatSpelare=0;
    }    
  
    function starta(){
        if(speletSlut==true){
            mySound=new sound("startljud.wav");
            mySound.play();raknare=0;direction=0;
            document.getElementById('gameover').src="uppil.png";
            document.getElementById("gameover").className = "styrpilupp";
            bytKarta(kartan);speletSlut=false;sattTimer(true);
            }
        }
        //ta emot kartvärde och justera knapparna i enlighet med valt värde
        function taEmotKartVarde(k){
        if (speletSlut==true){
            timernAktiv=false;sattTimer(timernAktiv)//inaktivera timern medan detta görs
        if (k =='1') {kartan=k;
        document.getElementById('bana1').src="tryckt1.png";
        document.getElementById('bana2').src="lab2.png";
        raknare=0;bytKarta(kartan)
        }
        else if (k =='2') {kartan=k;
        document.getElementById('bana2').src="tryckt2.png";
        document.getElementById('bana1').src="lab1.png"; raknare=0;
        bytKarta(kartan)
        }
       
        }
    }
    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
        }    
    }
