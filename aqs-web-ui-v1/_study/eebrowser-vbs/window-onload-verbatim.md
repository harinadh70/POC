# Eebrowser.vbs — window_onload region, verbatim reconstruction

Source: Azure DevOps `aqs-starteam-archive` → `AQSVID/Mainline/Website/System/Scripts/Eebrowser.vbs`,
photographed as IMG_4377–IMG_4397 in `/Users/harinadh/Downloads/POC/`.

Line numbers 1–160 and 273–438 are anchored to the visible viewer gutter.
Lines in the 161–272 range are stitched by content overlap across six photos
whose gutter was cropped out of frame; those numbers are approximate (±3) and
marked `~`. `⟪?⟫` marks text not readable in any photo.

## Lines 1–113 — header + module-level vars (anchored)

```vbs
1    'Const mstrChgLvl = "11/01/2019 | #3466700 | SDN"
2    'Const mstrChgDes = "Don't perform NavButtonOnClick event if there are field edits to display"
3
4    Option Explicit
5    On Error Resume Next
6
7    '======================================================================
8    '                        Module-level vars
9    '======================================================================
10   Dim mblnCallServer
11       'Run the pre-process/post-process routine(s) flag
12   Dim mvntInitialValue
13       'Used to capture the initial value of a control before
14       'editing. Will be used to see if the value has changed.
15   Dim mstrPreviousMatchcode
16       'Holds the name of the previous matchcode that had focus.
17   Dim mstrErrorMatchcode
18       'Holds the name of a matchcode that failed validation during a
19       'server call. This is ONLY set by the server assigning the
20       '"DISPLAY_ERROR" verb to the browser.
21   Dim mxmlDoc
22       'The XML data island document that came down with the page.
23   Dim mvntRtnValue
24       'A module-level string used to pass date information back-and-forth
25       'between the screen supported by this file, and a modal date dialog
26       'screen (Calendar.htm).
27   Dim mblnRespondTabClick
28       'A module-level flag indicating when it is appropriate to respond to
29       'tabstrip clicks. This is basically here to prevent mulitiple focus
30       'events from occuring when the page is initially loading. This flag
31       'is set to TRUE only in the FocusFirstControl subroutine.
32   Dim mxmlResults
33       'Temporary xml structure to hold data/commands returned as the result
34       'of an async call through a modal dialog window. It is set to nothing
35       'before the call and set to nothing when finished being used.
36       'Don't expect it to be around later.
37   Dim mxmlBrowserCtl
38       'Holds the browser commands sent from the server
39   Dim mstrServerCallXML
40       'String used to hold the data for server calls
41   Dim mobjServerRequest
42       'HTTP Request object for server calls
43
44   '----------------------------------------------------------------------
45
46
47   Dim mobjCallingWindow
48       'Reference for calling scripts if this page is in a modal window.
49   Dim mblnDoBrowserCommands
50       'A module-level logical that allows/disallows the execution of
51       'browser commands in the ExecuteBrowserCommands sub. It is set to
52       'FALSE if NAVIGATE or NAVIGATE_CYCLING browser command is executed
53   Dim mlngXMLElapsedTime
54       'Business Object elpased time from the XML data island.
55   Dim mobjAQSMain
56       'A handle to the AQSMain.asp page (main frame page).
57   Dim mobjMenuFrame
58       'A handle to the menu frame.
59   Dim mobjTreeFrame
60       'A handle to the tree frame.
61   Dim mstrReturnValue
62       'Holds return information from modal dialog screens.
63   Dim mconQuote
64       'module-wide CONSTANT, double quote(") or chr(34).
65   Dim mstrProtocolServer
66       'Module-wide string containing either "https://" or "http://"
67       'AND the server name, depending upon is SSL is being used.
68   Dim mblnPageLoaded
69       'Flag indicating the page is loaded. Used to squelch the execution
70       'of OnFocusHandler before the window_onload has loaded.
71   Dim mblnNavButtonClicked
72       'flag to prevent cleanup code in beforeunload if already done.
73   Dim mblnEEDataChanged
74       'local data change indicator to work with modals
75   Dim mblnClosing
76       'Stop processing certain routines if page is closing
77   '----------------------------------------------------------------------
78   'Variant arrays for communication between browser and server.
79
80   Dim marrListItems()
81       'A single dimension variant array containing the items for the
82       'combo box, filled by the server.
83       '(0) - Not Used
84
85   Dim marrServerCalls()
86       'A 2-dimension (multiple "rows") array for passing subroutine calls
87       'back to the server for pre-processing or post-processing.
88       '(n,0) - Not Used
89   ⟪~89–104: further array declarations incl. marrEEData(12), marrSessionInformation(); not fully readable⟫
105  ⟪module-var initialization begins⟫
106  ⟪?⟫
107  mblnNavButtonClicked = False
108  mblnEEDataChanged = False
109  mblnClosing = False
110  mblnBrowserCtlExists = False
111
112  Set mxmlResults = Nothing
113  Set mxmlDoc = Nothing
```

