<?php
// Make sure that $_SERVER["DOCUMENT_ROOT"] is set.  Defaults to NOT SET on IIS.
// This is required for the includes to work.
if (!isset($_SERVER["DOCUMENT_ROOT"])) {$_SERVER["DOCUMENT_ROOT"] = substr($_SERVER['SCRIPT_FILENAME'], 0, -strlen($_SERVER['PHP_SELF']) + 1);}

include_once "{$_SERVER['DOCUMENT_ROOT']}/php/functions.php";
include_once "functions.php";

function formatResultRow(&$arrRow)
{
    foreach (array_keys($arrRow) as $strKey) {
        if (isNull($arrRow[$strKey])) {
            unset($arrRow[$strKey]);
        }
        // elseif (is_string($arrRow[$strKey])) {
        //     $arrRow[$strKey] = addcslashes($arrRow[$strKey], "\"");
        // }
    }
}

function getAllAudioInfoFromDb($db, &$strError, $bIncludeHidden = false)
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
            . "  AUDIO_INFO.AUDIO_ID," . "\n"
            . "  AUDIO_INFO.AUDIO_DATE," . "\n"
            . "  AUDIO_INFO.AUDIO_SERVICE," . "\n"
            . "  AUDIO_TYPES.AUDIO_TYPE_ID," . "\n"
            . "  AUDIO_TYPES.AUDIO_TYPE," . "\n"
            . "  AUDIO_INFO.AUDIO_TITLE," . "\n"
            . "  AUDIO_INFO.AUDIO_AUTHOR," . "\n"
            . "  AUDIO_INFO.AUDIO_LENGTH," . "\n"
            . "  RATINGS.RATING_ID," . "\n"
            . "  RATINGS.RATING_NAME," . "\n"
            . "  AUDIO_INFO.AUDIO_SHOW_ALWAYS," . "\n"
            . "  AUDIO_INFO.AUDIO_HIDDEN," . "\n"
            . "  AUDIO_INFO.AUDIO_QUALITY_HIGH," . "\n"
            . "  AUDIO_INFO.AUDIO_QUALITY_LOW," . "\n"
            . "  AUDIO_INFO.AUDIO_FILE_HIGH," . "\n"
            . "  AUDIO_INFO.AUDIO_FILE_LOW," . "\n"
            . "  AUDIO_INFO.AUDIO_DESC" . "\n"
            . "FROM" . "\n"
            . "  AUDIO_INFO," . "\n"
            . "  AUDIO_TYPES," . "\n"
            . "  RATINGS" . "\n"
            . "WHERE" . "\n"
            . "  AUDIO_INFO.AUDIO_TYPE_ID = AUDIO_TYPES.AUDIO_TYPE_ID AND" . "\n"
            . ($bIncludeHidden ? "" : "  AUDIO_INFO.AUDIO_HIDDEN = 0 AND\n")
            . "  AUDIO_INFO.RATING_ID = RATINGS.RATING_ID" . "\n"
            . "ORDER BY" . "\n"
            . "  AUDIO_INFO.AUDIO_DATE DESC," . "\n"
            . "  AUDIO_INFO.AUDIO_SERVICE DESC," . "\n"
            . "  AUDIO_INFO.AUDIO_ID DESC" . "\n";

        $result = mysql_query($strSql);
        if (!$result) {
            $strError = sprintf("ERROR database query failed (%d:%s).", mysql_errno(), mysql_error());
        } else {
            if ($arrReturn == null) {
                $arrReturn = array();
            }

            $nRow = 1;
            while ($arrAudioInfo = mysql_fetch_assoc($result)) {
                formatResultRow($arrAudioInfo);

                $arrReturn[$nRow++] = $arrAudioInfo;
            } // end while
            mysql_free_result($result);
        }
    }

    return $arrReturn;
} // end getAllAudioInfoFromDb()

