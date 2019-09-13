
activo = "Inicio"

function digiClock() {
    var crTime = new Date();
    var crHrs = crTime.getHours();
    var crMns = crTime.getMinutes();
    var crScs = crTime.getSeconds();
    crMns = (crMns < 10 ? "0" : "") + crMns;
    crScs = (crScs < 10 ? "0" : "") + crScs;
    var timeOfDay = (crHrs < 12) ? "AM" : "PM";
    crHrs = (crHrs > 12) ? crHrs - 12 : crHrs;
    crHrs = (crHrs == 0) ? 12 : crHrs;
    var crTimeString = crHrs + ":" + crMns + ":" + crScs + " " + timeOfDay;

    $("#clock").html(crTimeString);

}

function iniciar() {
	maximo=600;
	medio=document.getElementById('medio');
	reproducir=document.getElementById('reproducir');
	barra=document.getElementById('barra');
	spn = document.getElementById('spn');
	progreso=document.getElementById('progreso');
	reproducir.addEventListener('click', presionar, false);
	barra.addEventListener('click', mover, false);
}
function presionar(){
	if(!medio.paused && !medio.ended) {
		medio.pause();
		spn.classList.remove("glyphicon-pause");
		spn.classList.add("glyphicon-play");
		window.clearInterval(bucle);
	}else{
		medio.play();
		spn.classList.remove("glyphicon-play");
		spn.classList.add("glyphicon-pause");
		bucle=setInterval(estado, 1000);
	}
}
function estado(){
	if(!medio.ended){
		var total=parseInt(medio.currentTime*maximo/medio.duration);
		progreso.style.width=total+'px';
	}else{
		progreso.style.width='0px';
		reproducir.innerHTML='Reproducir';
		window.clearInterval(bucle);
	}
}
function mover(e){
	if(!medio.paused && !medio.ended){
		var ratonX=e.pageX-barra.offsetLeft;
		var nuevoTiempo=ratonX*medio.duration/maximo;
		medio.currentTime=nuevoTiempo;
		progreso.style.width=ratonX+'px';
	}
}
window.addEventListener('load', iniciar, false);



$(document).ready(function () {
    setInterval('digiClock()', 1000);
});