## Lines ~114–126 — window_onload entry (gap; from prior session's reading)

```vbs
~114 ⟪blank / separator⟫
~120 Sub window_onload()
~121     Call second_window_onload()
~122 End Sub
~124 Sub second_window_onload()
~125     On Error Resume Next
~126     Dim objTemp, strTemp, intTemp
```

## Lines 127–160 — Dims + modal sizing + frame refs (anchored from 129)

```vbs
~127     Dim pageHeader
~128     Dim strRlvUpdateAdd, strChgTypRatAdd
129      Dim strPageLabelKey
130      Dim strShowNextOnEdit
131
132      'Set references to AQSMain and the Menu Frame, and initialize some browser timings.
133      If mblnModal Then
134          If CInt(Left(window.dialogHeight,Len(window.dialogHeight) - 2)) > Cint(screen.availHeight) Then
135              'The dialog is TALLER than the screen — shrink it.
136              window.dialogHeight =  screen.availHeight & "px"
137              Call TrapBrowserError("window_onLoad|resize height")
138          End If
~139         If CInt(Left(window.dialogWidth,Len(window.dialogWidth) - 2)) > Cint(screen.availWidth) Then
~140             window.dialogWidth = screen.availWidth & "px"
~141             Call TrapBrowserError("window_onLoad|resize width")
~142         End If
~143         'Modal window: AQSMain reached through the dialog's opener.
~144         Set mobjCallingWindow = window.dialogArguments
~145         Set mobjAQSMain = mobjCallingWindow.mobjAQSMain ⟪or dialogArguments.parent — glare⟫
~146             Call TrapBrowserError("EEBrowser|window_onload|1.1")
~147         Set mobjMenuFrame = mobjAQSMain.frames("menu")
~148             Call TrapBrowserError("EEBrowser|window_onload|1.2")
~149         Set mobjTreeFrame = mobjAQSMain.frames("tree")
~150         ⟪…⟫
158          'Browser timing updates
159          With mobjAQSMain
160              .mlngTimeEndBrowserRequest = .GetTimeMilliseconds()
~161             .mlngTimeStartModalRequest = .GetTimeMilliseconds() ⟪modal arm timing⟫
~164         End With
```

## Lines ~165–197 — non-modal frame refs + data-changed flags (stitched, IMG_4383)

