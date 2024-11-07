<div class="modal fade" id="uploadImageModal" tabindex="-1" aria-labelledby="uploadImageModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Prześlij Obraz</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Zamknij">&times;</button>
            </div>
            <div class="modal-body">
                <form id="uploadImageForm" enctype="multipart/form-data">
                    <input type="hidden" name="petId">
                    <div class="form-group">
                        <label for="additionalMetadata">Dodatkowe Informacje</label>
                        <input type="text" name="additionalMetadata" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="file">Wybierz Plik</label>
                        <input type="file" name="file" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Prześlij</button>
                </form>
            </div>
        </div>
    </div>
</div>
