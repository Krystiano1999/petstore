$(document).ready(function () {
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

    function fetchPetsByStatus(status) {
        $.ajax({
            url: `/pets/status`,
            method: 'GET',
            data: { status: status },
            success: function (data) {
                if (data.type === "error") {
                    toastr.error(data.message || 'Błąd podczas pobierania danych.');
                    return;
                }

                $('#pets-list').empty();
                $.each(data, function (index, pet) {
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
            success: function (pet) {
                if (pet.type === "error") {
                    toastr.error(pet.message || 'Błąd podczas pobierania danych.');
                    return;
                }

                $('#pets-list').empty();
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
            },
            error: function (xhr) {
                //console.log(xhr);
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


    fetchPetsByStatus('available');
});