function getShowableAudioEntriesFromDb(&$strError, $nMaxNumEntries = 25, $nMinRating = 3, $bHonorShowAlways = true, $bIncludeHidden = false)
{
    $arrReturn = null;

    $db = dbConnect($strError);

    if ($db == null) {
        $strError = "db is null";
    } else {
        $strSql = "SELECT" . "\n"
        . "  AUDIO_INFO.AUDIO_ID," . "\n"
        . "  AUDIO_INFO.AUDIO_DATE," . "\n"
        . "  AUDIO_INFO.AUDIO_SERVICE," . "\n"
        . "  AUDIO_TYPES.AUDIO_TYPE_ID," . "\n"
        . "  AUDIO_TYPES.AUDIO_TYPE," . "\n"
        . "  AUDIO_INFO.AUDIO_TITLE," . "\n"
        . "  AUDIO_INFO.AUDIO_AUTHOR," . "\n"
        . "  AUDIO_INFO.AUDIO_LENGTH," . "\n"
        . "  RATINGS.RATING_ID," . "\n"
        . "  RATINGS.RATING_NAME," . "\n"
        . "  AUDIO_INFO.AUDIO_SHOW_ALWAYS," . "\n"
        . "  AUDIO_INFO.AUDIO_HIDDEN," . "\n"
        . "  AUDIO_INFO.AUDIO_QUALITY_HIGH," . "\n"
        . "  AUDIO_INFO.AUDIO_QUALITY_LOW," . "\n"
        . "  AUDIO_INFO.AUDIO_FILE_HIGH," . "\n"
        . "  AUDIO_INFO.AUDIO_FILE_LOW," . "\n"
        . "  AUDIO_INFO.AUDIO_DESC" . "\n"
        . "FROM" . "\n"
        . "  AUDIO_INFO," . "\n"
        . "  AUDIO_TYPES," . "\n"
        . "  RATINGS" . "\n"
        . "WHERE" . "\n"
        . "  ( AUDIO_INFO.AUDIO_TYPE_ID = AUDIO_TYPES.AUDIO_TYPE_ID AND" . "\n"
        . ($bIncludeHidden ? "" : "    AUDIO_INFO.AUDIO_HIDDEN = 0 AND\n")
        . "    AUDIO_INFO.RATING_ID = RATINGS.RATING_ID ) AND" . "\n"
        . "  ( " . ($bHonorShowAlways ? "( AUDIO_INFO.AUDIO_SHOW_ALWAYS = 1 AND" . "\n"
            . "      AUDIO_INFO.AUDIO_HIDDEN = 0 ) OR\n    " : "")
        . "( AUDIO_INFO.RATING_ID >= " . sprintf("%d", $nMinRating) . " ) )" . "\n"
            . "ORDER BY" . "\n"
            . "  AUDIO_INFO.AUDIO_DATE DESC," . "\n"
            . "  AUDIO_INFO.AUDIO_SERVICE DESC," . "\n"
            . "  AUDIO_INFO.AUDIO_ID DESC" . "\n";

        //printf("<pre>%s</pre>\n", $strSql);

        $result = mysql_query($strSql);
        if (!$result) {
            $strError = sprintf("ERROR database query failed (%d:%s).", mysql_errno(), mysql_error());
        } else {
            if ($arrReturn == null) {
                $arrReturn = array();
            }

            $nRow = 1;
            while ($arrAudioInfo = mysql_fetch_assoc($result)) {
                formatResultRow($arrAudioInfo);

                $bAddToResult = true;
                if ($nRow > $nMaxNumEntries) {
                    $bAddToResult = false;
                }

                if ($bHonorShowAlways) {
                    if ($arrAudioInfo['AUDIO_SHOW_ALWAYS'] == 1) {
                        $bAddToResult = true;
                    }

                    if (($bAddToResult) && (count(array_keys($arrReturn)) >= $nMaxNumEntries)) {
                        foreach (array_reverse(array_keys($arrReturn)) as $key) {
                            if ($arrReturn[$key]['AUDIO_SHOW_ALWAYS'] != 1) {
                                unset($arrReturn[$key]);
                                break;
                            }
                        }
                    }
                }

                if ($bAddToResult) {
                    $arrReturn[$nRow++] = $arrAudioInfo;
                }
            } // end while
            mysql_free_result($result);
        }
    }

    return $arrReturn;
} // end getShowableAudioEntriesFromDb()

