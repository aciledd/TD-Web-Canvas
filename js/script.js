
import Banana from './Banana.js';

let canvas, ctx;
let testBanana;

window.onload = init;

async function init() {
    
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    
    
    
    try {
        await Banana.loadImages();
        console.log("Images chargées avec succès");
        
        
        testBanana = new Banana(400, 300, 'yellow');
        
        console.log("Banane de test créée au centre (400, 300)");
        
        requestAnimationFrame(testLoop);
        
    } 
    
    catch (error) {
        console.error("Erreur chargement images:", error);
    }
}


function testLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    testBanana.draw(ctx);
    
    
    testBanana.update(); 
    
    
    //si la banane sort de l'écran, on la remet en haut
    if (testBanana.isOutOfScreen(canvas.height)) {
        testBanana.y = -50; 

        testBanana.x = Math.random() * (canvas.width - 60) + 30; //position x aléatoire
        console.log("Banane réapparue en haut");
    }

    requestAnimationFrame(testLoop);
}
