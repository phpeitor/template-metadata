
// === Datos de demo: Sudamérica ===
const SA_DATA = [
  { country: "Argentina", iso2: "AR", dial: "54",
    cities: ["Buenos Aires","Córdoba","Rosario","Mendoza","La Plata","Mar del Plata"] },
  { country: "Bolivia", iso2: "BO", dial: "591",
    cities: ["La Paz","Santa Cruz de la Sierra","Cochabamba","Sucre","El Alto","Tarija"] },
  { country: "Brasil", iso2: "BR", dial: "55",
    cities: ["São Paulo","Río de Janeiro","Brasilia","Salvador","Fortaleza","Belo Horizonte","Porto Alegre","Recife"] },
  { country: "Chile", iso2: "CL", dial: "56",
    cities: ["Santiago","Valparaíso","Viña del Mar","Concepción","Antofagasta","Temuco"] },
  { country: "Colombia", iso2: "CO", dial: "57",
    cities: ["Bogotá","Medellín","Cali","Barranquilla","Cartagena","Bucaramanga"] },
  { country: "Ecuador", iso2: "EC", dial: "593",
    cities: ["Quito","Guayaquil","Cuenca","Ambato","Manta","Portoviejo"] },
  { country: "Guyana", iso2: "GY", dial: "592",
    cities: ["Georgetown","Linden","New Amsterdam"] },
  { country: "Paraguay", iso2: "PY", dial: "595",
    cities: ["Asunción","Ciudad del Este","Encarnación","San Lorenzo","Luque"] },
  { country: "Perú", iso2: "PE", dial: "51",
    cities: ["Lima","Arequipa","Trujillo","Chiclayo","Piura","Cusco","Huancayo"] },
  { country: "Surinam", iso2: "SR", dial: "597",
    cities: ["Paramaribo","Lelydorp","Nieuw Nickerie"] },
  { country: "Uruguay", iso2: "UY", dial: "598",
    cities: ["Montevideo","Salto","Paysandú","Maldonado","Rivera"] },
  { country: "Venezuela", iso2: "VE", dial: "58",
    cities: ["Caracas","Maracaibo","Valencia","Barquisimeto","Maracay","Maturín"] },
  { country: "Guayana Francesa", iso2: "GF", dial: "594",
    cities: ["Cayena","Kourou","Saint-Laurent-du-Maroni"] }
];

const year = new Date().getFullYear();
document.querySelectorAll('.year_now').forEach(el => el.textContent = year);

initPais(); 
$(".select2").select2();
$('#ciudad-error').hide();
$('#pais-error').hide();
$('#obs-error').hide();

$("#pais").change(function(e) {				
	var pais = $(this).val();
	var pais2=pais.split("|")[0];
	cargar_ciudad(pais2);
	$('#prefijo').val('Prefijo: '+pais.split("|")[1])
});

