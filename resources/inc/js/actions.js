$(document).ready(function(){
    
    class ContactRepository {
        getContacts() {
            $.ajax('https://63543f47e64783fa8281f694.mockapi.io/api/contacts', {

                success: function (contacts) {
                    let bodyTable = $('#contacts');
                    bodyTable.empty()

                    contacts.forEach(contact => {
                        let tr = $(document.createElement('tr'));

                        tr.addClass('text-center');

                        bodyTable.append(tr);

                        let contactKeysOrdered = [
                            'id',
                            'name',
                            'age',
                            'sex',
                            'telephone'
                        ]

                        contactKeysOrdered.forEach(key => {
                            let td = $(document.createElement('td'));
                            
                            if (key == 'sex') {
                                if (contact[key]) {
                                    td.append("Masculino");
                                } else {
                                    td.append("Feminino");
                                }
                            } else {
                                td.append(contact[key]);
                            }

                            tr.append(td);
                        });

                        let td = $(document.createElement('td'));

                        td.append(
                            `<div class="btn-group btn-group" role="group" aria-label="Large button group">
                                <button type="button" class="btn btn-outline-primary" id="btnUpdate" data-id="${contact.id}" data-bs-toggle="modal" data-bs-target="#modal">
                                    <i class="fa-solid fa-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger" id="btnDelete" data-id="${contact.id}">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>`
                        );

                        tr.append(td);
                    });

                    redeclareBtnDeleteEvents();

                    redeclareBtnUpdateEvents();
                }

            });
        }

        createContact(data) {
            $.ajax({
                url: `https://63543f47e64783fa8281f694.mockapi.io/api/contacts`,
                data: {
                    'name': data.name,
                    'age': data.age,
                    'sex': data.sex,
                    'telephone': data.telephone
                },
                type: 'POST',
                success: function () {
                    contactRepositoryInstance.getContacts();
                }
            });
        }

        updateContact(id, data) {
            $.ajax({
                url: `https://63543f47e64783fa8281f694.mockapi.io/api/contacts/${id}`,
                data: {
                    'name': data.name,
                    'age': data.age,
                    'sex': data.sex,
                    'telephone': data.telephone
                },
                type: 'PUT',
                success: function () {
                    contactRepositoryInstance.getContacts();
                }
            })
        }

        deleteContact(id) {
            $.ajax({
                url: `https://63543f47e64783fa8281f694.mockapi.io/api/contacts/${id}`,
                type: 'DELETE',
                success: function () {
                    contactRepositoryInstance.getContacts();
                }
            })
        }
    }

    const contactRepositoryInstance = new ContactRepository();

    contactRepositoryInstance.getContacts();

    function redeclareBtnDeleteEvents() {
        $('#btnDelete').click(function () {
            contactRepositoryInstance.deleteContact($(this).data('id'));
        });
    }

    function redeclareBtnUpdateEvents() {
        $('#btnUpdate').click(function () {
            $('#modalLabel').html('Update Contact');
            $('#modal').data("id", $(this).data('id'));
            $("#save").data("action", "update");
        });
    }

    $('#btnCreate').click(function () {
        $('#modalLabel').html('Create Contact');
        $("#save").data("action", "create");
    });

    $('#save').click(function () {
        modal = $('#modal');
        inputName = $('#nome');
        inputAge = $('#idade');
        inputSexo = $('#sexo');
        inputTelephone = $('#telefone');
        data = {
            name: inputName.val(),
            age: inputAge.val(),
            sex: inputSexo.val(),
            telephone: inputTelephone.val()
        };

        if ($(this).data("action") == "update") {
            contactRepositoryInstance.updateContact(modal.data('id'), data);
        } else if ($(this).data("action") == "create") {
            contactRepositoryInstance.createContact(data);
        }

        inputName.val("");
        inputAge.val("");
        inputSexo.val("");
        inputTelephone.val("");
    });
});

