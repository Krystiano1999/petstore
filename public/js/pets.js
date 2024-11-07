$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#filterButton').on('click', function () {
        const status = $('#status').val();
        fetchPetsByStatus(status);
    });

    $('#searchByIdButton').on('click', function () {
        const petId = $('#petId').val();
        if (petId) {
            fetchPetById(petId);
        } else {
            toastr.error('Wpisz prawidłowe ID zwierzęcia.');
        }
    });

    $(document).on('click', '.delete-pet', function () {
        const petId = $(this).data('id');
        
        Swal.fire({
            title: 'Czy na pewno chcesz usunąć zwierzę?',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Tak, usuń'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePet(petId);
            }
        });
    });

    function fetchPetsByStatus(status) {
        $.ajax({
            url: `/pets/status`,
            method: 'GET',
            data: { status: status },
            success: function (response) {
                $('#pets-list').empty();
                if (response.status === 200) {
                    const pets = response.data;
                    if (pets.length === 0) {
                        toastr.warning('Brak zwierząt o wybranym statusie.');
                    } else {
                        $.each(pets, function (index, pet) {
                            const statusLabel = {
                                'available': 'Dostępne',
                                'pending': 'Oczekujące',
                                'sold': 'Sprzedane'
                            }[pet.status] || 'Nieznany';

                            const petItem = $(`
                                <div class="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>${pet.name}</strong> - <small class="text-muted">${pet.category?.name || 'Nieznana kategoria'}</small>
                                    </div>
                                    <div>
                                        <button class="btn btn-sm btn-warning me-2 edit-pet" data-id="${pet.id}" data-bs-toggle="modal" data-bs-target="#editPetModal">
                                            <i class="fas fa-edit"></i> Edytuj
                                        </button>
                                        <button class="btn btn-sm btn-danger delete-pet" data-id="${pet.id}">
                                            <i class="fas fa-trash-alt"></i> Usuń
                                        </button>
                                    </div>
                                </div>
                                `);
                                $('#pets-list').append(petItem);
                        });
                    }    
                
                } else if (response.status === 404) {
                    toastr.error(response.data.message || 'Nie znaleziono zwierzęcia.');
                } else if (response.status === 400) {
                    toastr.error('Nieprawidłowy status wyszukiwania.');
                }
            },
            error: function (xhr) {
                handleApiError(xhr);
            }
        });
    }

    function fetchPetById(petId) {
        $.ajax({
            url: `/pets/${petId}`,
            method: 'GET',
            success: function (response) {
                $('#pets-list').empty();

                if (response.status === 200) {
                    const pet = response.data;
                    const statusLabel = {
                        'available': 'Dostępne',
                        'pending': 'Oczekujące',
                        'sold': 'Sprzedane'
                    }[pet.status] || 'Nieznany';

                    const petItem = $(`
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${pet.name}</strong> - <small class="text-muted">${pet.category?.name || 'Nieznana kategoria'}</small>
                            </div>
                            <div>
                                <button class="btn btn-sm btn-warning me-2 edit-pet" data-id="${pet.id}" data-bs-toggle="modal" data-bs-target="#editPetModal">
                                    <i class="fas fa-edit"></i> Edytuj
                                </button>
                                <button class="btn btn-sm btn-danger delete-pet" data-id="${pet.id}">
                                    <i class="fas fa-trash-alt"></i> Usuń
                                </button>
                            </div>
                        </div>
                    `);
                    $('#pets-list').append(petItem);
                } else if (response.status === 404) {
                    toastr.error(response.data.message || 'Zwierzę o podanym ID nie zostało znalezione.');
                } else if (response.status === 400) {
                    toastr.error('Nieprawidłowe ID zwierzęcia.');
                }
            },
            error: function (xhr) {
                handleApiError(xhr);
            }
        });
    }

    function handleApiError(xhr) {
        let errorMsg = 'Błąd podczas pobierania danych.';

        if (xhr.responseJSON) {
            const apiResponse = xhr.responseJSON;
            if (apiResponse.message) {
                errorMsg = apiResponse.message;
            }
        }

        toastr.error(errorMsg);
    }

    function deletePet(petId) {
        $.ajax({
            url: `/pets/${petId}`,
            method: 'DELETE',
            success: function () {
                toastr.success("Zwierzę zostało usunięte.");
                fetchPetsByStatus($('#status').val());
            },
            error: function (xhr, status, error) {
                toastr.error("Nie udało się usunąć zwierzęcia.");
                console.error(error);
            }
        });
    }

    $('#addPetButton').on('click', function () {
        $('#createPetModal').modal('show');
    });


    $('#createPetForm').on('submit', function (e) {
        e.preventDefault(); 

        const formData = $(this).serializeArray();
        const data = {};

        formData.forEach(item => {
            if (item.name.includes("category")) {
                data['category'] = { name: item.value };
            } else if (item.name.includes("tags")) {
                data['tags'] = [{ name: item.value }];
            } else if (item.name.includes("photoUrls")) {
                data['photoUrls'] = [item.value];
            } else {
                data[item.name] = item.value;
            }
        });

        $.ajax({
            url: '/pets',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                if (response.status === 200) {
                    toastr.success("Zwierzę zostało pomyślnie dodane!");
                    $('#createPetModal').modal('hide'); 
                    $('#createPetForm')[0].reset(); 
                    fetchPetsByStatus($('#status').val()); 
                } else {
                    toastr.error(response.data.message || 'Wystąpił błąd podczas dodawania zwierzaka.');
                }
            },
            error: function (xhr) {
                toastr.error("Wystąpił błąd podczas dodawania zwierzaka.");
            }
        });
    });


    $(document).on('click', '.edit-pet', function () {
        const petId = $(this).data('id');

        $.ajax({
            url: `/pets/${petId}`,
            method: 'GET',
            success: function (response) {
                if (response.status === 200) {
                    const pet = response.data;

                    $('#editPetForm input[name="id"]').val(pet.id);
                    $('#editPetForm input[name="name"]').val(pet.name);
                    $('#editPetForm input[name="category[name]"]').val(pet.category?.name || '');
                    $('#editPetForm select[name="status"]').val(pet.status);
                    $('#editPetForm input[name="photoUrls[]"]').val(pet.photoUrls?.[0] || '');
                    $('#editPetForm input[name="tags[0][name]"]').val(pet.tags?.[0]?.name || '');

                    $('#editPetModal').modal('show');
                } else {
                    toastr.error('Nie udało się pobrać danych zwierzaka do edycji.');
                }
            },
            error: function () {
                toastr.error("Wystąpił błąd podczas pobierania danych zwierzaka.");
            }
        });
    });



    $('#editPetForm').on('submit', function (e) {
        e.preventDefault();

        const petId = $('#editPetForm input[name="id"]').val();
        const formData = $(this).serializeArray();
        const data = {};

        formData.forEach(item => {
            if (item.name.includes("category")) {
                data['category'] = { name: item.value };
            } else if (item.name.includes("tags")) {
                data['tags'] = [{ name: item.value }];
            } else if (item.name.includes("photoUrls")) {
                data['photoUrls'] = [item.value];
            } else {
                data[item.name] = item.value;
            }
        });

        $.ajax({
            url: `/pets/${petId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                if (response.status === 200) {
                    toastr.success("Zwierzę zostało pomyślnie zaktualizowane!");
                    $('#editPetModal').modal('hide');
                    fetchPetsByStatus($('#status').val()); 
                } else {
                    toastr.error(response.data.message || 'Wystąpił błąd podczas aktualizacji zwierzaka.');
                }
            },
            error: function () {
                toastr.error("Wystąpił błąd podczas aktualizacji zwierzaka.");
            }
        });
    });
















    fetchPetsByStatus('available');


});
