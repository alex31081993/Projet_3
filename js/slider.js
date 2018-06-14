var Slider = {
        img: $('#diaporama img'),
        indexImg: null,
        $currentImg: null,
        i: null,
        
        initSlide: function () {
            Slider.i = 0; // on initialise un compteur
            Slider.currentImg = Slider.img.eq(Slider.i); // enfin, on cible l'image courante, qui possède l'index i (0 pour l'instant)
            Slider.indexImg = Slider.img.length - 1; // on définit l'index du dernier élément
            Slider.img.css('display', 'none'); // on cache les images
            Slider.currentImg.css('display', 'block'); // on affiche seulement l'image courante

        },
        
        initImgDroite: function () {
            Slider.img.css('display', 'none'); // on cache les images
            Slider.currentImg = Slider.img.eq(Slider.i+1); // on définit la nouvelle image
            Slider.currentImg.css('display', 'block'); // puis on l'affiche
            Slider.i++;
        },
    
        initImgGauche: function () {
            Slider.img.css('display', 'none'); // on cache les images
            Slider.currentImg = Slider.img.eq(Slider.i-1); // on définit la nouvelle image
            Slider.currentImg.css('display', 'block'); // puis on l'affiche
            Slider.i--;
        },
     
        //Initialize la fonction touche de la fleche droite du clavier    
        initKeyFlecheDroite: function () {
            $(document).keydown(function(event){ 
     
                if ((event.which == 39) && (Slider.i < Slider.indexImg)) {
                        Slider.initImgDroite();
                }
            });
        },
    
        //Initialize la fonction touche de la  fleche gauche du clavier    
        initKeyFlecheGauche: function () {  
            $(document).keydown(function(event){ 
       
                if ((event.which == 37) && (Slider.i > 0)) {
                        Slider.initImgGauche();
                }
            });
        },   
    
        //Initialize le fonction de la fleche gauche du diaporama    
        initClickFlecheGauche: function () {
            $('#f_gauche').click(function(){ 
    
                if (Slider.i > 0){
                        Slider.initImgGauche();
                }
            });
        },
    
        //Initialize la fonction de la touche droite du diaporama    
        initClickFlecheDroite: function () {
            $('#f_droite').click(function(){ 
    
                if (Slider.i < Slider.indexImg){
                        Slider.initImgDroite();
                }
            });
        },
     
        //Initialize le fonction automatique du diaporama        
        initAutoSlide: function () {
                setInterval (function () { // on utilise une fonction anonyme
						
                    if(Slider.i < Slider.indexImg) { // si le compteur est inférieur au dernier index
                        Slider.i++; // on l'incrémente
	                }
	                else{ // sinon, on le remet à 0 (première image)
                        Slider.i = 0;
	                }

	                Slider.img.css('display', 'none');
	                Slider.currentImg = Slider.img.eq(Slider.i);
	                Slider.currentImg.css('display', 'block');

                }, 7000); // on définit l'intervalle à 7000 millisecondes (7s)
        },
      
        initRunSlider: function () {
            Slider.initSlide();
            Slider.initKeyFlecheDroite();
            Slider.initKeyFlecheGauche();
            Slider.initClickFlecheGauche();
            Slider.initClickFlecheDroite();
            Slider.initAutoSlide();
        }
}