$("#btn_registrar").click(function(e) {	
	var error = false;
	var nombres = $.trim($('#nombre').val());
	var apellidos = $.trim($('#apellido').val());
	var cargo = $.trim($('#cargo').val());
	var empresa = $.trim($('#empresa').val());
	var pais = $.trim($('#pais').val());
	var ciudad = $.trim($('#ciudad').val());
	var telefono = $.trim($('#telefono').val());
	var email = $.trim($('#email').val());
	var trabajo = $("#chk1:checked").length;
	var demo = $("#chk2:checked").length;
	var observacion = $.trim($('#observacion').val());
	var prefijo = $.trim($('#prefijo').val());
	
	$('#nombre,#apellido,#cargo,#empresa,#pais,#ciudad','#telefono','#email','#observacion').click(function(){
			$(this).removeClass("error");
	});

	if(nombres.length == 0  ){
		var error = true;
		$('#nombre').addClass("error");
	}else{
		$('#nombre').removeClass("error");
	}
	
	if(apellidos.length == 0  ){
		var error = true;
		$('#apellido').addClass("error");
	}else{
		$('#apellido').removeClass("error");
	}
	
	if(cargo.length == 0  ){
		var error = true;
		$('#cargo').addClass("error");
	}else{
		$('#cargo').removeClass("error");
	}
	
	if(empresa.length == 0  ){
		var error = true;
		$('#empresa').addClass("error");
	}else{
		$('#empresa').removeClass("error");
	}
	
	if(prefijo.length == 0  ){
		var error = true;
		$('#prefijo').addClass("error");
	}else{
		$('#prefijo').removeClass("error");
	}
	
	if(observacion.length == 0  ){
		var error = true;
		$('#observacion').addClass("error");
		$('#obs-error').show();
	}else{
		$('#observacion').removeClass("error");
		$('#obs-error').hide();
	}
	
	if(pais.length == 0  ){
		var error = true;
		$('#pais').addClass("error");
		$('#pais-error').show();
	}else{
		$('#pais').removeClass("error");
		$('#pais-error').hide();
	}
	
	if(ciudad.length == 0  ){
		var error = true;
		$('#ciudad').addClass("error");
		$('#ciudad-error').show();
	}else{
		$('#ciudad').removeClass("error");
		$('#ciudad-error').hide();
	}
	
	if(telefono.length == 0 || telefono.length>9 ){
		var error = true;
		$('#telefono').addClass("error");
	}else if(telefono.length == 0 || telefono.length<6 ){
		var error = true;
		$('#telefono').addClass("error");
	}else{
		$('#telefono').removeClass("error");
	}
	
	if(email.length == 0 || email.indexOf('@') == '-1' ){
		var error = true;
		$('#email').addClass("error");
	}else{
		$('#email').removeClass("error");
	}
	
	if(error == false){ 
		registrar_contacto(nombres,apellidos,cargo,empresa,pais,ciudad,telefono,email,trabajo,demo,observacion);
	}

});

function _norm(s){ return s ? s.normalize('NFD').replace(/[\u0300-\u036f]/g,'') : s; }

function cargar_ciudad(paisNombre) {
  const $ciudad = $('#ciudad');
  $ciudad.empty().append('<option value="">Seleccione Ciudad</option>');

  const match = SA_DATA.find(c =>
    c.country === paisNombre || _norm(c.country) === _norm(paisNombre)
  );

  if (match) {
    match.cities.forEach(city => {
      $ciudad.append(`<option value="${city}">${city}</option>`);
    });
  }

  if ($ciudad.hasClass('select2-hidden-accessible')) $ciudad.trigger('change.select2');
  $('#ciudad').val("");
  $('#ciudad').change();
  $('#ciudad-error').hide();
  $('#pais-error').hide();
}

function registrar_contacto(nombres,apellidos,cargo,empresa,pais,ciudad,telefono,email,trabajo,demo,observacion) {
	$.ajax({
		data: {nombres:nombres,apellidos:apellidos,cargo:cargo,empresa:empresa,pais:pais,ciudad:ciudad,telefono:telefono,email:email,trabajo:trabajo,demo:demo,observacion:observacion},
		dataType: 'json',
		url: 'success.json',
		success:  function (response) {
			console.log(response);
			if (response.codigo==1){
				swal({
					title: 'Metadata Business Consulting',
					html: "Gracias por tu mensaje. <br/> Te contactaremos lo más pronto posible",
					confirmButtonText: 'Ok',
					footer: '<a href="https://www.facebook.com/MetadataBusinessConsulting"  target="_blank"><i class="fa fa-facebook"></i></a>&nbsp;&nbsp;&nbsp;<a href="https://www.linkedin.com/company/35560264"  target="_blank"><i class="fa fa-linkedin"></i></a>',
					backdrop: `
					rgba(0,0,123,0.4)
					center left
					no-repeat
				`
				}).then((result) => {
					if (result.value) {
						window.location='index.html'; 
					}
				})
			}else{
				swal({  title: "Mensaje del Sistema", text: response.mensaje, type: "error" });
			}
		}
	});
} 

function initPais() {
  const $pais = $('#pais');
  $pais.empty().append('<option value="">Seleccione País</option>');
  SA_DATA.forEach(c => {
    $pais.append(
      `<option value="${c.country}|${c.dial}" data-iso="${c.iso2}">${c.country}</option>`
    );
  });
  if ($pais.hasClass('select2-hidden-accessible')) $pais.trigger('change.select2');
}