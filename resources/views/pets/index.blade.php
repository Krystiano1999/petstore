@extends('layouts.app')

@section('content')
    <h1 class="my-4">Pets List</h1>
    <div class="list-group">
     
    </div>

    @include('pets.modals.create')
    @include('pets.modals.edit')
    @include('pets.modals.upload_image')
@endsection
