import {
    saveContact,
    getContacts,
    onGetContacts,
    deleteContacts,
    getContact,
    updateContact
} from './firebase.js'

const contactForm = document.getElementById('contact-form')
const contactContainer = document.getElementById('contacts-container')

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () =>{

    onGetContacts((querySnapshot)=>{
        let html = ''

        querySnapshot.forEach(doc => {
            const contact = doc.data()
            html += `
                <div class="card" style="width: 100%; margin-bottom: 15px">
                    <div class="card-body">
                        <h5 class="card-title">${contact.nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Email: ${contact.email}<br>Teléfono: ${contact.phone}</h6>
                        <p class="card-text">${contact.message}</p>
                        <button type="button" class="btn btn-info btn-delete" data-id="${doc.id}">Borrar</button>
                        <a href="#contact"><buttontype="button" class="btn btn-light btn-edit" data-id="${doc.id}">Editar</button></a>
                    </div>
                </div>
            `
        })

        contactContainer.innerHTML = html;
        
        const btnsDelete = contactContainer.querySelectorAll('.btn-delete')
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                deleteContacts(dataset.id)
            })
        })

        const btnsEdit = contactContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getContact(e.target.dataset.id)
                const contact = doc.data()

                contactForm['contact-name'].value = contact.nombre
                contactForm['contact-email'].value = contact.email
                contactForm['contact-phone'].value = contact.phone
                contactForm['contact-message'].value = contact.message

                editStatus = true;
                id = doc.id;

                contactForm['contact-save'].innerText = 'Editar';
            })
        })
    })
})

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = contactForm['contact-name']
    const email = contactForm['contact-email']
    const phone = contactForm['contact-phone']
    const message = contactForm['contact-message']

    if(contactForm['contact-name'].value == "" && contactForm['contact-email'].value == "" &&
        contactForm['contact-phone'].value == "" && contactForm['contact-message'].value == ""){
            alert('Llenar los campos')
        } else{
            if (editStatus){
                updateContact(id, {nombre: name.value, email: email.value, phone: phone.value, message: message.value});
                editStatus = false;
                contactForm['contact-save'].innerText = 'Enviar';
            } else {
                saveContact(name.value, email.value, phone.value, message.value)
                contactForm['contact-save'].innerText = 'Enviar';
            }
        }

    contactForm.reset();
})