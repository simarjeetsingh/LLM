var formElement=null;
var numeroSecreto1=null;
var numeroSecreto2=null;
var respuestaSelect=null;
var respuestSelectMultiple=null;
var respuestasRadio1= null;
var respuestasRadio2 = null;
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)
var xmlDoc = null;

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   //if (comprobar()){
    corregirRadio1();
    corregirRadio2();
    corregirCheckbox1(); 
    corregirCheckbox2();
    corregirNumber1();
    corregirNumber2();
   // corregirSelect();
   // corregirSelectMutiple();
    presentarNota();
   //}
  return false;
 }
 
 //LEER XML de xml/questions.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "https://rawgit.com/simarjeetsingh/LLM/master/PreguntasXML/Validaci%C3%B3n%20XML%20con%20XSD/questions.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/questions.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
  xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
//radio1------------------------------
 var tituloRadio1 = xmlDoc.getElementsByTagName("title")[0].innerHTML;
 var opcionesRadio1 = [];
 var nopt = xmlDoc.getElementById("jdos_001").getElementsByTagName('options').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadio1[i]=xmlDoc.getElementById("jdos_001").getElementsByTagName('options')[i].innerHTML;
 }  
 ponerDatosRadio1Html(tituloRadio1,opcionesRadio1);
 //var nres = xmlDoc.getElementById("jdos_001").getElementsByTagName('answer').length;
 //for (i = 0; i < nres; i++) { 
  respuestasRadio1=xmlDoc.getElementById("jdos_001").getElementsByTagName("answer")[0].innerHTML;
// }

//radio2------------------------------
 var tituloRadio2 = xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var opcionesRadio2 = [];
 var nopt = xmlDoc.getElementById("jdos_002").getElementsByTagName('options').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadio2[i]=xmlDoc.getElementById("jdos_002").getElementsByTagName('options')[i].innerHTML;
 }  
 ponerDatosRadio2Html(tituloRadio2,opcionesRadio2);
 //var nres = xmlDoc.getElementById("jdos_002").getElementsByTagName('answer').length;
 //for (i = 0; i < nres; i++) { 
  respuestasRadio2=xmlDoc.getElementById("jdos_002").getElementsByTagName("answer")[0].innerHTML;
 //}

 //CHECKBOX1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var opcionesCheckbox1 = [];
 var nopt = xmlDoc.getElementById("jdos_003").getElementsByTagName('options').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox1[i]=xmlDoc.getElementById("jdos_003").getElementsByTagName('options')[i].innerHTML;
 }  
 ponerDatosCheckbox1Html(tituloCheckbox1,opcionesCheckbox1);
 var nres = xmlDoc.getElementById("jdos_003").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById("jdos_003").getElementsByTagName("answer")[i].innerHTML;
 }
  //CHECKBOX2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 var opcionesCheckbox2 = [];
 var nopt = xmlDoc.getElementById("jdos_004").getElementsByTagName('options').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox2[i]=xmlDoc.getElementById("jdos_004").getElementsByTagName('options')[i].innerHTML;
 }  
 ponerDatosCheckbox2Html(tituloCheckbox2,opcionesCheckbox2);
 var nres = xmlDoc.getElementById("jdos_004").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox2[i]=xmlDoc.getElementById("jdos_004").getElementsByTagName("answer")[i].innerHTML;
 }

//NUMBER1
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput1=xmlDoc.getElementsByTagName("title")[4].innerHTML;
 ponerDatosInput1Html(tituloInput1);
 numeroSecreto1=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 
 //Number2
 var tituloInput2=xmlDoc.getElementsByTagName("title")[5].innerHTML;
 ponerDatosInput2Html(tituloInput2);
 numeroSecreto2=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect1=xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("jdos_007").getElementsByTagName('options').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("jdos_007").getElementsByTagName('options')[i].innerHTML;
 }
 ponerDatosSelect1Html(tituloSelect1,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[6].innerHTML);

//SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect2=xmlDoc.getElementsByTagName("title")[7].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("jdos_008").getElementsByTagName('options').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("jdos_008").getElementsByTagName('options')[i].innerHTML;
 }
 ponerDatosSelect2Html(tituloSelect2,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[7].innerHTML);


 //Select multiple
 var selectMultiple=xmlDoc.getElementsByTagName("title")[8].innerHTML;
 var opcionesSelectMultiple = [];
 var nopt = xmlDoc.getElementById("jdos_009").getElementsByTagName('options').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelectMultiple[i] = xmlDoc.getElementById("jdos_009").getElementsByTagName('options')[i].innerHTML;
 }
 ponerDatosSelectMultipleHtml(selectMultiple,opcionesSelectMultiple);
 respuestaSelectMultiple=parseInt(xmlDoc.getElementsByTagName("answer")[8].innerHTML);

