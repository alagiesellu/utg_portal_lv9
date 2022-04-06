<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

/**
 * Manage Gmail access
 */
class GmailController extends Controller
{
    /**
     * @var \Google_Client
     */
    protected $client;

    public function __construct()
    {

    }

    /**
     * Getter for the google client.
     *
     * @return \Google_Client
     */
    public function getClient()
    {
        return $this->client;
    }

}
