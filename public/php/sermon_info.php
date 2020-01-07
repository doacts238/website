<?php
// Make sure that $_SERVER["DOCUMENT_ROOT"] is set.  Defaults to NOT SET on IIS.
// This is required for the includes to work.

if (!isset($_SERVER["DOCUMENT_ROOT"])) {$_SERVER["DOCUMENT_ROOT"] = substr($_SERVER['SCRIPT_FILENAME'], 0, -strlen($_SERVER['PHP_SELF']) + 1);}

?>
<?php
$__PAGE_TITLE__ = "BAC: Online Sermons";
$__EXTRA_HEAD_LINES__ = array
    (
    "<link href='/css/sermons.css' rel='stylesheet' type='text/css' media='screen' />",
);

include_once "{$_SERVER['DOCUMENT_ROOT']}/php/functions.php";
include_once "{$_SERVER['DOCUMENT_ROOT']}/php/audio.php";

include_once "{$_SERVER['DOCUMENT_ROOT']}/php/defaultPageTop.php";
?>
<!-- ========================== BEGIN PAGE CONTENT ======================== -->


<?php
$strFileSep = getFileSeparator();
$strThisPage = getRealPath($_SERVER['PHP_SELF']);
$strThisDir = dirname($strThisPage);
//$strAudioDir = $strThisDir . $strFileSep . "audio";
$strAudioDir = $strThisDir;
$strError = "Success.";
$strNoDesc = "(none)";

$nAudioId = getRequestParam("AUDIO_ID", "-1");

/** /
print("<pre>");
print_r(getRequestParams());
print_r(getCookies());
printf("nShowAll=%s\n",$nShowAll);
printf("nShowHidden=%s\n",$nShowHidden);
printf("nHonorShowAlways=%s\n",$nHonorShowAlways);
printf("nMaxNumEntries=%s\n",$nMaxNumEntries);
printf("nMinRating=%s\n",$nMinRating);
print("</pre>");
/**/

$arrAudioInfo = getAudioInfoEntryFromDb(null, $nAudioId, $strError);

