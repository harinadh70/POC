// ============================================================================
// Fiddler Classic -> Bruno one-command export
//
// HOW TO INSTALL (one time, on the client machine):
//   1. In Fiddler Classic: Rules > Customize Rules...  (or Ctrl+R)
//      This opens CustomRules.js in the FiddlerScript editor.
//   2. Find the function:  static function OnExecAction(sParams: String[])
//      Inside it there is a big  switch (sAction)  statement.
//   3. Paste the "case" block below into that switch, next to the other cases.
//   4. Save (Ctrl+S). Fiddler recompiles the script instantly - no restart.
//
// HOW TO USE:
//   Type in the QuickExec box (the black box below the session list, Alt+Q):
//       bruno                     -> export ALL sessions and convert to Bruno
//       bruno myapi.tmnas.com     -> same, keeping only that host
//       replay                    -> export + replay GETs against the live
//                                    backend and diff vs captured responses
//       replay myapi.tmnas.com    -> same, keeping only that host
//   Results:
//       C:\FiddlerExports\BrunoCollection   (open this folder in Bruno)
//       C:\FiddlerExports\ReplayReport      (open REPORT.md)
//
// Paste BOTH case blocks below. Adjust paths if you copied the scripts
// somewhere other than C:\Tools\fiddler2bruno.
// ============================================================================

        case "bruno":
            var sSaz: String = "C:\\FiddlerExports\\capture.saz";
            var sOut: String = "C:\\FiddlerExports\\BrunoCollection";
            var sScript: String = "C:\\Tools\\fiddler2bruno\\Convert-FiddlerToBruno.ps1";

            System.IO.Directory.CreateDirectory("C:\\FiddlerExports");

            var oSessions = FiddlerApplication.UI.GetAllSessions();
            if (null == oSessions || oSessions.Length < 1) {
                FiddlerObject.StatusText = "bruno: no sessions to export.";
                return true;
            }
            if (!Utilities.WriteSessionArchive(sSaz, oSessions, null, false)) {
                FiddlerObject.StatusText = "bruno: SAZ export FAILED.";
                return true;
            }

            // -ThreeSets: team layout - each captured API becomes a folder with
            // original.bru / converted.bru (NewWebApi translation) / validation.bru
            var sArgs: String = "-NoProfile -ExecutionPolicy Bypass -File \"" + sScript + "\""
                + " -InputFile \"" + sSaz + "\" -OutDir \"" + sOut + "\""
                + " -NoStatic -Dedupe -Force -ThreeSets";
            // Optional host filter: "bruno myapi.com" keeps only that host.
            if (sParams.Length > 1 && !String.IsNullOrEmpty(sParams[1])) {
                sArgs = sArgs + " -FilterHost \"" + sParams[1] + "\"";
            }

            System.Diagnostics.Process.Start("powershell.exe", sArgs);
            FiddlerObject.StatusText = "bruno: exported " + oSessions.Length
                + " sessions -> converting to " + sOut;
            return true;

        case "replay":
            var sSaz2: String = "C:\\FiddlerExports\\capture.saz";
            var sOut2: String = "C:\\FiddlerExports\\ReplayReport";
            var sScript2: String = "C:\\Tools\\fiddler2bruno\\Invoke-FiddlerReplay.ps1";

            System.IO.Directory.CreateDirectory("C:\\FiddlerExports");

            var oSessions2 = FiddlerApplication.UI.GetAllSessions();
            if (null == oSessions2 || oSessions2.Length < 1) {
                FiddlerObject.StatusText = "replay: no sessions to export.";
                return true;
            }
            if (!Utilities.WriteSessionArchive(sSaz2, oSessions2, null, false)) {
                FiddlerObject.StatusText = "replay: SAZ export FAILED.";
                return true;
            }

            // -NoExit keeps the window open so the colored verdicts stay visible.
            // -Methods GET,POST: this app routes everything (even reads) through
            // POST (XmlServercall.aspx / NewWebApi page/data), so GET-only would
            // skip the entire capture. Remove POST here if a capture contains
            // transactions that must not be re-fired (e.g. transactiontype ADD).
            var sArgs2: String = "-NoProfile -NoExit -ExecutionPolicy Bypass -File \"" + sScript2 + "\""
                + " -InputFile \"" + sSaz2 + "\" -OutDir \"" + sOut2 + "\""
                + " -NoStatic -Dedupe -Force -Methods GET,POST";
            if (sParams.Length > 1 && !String.IsNullOrEmpty(sParams[1])) {
                sArgs2 = sArgs2 + " -FilterHost \"" + sParams[1] + "\"";
            }

            System.Diagnostics.Process.Start("powershell.exe", sArgs2);
            FiddlerObject.StatusText = "replay: exported " + oSessions2.Length
                + " sessions -> replaying, report in " + sOut2;
            return true;
