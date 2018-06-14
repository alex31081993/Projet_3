var Canvas = {
        color: '000',
        canvas: $("#canvas"),
        cursorX: 'cursorX',
        cursorY: 'cursorY',
        painting: false,
        started: false,
        widthBrush: 2,
 
        
        initCanvas: function () { 	
            Canvas.context = Canvas.canvas[0].getContext('2d');
	
	       // Trait arrondi :
	       Canvas.context.lineJoin = 'round';
	       Canvas.context.lineCap = 'round';
        },
        
        initMouseDown: function () {    
	       // Click souris enfoncé sur le canvas, je dessine :
	       Canvas.canvas.mousedown(function(e) {
                Canvas.painting = true;
		
		       // Coordonnées de la souris :
		       Canvas.cursorX = (e.pageX - this.offsetLeft);
		       Canvas.cursorY = (e.pageY - this.offsetTop);
          });  
        },
                  
	    initMousUp: function () {
	       // Relachement du Click sur tout le document, j'arrête de dessiner :
	       Canvas.canvas.mouseup(function() {
		      Canvas.painting = false;
		      Canvas.started = false;
	       });   
        },
        
	    initMouseMove: function () {
	       // Mouvement de la souris sur le canvas :
	       Canvas.canvas.mousemove(function(e) {
		      // Si je suis en train de dessiner (click souris enfoncé) :
              if (Canvas.painting) {
                 // Set Coordonnées de la souris :
                 Canvas.cursorX = (e.pageX - this.offsetLeft) - 10; // 10 = décalage du curseur
			     Canvas.cursorY = (e.pageY - this.offsetTop) - 10;
			
			     // Dessine une ligne :
			     Canvas.initDrawLine();
		      }
	       });
        },
    
	    // Fonction qui dessine une ligne :
	    initDrawLine: function () {
           // Si c'est le début, j'initialise
		   if (!Canvas.started) {
               // Je place mon curseur pour la première fois :
               Canvas.context.beginPath();
               Canvas.context.moveTo(Canvas.cursorX, Canvas.cursorY);
               Canvas.started = true;
		   } 
		   // Sinon je dessine
		   else {
               Canvas.context.lineTo(Canvas.cursorX, Canvas.cursorY);
               Canvas.context.strokeStyle = Canvas.color;
               Canvas.context.lineWidth = Canvas.width_brush;
               Canvas.context.stroke();
		   }
        },
        
        // initialize les méthodes du canvas
        initRunCanvas: function () {
            Canvas.initCanvas();
            Canvas.initMouseDown();
            Canvas.initMousUp();
            Canvas.initMouseMove();            
        }
}