//Select multiple
 var selectMultiple1=xmlDoc.getElementsByTagName("title")[9].innerHTML;
 var opcionesSelectMultiple = [];
 var nopt = xmlDoc.getElementById("jdos_010").getElementsByTagName('options').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelectMultiple[i] = xmlDoc.getElementById("jdos_010").getElementsByTagName('options')[i].innerHTML;
 }
 ponerDatosSelectMultiple1Html(selectMultiple1,opcionesSelectMultiple);
 respuestaSelectMultiple=parseInt(xmlDoc.getElementsByTagName("answer")[9].innerHTML);

//Seleccionar sin pulsar la tecla ctrl
 window.onmousedown = function (e) {
    var el = e.target;
    if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
        e.preventDefault();

        // toggle selection
        if (el.hasAttribute('selected')) el.removeAttribute('selected');
        else el.setAttribute('selected', '');

        // hack to correct buggy behavior
        var select = el.parentNode.cloneNode(true);
        el.parentNode.parentNode.replaceChild(select, el.parentNode);
    }
 }
}

//****************************************************************************************************
//implementación de la corrección
// Corregir radio ----------------------------
function corregirRadio1(){
  var f=formElement;
  var escorrecta = null;
  var notaRad1 = 0;
  for (i = 0; i < f.colorR1.length; i++) { //"colorR1" es el nombre asignado a todos los RadioButtons
    if (f.colorR1[i].checked) {
      escorrecta =false;     
    //for (j = 0; j < respuestasRadio.length; j++) {
     if (i==respuestasRadio1) escorrecta=true;
    }
  }   
    if (escorrecta) {
     notaRad1 +=1.0;   
     darRespuestaHtml("P1: correcta");
     nota +=1.0;    
    } else {
     nota -=1.0;    
     darRespuestaHtml("P1: incorrecta");     
  }
}

function corregirRadio2(){
  var f=formElement;
  var escorrecta = null;
  var notaRad2 = 0;
  for (i = 0; i < f.colorR2.length; i++) { //"colorR2" es el nombre asignado a todos los RadioButtons
    if (f.colorR2[i].checked) {
      escorrecta =false;     
    //for (j = 0; j < respuestasRadio.length; j++) {
     if (i==respuestasRadio2) escorrecta=true;
    }
  }   
    if (escorrecta) {
     notaRad2 +=1.0;   
     darRespuestaHtml("P2: correcta");
     nota +=1.0;    
    } else {
     nota -=1.0;    
     darRespuestaHtml("P2: incorrecta");     
  }
}
// Corregir checkbox ----------------------------
//Si necesitáis ayuda para hacer un corregirRadio() decirlo, lo ideal es que a podáis construirla modificando corregirCheckbox
function corregirCheckbox1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  var notaCheckbox1 = 0;
  for (i = 0; i < f.colorCBX1.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.colorCBX1[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
      notaCheckbox1 +=1.0/respuestasCheckbox1.length;
      nota +=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
      darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   } 
  }
}

function corregirCheckbox2(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta2 = [];
  var notaCheckbox2 = 0;
  for (i = 0; i < f.colorCBX2.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.colorCBX2[i].checked) {
    escorrecta2[i]=false;     
    for (j = 0; j < respuestasCheckbox2.length; j++) {
     if (i==respuestasCheckbox2[j]) escorrecta2[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta2[i]) {
      notaCheckbox2 +=1.0/respuestasCheckbox2.length;
      nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
      darRespuestaHtml("P4: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P4: "+i+" incorrecta");
    }   
   } 
  }
}


function corregirNumber1(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  //var s = formElement.elements[4].value;  
  var s = document.getElementById.value;    
  if (s.toLowerCase()== "1995") {
   darRespuestaHtml("P5: Exacto!");
   nota +=1;
  }
  else {
    if (s>numeroSecreto1) darRespuestaHtml("P5: Te has pasado");
    else darRespuestaHtml("P5: Te has quedado corto");
  }
}

function corregirNumber2(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s = formElement.elements[5].value;     
  if (s==numeroSecreto2) {
   darRespuestaHtml("P6: Exacto!");
   nota +=1;
  }
  else {
    if (s>numeroSecreto2) darRespuestaHtml("P6: Te has pasado");
    else darRespuestaHtml("P6: Te has quedado corto");
  }
}

