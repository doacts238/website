<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');
header('Pragma: no-cache');
header('Vary: *');
header('Cache-Control: private, no-cache, no-store, must-revalidate, no-transform');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

// Make sure that $_SERVER["DOCUMENT_ROOT"] is set.  Defaults to NOT SET on IIS.
// This is required for the includes to work.
if (!isset($_SERVER["DOCUMENT_ROOT"])) {$_SERVER["DOCUMENT_ROOT"] = substr($_SERVER['SCRIPT_FILENAME'], 0, -strlen($_SERVER['PHP_SELF']) + 1);}

include_once "{$_SERVER['DOCUMENT_ROOT']}/php/functions.php";
include_once "{$_SERVER['DOCUMENT_ROOT']}/php/audio.php";
// include_once "functions.php";
// include_once "audio.php";

define("DEFAULT_MAX_ENTRIES", 15);
define("DEFAULT_MIN_RATING", 3);

setcookie("COOKIE_MAX_ENTRIES", getRequestParam("MAX_ENTRIES", getCookie("COOKIE_MAX_ENTRIES", DEFAULT_MAX_ENTRIES)), time() + (60 * 60 * 24 * 365)); //expires one year from now.

$strFileSep = getFileSeparator();
$strThisPage = getRealPath($_SERVER['PHP_SELF']);
$strThisDir = dirname($strThisPage);
//$strAudioDir = $strThisDir . $strFileSep . "audio";
//$strAudioDir = '/home/doacts5/public_html/sermons/';
$strAudioDir = '/home/doacts5/audio.doacts238.org/files/';
$strError = "Success.";
$strNoDesc = "(none)";

$nShowAll = getRequestParam("SHOW_ALL", "0");
$nShowHidden = getRequestParam("SHOW_HIDDEN", "0");
$nHonorShowAlways = getRequestParam("HONOR_SHOW_ALWAYS", "1");
$nMaxNumEntries = getRequestParam("MAX_ENTRIES", getCookie("COOKIE_MAX_ENTRIES", DEFAULT_MAX_ENTRIES));
$nMinRating = getRequestParam("MIN_RATING", "3");

if (strcasecmp($nMaxNumEntries, "ALL") == 0) {
    $nShowAll = 1;
    $nMaxNumEntries = 99999999;
}

$arrRatings = array();
$arrRatingsList = getAllRatingsFromDb(null, $strError);
foreach ($arrRatingsList as $ratingInfo) {
    $ratingInfo['RATING_ID'] = intval($ratingInfo['RATING_ID']);
    $arrRatings[$ratingInfo['RATING_ID']] = $ratingInfo;
}

$arrAudioTypes = array();
$arrAudioTypesList = getAllAudioTypeInfoFromDb(null, $strError);
foreach ($arrAudioTypesList as $audioTypeInfo) {
    $audioTypeInfo['AUDIO_TYPE_ID'] = intval($audioTypeInfo['AUDIO_TYPE_ID']);
    $arrAudioTypes[$audioTypeInfo['AUDIO_TYPE_ID']] = $audioTypeInfo;
}

$arrAudioListOut = array();
$arrAudioList = null;
if ($nShowAll != 0) {
    $arrAudioList = getAllAudioInfoFromDb(null, $strError);
} else {
    $arrAudioList = getShowableAudioEntriesFromDb($strError, $nMaxNumEntries, $nMinRating, $nHonorShowAlways != 0, $nShowHidden != 0);
}