if ($arrAudioInfo == null) {
    print("Error getting sermon entry: " . $strError . "\n");
} else {
    $arrAudioInfo = arrayTrim(arrayHtmlEntities($arrAudioInfo));

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
    $AUDIO_QUALITY_HIGH = getArrayValueOrDefault($arrAudioInfo, "AUDIO_QUALITY_HIGH", $AUDIO_QUALITY_HIGH);
    $AUDIO_QUALITY_LOW = getArrayValueOrDefault($arrAudioInfo, "AUDIO_QUALITY_LOW", $AUDIO_QUALITY_LOW);
    $AUDIO_FILE_HIGH = getArrayValueOrDefault($arrAudioInfo, "AUDIO_FILE_HIGH", $AUDIO_FILE_HIGH);
    $AUDIO_FILE_LOW = getArrayValueOrDefault($arrAudioInfo, "AUDIO_FILE_LOW", $AUDIO_FILE_LOW);

    $strUrlHigh = getFullUrl(dirname($_SERVER['PHP_SELF']) . "/" . basename($AUDIO_FILE_HIGH));
    $strUrlLow = getFullUrl(dirname($_SERVER['PHP_SELF']) . "/" . basename($AUDIO_FILE_LOW));
    $strAudioDesc = htmlentities(trim(getArrayValueOrDefault($arrAudioInfo, 'AUDIO_DESC', $strNoDesc)), ENT_QUOTES);

    $strLinkUrl = getBaseUrl();
    if ($strLinkUrl) {
        $strLinkUrl .= 'sermons/' . $AUDIO_ID;
    }
    ?>
        <div class="content">
          <i>New Life Apostolic Pulpit Presents ...</i><br />

          <h1><?=$AUDIO_TITLE?></h1>

          <p>
          By: <b><?=$AUDIO_AUTHOR?></b><br />
          Date: <?=$AUDIO_DATE?> <?=$AUDIO_SERVICE?><br />
          Length: <?=$AUDIO_LENGTH?>
          </p>

          Description:<br />
          <div style="margin-left:15px;"><?=$AUDIO_DESC?></div><br />

           <div class="text-box">
            <i>TIP:  To share this audio file with a friend, send them
            this URL: <span style="font-family: Arial, Helvetica, sans-serif;"><a href="<?=$strLinkUrl;?>" title="Link to this page"><?=$strLinkUrl;?></a></span>
            </i>
          </div>

          <!-- ******* AUDIO START [<?=$AUDIO_ID?>] ******* -->
          <div class="sermon_table">
            <table border="2" cellspacing="0" summary="sermon info">
              <tbody>
                <tr>
                  <th colspan="2">PLAY THIS AUDIO FILE</th>
                </tr>

<?php if (file_exists($AUDIO_FILE_HIGH)) {?>
                <tr>
                  <td style="text-align: center; font-weight: bold;">
                      <a href="make_m3u.php?AUDIO_URL=<?=urlencode($strUrlHigh)?>"
                         type="audio/x-mpegurl"
                         title="For High Speed Internet: <?=$AUDIO_QUALITY_HIGH?>kbps, <?=sprintf("%0.02f", filesize($AUDIO_FILE_HIGH) / 1048576)?> MB">&laquo;HIGH&raquo;</a>
                  </td>
                  <td style="text-align: left;">
                    For high speed Internet connections (<?=$AUDIO_QUALITY_HIGH?>kbps MP3)
                  </td>
                </tr>
<?php }?>
<?php if (file_exists($AUDIO_FILE_LOW)) {?>
                <tr>
                  <td style="text-align: center; font-weight: bold;">
                      <a href="make_m3u.php?AUDIO_URL=<?=urlencode($strUrlLow)?>"
                         type="audio/x-mpegurl"
                         title="For Low Speed (dialup) Internet: <?=$AUDIO_QUALITY_LOW?>kbps, <?=sprintf("%0.02f", filesize($AUDIO_FILE_LOW) / 1048576)?> MB">&laquo;LOW&raquo;</a>
                  </td>
                  <td style="text-align: left;">
                    For low speed Internet connections such as dialup (<?=$AUDIO_QUALITY_LOW?>kbps MP3)
                  </td>
                </tr>
<?php }?>
<?php if (file_exists($AUDIO_FILE_HIGH)) {?>
                <tr>
                  <td style="text-align: center; font-weight: bold;">
                      <a href="download_mp3.php?FILE=<?=urlencode(basename($AUDIO_FILE_HIGH))?>"
                         type="application/x-download"
                         title="Download this file to your computer: File: <?=basename($AUDIO_FILE_HIGH)?>, Size: <?=sprintf("%0.02f", filesize($AUDIO_FILE_HIGH) / 1048576)?> MB">&laquo;DL&raquo;</a>
                  </td>
                  <td style="text-align: left;">
                    Download to your PC or Portable Audio Player (Format: <?=$AUDIO_QUALITY_HIGH?>kbps MP3, File Size: <?=sprintf("%0.02f", filesize($AUDIO_FILE_HIGH) / 1048576)?> MB)
                  </td>
                </tr>
<?php }?>
              </tbody>
            </table>
          </div> <!-- closing sermon_table div -->
           <p>
            <i>If you need help listening to the online sermons, please see our
            <a href="instructions.php" title="Online Sermons Instructions">
            Online Sermons Instructions</a> page.</i>
           </p>
           <p>
             NOTE: You can burn these sermons to CD and listen to them anywhere!  Visit our
             <a href="burning/" title="Burning Instructions">CD-ROM Burning Instructions</a> page.
           </p>
           <p>
            <i>We would love to hear your <a href="/contact/"
            title="How to contact us">feedback</a> about the Online Sermons
            feature!</i>
          </p>

<?php
}
?>


        </div> <!-- end content div -->
<!-- =========================== END PAGE CONTENT ========================= -->
<?php include_once "{$_SERVER['DOCUMENT_ROOT']}/php/defaultPageBottom.php";?>
