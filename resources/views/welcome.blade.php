<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facephi Integration</title>
    @vite('resources/js/app.js')
    <style>
        facephi-selphid-widget{
            height: 500px;
            width: 100%;
        }
    </style>
</head>
<body>
    <facephi-sdk-provider
        apikey="mG4b2SjMV4oeITn4AWc1n8pKIM2zfuctMNUcKWsC"
        steps="START,SELPHI_WIDGET,SELPHID_WIDGET,FINISH"
        customer-id="laravel-example"
        bundle-path="/assets/widgets/"
        type="AUTHENTICATION"
    >
        <facephi-selphi-widget
            bundle-path="/assets/widgets/selphi"
        ></facephi-selphi-widget>
        <facephi-selphid-widget
            bundle-path="{{ asset('/assets/widgets/selphid') }}"
        ></facephi-selphid-widget>
    </facephi-sdk-provider>
</body>
</html>