if ($arrAudioList == null) {
    print("Error getting sermon list: " . $strError . "\n");
} else {
    //file_put_contents('/home/doacts5/testing.doacts238.org/php/arrAudioList.txt', print_r($arrAudioList, true));
    $arrAudios = array_keys($arrAudioList);
    foreach ($arrAudios as $strKey) {
        $arrAudioInfo = arrayTrim($arrAudioList[$strKey]);

        $strAudioDateAndService = getArrayValueOrDefault($arrAudioInfo, 'AUDIO_DATE', "00-00-00") . "_" . strtoupper(str_replace(" ", "-", getArrayValueOrDefault($arrAudioInfo, 'AUDIO_SERVICE', "SVC")));

        // Default Values
        $AUDIO_ID = "-1";
        $AUDIO_DATE = strftime("%Y-%m-%d", time());
        $AUDIO_SERVICE = strtoupper(strftime("%a %p", time()));
        $AUDIO_TYPE_ID = "1";
        $AUDIO_TYPE = "Sermon";
        $AUDIO_TITLE = "";
        $AUDIO_DESC = $strNoDesc;
        $AUDIO_AUTHOR = "Pastor David A. Brown";
        $AUDIO_LENGTH = "00:00:00";
        $AUDIO_QUALITY_HIGH = "32";
        $AUDIO_QUALITY_LOW = "16";
        $AUDIO_FILE_HIGH = $strAudioDateAndService . "_" . getArrayValueOrDefault($arrAudioInfo, 'AUDIO_QUALITY_HIGH', $AUDIO_QUALITY_HIGH) . ".mp3";
        $AUDIO_FILE_LOW = $strAudioDateAndService . "_" . getArrayValueOrDefault($arrAudioInfo, 'AUDIO_QUALITY_LOW', $AUDIO_QUALITY_LOW) . ".mp3";

        // Get Actual Values
        $AUDIO_ID = getArrayValueOrDefault($arrAudioInfo, "AUDIO_ID", $AUDIO_ID);
        $AUDIO_DATE = getArrayValueOrDefault($arrAudioInfo, "AUDIO_DATE", $AUDIO_DATE);
        $AUDIO_SERVICE = getArrayValueOrDefault($arrAudioInfo, "AUDIO_SERVICE", $AUDIO_SERVICE);
        $AUDIO_TYPE_ID = getArrayValueOrDefault($arrAudioInfo, "AUDIO_TYPE_ID", $AUDIO_TYPE_ID);
        $AUDIO_TYPE = getArrayValueOrDefault($arrAudioInfo, "AUDIO_TYPE", $AUDIO_TYPE);
        $AUDIO_TITLE = getArrayValueOrDefault($arrAudioInfo, "AUDIO_TITLE", $AUDIO_TITLE . "xxx");
        $AUDIO_DESC = getArrayValueOrDefault($arrAudioInfo, "AUDIO_DESC", $AUDIO_DESC);
        $AUDIO_AUTHOR = getArrayValueOrDefault($arrAudioInfo, "AUDIO_AUTHOR", $AUDIO_AUTHOR);
        $AUDIO_LENGTH = getArrayValueOrDefault($arrAudioInfo, "AUDIO_LENGTH", $AUDIO_LENGTH);
        $AUDIO_SERVICE = getArrayValueOrDefault($arrAudioInfo, "AUDIO_QUALITY_HIGH", $AUDIO_QUALITY_HIGH);
        $AUDIO_QUALITY_LOW = getArrayValueOrDefault($arrAudioInfo, "AUDIO_QUALITY_LOW", $AUDIO_QUALITY_LOW);
        $AUDIO_FILE_HIGH = getArrayValueOrDefault($arrAudioInfo, "AUDIO_FILE_HIGH", $AUDIO_FILE_HIGH);
        $AUDIO_FILE_LOW = getArrayValueOrDefault($arrAudioInfo, "AUDIO_FILE_LOW", $AUDIO_FILE_LOW);

        $AUDIO_FILE = makeSermonFileName(getArrayValueOrDefault($arrAudioInfo, "AUDIO_DATE"),
            getArrayValueOrDefault($arrAudioInfo, "AUDIO_SERVICE"),
            getArrayValueOrDefault($arrAudioInfo, "AUDIO_QUALITY_HIGH"), 'mp3');

        if (!stringIsEmpty($AUDIO_FILE) &&
            (!file_exists($strAudioDir . $AUDIO_FILE_HIGH) || !is_file($strAudioDir . $AUDIO_FILE_HIGH))) {
            $AUDIO_FILE_HIGH = $AUDIO_FILE;
        }

        $strUrlHigh = getFullUrl(dirname($_SERVER['PHP_SELF']) . "/" . basename($AUDIO_FILE_HIGH));
        $strUrlLow = getFullUrl(dirname($_SERVER['PHP_SELF']) . "/" . basename($AUDIO_FILE_LOW));
        $strAudioDesc = trim(getArrayValueOrDefault($arrAudioInfo, 'AUDIO_DESC', $strNoDesc));

        if (file_exists($strAudioDir . $AUDIO_FILE_HIGH) && is_file($strAudioDir . $AUDIO_FILE_HIGH)) {
            $arrAudioInfo['AUDIO_FILE'] = $AUDIO_FILE;
            $arrAudioInfo['AUDIO_FILE_HIGH'] = $AUDIO_FILE_HIGH;
            $arrAudioInfo['AUDIO_FILE_LOW'] = $AUDIO_FILE_LOW;

            $arrAudioInfo['AUDIO_ID'] = intval($arrAudioInfo['AUDIO_ID']);
            //$arrAudioInfo['AUDIO_TYPE_ID'] = intval($arrAudioInfo['AUDIO_TYPE_ID']);
            $arrAudioInfo['AUDIO_TYPE'] = $arrAudioTypes[intval($arrAudioInfo['AUDIO_TYPE_ID'])];
            //$arrAudioInfo['AUDIO_QUALITY_HIGH'] = intval($arrAudioInfo['AUDIO_QUALITY_HIGH']);
            //$arrAudioInfo['AUDIO_QUALITY_LOW'] = intval($arrAudioInfo['AUDIO_QUALITY_LOW']);
            //$arrAudioInfo['RATING_ID'] = intval($arrAudioInfo['RATING_ID']);
            $arrAudioInfo['RATING'] = $arrRatings[intval($arrAudioInfo['RATING_ID'])];
            $arrAudioInfo['AUDIO_SHOW_ALWAYS'] = intval($arrAudioInfo['AUDIO_SHOW_ALWAYS']) != 0;
            //$arrAudioInfo['AUDIO_HIDDEN'] = intval($arrAudioInfo['AUDIO_HIDDEN']) != 0;

            unset($arrAudioInfo['AUDIO_TYPE_ID']);
            unset($arrAudioInfo['RATING_ID']);
            unset($arrAudioInfo['AUDIO_QUALITY_HIGH']);
            unset($arrAudioInfo['AUDIO_QUALITY_LOW']);

            //$arrAudioListOut[intval($arrAudioInfo["AUDIO_ID"])] = $arrAudioInfo;
            array_push($arrAudioListOut, $arrAudioInfo);
        }
    }

    print(json_encode($arrAudioListOut, true));

}
