@extends('layouts.app')

@section('content')
    <h1 class="my-4">Lista Zwierząt</h1>

    <form id="statusForm" class="mb-4">
        <div class="input-group">
            <label for="status" class="form-label me-2">Status: </label>
            <select id="status" name="status" class="form-select">
                <option value="available">Dostępne</option>
                <option value="pending">Oczekujące</option>
                <option value="sold">Sprzedane</option>
            </select>
            <button type="button" id="filterButton" class="btn btn-primary">Szukaj</button>
        </div>

        <div class="input-group my-4">
            <label for="petId" class="form-label me-2">ID Zwierzęcia: </label>
            <input type="number" id="petId" name="petId" class="form-control" placeholder="Wpisz ID zwierzęcia">
            <button type="button" id="searchByIdButton" class="btn btn-primary">Szukaj wg ID</button>
        </div>
    </form>

    <div id="pets-list" class="list-group"></div>

    @include('pets.modals.create')
    @include('pets.modals.edit')
    @include('pets.modals.upload_image')
@endsection

@push('scripts')
    <script src="{{ asset('js/pets.js') }}"></script>
@endpush
