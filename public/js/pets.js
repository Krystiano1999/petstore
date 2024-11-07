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

    fetchPetsByStatus('available');


});
