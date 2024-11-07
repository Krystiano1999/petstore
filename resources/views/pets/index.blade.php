@extends('layouts.app')

@section('content')
    <h1 class="my-4">Lista Zwierząt</h1>

    <form id="statusForm" class="mb-4">
        <div class="input-group">
            <select id="status" name="status" class="form-select">
                <option value="available">Dostępne</option>
                <option value="pending">Oczekujące</option>
                <option value="sold">Sprzedane</option>
            </select>
            <button type="button" id="filterButton" class="btn btn-primary">Szukaj</button>
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
