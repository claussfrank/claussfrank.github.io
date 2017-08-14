var cargarPagina = function(){
	$('.modal').modal(); 
	$(".button-collapse").sideNav();

	var options = [
    {selector: '#habilidadJS', offset: 200, callback: '$(this).addClass("animated")' },
];
Materialize.scrollFire(options);
};

$(document).ready(cargarPagina);

