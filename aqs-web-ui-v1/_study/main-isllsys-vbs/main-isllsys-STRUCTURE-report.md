# Main_ISLLSYS_20010101.vbs — structure / table of contents

STRUCTURAL REPORT — Main_ISLLSYS_20010101.vbs (bands IMG_4434–4660)

1. ROUTINE TABLE OF CONTENTS (flat, ordered, boundary-repeats deduped)
1. window_onload
2. ClearActionMenus
3. AddWindowToCollection
4. LogoutMain (Function)
5. ParentWindow_Navigate
6. ShowFrame
7. DeleteAction
8. ExecuteAction
9. UserOption
10. PathDescription (Function)
11. [unnamed tree-state Sub — calls Tree_SetState / UpdateToolBar]
12. IsExternalWindowOpen (Function)
13. RefreshSearchPageLists
14. ApplySecurityPolicy
15. ButtonOnClickHandler
16. CalendarButtonOnClick
17. ExecuteBrowserCommands
18. FillCallArray
19. FillComboList
20. FillSelectList
21. FocusFirstControl
22. GetControlValue
23. GetXMLData
24. NavButtonOnClick
25. OnKeyPressHandler
26. SetArrayData
27. SetInitialValueData
28. SetControlAttribute
29. BuildTab
30. UnEscapeTextValueForXML
31. ShowZeroText
32. ClearXMLDetail
(Ordering of #29–31, all clustered in IMG_4657, is approximate. GetQueryStrSubStrWithValue appears as a helper call ~IMG_4476–77 but its definition-site was not confirmed as top-level.)

2. TOTAL ROUTINE COUNT: 32 (31 named + 1 unnamed tree-state Sub).

3. SCROLL GAPS (possible missing lines)
Content-missing / confirmed:
- IMG_4445→4446: ClearActionMenus Else-branch For loop (blank each action frame src) missing.
- IMG_4446→4447: connective separator between AddWindowToCollection End Sub and Function LogoutMain.
- IMG_4460→4461: DEFINITE — body of `With mxmlBatchEdits` block (loads strMessage) missing.
- IMG_4472→4473: ExecuteAction — lines between `...debug=...` and TrapBrowserError("ExecuteAction|1").
- IMG_4476→4477: querystring-key block (blank line + strTempQueryString="", possibly another key) between PolicyNum and PolicyPremium.
- IMG_4494→4495: remainder of PathDescription + header of following tree-state Sub.
- IMG_4520→4521: ButtonOnClickHandler — remaining EEData array setup + .CallServer.
- IMG_4521→4522: CalendarButtonOnClick — store-to-mvntRtnValue + modal-calendar-open code.
- IMG_4553→4554: ExecuteBrowserCommands SET_VISIBILITY — functional-security setup block.
- IMG_4577→4578: GetXMLData Dim block (strFilter→strItemXmlList).
- IMG_4582→4583: GetXMLData — "X" SetControlValue call + inner End If.
- IMG_4650→4651: COMBO/KPCOMBO Case "L" branch + Case "X" header.
- IMG_4656→4657: BuildTab — createProcessor() statement (between BuildTab|4 and |5).
Marker-only (skip unlikely): IMG_4452→4453, 4455→4456, 4456→4457, 4564→4565.

4. LOW-CONFIDENCE / ILLEGIBLE («?»/‹?›) SPANS
- IMG_4455: both ParentWindow_Navigate window.open URLs cut at `&redirec‹?›`.
- IMG_4527: ExecuteBrowserCommands ElseIf `...TREEVIEW",vbTextCompare)«?›` (likely `=0 Then`).
- IMG_4537: `dialogWidth:400px; st«?›` and `dialogWidth:650px«?›`.
- IMG_4538: `getNamedItem("valu«?›`.
- IMG_4541: `GetStringField(strAdd‹?›`.
- IMG_4563: XPath `...& objListItems(i<?>`.
- IMG_4601: NavButtonOnClick .ShowUserMessage(...) cut after `"WARNING",«?›`.
- IMG_4612: five truncated OnKeyPressHandler lines (disabled-condition, combo/kpcombo ElseIf, two EOLA comments, classid condition).
Verbatim (NOT illegible): IMG_4435 `???` in mstrReturnValue comment; IMG_4657 escape tokens (#http39; etc.).
Indentation-only drift (no content loss): seams 4441/42, 4465/66, 4469/71, 4473/74, 4506/07/10, 4578/79, 4585–87, 4607/08, 4613/14, 4619–26, 4644/45, plus 4527/29-30 alignment.

5. FAILED-STITCH NOTE: None — all 18 bands stitched contiguously; discontinuities were handled via inline GAP markers, not stitch failures.