function getAudioInfoEntryFromDb($db, $nAudioId, &$strError)
{
    $arrReturn = null;

    if ($db == null) {
        $db = dbConnect($strError);
    }

    if ($db != null) {
        $strSql = "SELECT" . "\n"
        . "  AUDIO_INFO.AUDIO_ID," . "\n"
        . "  AUDIO_INFO.AUDIO_DATE," . "\n"
        . "  AUDIO_INFO.AUDIO_SERVICE," . "\n"
        . "  AUDIO_TYPES.AUDIO_TYPE_ID," . "\n"
        . "  AUDIO_TYPES.AUDIO_TYPE," . "\n"
        . "  AUDIO_INFO.AUDIO_TITLE," . "\n"
        . "  AUDIO_INFO.AUDIO_AUTHOR," . "\n"
        . "  AUDIO_INFO.AUDIO_LENGTH," . "\n"
        . "  AUDIO_INFO.AUDIO_SHOW_ALWAYS," . "\n"
        . "  AUDIO_INFO.AUDIO_HIDDEN," . "\n"
        . "  RATINGS.RATING_ID," . "\n"
        . "  RATINGS.RATING_NAME," . "\n"
        . "  AUDIO_INFO.AUDIO_QUALITY_HIGH," . "\n"
        . "  AUDIO_INFO.AUDIO_QUALITY_LOW," . "\n"
        . "  AUDIO_INFO.AUDIO_FILE_HIGH," . "\n"
        . "  AUDIO_INFO.AUDIO_FILE_LOW," . "\n"
        . "  AUDIO_INFO.AUDIO_DESC" . "\n"
        . "FROM" . "\n"
        . "  AUDIO_INFO," . "\n"
        . "  AUDIO_TYPES," . "\n"
        . "  RATINGS" . "\n"
        . "WHERE" . "\n"
        . "  AUDIO_INFO.AUDIO_TYPE_ID = AUDIO_TYPES.AUDIO_TYPE_ID" . " AND\n"
        . "  AUDIO_INFO.RATING_ID = RATINGS.RATING_ID AND" . "\n"
        . "  AUDIO_INFO.AUDIO_ID = " . sprintf("%d", $nAudioId) . "\n"
            . "ORDER BY" . "\n"
            . "  AUDIO_INFO.AUDIO_DATE DESC," . "\n"
            . "  AUDIO_INFO.AUDIO_SERVICE DESC," . "\n"
            . "  AUDIO_INFO.AUDIO_ID DESC" . "\n";

        $result = mysql_query($strSql);
        if (!$result) {
            $strError = sprintf("ERROR database query failed (%d:%s).", mysql_errno(), mysql_error());
        } else {
            while ($arrAudioInfo = mysql_fetch_assoc($result)) {
                formatResultRow($arrAudioInfo);

                $arrReturn = $arrAudioInfo;
                break; // should only return 1;
            }
            mysql_free_result($result);
        }
    }
    return $arrReturn;
} // end getAudioInfoEntryFromDb()

