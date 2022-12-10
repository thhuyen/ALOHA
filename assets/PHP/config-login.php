<?php
    session_start();

    require_once 'vendor/autoload.php';

    $client = new Google\Client();
    $client->setClientId('814610287644-0rjtnqijppfs43g7lc8as6873790idri.apps.googleusercontent.com');
    $client->setClientSecret('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');
    $client->setRedirectUri('http://localhost:8080/aloha/home.html');
    $client->addScope("bebe.yy99@gmail.com");
    $client->addScope('profile');

        // authenticate code from Google OAuth Flow
    if (isset($_GET['code'])) {
        $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
        $client->setAccessToken($token['access_token']);
        
        // get profile info
        $google_oauth = new Google\Service\Oauth2($client);
        $google_account_info = $google_oauth->userinfo->get();
        $email =  $google_account_info->email;
        $name =  $google_account_info->name;
        
        // now you can use this profile info to create account in your website and make user logged in.
    } else {
        echo "<a href='".$client->createAuthUrl()."'>Google Login</a>";
    }
?>