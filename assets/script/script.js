
const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    closeIcon = document.querySelector("header i"),
    titleTag = document.querySelector("input"),
    descTag = document.querySelector("textarea"),
    addBtn = document.querySelector("button"),
    confirmation = document.querySelector(".box-confirm"),
    acceptBtn = document.querySelector(".accept"),
    cancelBtn = document.querySelector(".cancel")
    ;

    const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    let isUpdate = false, updateId;


    // OPEN WINDOWS NEW NOTE
addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
})


    // CLOSE WINDOWS NEW NOTE
    closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerHTML = "Agregar nota";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
})

// SAVE AND SHOW NEW NOTES
addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value.trim(),
        noteDesc = descTag.value.trim();

        if ( noteTitle || noteDesc ){
        let dateObj = new Date(),
            month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }

        if(!isUpdate)
            notes.push(noteInfo);
        else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes",JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
})


function showNotes() {

    document.querySelectorAll(".note").forEach( note => note.remove());

    notes.forEach( (note,index) => {
        let filterDesc = note.description.replaceAll("\n",'<br/>');
        let liNote = `<li class="note">
                        <p>${note.title}</p>
                        <div class="details">
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="fas fa-ellipsis"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index})" ><i class="fas fa-pen"></i>Editar</li>
                                    <li onclick="deleteNote(${index})" ><i class="fas fa-trash"></i>Eliminar</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend",liNote);
}
)}

showNotes();

// SHOW MENU OPCTION
function showMenu (e){
    e.parentElement.classList.add("show");
    document.addEventListener("click", elem => {
        if( elem.target.tagName != "I" || elem.target != e )
            e.parentElement.classList.remove("show");
    })
}
let noteId;
acceptBtn.addEventListener("click", del);
function deleteNote (id){
    noteId = id;
    confirmation.classList.add("show"); 
 
}

function del(){
    notes.splice(noteId,1);
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes();
    confirmation.classList.remove("show");    
}

cancelBtn.addEventListener("click",() => {
    confirmation.classList.remove("show");    
})



function updateNote(id){
    let description = notes[id].description.replaceAll('<br/>','\r\n');
    updateId = id;
    isUpdate = true;
    addBtn.innerHTML = "Editar nota";

    titleTag.value = notes[id].title;
    descTag.value = description;
    addBox.click();
    
}
