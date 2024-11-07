<div class="modal fade" id="createPetModal" tabindex="-1" aria-labelledby="createPetModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Dodaj Nowe Zwierzę</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Zamknij">&times;</button>
            </div>
            <div class="modal-body">
                <form id="createPetForm">
                    <div class="form-group">
                        <label for="name">Nazwa Zwierzęcia</label>
                        <input type="text" name="name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="category">Kategoria</label>
                        <input type="text" name="category[name]" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select name="status" class="form-control" required>
                            <option value="available">Dostępny</option>
                            <option value="pending">Oczekujący</option>
                            <option value="sold">Sprzedany</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="photoUrls">Adresy URL Zdjęć</label>
                        <input type="text" name="photoUrls[]" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="tags">Tagi</label>
                        <input type="text" name="tags[0][name]" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary">Dodaj Zwierzę</button>
                </form>
            </div>
        </div>
    </div>
</div>