```vbs
~165     Else
~166         Set mobjAQSMain = window.parent
~167             Call TrapBrowserError("EEBrowser|window_onload|1.3")
~168         Set mobjMenuFrame = mobjAQSMain.frames("menu")
~169             Call TrapBrowserError("EEBrowser|window_onload|1.4")
~170         Set mobjTreeFrame = mobjAQSMain.frames("tree")
~171             Call TrapBrowserError("EEBrowser|window_onload|1.5")
~172         'Browser timing updates
~173         With mobjAQSMain
~174             .mlngTimeEndBrowserRequest = .GetTimeMilliseconds()
~175             .mlngTimeStartModalRequest = 0
~176             .mlngTimeEndModalRequest = 0
~177             .mlngTimeModalBOProcessing = 0
~178         End With
~179     End If
~180
~181     If mblnTRN Then
~182         Call CheckScreenProblems
~183     End If
~184
~185     With mobjAQSMain
~186     If Not mobjAQSMain Is Nothing Then
~187
~188         '--Set the application-wide data changed var in AQSMain--
~189         If InStr(marrSessionInformation(4),"EDIT") = 0 AND InStr(marrSessionInformation(4),"INQUIRY") = 0 AND InStr(marrSessionInformation(4),"SELECT") = 0 Then
~190             'Our action string DOES NOT contain the word "EDIT" OR "INQUIRY", so assume
~191             'that we are in an "ADD" type of mode and mark this page as if
~192             'some field had been edited.
~193             .mblnDataChanged = True
~194             mblnEEDataChanged = True
```

## Lines ~195–224 — data-changed Else + session XML + Data Island (stitched, IMG_4384)

```vbs
~195         Else
~196             'Our action string contained the word "EDIT" OR "INQUIRY", so assume nothing
~197             'on this page could have been edited yet.
~198             .mblnDataChanged = False
~199             .mblnRatingDataChanged = False
~200         End If
~201
~202         '--Upate the application-wide XML Session var based on what was returned--
~203         '--from the Page_Build method call in the ASP portion of the EE file.  --
~204
~205         marrSessionInformation(6) = .Decompress(marrSessionInformation(6))
~206         .mstrXMLDetail = marrSessionInformation(6)
~207
~208         '--Get a handle to the embedded XML Data Island (XMLDI)--
~209         Set mxmlDoc = CreateObject("MSXML2.DOMDocument.6.0")
~210         mxmlDoc.async = False
~211         mxmlDoc.preserveWhiteSpace = False
~212         mxmlDoc.loadXML(document.all("xdiPageData").XMLDocument.xml)
~213         mxmlDoc.setProperty "SelectionNamespaces", _
~214             "xmlns:xsl='http://www.w3.org/1999/XSL/Transform' " & _
~215             "xmlns:ms='urn:schemas-microsoft-com:xslt'"
~216         'Set mxmlDoc = document.all("xdiPageData").XMLDocument
~217         Call TrapBrowserError("EEBrowser|window_onload|4")
~218
~219         '--Get the data values and combo box items from the XML data island--
```

## Lines ~220–285 — ShowNextOnEdit (two arms) + required indicators (stitched, IMG_4385–4388; anchored 273+)

