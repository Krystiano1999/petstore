$(document).ready(function () {
    $('#filterButton').on('click', function () {
        const status = $('#status').val();
        fetchPetsByStatus(status);
    });

    function fetchPetsByStatus(status) {
        $.ajax({
            url: `/pets/status`,
            method: 'GET',
            data: { status: status },
            success: function (data) {
                $('#pets-list').empty();
                $.each(data, function (index, pet) {
                    const statusLabel = {
                        'available': 'Dostępne',
                        'pending': 'Oczekujące',
                        'sold': 'Sprzedane'
                    }[pet.status] || 'Nieznany';

                    const petItem = $(`
                        <a href="/pets/${pet.id}" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${pet.name}</h5>
                                <small>Status: ${statusLabel}</small>
                            </div>
                            <p class="mb-1">${pet.category?.name || 'Nieznana kategoria'}</p>
                        </a>
                    `);
                    $('#pets-list').append(petItem);
                });
            },
            error: function (xhr, status, error) {
                console.error('Błąd podczas pobierania zwierząt:', error);
            }
        });
    }

    fetchPetsByStatus('available');
});
