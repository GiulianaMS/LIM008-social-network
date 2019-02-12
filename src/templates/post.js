import { guardarConClick,eliminarMensajeConClick,editarConClick,likesConClick } from '../view-controller.js';
import { obtenerPost} from '../controller/publicacion.js';

export const cargarPublicaciones = () => {
    const templatePublicaciones = document.createElement('div');
    
    const publicaciones = `
        <section id="id_publicaciones" class="formPost" >
            <h3 >Ingresa tus publicaciones aqui!</h3><br>
            <div class="text-boton-post">
            <textarea type= "textfield" id="id-publicacion" class="id-publicacion" cols="50" rows="5"  autofocus placeholder="publica aqui" ></textarea>
            <button id = "id-save">guardar</button>
            </div>
            <select>
                    <option value="Publico">Publico</option>
                    <option value="Privado">Privado</option>
            </select>
        </section>
        <section id="id_contenedor">
            <div>
                <h3 class="ingresar-post-aqui">Tus publicaciones aqui!</h3><br>
                <ul id="id-contenedorPublicaciones" class= "contenedor-publicaciones"></ul>
            </div>
        </section>
    `;
    templatePublicaciones.innerHTML=publicaciones;
    const btnGuardarPost = templatePublicaciones.querySelector("#id-save");
    btnGuardarPost.addEventListener("click",guardarConClick);
    obtenerPost();
  return templatePublicaciones;
}

export const templateContenedorPost = (data)=>{
    console.log(data);
    
    let listPublicaciones = "";
    data.forEach((doc)=>{
        const contenedorPost = `
        <div class="info-post">
            <p id ="id-contenedorPost" class ="contenedor-post">${doc.autor}</p>
            <p id ="id-contenedorPost" class ="contenedor-post">${doc.mensaje}</p>
            <p id ="id-contenedorPost" class ="contenedor-post">${doc.fecha}</p>
            <button type="button" id ="${doc.id}" class="btn-editar">Editar</button>
            <button type="button" id ="${doc.id}" class="btn-eliminar">Eliminar</button>
            <button type="button" id ="${doc.id}" class="btn-like" data-like=${doc.like}>Like</button>
            <label id="contenedor-like">${doc.like}</label>
        </div>
        `;

    listPublicaciones +=contenedorPost;
    });
    const contenedorPublicaciones = document.getElementById("id-contenedorPublicaciones");
    contenedorPublicaciones.innerHTML = listPublicaciones;
    
    [...document.getElementsByClassName("btn-eliminar")].forEach(function(btnEliminar){
        btnEliminar.addEventListener("click", eliminarMensajeConClick);
    });
    [...document.getElementsByClassName("btn-editar")].forEach(function(btnEditar){
        btnEditar.addEventListener("click", editarConClick);
    });
  
    [... document.getElementsByClassName("btn-like")].forEach((btnLike)=>{
        btnLike.addEventListener('click',(e)=>{   
            let likes = parseInt(e.target.dataset.like);
            likes++;    
            likesConClick(e.target.id , likes);
        });
    })
    
};

    
