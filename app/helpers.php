<?php

    function abort_forbidden_if(bool $truth)
    {
        if ($truth) abort(403);
    }

    /**
     * Abort error messages if error occurs.
     *
     * @param bool $truth = truth value to check if to abort
     * @param $messages = error messages to abort with
     *
     * @return void
    */
    function abort_errors_if(bool $truth, $messages)
    {
        if ($truth) abort_errors($messages);
    }

    /**
     * Abort error messages if error occurs.
     *
     * @param array $messages = error messages to abort with
     *
     * @return void
     */
    function abort_errors(array $messages)
    {
        abort(468, json_encode($messages));
    }