```vbs
~220         Call ⟪.GetEEData?⟫(⟪?⟫, Window)
~221         Call TrapBrowserError("EEBrowser|window_onload|4.1")
~222         If pageHeader Is Nothing Then
~223             Exit Sub
~224         End If
~225         strShowNextOnEdit = pageHeader.ShowNextOnEdit
~226         Call TrapBrowserError("EEBrowser|window_onload|4.2")
~227
~228         If StrComp(strShowNextOnEdit, "t", vbBinaryCompare) = 0 Then
~229             If marrSessionInformation(4) = "EDIT" Then
~230                 Call .SetControlAttribute(document.all("dtaNEXT"), "", "DISABLED","T",Window)
~231                 Call TrapBrowserError("EEBrowser|window_onload|4.4")
~232             ElseIf marrSessionInformation(4) = "RLVUPDATE" Then
~233                 Call .SessionXML_GetItem("rlvupdateadd", strRlvUpdateAdd)
~234                 Call TrapBrowserError("EEBrowser|window_onload|4.5")
~235                 If StrComp(strRlvUpdateAdd, "yes", vbTextCompare) <> 0 Then
~236                     Call .SetControlAttribute(document.all("dtaNEXT"), "", "DISABLED","T",Window)
~237                     Call TrapBrowserError("EEBrowser|window_onload|4.6")
~238                 End If
~239             ElseIf marrSessionInformation(4) = "EDITTYPRAT" Then
~240                 Call .SessionXML_GetItem("chgtypratadd", strChgTypRatAdd)
~241                 Call TrapBrowserError("EEBrowser|window_onload|4.7")
~242                 If StrComp(strChgTypRatAdd, "yes", vbTextCompare) <> 0 Then
~243                     Call .SetControlAttribute(document.all("dtaNEXT"), "", "DISABLED","T",Window)
~244                     Call TrapBrowserError("EEBrowser|window_onload|4.8")
~245                 End If
~246             End If
~247         Else
~248             '--If the "action" querystring passed into this page has a value--
~249             '--of "EDIT", then we should make sure the [Next] button is     --
~250             '--hidden.                                                      --
~251             If marrSessionInformation(4) = "EDIT" Then
~252                 Call .SetControlAttribute(document.all("dtaNEXT"), "", "VISIBLE","F",Window)
~253                 Call TrapBrowserError("EEBrowser|window_onload|4.4")
~254
~255             '****************************************************************
~256             '(9/25/00) Removed by TW to fix a problem with the NEXT button appearing
~257             'when it was set a VISIBLE=F in the XML and the ACTION wasn't EDIT. This
~258             'needs to be re-evaluated later to see if this and even the EDIT check
~259             'above should be elimnated and instead controlled by the APP code via
~260             'dynamically adjusting the VISIBLE attribute in the XML.
~261             '****************************************************************
~262             'Else
~263             '   Call SetControlAttribute(document.all("dtaNEXT"),"VISIBLE","T")
~264             '****************************************************************
~265
~266             '--If the "action" querystring passed into this page has a value
~267             '--of "RLVUPDATE", then check whether the RlvUpdate was initiated during
~268             '--an 'ADD'.  If not, then make sure the [Next] button is hidden.
~269             ElseIf marrSessionInformation(4) = "RLVUPDATE" Then
~270                 Call .SessionXML_GetItem("rlvupdateadd", strRlvUpdateAdd)
~271                 Call TrapBrowserError("EEBrowser|window_onload|4.5")
~272                 If StrComp(strRlvUpdateAdd, "yes", vbTextCompare) <> 0 Then
    ⟪anchored from here⟫
~272                     Call .SetControlAttribute(document.all("dtaNEXT"), "", "VISIBLE","F",Window)
                         Call TrapBrowserError("EEBrowser|window_onload|4.6")
                     End If
             ElseIf marrSessionInformation(4) = "EDITTYPRAT" Then
273                  Call .SessionXML_GetItem("chgtypratadd", strChgTypRatAdd)
274                  Call TrapBrowserError("EEBrowser|window_onload|4.7")
275                  If StrComp(strChgTypRatAdd, "yes", vbTextCompare) <> 0 Then
276                      Call .SetControlAttribute(document.all("dtaNEXT"), "", "VISIBLE","F",Window)
277                      Call TrapBrowserError("EEBrowser|window_onload|4.8")
278                  End If
279              End If
280          End If
281
282      '--See if ALL Required Level 1 controls have data. If so,make--
283      '--sure the [Ok] and [Next] buttons are enabled.             --
284      Call .CheckRequiredIndicators("",Window)
285          Call TrapBrowserError("EEBrowser|window⟪_⟫onload|5")
```

## Lines 286–331 — path label build (anchored, IMG_4389–4391)

