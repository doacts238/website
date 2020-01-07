<?php
// Make sure that $_SERVER["DOCUMENT_ROOT"] is set.  Defaults to NOT SET on IIS.
// This is required for the includes to work.
if (!isset($_SERVER["DOCUMENT_ROOT"])) {$_SERVER["DOCUMENT_ROOT"] = substr($_SERVER['SCRIPT_FILENAME'], 0, -strlen($_SERVER['PHP_SELF']) + 1);}

include_once "{$_SERVER['DOCUMENT_ROOT']}/php/dbConnect.php";
//include_once "dbConnect.php";

$GLOBAL_DB_CONNECT = null;
$GLOBAL_DB_DEBUG = true;

function ensureServerDocumentRootIsSet()
{
    if (!isset($_SERVER["DOCUMENT_ROOT"])) {
        $_SERVER["DOCUMENT_ROOT"] = substr($_SERVER['SCRIPT_FILENAME'], 0, -strlen($_SERVER['PHP_SELF']) + 1);
    }
}

function getFileSeparator()
{
    ensureServerDocumentRootIsSet();
    $strReturn = "/";
    if (strpos($_SERVER['DOCUMENT_ROOT'], "\\")) {
        $strReturn = "\\";
    }

    return $strReturn;
}

function getRealPath($strRelativePath)
{
    ensureServerDocumentRootIsSet();
    $strReturn = $_SERVER['DOCUMENT_ROOT'] . $strRelativePath;
    $strReturn = str_replace("//", "/", $strReturn);
    $strReturn = str_replace("\\\\", "\\", $strReturn);
    $strFileSep = getFileSeparator();
    $strReturn = str_replace("\\/", $strFileSep, $strReturn);
    $strReturn = str_replace("/\\", $strFileSep, $strReturn);
    return $strReturn;
}

function getBaseUrl($bIncludeFinalSlash = true)
{
    $strReturn = null;
    $strProtocol = "http";
    $strServerHostName = $_SERVER['HTTP_HOST'];
    $strReturn = sprintf("%s://%s", $strProtocol, $strServerHostName);
    if ($bIncludeFinalSlash) {
        $strReturn .= "/";
    }

    return $strReturn;
}

function getFullUrl($strURI)
{
    $strReturn = getBaseUrl(false) . $strURI;
    return $strReturn;
}

function getRequestParams()
{
    return $_REQUEST;
}

function getRequestParam($strParamName, $strDefault = null)
{
    $strReturn = $strDefault;
    $arrParams = getRequestParams();
    if (array_key_exists($strParamName, $arrParams)) {
        $strReturn = $arrParams[$strParamName];
    }
    return $strReturn;
}

function getCookies()
{
    return $_COOKIE;
}

function getCookie($strCookieName, $strDefault = null)
{
    $strReturn = $strDefault;
    $arrCookies = getCookies();
    if (array_key_exists($strCookieName, $arrCookies)) {
        $strReturn = $arrCookies[$strCookieName];
        //printf("<pre>Cookie %s=%s</pre>",$strCookieName,$strReturn);
    }
    return $strReturn;
}

function isNull($strValue)
{
    return (!isset($strValue) || ($strValue == ""));
}

function getValueOrDefault($strValue, $strDefault = null)
{
    $strReturn = $strValue;
    if (isNull($strValue)) {
        $strReturn = $strDefault;
    }

    return $strReturn;
}

function getArrayValueOrDefault($arrArray, $strKey, $strDefault = null)
{
    $strReturn = $strDefault;
    if (array_key_exists($strKey, $arrArray)) {
        $strReturn = getValueOrDefault($arrArray[$strKey], $strDefault);
    }

    return $strReturn;
}

function stripslashes_deep($value)
{
    $value = is_array($value) ?
    array_map('stripslashes_deep', $value) :
    stripslashes($value);
    return $value;
}

function arrayStripSlashes($arrArray)
{
    return array_map('stripslashes_deep', $arrArray);
}

function addslashes_deep($value)
{
    $value = is_array($value) ?
    array_map('addslashes_deep', $value) :
    addslashes($value);
    return $value;
}

function arrayAddSlashes($arrArray)
{
    return array_map('addslashes_deep', $arrArray);
}