function corregirSelect(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[6];  
  if (sel.selectedIndex-1==respuestaSelect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("P7: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P7: Incorrecto");
}



/*multiple

for(i=0; i < form.select.options.length; i++)
   if (form.select.options[i].selected)
    form.hidden.value += form.select.options[i].value;
*/


//****************************************************************************************************
// poner los datos recibios en el HTML
 function ponerDatosRadio1Html(t,opt){
  var radioContainer=document.getElementById('radioDiv1');
  document.getElementById('tituloRadio1').innerHTML = t;
  for (i = 0; i < opt.length; i++) { 
      var input = document.createElement("input");
      var label = document.createElement("label");
      label.innerHTML=opt[i];
      label.setAttribute("for", "colorR1_"+i);
      input.type="radio";
      input.name="colorR1";
      input.id="colorR1_"+i;;    
      radioContainer.appendChild(input);
      radioContainer.appendChild(label);
      radioContainer.appendChild(document.createElement("br"));
  }  
 }
 function ponerDatosRadio2Html(t,opt){
  var radioContainer=document.getElementById('radioDiv2');
  document.getElementById('tituloRadio2').innerHTML = t;
  for (i = 0; i < opt.length; i++) { 
      var input = document.createElement("input");
      var label = document.createElement("label");
      label.innerHTML=opt[i];
      label.setAttribute("for", "colorR2_"+i);
      input.type="radio";
      input.name="colorR2";
      input.id="colorR2_"+i;;    
      radioContainer.appendChild(input);
      radioContainer.appendChild(label);
      radioContainer.appendChild(document.createElement("br"));
  }  
 }

 function ponerDatosCheckbox1Html(t,opt){
  var checkboxContainer=document.getElementById('checkboxDiv1');
  document.getElementById('tituloCheckbox1').innerHTML = t;
  for (i = 0; i < opt.length; i++) { 
      var input = document.createElement("input");
      var label = document.createElement("label");
      label.innerHTML=opt[i];
      label.setAttribute("for", "colorCBX1_"+i);
      input.type="checkbox";
      input.name="colorCBX1";
      input.id="colorCBX1_"+i;;    
      checkboxContainer.appendChild(input);
      checkboxContainer.appendChild(label);
      checkboxContainer.appendChild(document.createElement("br"));
  }  
 }

  function ponerDatosCheckbox2Html(t,opt){
    var checkboxContainer=document.getElementById('checkboxDiv2');
    document.getElementById('tituloCheckbox2').innerHTML = t;
    for (i = 0; i < opt.length; i++) { 
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML=opt[i];
        label.setAttribute("for", "colorCBX2_"+i);// si no funciona cambiar a color1
        input.type="checkbox";
        input.name="colorCBX2";
        input.id="colorCBX2_"+i;;    
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
    }  
  }

  function ponerDatosInput1Html(t){
    document.getElementById("tituloInput1").innerHTML = t;
  }

  function ponerDatosInput2Html(t){
   document.getElementById("tituloInput2").innerHTML = t;
  }
  

  function ponerDatosSelect1Html(t,opt){
    document.getElementById("tituloSelect1").innerHTML=t;
    var select = document.getElementsByTagName("select")[0];
    for (i = 0; i < opt.length; i++) { 
      var option = document.createElement("option");
      option.text = opt[i];
      option.value=i+1;
      select.options.add(option);
   }  
  }

  function ponerDatosSelect2Html(t,opt){
    document.getElementById("tituloSelect2").innerHTML=t;
    var select = document.getElementsByTagName("select")[1];
    for (i = 0; i < opt.length; i++) { 
      var option = document.createElement("option");
      option.text = opt[i];
      option.value=i+1;
      select.options.add(option);
    }  
  }

  function ponerDatosSelectMultipleHtml(t,opt){
    document.getElementById("selectMultiple").innerHTML=t;
    var selectMultiple = document.getElementsByTagName("select")[2];
    for (i = 0; i < opt.length; i++) { 
      var option = document.createElement("option");
      option.text = opt[i];
      option.value=i+1;
      selectMultiple.options.add(option);
    }   
  }

  function ponerDatosSelectMultiple1Html(t,opt){
    document.getElementById("selectMultiple1").innerHTML=t;
    var selectMultiple = document.getElementsByTagName("select")[3];
    for (i = 0; i < opt.length; i++) { 
      var option = document.createElement("option");
      option.text = opt[i];
      option.value=i+1;
      selectMultiple.options.add(option);
    }  
  }

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

//Comprobar que se han introducido datos en el formulario
function comprobar(){
   var f=formElement;
   var checked=false;
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checked=true;
   }
   if(!checked) {    
    document.getElementsByTagName("h3")[0].focus();
    alert("Selecciona una opción del radio");
    return false;
   }else if(!checked) {    
    document.getElementsByTagName("h3")[1].focus();
    alert("Selecciona una opción del radio");
    return false;
   }else if(!checked) {    
    document.getElementsByTagName("h3")[2].focus();
    alert("Selecciona una opción del checkbox");
    return false;
   }else if (f.elements[0].value=="") {
    f.elements[0].focus();
    alert("Escribe un número");
    return false;
   } else if (f.elements[1].selectedIndex==0) {
    f.elements[1].focus();
    alert("Selecciona una opción");
    return false;
   } if (!checked) {    
    document.getElementsByTagName("h3")[2].focus();
    alert("Selecciona una opción del checkbox");
    return false;
   } else  return true;
}