```vbs
286
287      '--Set the path if required-----------------------
288      '        Look for pageHeader.pathstart And pageHeader.pathend
289      '        These will be the indicators to determine if the path label is to be built here.
290
291      ' Get the pagelabelkey value if it exists.  It gets deleted after
~292     ' it is used, so it needs to be captured here.
~293     Call .SessionXML_GetItem("pagelabelkey", strPageLabelKey)
~294         Call TrapBrowserError("EEBrowser|window_onload|7.2")
~295     ⟪…⟫
301      If Len(pageHeader.pathstart) > 0 And Len(pageHeader.pathend) > 0 Then
302          strTemp = .PathDescription(strPageLabelKey, pageHeader.pathstart, pageHeader.pathend)
303          '-- Remove the words 'Policy Coverages'
304          '-- add a coverage name its not already in the path as it is for Policy Coverages
305          '-- strip trailing/preceding dashes
306          strTemp = replace(strTemp, "Policy Coverages -", "")
~307         ⟪string cleanup continues⟫
314          End If
315
316          pageHeader.PathLabel = strTemp
317
318          Call TrapBrowserError("EEBrowser|window_onload|7.5")
319          End If
320      End If
321      '--Set Page Label if the not a modal and header property headertype = "append"
322      If Not mblnModal Then
~323         ⟪append page label to path label⟫
329      Call .SessionXML_ClearItem("pagelabelkey")
330
331      ' Update the local session info if pagelabelkey was removed.
```

## Lines 332–397 — focus, tab select, timing, loading, done (anchored, IMG_4392–4396)

```vbs
~332     marrSessionInformation(6) = ⟪…⟫
~341
342      '--Set focus to the designated first control on the page--
343      Call .FocusFirstControl(Window)
344          Call TrapBrowserError("EEBrowser|window_onload|7")
345
346      '--Select the specified Tab if not 0--
347      If mblnTabCheck Then
~348         If CInt(marrSessionInformation(9)) <> 0 Then
~349             Call .SelectTab(marrSessionInformation(9), Window)
~350             ⟪…⟫
357          End If
358      End If
359
360      Call TrapBrowserError("EEBrowser|window_onload|7.1")
361      '*********************************************************************
362      'Browser timing updates
~363     With mobjAQSMain
~364         .mlngTimeEndBrowserProcessing = .GetTimeMilliseconds()
~370             Call TrapBrowserError("EEBrowser|window_onload|8.2")
371          .mlngTimeBOProcessing = mlngXMLElapsedTime
372              Call TrapBrowserError("EEBrowser|window_onload|8.3")
373          End If
374          'save the page name to display with the timing info.
375          .document.body.setAttribute "pageurl", window.location.href
376
377          If Not mobjMenuFrame Is Nothing Then
378              If mobjMenuFrame.mblnPageReady Then mobjMenuFrame.UpdateInfo()
~379         End If
~380
~385     '--Hide the "loading" animation--
386      Set objTemp = document.all("divLoading")
387      If Not objTemp Is Nothing Then
388          objTemp.style.visibility = "hidden"
~389     End If
~390
392      End With
393      mblnPageLoaded = True
394          Call TrapBrowserError("EEBrowser|window_onload|8.4")
395      '*********************************************************************
396
397  End Sub
```

## Lines 398–438 — first event handlers after the Sub (anchored, IMG_4396–4397)

```vbs
398
~399 '==============================================================================
~400 '                                               Subs/Functions
~401 '==============================================================================
~402
~403 Sub OnFocusHandler(strID)
~404     'Delegate focus handling up to AQSMain once the page is loaded.
~405     On Error Resume Next
~406     If mblnPageLoaded Then
407          Call mobjAQSMain.OnFocusHandler(strID,Window)
408      End If
409          'Not mobjAQSMain Is Nothing
410      Call SelectControlText(strID)
411  End If
412      'mblnPageLoaded
~413 End Sub
~414
420      On Error Resume Next
421
422      If Not window.event.srcElement Is Nothing Then
~423         Call OnFocusHandler(window.event.srcElement.id)
~424     End If
436      If Not window.event.srcElement Is Nothing Then
437          Call OnKeyUpHandler(window.event.srcElement.id)
438      End If
```
