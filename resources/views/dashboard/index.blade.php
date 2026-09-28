@extends('layouts.app')

@section('content')

    {{-- DASHBOARD VIEW --}}
    @include('dashboard.partials.dashboard-view')

    {{-- DATA VIEW --}}
    @include('dashboard.partials.data-view')

@endsection