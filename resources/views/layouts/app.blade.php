<!doctype html>
<html lang="id">

<head>
    <meta charset="UTF-8" />

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <script>
        window.serverData = @json($data);
    </script>

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sistem Daftar Tunggu — Data Pelayanan Pelanggan</title>

    {{-- CSS --}}
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <!-- Font Awesome 6 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</head>

<body>

    @include('partials.sidebar')
    @include('partials.menu-toggle')
    @include('partials.topbar')

    <main>
        @yield('content')
            @include('partials.footer')
    </main>

    @include('partials.modals')

    {{-- JavaScript xlsx --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

    {{-- JS --}}
    <script src="{{ asset('js/app.js') }}"></script>

</body>

</html>
