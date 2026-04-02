<?php
/**
 * IEEE API Configuration
 *
 * IMPORTANT: Keep this file secure and never commit to version control
 * For production, use environment variables instead of hardcoded credentials
 */

// IEEE API Environment (TEST, QA, or PRODUCTION)
define('IEEE_ENV', 'QA'); // Change to PRODUCTION when ready

// IEEE API Credentials - YOU MUST REPLACE THESE WITH YOUR ACTUAL CREDENTIALS
define('IEEE_CLIENT_ID', '3abefc00-d2fb-4f9d-adf3-231feb4bf092'); // QA credentials from PDF
define('IEEE_CLIENT_SECRET', 'b9d2d3c7-0ea9-443a-be49-ee982b86b6f3'); // QA credentials from PDF
define('IEEE_SCOPE', 'GetMemberStatus');

// IEEE API Endpoints based on environment
$IEEE_ENDPOINTS = [
    'TEST' => [
        'token' => 'https://services15.ieee.org/RST/api/oauth/token',
        'member_status' => 'https://services15.ieee.org/RST/Customer/getstatus',
        'oauth_authorize' => 'https://ieeexplore.ieee.org/servlet/login' // IEEE login page
    ],
    'QA' => [
        'token' => 'https://services11.ieee.org/RST/api/oauth/token',
        'member_status' => 'https://services11.ieee.org/RST/Customer/getstatus',
        'oauth_authorize' => 'https://ieeexplore.ieee.org/servlet/login'
    ],
    'PRODUCTION' => [
        'token' => 'https://services13.ieee.org/RST/api/oauth/token',
        'member_status' => 'https://services13.ieee.org/RST/Customer/getstatus',
        'oauth_authorize' => 'https://ieeexplore.ieee.org/servlet/login'
    ]
];

// Get current environment endpoints
define('IEEE_TOKEN_ENDPOINT', $IEEE_ENDPOINTS[IEEE_ENV]['token']);
define('IEEE_MEMBER_STATUS_ENDPOINT', $IEEE_ENDPOINTS[IEEE_ENV]['member_status']);
define('IEEE_OAUTH_AUTHORIZE_ENDPOINT', $IEEE_ENDPOINTS[IEEE_ENV]['oauth_authorize']);

// Your application's callback URL (update with your actual domain)
define('IEEE_OAUTH_CALLBACK_URL', 'http://localhost/Conferences/ICSSII%20Conference/api/ieee-oauth-callback.php');

// Session configuration
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Enable error reporting for development (disable in production)
if (IEEE_ENV !== 'PRODUCTION') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}
?>
