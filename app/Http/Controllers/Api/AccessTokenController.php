<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use League\OAuth2\Server\Exception\OAuthServerException;
use Psr\Http\Message\ServerRequestInterface;

class AccessTokenController extends \Laravel\Passport\Http\Controllers\AccessTokenController
{
    public function issueToken(ServerRequestInterface $request)
    {
        try {

            //issuetoken
            $tokenResponse = parent::issueToken($request);

            //convert response to json string
            $content = $tokenResponse->getBody()->__toString();

            //convert json to array
            $data = json_decode($content, true);

            if(isset($data["error"]))
                throw new OAuthServerException('The user credentials were incorrect.', 6, 'invalid_credentials', 401);

            return $data;
        }
        catch (ModelNotFoundException $e) { // email notfound
            //return error message
        }
        catch (OAuthServerException $e) { //password not correct..token not granted
            //return error message
        }
        catch (Exception $e) {
            ////return error message
        }
    }
}