function htmlentities_deep($value)
{
    $value = is_array($value) ?
    array_map('htmlentities_deep', $value) :
    htmlentities($value);
    return $value;
}

function arrayHtmlEntities($arrArray)
{
    return array_map('htmlentities_deep', $arrArray);
}

function html_entity_decode_deep($value)
{
    $value = is_array($value) ?
    array_map('html_entity_decode_deep', $value) :
    html_entity_decode($value);
    return $value;
}

function arrayHtmlEntityDecode($arrArray)
{
    return array_map('html_entity_decode_deep', $arrArray);
}

function trim_deep($value)
{
    $value = is_array($value) ?
    array_map('trim_deep', $value) :
    trim($value);
    return $value;
}

function arrayTrim($arrArray)
{
    return array_map('trim_deep', $arrArray);
}

function dbConnect(&$strError)
{
    global $GLOBAL_DB_CONNECT;
    global $GLOBAL_DB_DEBUG;
    global $DB_TYPE;
    global $DB_USERNAME;
    global $DB_PASSWORD;
    global $DB_DATABASE;
    global $DB_HOST;

    if (!$GLOBAL_DB_CONNECT || ($GLOBAL_DB_CONNECT == null)) {
        ini_set("magic_quotes_runtime", "off");
        $GLOBAL_DB_CONNECT = mysql_connect($DB_HOST, $DB_USERNAME, $DB_PASSWORD, false);

        if (!$GLOBAL_DB_CONNECT) {
            $strError = sprintf("ERROR connecting to database (%d:%s).", mysql_errno(), mysql_error());
        }

        mysql_select_db($DB_DATABASE, $GLOBAL_DB_CONNECT);
    }

    return $GLOBAL_DB_CONNECT;
} // end function dbConnect()

function getSqlValueOrNull($strValue, $bAddSingleQuotes = true)
{
    $strReturn = "NULL";
    if (isset($strValue) && ($strValue != null) && (strlen($strValue) > 0)) {
        $strReturn = addslashes($strValue);
        if ($bAddSingleQuotes) {
            $strReturn = "'" . $strReturn . "'";
        }

    }
    return $strReturn;
}

function getAllRatingsFromDb($db, &$strError)
{
    $arrReturn = null;

    if ($db == null) {
        $strTmp = "";
        $db = dbConnect($strTmp);
        $strError = $strTmp;
    }

    if ($db == null) {
        $strError = "db is null";
    } else {
        $strSql = "SELECT" . "\n"
            . "  RATING_ID," . "\n"
            . "  RATING_NAME" . "\n"
            . "FROM" . "\n"
            . "  RATINGS" . "\n"
            . "ORDER BY" . "\n"
            . "  RATING_ID" . "\n";

        $result = mysql_query($strSql);
        if (!$result) {
            $strError = sprintf("ERROR database query failed (%d:%s).", mysql_errno(), mysql_error());
        } else {
            $nRow = 1;
            if ($arrReturn == null) {
                $arrReturn = array();
            }

            while ($arrAudioInfo = mysql_fetch_assoc($result)) {
                foreach (array_keys($arrAudioInfo) as $strKey) {
                    if (isNull($arrAudioInfo[$strKey])) {
                        unset($arrAudioInfo[$strKey]);
                    }

                }

                $strAudioTypeTag = $nRow++;

                $arrReturn[$strAudioTypeTag] = $arrAudioInfo;
            } // end while
            mysql_free_result($result);
        }
    }

    return $arrReturn;
} // end getAllRatingsFromDb()

function buildRatingSelect($strName, $arrRatings, $nSelectedRating)
{
    $strReturn = "<select name=\"" . htmlentities($strName) . "\">";
    foreach (array_keys($arrRatings) as $strKey) {
        $strReturn .= "<option value=\"" . htmlentities($arrRatings[$strKey]['RATING_ID']) . "\"";
        if ($arrRatings[$strKey]['RATING_ID'] == $nSelectedRating) {
            $strReturn .= " selected=\"selected\"";
        }

        $strReturn .= ">" . $arrRatings[$strKey]['RATING_NAME'] . "</option>";
    }
    $strReturn .= "</select>";
    return $strReturn;
}
