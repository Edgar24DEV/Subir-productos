let nombre = document.getElementById("name");
let fecha = document.getElementById("date");
let precio = document.getElementById("price");
let form = document.getElementById("newEvent");
let descripcion = document.getElementById("description");
let imagen = document.getElementById("image");

document.addEventListener('submit', envForm);

function envForm (e) {
    e.preventDefault();
    validarCampos(nombre, fecha, precio, descripcion, imagen);
}

const validarCampos = (nombre, fecha, precio, descripcion, imagen) => {

    let validado = true;
    // Validar nombre
   validarText(nombre);

   // Validar campo descripcion
   validarText(descripcion);

   // Validar campo fecha
    if(fecha.invalid || !isNaN(fecha.value)){
        fecha.classList.remove("is-valid");
        fecha.classList.add("is-invalid");
        validado = false;
    }else{
        fecha.classList.remove("is-invalid");
        fecha.classList.add("is-valid");
    }

    // Validar campo precio
    if(precio.value.match(/^\d+(\.\d{1,2})?$/)){
        parseFloat(precio.value);
        precio.classList.remove("is-invalid");
        precio.classList.add("is-valid");

        }else{
            precio.classList.remove("is-valid");
            precio.classList.add("is-invalid");
            validado = false;
        }

    // Validar campo imagen
    if(imagen.value.length == 0){
        imagen.classList.remove("is-valid");
        imagen.classList.add("is-invalid");
        validado = false;
    }else{
        imagen.classList.remove("is-invalid");
        imagen.classList.add("is-valid");
    }
    
    if(validado){
    card(nombre, fecha, precio, descripcion, imagen);
    reset();
    }else{
        alert("Por favor, complete todos los campos correctamente");
    }
    
    

}

// Función para validar campos de texto
const validarText = (text) => {
    if(text.value == null || text.value.length == 0 || text.value.match(/^\s+$/)){
        text.classList.remove("is-valid");
        text.classList.add("is-invalid");
        validado = false;
    }else{
        text.classList.remove("is-invalid");
        text.classList.add("is-valid");
    }
}

function card (nombre, fecha, precio, descripcion, imagen){

    let contenedor = document.getElementById("eventsContainer");
    let dirImg = document.getElementById("imgPreview").src;

    const card = document.createElement("div");
    card.classList.add("card");
    contenedor.appendChild(card);

    let image = document.createElement("img");
    image.src = dirImg;
    image.classList.add("card-img-top");
    card.appendChild(image);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    const cardTitle = document.createElement("h4");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = nombre.value;
    cardBody.appendChild(cardTitle);

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = descripcion.value;
    cardBody.appendChild(cardText);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    card.appendChild(cardFooter);

    const cardFooterText = document.createElement("small");
    cardFooterText.classList.add("text-muted");
    cardFooterText.textContent = fecha.value;
    cardFooter.appendChild(cardFooterText);
    
    const cardFooterPrice = document.createElement("span");
    cardFooterPrice.classList.add("float-right");
    cardFooterPrice.textContent = "Precio €" + precio.value;
    cardFooterText.appendChild(cardFooterPrice);

}

imagen.addEventListener('change', event => {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) reader.readAsDataURL(file);
    reader.addEventListener('load', e => {
    document.getElementById("imgPreview").src = reader.result;
    });
    });

    const reset = () => {
        nombre.value = '';
        fecha.value = '';
        precio.value = '';
        descripcion.value = '';
        imagen.value = '';
        document.getElementById("imgPreview").src = ''; // Restablecer la imagen de vista previa
    }