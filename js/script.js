
import Banana from './Banana.js';
import { initListeners, inputStates } from './handler.js';

let canvas, ctx;
let testBanana;
let clickCount= 0;

window.onload = init;

async function init() {
    
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    
    initListeners(canvas);
    
    try {
        await Banana.loadImages();
        
        testBanana = new Banana(400, 300, 'yellow');
        
        console.log("banane de test créée au centre (400, 300)");
        requestAnimationFrame(testLoop);
        
    } 
    
    catch (error) {
        console.error("Erreur chargement images:", error);
    }
}


function testLoop() {

   ctx.clearRect(0, 0, canvas.width, canvas.height);
    
   
   if (testBanana) {
       testBanana.draw(ctx);
       testBanana.update();
       
       //lorsqu'on sort de l'écran, on la remet en haut
       if (testBanana.isOutOfScreen(canvas.height)) {
           testBanana.y = -50;
           testBanana.x = Math.random() * (canvas.width - 60) + 30;
          
       }
   }
   
   if (inputStates.mouseClicked){
       inputStates.mouseClicked = false;
       
       if (testBanana && testBanana.containsPoint(inputStates.mouseX, inputStates.mouseY)) {
        
           clickCount++;
           
           //la banane réapparaît ailleurs aléatoirement
           testBanana.y = -50;
           testBanana.x = Math.random() * (canvas.width - 60) + 30;
           
           //permet de changer de type aléatoirement
           const types = ['yellow', 'green', 'bunch', 'ape'];
           testBanana.type = types[Math.floor(Math.random() * types.length)];
           testBanana.setPropertiesByType();
       }
       
       else {
           console.log("Raté ! Clic à côté de la banane");
       }
   }
   

   ctx.save();
   ctx.fillStyle = "#704E2E";

   ctx.font= "24px Montserrat";
   ctx.fillText("Bananes attrapées: " + clickCount, 20, 30);
   ctx.restore();
   

   requestAnimationFrame(testLoop);
}