function saveAudioInfoEntryToDb($db, $arrAudioEntry, &$strError, $bOverWrite = true)
{
    $bReturn = false;
    if ($db == null) {
        $strErrTmp = null;
        $db = dbConnect($strErrTmp);
    }

    if ($db == null) {
        $bReturn = false;
    } else {
        $bUpdate = (array_key_exists("AUDIO_ID", $arrAudioEntry) &&
            is_numeric($arrAudioEntry["AUDIO_ID"]) &&
            ($arrAudioEntry["AUDIO_ID"] > 0) &&
            (getAudioInfoEntryFromDb($db, $arrAudioEntry["AUDIO_ID"], $strError) != null));

        $strSqlText = null;
        if ($bUpdate) {
            // doing update
            $strUpdateList = "";
            if (array_key_exists("AUDIO_DATE", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_DATE = " . getSqlValueOrNull($arrAudioEntry['AUDIO_DATE'], true);}
            if (array_key_exists("AUDIO_SERVICE", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_SERVICE = " . getSqlValueOrNull($arrAudioEntry['AUDIO_SERVICE'], true);}
            if (array_key_exists("AUDIO_TYPE_ID", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_TYPE_ID = " . getSqlValueOrNull($arrAudioEntry['AUDIO_TYPE_ID'], false);}
            if (array_key_exists("AUDIO_TITLE", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_TITLE = " . getSqlValueOrNull($arrAudioEntry['AUDIO_TITLE'], true);}
            if (array_key_exists("AUDIO_DESC", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_DESC = " . getSqlValueOrNull($arrAudioEntry['AUDIO_DESC'], true);}
            if (array_key_exists("AUDIO_AUTHOR", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_AUTHOR = " . getSqlValueOrNull($arrAudioEntry['AUDIO_AUTHOR'], true);}
            if (array_key_exists("AUDIO_LENGTH", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_LENGTH = " . getSqlValueOrNull($arrAudioEntry['AUDIO_LENGTH'], true);}
            if (array_key_exists("AUDIO_SHOW_ALWAYS", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_SHOW_ALWAYS = " . getSqlValueOrNull($arrAudioEntry['AUDIO_SHOW_ALWAYS'], false);}
            if (array_key_exists("AUDIO_HIDDEN", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_HIDDEN = " . getSqlValueOrNull($arrAudioEntry['AUDIO_HIDDEN'], false);}
            if (array_key_exists("RATING_ID", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "RATING_ID = " . getSqlValueOrNull($arrAudioEntry['RATING_ID'], false);}
            if (array_key_exists("AUDIO_QUALITY_HIGH", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_QUALITY_HIGH = " . getSqlValueOrNull($arrAudioEntry['AUDIO_QUALITY_HIGH'], false);}
            if (array_key_exists("AUDIO_QUALITY_LOW", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_QUALITY_LOW = " . getSqlValueOrNull($arrAudioEntry['AUDIO_QUALITY_LOW'], false);}
            if (array_key_exists("AUDIO_FILE_HIGH", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_FILE_HIGH = " . getSqlValueOrNull($arrAudioEntry['AUDIO_FILE_HIGH'], true);}
            if (array_key_exists("AUDIO_FILE_LOW", $arrAudioEntry)) {if (strlen($strUpdateList) > 0) {
                $strUpdateList .= ",\n  ";
            }

                $strUpdateList .= "AUDIO_FILE_LOW = " . getSqlValueOrNull($arrAudioEntry['AUDIO_FILE_LOW'], true);}

            $strSqlText = "UPDATE AUDIO_INFO SET\n  " . $strUpdateList . "\nWHERE\n  AUDIO_ID = " . $arrAudioEntry['AUDIO_ID'] . "\n";
        } else {
            // do insert
            $strColumnList = "";
            if (array_key_exists("AUDIO_DATE", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_DATE";}
            if (array_key_exists("AUDIO_SERVICE", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_SERVICE";}
            if (array_key_exists("AUDIO_TYPE_ID", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_TYPE_ID";}
            if (array_key_exists("AUDIO_TITLE", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_TITLE";}
            if (array_key_exists("AUDIO_DESC", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_DESC";}
            if (array_key_exists("AUDIO_AUTHOR", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_AUTHOR";}
            if (array_key_exists("AUDIO_LENGTH", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_LENGTH";}
            if (array_key_exists("AUDIO_SHOW_ALWAYS", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_SHOW_ALWAYS";}
            if (array_key_exists("AUDIO_HIDDEN", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_HIDDEN";}
            if (array_key_exists("RATING_ID", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "RATING_ID";}
            if (array_key_exists("AUDIO_QUALITY_HIGH", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_QUALITY_HIGH";}
            if (array_key_exists("AUDIO_QUALITY_LOW", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_QUALITY_LOW";}
            if (array_key_exists("AUDIO_FILE_HIGH", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_FILE_HIGH";}
            if (array_key_exists("AUDIO_FILE_LOW", $arrAudioEntry)) {if (strlen($strColumnList) > 0) {
                $strColumnList .= ",\n  ";
            }

                $strColumnList .= "AUDIO_FILE_LOW";}

            $strValueList = "";
            if (array_key_exists("AUDIO_DATE", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_DATE'], true);}
            if (array_key_exists("AUDIO_SERVICE", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_SERVICE'], true);}
            if (array_key_exists("AUDIO_TYPE_ID", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_TYPE_ID'], false);}
            if (array_key_exists("AUDIO_TITLE", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_TITLE'], true);}
            if (array_key_exists("AUDIO_DESC", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_DESC'], true);}
            if (array_key_exists("AUDIO_AUTHOR", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_AUTHOR'], true);}
            if (array_key_exists("AUDIO_LENGTH", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_LENGTH'], true);}
            if (array_key_exists("AUDIO_SHOW_ALWAYS", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_SHOW_ALWAYS'], true);}
            if (array_key_exists("AUDIO_HIDDEN", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_HIDDEN'], true);}
            if (array_key_exists("RATING_ID", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['RATING_ID'], true);}
            if (array_key_exists("AUDIO_QUALITY_HIGH", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_QUALITY_HIGH'], false);}
            if (array_key_exists("AUDIO_QUALITY_LOW", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_QUALITY_LOW'], false);}
            if (array_key_exists("AUDIO_FILE_HIGH", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_FILE_HIGH'], true);}
            if (array_key_exists("AUDIO_FILE_LOW", $arrAudioEntry)) {if (strlen($strValueList) > 0) {
                $strValueList .= ",\n  ";
            }

                $strValueList .= getSqlValueOrNull($arrAudioEntry['AUDIO_FILE_LOW'], true);}

            $strSqlText = "INSERT INTO AUDIO_INFO\n(\n  " . $strColumnList . "\n)\nVALUES\n(\n  " . $strValueList . "\n)";
        }
        //printf("<pre>%s</pre>",$strSqlText);
        //print("<pre>"); print_r($arrAudioEntry );print("</pre>");exit;
        if ($strSqlText == null) {
            $strError = "addAudioInfoEntryToDb(): Could not add audio info (\$strSqlText was NULL).";
        } else {
            $result = mysql_query($strSqlText);
            if (!$result) {
                $strError = sprintf("ERROR database %s failed (%d:%s).", ($bUpdate ? "update" : "insert"), mysql_errno(), mysql_error());
                $bReturn = false;
            }
        }
    }
    return $bReturn;
} // end saveAudioInfoEntryToDb()

function deleteAudioInfoEntryFromDb($db, $nAudioId, &$strError)
{
    $bReturn = false;
    if ($db == null) {
        $strErrTmp = null;
        $db = dbConnect($strErrTmp);
    }

    if ($db == null) {
        $bReturn = false;
    } else {
        $strSql = "DELETE FROM" . "\n"
        . "  AUDIO_INFO" . "\n"
        . "WHERE" . "\n"
        . "  AUDIO_ID = " . sprintf("%d", $nAudioId) . "\n";

        $result = mysql_query($strSql);
        if (!$result) {
            $strError = sprintf("ERROR database delete failed (%d:%s).", mysql_errno(), mysql_error());
            $bReturn = false;
        }
    }
    return $bReturn;
}

function getAllAudioTypeInfoFromDb($db, &$strError)
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
            . "  AUDIO_TYPE_ID," . "\n"
            . "  AUDIO_TYPE," . "\n"
            . "  AUDIO_TYPE_DESC" . "\n"
            . "FROM" . "\n"
            . "  AUDIO_TYPES" . "\n"
            . "ORDER BY" . "\n"
            . "  AUDIO_TYPE_ID" . "\n";

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
} // end getAllAudioTypeInfoFromDb()

function buildAudioTypeSelect($strName, $arrAudioTypes, $nSelectedAudioType)
{
    $strReturn = "<select name=\"" . htmlentities($strName) . "\">";
    foreach (array_keys($arrAudioTypes) as $strKey) {
        $strReturn .= "<option value=\"" . htmlentities($arrAudioTypes[$strKey]['AUDIO_TYPE_ID']) . "\"";
        if ($arrAudioTypes[$strKey]['AUDIO_TYPE_ID'] == $nSelectedAudioType) {
            $strReturn .= " selected=\"selected\"";
        }

        $strReturn .= ">" . $arrAudioTypes[$strKey]['AUDIO_TYPE'] . "</option>";
    }
    $strReturn .= "</select>";
    return $strReturn;
}
