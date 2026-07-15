# Main_ISLLSYS_20010101.vbs — complete assembled code (RAW, photo-delimited)

Source: Visual Studio session, solution AQS.Advantage / project AQS.Advantage.BatchEdit,
photographed as IMG_4434–IMG_4660 in ~/Downloads/POC/ (one continuous top-to-bottom scroll).
No editor gutter line numbers were visible, so ordering follows ascending IMG number.
Each photo's verbatim code block is delimited by a `'=== IMG_<n> ===` marker.
Consecutive photos OVERLAP by a few lines (scroll capture) — overlaps are NOT yet de-duplicated here.

'=== IMG_4434 ===
'Const mstrChgLvl = "09/13/2021 | #3847669 | SDN"
'Const mstrChgDes = "Cleanup"

Dim GlobalVars                         ' Class object to hold selected system variables

Dim mobjAQSMain                        ' Reference to this window - used for common code compatibility

Dim mstrCurrentFrame                   ' Indicates the name of the frame displayed in the
                                        ' frameset "fraMain".  Assigned in Sub ShowFrame()

Dim mstrUserID                         ' User ID used for login

Dim mstrPolicyID                       ' Policy ID assigned when a policy is retrieved or a new policy is created

Dim mstrNodeKey                        ' Used to indicate which system Policy, Admin, etc for initial setup.

Dim mstrDiagnosticMode
Dim mstrAction                         ' Current Action to be taken, here for other pages (tree) to find

Dim mstrXMLDetail                      ' XML Detail: An XML formatted string that is used
                                        ' to transfer any number of additional detail values to/from ASP
                                        ' pages and to/from COM components.  The format is:
                                        '         <details>
                                        '                 <item name="name_here" value="value_here" />
                                        '                 ...
                                        '         </details>


Dim mlngTimeStartBrowserRequest        ' Start time for Navigate Cycling Call (in milliSeconds)

Dim mlngTimeEndBrowserRequest          ' End time for Navigate Cycling Call (in milliSeconds)

Dim mlngTimeEndBrowserProcessing       ' End time for the EEBrowser window_onload processing (in milliSeconds)
Dim mlngTimeBOProcessing               ' Processing time for the business object (in milliSeconds)

Dim mlngTimeStartModalRequest          ' Start time for MODAL call to a page (in milliSeconds)

Dim mlngTimeEndModalRequest            ' End time for MODAL call to a page - includes browser processing (in milliSeconds)

Dim mlngTimeModalBOProcessing          ' Processing time for the MODAL business object (in milliSeconds)

'=== IMG_4435 ===
Dim mlngTimeStartModalRequest          ' Start time for MODAL call to a page (in milliSeconds)

Dim mlngTimeEndModalRequest            ' End time for MODAL call to a page - includes browser processing (in milliSeconds)

Dim mlngTimeModalBOProcessing          ' Processing time for the MODAL business object (in milliSeconds)

Dim mstrPolicyNumber                   ' For use on other pages to display the policy number

Dim mstrPrimaryInsured
Dim mstrTransactionType                ' For use on other pages to display the selected transaction type

Dim mstrReturnValue                    ' ???Return value from modal dialog window

Dim mblnDebug                          ' Show messages if true

Dim mvntDebugWindow                    ' Reference to the debug window.

Dim mblnTreeMessages                   ' Show messages related to tree changes

Dim mblnDeveloperMessages              ' Show messages related to page problems (html/xml)

Dim mblnNavigationMessages             ' Show the querystring prior to any action taken by the
                                        ' ExecuteAction sub. Option is given to cancel action.
                                        ' Use caution when cancelling a navigation from an enter/edit page.

Dim mblnDataChanged
'Application-wide boolean indicating that data on an Enter/Edit
'page has changed. This is managed by EEBrowser.asp.

Dim mblnRatingDataChanged
'Application-wide boolean indicating that data on an Enter/Edit
'page has changed that affects rating. This is managed by EEBrowser.asp.

Dim mstrExpiredNumber                  'Value that indicates history "POL|POL|(mstrExpiredNumber)|..."

Dim mobjParentWindow                   'Holds a reference to the window that opened this window.

Dim mdicChildWindows                   'Dictionary object, Holds references to the children windows opened by this window.

'=== IMG_4436 ===
Dim mdicNonPolicyChildWindows          'Dictionary object, Holds references to the non policy children windows opened by this window.

Dim mdicExternalWindows                'Dictionary object, Holds references to the external windows opened by this window.

Dim mblnLogout
mblnLogout = False

Dim mblnSearchPage                     'Indicates if this is hosting the StartNew/Search Page or a Policy page.

Dim mblnRefreshWIP                     'Indicates that the WIP should be refreshed

Dim mxmlBatchEdits                     'Holds any errors passed from the rating progress page for display

Dim mlngConversionReportID             'Holds conversion report passed from the progress page for display

Dim mblnReplacementHomePage            'Identifies this page is a replacement homepage after the previous one was closed.

Dim mblnFocusChanged                   'Used by onfocus handler to determine if focus was changed by SetControlFocus routine.

Dim mstrFocusChangedTo                 'Name of the last control focus was set to using SetControlFocus

Dim mstrPreviousMatchcode              'Local copy of mstrPreviousMatchcode from the calling window used by SetControlValue.

Dim mblnResetInitialValue              'Set True in SetControlValue if the control is being post-processed to allow the
                                        'initial value to be handled normally.

Dim mxmlSecurity                       ' Holds security information

Dim mstrPendingCovs                    'Holds the remaining selected coverages that have not yet been added
                                        'as the result of a non modal coverage

Dim mblnEnableLTLHighlight             'Indicates whether aqs:combo controls should be highlighted by LTL value

Dim mblnEnableRequiredHighlight        'Indicates whether controls should be highlighted by Required attribute

Dim mblnNoAssiDoc                      'Indicates there is no assigment available for document selected

'=== IMG_4437 ===
Dim mIANumber                          'Initialize Insured Account Number if Main_ISLLSYS_20010101.asp does not send a value

Dim mPNumber                           'Initialize Policy Number if Main_ISLLSYS_20010101.asp does not send a value

Dim mblnDoNotSetFocusToParent
mblnDoNotSetFocusToParent = false

Dim mstrBatchEditWindowDisplayed
mstrBatchEditWindowDisplayed = ""

    ' Colors used for setting disabled control color in SetContorlAttribute
    ' ( from objMenu.mColorCtlDisabledDec )
Dim mintDisabledRed
Dim mintDisabledGreen
Dim mintDisabledBlue
    ' ( from objMenu.mColorCtlDisabledHex )
Dim mhexDisabledColor
Dim mhexDisabledLabelColor
Dim mhexRequiredLabelColor
    ' ( from objMenu.mColorCtlComboLTLFalseHex... )
Dim mhexComboLTLFalseColor
Dim mhexComboLTLTrueColor
    ' ( from objMenu.mColorRequiredBackgroundHex... )
Dim mhexRequiredBackgroundColor
    ' ( from objMenu.mColorRequiredBackgroundDec... )
Dim mintRequiredBackgroundRed
Dim mintRequiredBackgroundGreen
Dim mintRequiredBackgroundBlue

' Variables used to hold browser command navigation info for ExecuteAction call
' to be done after modal closes (launched by ExecuteAction)
' This allows the modal to close before launching the next page.
' (which may be a modal!!)
' These variables are first set to "" in ExecuteAction and then set in
' ExecuteBrowserCommands (NAVIGATE_CYCLING case)
' by calling SetNextAction if the calling window is a modal and was launched
' by ExecuteAction (frame = modal)
Dim mstrNextAction_Action                                      ' = pstrAction

'=== IMG_4438 ===
Dim mstrNextAction_NodeKey                                     ' = pstrNodeKey

Dim mstrNextAction_Tab                                         ' = pintTab

Dim mstrNextAction_XMLDetail                                   ' = pstrXMLDetail

' Used to indicate to the browser command NAVIGATE_CYCLING that
' the call to ExecuteAction should be deferred until the modal attempting
' the navigation has time to close.  This variable is managed in ExecuteAction
' and checked in ExecuteBrowserCommands (NAVIGATE_CYCLING case)
Dim mblnNextAction_DeferNavigation

Dim mxmlStyle

Dim mxmlProcessor                      'Holds the xsl file contents for transforming xml to html

Dim mblnPolicyDiscard                  'Holds True or False if Policy Discard is selected from Menu

' Initialize variables
  mstrPolicyNumber = vbNullString
  mstrPrimaryInsured = vbNullString
  mstrPolicyID = "0"
  mstrNodeKey = "POL|POL|0"
  mstrExpiredNumber = "0"
  Set mdicChildWindows = Nothing
  Set mdicNonPolicyChildWindows = Nothing
  Set mdicExternalWindows = Nothing
  Set mxmlBatchEdits = Nothing
  Set mxmlStyle = Nothing
  mlngConversionReportID = 0
  Set mxmlSecurity = Nothing
  mstrDiagnosticMode = "0"
  mstrUserID = "NOTASSIGNED"
  mstrXMLDetail = "<items />"
  mstrTransactionType = ""

  Set mvntDebugWindow = Nothing
  mblnDebug = False
  mblnTreeMessages = False
  mblnDeveloperMessages = False

'=== IMG_4439 ===
  Set mvntDebugWindow = Nothing
  mblnDebug = False
  mblnTreeMessages = False
  mblnDeveloperMessages = False
  mblnNavigationMessages = False

  mlngTimeStartBrowserRequest = 0
  mlngTimeEndBrowserRequest = 0
  mlngTimeEndBrowserProcessing = 0
  mlngTimeBOProcessing = 0

  mlngTimeStartModalRequest = 0
  mlngTimeEndModalRequest = 0
  mlngTimeModalBOProcessing = 0

  mblnDataChanged = False
  mblnRatingDataChanged = False
  mblnReplacementHomePage = False

  mblnPolicyDiscard = False
Sub window_onload
'******************************************************************************
'PURPOSE:
'   Initaial set up of the frames. Starts the serial load of the frames
' according to what is required. Search page, policy, admin, etc.
'
'******************************************************************************
On Error Resume Next

    Dim arrWindows
    Dim intCount
    Dim objWindow
    Dim arrKeys
    'variables to store Non Policy dictionary items
    Dim arrNonPolWindows
    Dim intNonPolCount
    Dim objWindowNonPol
    Dim arrNonPolKeys

    AddWindowToCollection window

    '// resize window if resolution less than 1024 x 768
    If screen.width < 1024 And screen.height < 768 Then

'=== IMG_4440 ===
    Dim objWindowNonPol
    Dim arrNonPolKeys

    AddWindowToCollection window

    '// resize window if resolution less than 1024 x 768
    If screen.width < 1024 And screen.height < 768 Then
        window.moveTo 0,0
        window.resizeTo screen.availWidth,screen.availHeight
    End If

    ' Create object to hold selected system variables
    Set GlobalVars = New globalVarsClass

    'Set a reference to this window.
    Set mobjAQSMain = window

    'Set a reference to the parent window. This allows navigation back.
    Set mobjParentWindow = window.opener

    ' >>>>>>>>>>>>>>>>>>[begin section]>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    '                                                REPLACEMENT SEARCH PAGE

    '  If the QueryString("replacement") is any value,
    '    mblnReplacementHomePage is True
    ' This occurs when the user closes the searchpage while a policy is open.
    ' Then clicks the Home button.

    If mblnReplacementHomePage Then
        'Get the child window references from the policy window that is
        'opening this replacement search window.
        arrKeys = mobjParentWindow.mdicChildWindows.Keys
        arrWindows = mobjParentWindow.mdicChildWindows.Items
        For intCount = 0 To mobjParentWindow.mdicChildWindows.Count - 1
            'Only add references to policy windows,
            'not other child window, ie, batchedits, overrides...
            If StrComp(Left(arrKeys(intCount),6),"policy",vbTextCompare) = 0 Then
                Call LoadWindowReferences (arrKeys(intCount), arrWindows(intCount))
            End If
        Next

        'Now update the parent window property of all the child windows
        'so they know about this new search window.

'=== IMG_4441 ===
        'so they know about this new search window.
        If Not mdicChildWindows Is Nothing Then
            arrWindows = mdicChildWindows.Items
            arrKeys = mdicChildWindows.Keys
            For intCount = 0 To mdicChildWindows.Count - 1
                Set objWindow = arrWindows(intCount)
                If Not objWindow.closed Then
                    'Policy windows still open,
                    'pass the references of this window as the new parent.
                    Set objWindow.mobjParentWindow = window
                Else
                    mdicChildWindows.Remove arrKeys(intCount)
                                                                                    'remove old reference
                End If
            Next
            Set objWindow = Nothing
        End If
    arrNonPolKeys = mobjParentWindow.mdicNonPolicyChildWindows.Keys
    arrNonPolWindows = mobjParentWindow.mdicNonPolicyChildWindows.Items
    For intNonPolCount = 0 To mobjParentWindow.mdicNonPolicyChildWindows.Count - 1
        'Only add references to non policy windows
        If StrComp(Left(arrNonPolKeys(intNonPolCount),6),"policy",vbTextCompare) <> 0 Then
            Call LoadNonPolicyWindowReferences (arrNonPolKeys(intNonPolCount), arrNonPolWindows(intNonPolCount))
        End If
    Next

    'Now update the parent window property of all the non policy child windows
    'so they know about this new search window.
    If Not mdicNonPolicyChildWindows Is Nothing Then
        arrNonPolWindows = mdicNonPolicyChildWindows.Items
        arrNonPolKeys = mdicNonPolicyChildWindows.Keys
        For intNonPolCount = 0 To mdicNonPolicyChildWindows.Count - 1
            Set objWindowNonPol = arrNonPolWindows(intNonPolCount)
            If Not objWindowNonPol.closed Then
                'Non Policy windows still open,
                'pass the references of this window as the new parent.
                Set objWindowNonPol.mobjParentWindow = window
            Else
                mdicNonPolicyChildWindows.Remove arrNonPolKeys(intNonPolCount)  'remove old reference
            End If
        Next
        Set objWindowNonPol = Nothing
    End If

'=== IMG_4442 ===
        End If
    End If
                                                            REPLACEMENT SEARCH PAGE
    '
    '<<<<<<<<<<<<<<<<< [ end section ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    ' >>>>>>>>>>>>>>>>>[begin section]>>>>>>>>>>>>>>>>>>>>>>>
    '
                                                            Exception Handling
    If Err.number <> 0 Then
        Err.clear
        Set mobjParentWindow = Nothing
    End If
                                                            Exception Handling
    '
    '<<<<<<<<<<<<<<<<<< [ end section ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    ' >>>>>>>>>>>>>>>>>>[begin section]>>>>>>>>>>>>>>>>>>>>>>>
    '
                                                            Configure the frames and borders

        mblnSearchPage = False
        'Default

        ' Save the initial policy id.
        ' It will be restored after any ExectuteAction.
        ' This allows the policy id variable to be changed
        ' temporarily for navigation (as when the start page
        ' lanuches new policy windows)
        document.body.setAttribute  "policyid", mstrPolicyID


            'fraHorizontal.frameBorder = "0"
            'fraVertical.frameBorder = "0"
            'fraMain.frameBorder = "0"

    If CLng(mstrPolicyID) > 0 Then

            'show the menu and tree frames for policies
            fraHorizontal.rows = "46,*"
            'fraVertical.cols = "177,*"
            fraTreeColumn.rows = "90,*"

    ElseIf CLng(mstrPolicyID) = 0 Then

            mblnSearchPage = True

'=== IMG_4443 ===
            Else

                mblnSearchPage = True

                '--show dropdown only for utilites
                fraHorizontal.rows = "23,*"
                fraVertical.cols = "0,*"
                mstrTransactionType = ""

        End If
    '                                                       Configure the frames and borders
    '<<<<<<<<<<<<<<<<< [ end section ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    ' >>>>>>>>>>>>>>>>>[begin section]>>>>>>>>>>>>>>>>>>>>>>>
    '                                                       Specifiy the action
        Select Case CLng(mstrPolicyID)

            Case -3
                mstrAction = "LIB"

        End Select
    '                                                       Specifiy the action
    '<<<<<<<<<<<<<<<<< [ end section ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    ' >>>>>>>>>>>>>>>>>>[begin section]>>>>>>>>>>>>>>>>>>>>>>>
    '                                                       Load the security data island
    Set mxmlSecurity = CreateObject("MSXML2.DOMDocument.6.0")
    mxmlSecurity.async = False
    mxmlSecurity.preserveWhiteSpace = False
    mxmlSecurity.loadXML(document.all("xdiSecurity").XMLDocument.xml)
    Call TrapBrowserError("Main|window_onload|security")
    '                                                       Load the security data island
    '<<<<<<<<<<<<<<<<<<< [ end section ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    ' >>>>>>>>>>>>>>>>>>[begin section]>>>>>>>>>>>>>>>>>>>>>>
    '                                                       Set the src for the menu frame
    Call ExecuteAction("menu", "POL|POL|" & mstrExpiredNumber & "|", -1, "")
    Call TrapBrowserError("window_onload|menu1")
    '                                                       Set the src for the menu frame
    '<<<<<<<<<<<<<<<<<<<< [ end section ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    ' After the menu page loads, it calls the LoadNextPage routine

'=== IMG_4444 ===
    '                                                       Set the src for the menu frame
    '<<<<<<<<<<<<<<<<<<<< [ end section ]<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    ' After the menu page loads, it calls the LoadNextPage routine

    'clear out ratingdatachanged
    Call SessionXML_ClearItem("ratingdatachanged")

    ' End of window_onload
End Sub
'--------------------------------------------------------------------------------


Sub LoadNextPage()
'*****************************************************************************
'PURPOSE:
    'This routine is called at the end of the menu page onload routine
    'to load the tree (or next) page.  This is done to prevent
    'timing problems caused by attempting to load all the pages at once.
'*****************************************************************************

 ' Utilities don't use exprired numbers
 If StrComp(Left(mstrNodeKey, 3), "SYS", 0) = 0 Then
  Call ExecuteAction(mstrAction, mstrNodeKey, 0, "")
 Else
 Select Case UCase(Left(mstrNodeKey,7))
   Case "POL|POL"
     ' This exception for policy windows loads the tree before loading the first page
     Call ExecuteAction("TREE", "POL|POL|" & mstrExpiredNumber & "|", -1, "")
   Case Else
     Call ExecuteAction(mstrAction, "POL|POL|" & mstrExpiredNumber & "|", 0, "")
 End Select
 End If
End Sub
'--------------------------------------------------------------------------------


Sub LoadFirstPage
'*****************************************************************************
    'This routine is called at the end of the tree page onload routine
    'to load the first page shown to the user.  This is done to prevent
    'timing problems caused by attempting to load all the pages at once.
'*****************************************************************************
    On Error Resume Next

'=== IMG_4445 ===
        'timing problems caused by attempting to load all the pages at once.
'*****************************************************************************
    On Error Resume Next

    'load the first page based on current action
    Call ExecuteAction(mstrAction, "POL|POL|" & mstrExpiredNumber & "|", 0, "")
    Call TrapBrowserError("LoadFirstPage|1")
  If mstrPolicyID <> "0" Then
    window.setTimeout "document.frames(""menu"").FetchUmbrellaMappingStatus()", 1000, "vbscript"
  End If
End Sub
'--------------------------------------------------------------------------------


Sub ClearActionMenus(pstrNodeKey)
'*****************************************************************************
'PURPOSE:
'   Sets the src property of frames of type="action" to blank.htm.
'   This is done as the result of a rate level change to force action
'   menus to reload.
'   If pstrNodeKey is a valid nodekey, then only the specified LOB
'   is cleared.
'   Otherwise, all action menus are cleared.
'   (frames with a custom attribute of type="action")
'*****************************************************************************
On Error Resume Next

    Dim objFrames
    Dim lngCounter

    If Len(pstrNodeKey) > 0 Then
        Set objFrames = fraMain.children(GetActionMenuNameException( pstrNodeKey ))

        If Not objFrames Is Nothing Then
            objFrames.src = "../../system/htm/blank.htm"
            Set objFrames = Nothing
        End If
        Call TrapBrowserError("ClearActionMenus|1")

    Else

        ' These are all the frames in fraMain
        Set objFrames = fraMain.children

'=== IMG_4446 ===
        Set objFrames = Nothing
        Call TrapBrowserError("ClearActionMenus|2")
    End If

End Sub
'--------------------------------------------------------------------------

'****************************************************************************
'This group of function closes all windows of the application.
'****************************************************************************
Dim windowsCollection
Set windowsCollection = CreateObject("Scripting.Dictionary")

' Helper to get around the fact that Eval of an undefined variable causes an error instead of returning empty.
Function IsEmptyEval(value)
    On Error Resume Next

    Dim emptyCheck
    IsEmpty(Eval(value))
    If Err.Number = 450 Then
        emptyCheck = False
    Else
        emptyCheck = True
    End If

    On Error GoTo 0
    IsEmptyEval = emptyCheck
End Function

' Searched for the highest level opener that can add windows to the windowsCollection array.
Sub AddWindowToCollection(myWindow)
    If Not IsEmpty(myWindow) Then
        If IsObject(window.opener) And Not IsEmptyEval("window.opener.AddWindowToCollection") Then
            window.opener.AddWindowToCollection myWindow
        Else
            windowsCollection.Add CStr(windowsCollection.Count), myWindow

            ' "windowsCollection" is a "Scripting.Dictionary" ref object.
            ' Propagates the windowsCollection array to all windows in case home window is closed.
            Set myWindow.windowsCollection = windowsCollection
        End If
    End If
End Sub

'=== IMG_4447 ===
Function LogoutMain()
'****************************************************************************
'This function logs out the user from AQS when Logout is clicked on
'Home Page
'****************************************************************************
    Dim arrWindowsMain
    Dim objWindowLogoutMain

    If Not mdicExternalWindows Is Nothing Then
        If mdicExternalWindows.Count > 0 Then
            arrWindowsMain = mdicExternalWindows.Items
            For intCount = 0 To mdicExternalWindows.Count - 1
                Set objWindowLogoutMain = arrWindowsMain(intCount)
                If Not objWindowLogoutMain Is Nothing Then
                    If Not objWindowLogoutMain.closed Then
                        objWindowLogoutMain.close
                    End If
                End If
            Next
            Call TrapBrowserError("LogoutMain|1")
        End If
    End If

    If Not mdicChildWindows Is Nothing Then
        If mdicChildWindows.Count > 0 Then
            arrWindowsMain = mdicChildWindows.Items
            For intCount = 0 To mdicChildWindows.Count - 1
                Set objWindowLogoutMain = arrWindowsMain(intCount)
                If Not objWindowLogoutMain Is Nothing Then
                    If Not objWindowLogoutMain.closed Then
                        objWindowLogoutMain.close
                    End If
                End If
            Next
            Call TrapBrowserError("LogoutMain|2")
        End If
    End If
    If Not mdicNonPolicyChildWindows Is Nothing Then
        If mdicNonPolicyChildWindows.Count > 0 Then
            arrWindowsMain = mdicNonPolicyChildWindows.Items
            For intCount = 0 To mdicNonPolicyChildWindows.Count - 1
                Set objWindowLogoutMain = arrWindowsMain(intCount)

'=== IMG_4448 ===
                Set objWindowLogoutMain = arrWindowsMain(intCount)
                If Not objWindowLogoutMain Is Nothing Then
                    If Not objWindowLogoutMain.closed Then
                        objWindowLogoutMain.close
                    End If
                End If
            Next
            Call TrapBrowserError("LogoutMain|3")
        End If
    End If
    window.close
    mblnLogout = True
    Call TrapBrowserError("LogoutMain|4")
End Function
'--------------------------------------------------------------------------

Function Logout()
'****************************************************************************
'This function logs out the user from AQS when Logout is clicked on
'the Policy Windows page
'****************************************************************************
    Dim arrWindowsMain
    Dim objWindowLogoutMain

    If Not mobjParentWindow Is Nothing Then
        If Not mobjParentWindow.closed Then
            If Not mobjParentWindow.mdicExternalWindows Is Nothing Then
                If mobjParentWindow.mdicExternalWindows.Count > 0 Then
                    arrWindowsMain = mobjParentWindow.mdicExternalWindows.Items
                    For intCount = 0 To mobjParentWindow.mdicExternalWindows.Count - 1
                        Set objWindowLogoutMain = arrWindowsMain(intCount)
                        If Not objWindowLogoutMain Is Nothing Then
                            If Not objWindowLogoutMain.closed Then
                                objWindowLogoutMain.close
                            End If
                        End If
                    Next
                    Call TrapBrowserError("LogoutChildWindow|1")
                End If
            End If
            If Not mobjParentWindow.mdicChildWindows Is Nothing Then
                If mobjParentWindow.mdicChildWindows.Count > 0 Then
                    Dim arrWindows, arrKeys, objWindow,strWindowName

'=== IMG_4449 ===
                    Dim arrWindows, arrKeys, objWindow,strWindowName
                    arrWindows = mobjParentWindow.mdicChildWindows.Items
                    For intCount = 0 To mobjParentWindow.mdicChildWindows.Count - 1
                        Set objWindow = arrWindows(intCount)
                        If Not objWindow Is Nothing Then
                            If Not objWindow.close Then
                                objWindow.close
                            End If
                        End If
                    Next
                End If
                Call TrapBrowserError("LogoutChildWindow|2")
            End If
            If Not mobjParentWindow.mdicNonPolicyChildWindows Is Nothing Then
                If mobjParentWindow.mdicNonPolicyChildWindows.Count > 0 Then
                    arrWindows = mobjParentWindow.mdicNonPolicyChildWindows.Items
                    For intCount = 0 To mobjParentWindow.mdicNonPolicyChildWindows.Count - 1
                        Set objWindow = arrWindows(intCount)
                        If Not objWindow Is Nothing Then
                            If Not objWindow.close Then
                                objWindow.close
                            End If
                        End If
                    Next
                End If
                Call TrapBrowserError("LogoutChildWindow|3")
            End If
        End If
        LogoutGrandParent()
        mobjParentWindow.close
        Call TrapBrowserError("LogoutChildWindow|4")
    End If
    mblnLogout = True
    Call TrapBrowserError("LogoutChildWindow|5")
End Function
'--------------------------------------------------------------------------


Function LogoutGrandParent()
'****************************************************************************
'This function logs out the user from AQS when Logout is clicked on a grand child page
'****************************************************************************
    Dim arrWindows
    Dim objGrandParentWindow

'=== IMG_4450 ===
Function LogoutGrandParent()
'****************************************************************************
'This function logs out the user from AQS when Logout is clicked on a grand child page
'****************************************************************************
    Dim arrWindows
    Dim objGrandParentWindow

    If Not mobjParentWindow Is Nothing Then
        If StrComp(Left(mobjParentWindow.name,6), "policy", vbTextCompare) = 0 Then
            Set objGrandParentWindow = mobjParentWindow.opener
            If Not objGrandParentWindow Is Nothing Then
                If Not objGrandParentWindow.closed Then
                    If Not objGrandParentWindow.mdicExternalWindows Is Nothing Then
                        If objGrandParentWindow.mdicExternalWindows.Count > 0 Then
                            arrWindows = objGrandParentWindow.mdicExternalWindows.Items
                            For intCount = 0 To objGrandParentWindow.mdicExternalWindows.Count - 1
                                Set objWindow = arrWindows(intCount)
                                If Not objWindow Is Nothing Then
                                    If Not objWindow.closed Then
                                        objWindow.close
                                    End If
                                End If
                            Next
                            Call TrapBrowserError("LogoutGrandParent|1")
                        End If
                    End If
                    If Not objGrandParentWindow.mdicChildWindows Is Nothing Then
                        If objGrandParentWindow.mdicChildWindows.Count > 0 Then
                            arrWindows = objGrandParentWindow.mdicChildWindows.Items
                            For intCount = 0 To objGrandParentWindow.mdicChildWindows.Count - 1
                                Set objWindow = arrWindows(intCount)
                                If Not objWindow Is Nothing Then
                                    If Not objWindow.closed Then
                                        objWindow.close
                                    End If
                                End If
                            Next
                        End If
                        Call TrapBrowserError("LogoutGrandParent|2")
                    End If
                    If Not objGrandParentWindow.mdicNonPolicyChildWindows Is Nothing Then
                        If objGrandParentWindow.mdicNonPolicyChildWindows.Count > 0 Then

'=== IMG_4451 ===
                    If objGrandParentWindow.mdicNonPolicyChildWindows.Count > 0 Then
                        arrWindows = objGrandParentWindow.mdicNonPolicyChildWindows.Items
                        For intCount = 0 To objGrandParentWindow.mdicNonPolicyChildWindows.Count - 1
                            Set objWindow = arrWindows(intCount)
                            If Not objWindow Is Nothing Then
                                If Not objWindow.close Then
                                    objWindow.close
                                End If
                            End If
                        Next
                    End If
                    Call TrapBrowserError("LogoutGrandParent|3")
                End If
                objGrandParentWindow.close
            End If
        End If
    End If
End If
Call TrapBrowserError("LogoutGrandParent|5")
End Function
'--------------------------------------------------------------------------


Function ShowBatchEdits (ByVal pstrType)
'****************************************************************************
'This function looks at mxmlBatchEdits for any data.
'If there is xml, it launches a window that will display the information.
'****************************************************************************
    Dim objWindow


    Dim intTop
    Dim intLeft
    Dim strWindowOptions
    Dim strURL

    On Error Resume Next
    ShowBatchEdits = False

        If Not mxmlBatchEdits Is Nothing Then
            If Len(mxmlBatchEdits.xml) > 0 Then
                ShowBatchEdits = True
                intTop = window.screenTop
                intLeft = window.screen.width - 350

'=== IMG_4452 ===
        intLeft = window.screen.width - 350
        strURL = "../../system/asp/batcheditsdisplay.asp?policyid=" & Cstr(mstrPolicyID) & "&policynumber=" & Cstr(mstrPolicyNumber)
        strWindowOptions = "channelmode=no,directories=no,fullscreen=no,height=400,left=" & intLeft & ",location=no,menubar=no," & _
                            "resizable=yes,scrollbars=no,status=no,titlebar=no,toolbar=no,top=" & intTop & ",width=300"
        'if pstrType = "MODAL" then msgbox "modal generated messages"
        Call OpenNewWindow ( strURL, "batcheditdisplay" & pstrType & Cstr(mstrPolicyID), strWindowOptions)
    End If
    Else
        If Not mdicChildWindows Is Nothing Then
            If mdicChildWindows.Exists("batcheditdisplay" & pstrType & Cstr(mstrPolicyID)) Then
                Set objWindow = mdicChildWindows.Item("batcheditdisplay" & pstrType & Cstr(mstrPolicyID))
                If Not objWindow Is Nothing Then
                    If Not objWindow.closed Then
                        objWindow.close
                    End If
                End If
            End If
        End If
    End If
    Call TrapBrowserError("ShowBatchEdits|1")
End Function
'--------------------------------------------------------------------------------------------------------------------------


Function ShowConversionReport
'****************************************************************************
'This function looks at mlngConversionReportID to determine if a report is to be shown.
'If there is, it launches a window that will display the information.
'****************************************************************************

    Dim objWindow
    Dim intTop
    Dim intLeft
    Dim strWindowOptions
    Dim strURL


    On Error Resume Next
    ShowConversionReport = False
    If mlngConversionReportID > 0 Then
        ShowConversionReport = True

        strURL = "../../system/asp/ConversionSummaryDisplay.asp?userid=" & mstrUserID & "&policyid=" & Cstr(mstrPolicyID) & "&policynumber=" & Cstr(mstrPolicyNumber) & _
                 "&nodekey=" & Cstr(mstrNodeKey) & "&reportid=" & CStr(mlngConversionReportID)
        strWindowOptions = "dialogWidth=700px;dialogHeight=550px;location=no;menubar=no;toolbar=no;status=no;scrollbars=no;resizable=yes"

'=== IMG_4453 ===
        window.showModelessDialog (strURL), window, (strWindowOptions)

        mlngConversionReportID = 0
    End If
    Call TrapBrowserError("ShowConversionReport|1")
End Function
'--------------------------------------------------------------------------------------------------------------------------

Sub LoadWindowReferences (ByVal pstrKey, ByRef pobjWindow)
'****************************************************************************
'This sub is used to pass the Dictionary object between the parent and child
'windows.  This is done to preserve the references to open policy windows.
'****************************************************************************
On Error Resume Next

    If mdicChildWindows Is Nothing Then
        Set mdicChildWindows = CreateObject("Scripting.Dictionary")
    End If

    'Remove the item if it exists, it may be an old copy.
    If mdicChildWindows.Exists (CStr(pstrKey)) Then
        mdicChildWindows.Remove (CStr(pstrKey))
    End If

    mdicChildWindows.Add CStr(pstrKey), pobjWindow
    Call TrapBrowserError("LoadWindowReferences|1")
End Sub
'--------------------------------------------------------------------------------------------------------------------------

Sub LoadNonPolicyWindowReferences (ByVal pstrKey, ByRef pobjWindow)
'****************************************************************************
'This sub is used to pass the Dictionary object between the parent and non
'policy child windows.  This is done to preserve the references to open non
'policy windows.
'****************************************************************************
On Error Resume Next
    If mdicNonPolicyChildWindows Is Nothing Then
        Set mdicNonPolicyChildWindows = CreateObject("Scripting.Dictionary")
    End If

    'Remove the item if it exists, it may be an old copy.
    If mdicNonPolicyChildWindows.Exists (CStr(pstrKey)) Then

'=== IMG_4454 ===
        If mdicNonPolicyChildWindows.Exists (CStr(pstrKey)) Then
            mdicNonPolicyChildWindows.Remove (CStr(pstrKey))
        End If

        mdicNonPolicyChildWindows.Add CStr(pstrKey), pobjWindow
        Call TrapBrowserError("LoadNonPolicyWindowReferences|1")
    End Sub
'--------------------------------------------------------------------------------------------------------------------------


'--------------------------------------------------------------------------------------------------------------------------

Sub LoadExternalWindowReferences (ByVal pstrKey, ByRef pobjWindow)
'****************************************************************************
'This sub is used to add the window reference to the dictionary.
'****************************************************************************
On Error Resume Next
    Dim windowName
    windowName = pobjWindow.name
    If Err.Number = 0 Then
        If StrComp(Left(window.name,6), "policy", vbTextCompare) = 0 Then
            If mobjParentWindow.mdicExternalWindows Is Nothing Then
                Set mobjParentWindow.mdicExternalWindows = CreateObject("Scripting.Dictionary")
            End If

            'Remove the item if it exists, it may be an old copy.
            If mobjParentWindow.mdicExternalWindows.Exists (CStr(pstrKey)) Then
                mobjParentWindow.mdicExternalWindows.Remove (CStr(pstrKey))
            End If

            mobjParentWindow.mdicExternalWindows.Add CStr(pstrKey), pobjWindow

        Else
            If mdicExternalWindows Is Nothing Then
                Set mdicExternalWindows = CreateObject("Scripting.Dictionary")
            End If

            'Remove the item if it exists, it may be an old copy.
            If mdicExternalWindows.Exists (CStr(pstrKey)) Then
                mdicExternalWindows.Remove (CStr(pstrKey))
            End If

            mdicExternalWindows.Add CStr(pstrKey), pobjWindow

        End If

'=== IMG_4455 ===
            End If
        End If
    End Sub
'--------------------------------------------------------------------------------------------------------------------------


Sub ParentWindow_Navigate
'****************************************************************************
'This sub acts like a back button to set focus to the parent window.
'The parent window should be the search/start new page.

' If the search window is not open, a new window is opened
' with a qs value of replacement=t. This tells the new search
' window to get the references to open policy windows.
'****************************************************************************

    On Error Resume Next
    'If this is the search window, simply set focus here.
    If StrComp(Left(window.name,6), "policy", vbTextCompare) = 0 Then
        If Not mobjParentWindow Is Nothing Then
            If Not mobjParentWindow.closed Then
                mobjParentWindow.focus
            Else
                window.open "../../system/asp/XmlCycling.aspx?userid=" & mstrUserID & "&policyid=0&action=main&nodekey=pol|pol|0|&diagnosticmode=" & mstrDiagnosticMode & "&redirec‹?›
            End If
        Else
            window.open "../../system/asp/XmlCycling.aspx?userid=" & mstrUserID & "&policyid=0&action=main&nodekey=pol|pol|0|&diagnosticmode=" & mstrDiagnosticMode & "&redirec‹?›
        End If
    Else
        window.focus
    End If
    Call TrapBrowserError("ParentWindow_Navigate|1")
End Sub
'--------------------------------------------------------------------------------------------------------------------------

Sub ShowFrame(ByVal pstrFrame)
'****************************************************************************
'PURPOSE:
'   There is a Frame for each LOB and MAIN and START
'   "MAIN" will be used as the main frame to display pages for data entry/edit
'   "START" frame will hold the start page for policy recall
'   The LOB Frames will be used to hold the Action Menus for the specified LOB.
'   Once the Action Menu page is loaded, it will only be refreshed if a rate
'   level change occurs. This will eliminate the download of the action menu

'=== IMG_4456 ===
    This sub sets the size of the selected frame to the full space available.
        for example:  fraMain.rows = "0,0,0,0,*,0,0,0,0,0,0,0"
    sets the fifth frame (index=4) to full height (*), all others are zero.
'****************************************************************************
On Error Resume Next

    Dim objFrames
    Dim objFrame
    Dim lngCounter
    Dim strFrameRowSizes

    'New/Different page is being shown. Clear Data Changed Indicators
    mblnDataChanged = False
    mblnRatingDataChanged = False
    Call SessionXML_ClearItem("datachanged")
    Call SessionXML_ClearItem("ratingdatachanged")

    Set objFrame = fraMain.children(pstrFrame)
    If objFrame Is Nothing Then
            ' Make sure the specifed frame exists
        Call ShowUserMessage("Selected frame (""" & pstrFrame & """) does not exist." & vbCrLf & "Check the cycling component.", "WARNING", 1)
        pstrFrame = "MAIN"
            ' If not, select MAIN
    Else
        Set objFrame = Nothing
    End If

    Set objFrames = fraMain.children
        ' These are all the frames in fraMain

    For lngCounter = 0 To objFrames.length - 1
            ' Loop through all the frames, build the string to set frame heights
            ' 0 for unselected, * for selected
        If lngCounter > 0 Then
            strFrameRowSizes = strFrameRowSizes & ","
                ' Comma separater (do not include for first frame)
        End If

        If StrComp(objFrames(lngCounter).id, pstrFrame, vbTextCompare) = 0 Then
            strFrameRowSizes = strFrameRowSizes & "*"
                ' Selected frame - full height
            objFrames(lngCounter).tabIndex = 1
                ' Set the tabIndex of the selected frame to allow tab access

'=== IMG_4457 ===
        Else
            objFrames(lngCounter).tabIndex = -1
                ' Set the tabIndex of the unselected frames to prevent tab access
        End If

    Next

    Set objFrames = Nothing

    'MAIN, START,  LOB, POL,  action, ...
    '  0,      0,        0,      0,          0,   ...
    fraMain.rows = strFrameRowSizes
        ' Example: "0,0,0,0,*,0,0,0,0,0,0"

    Call TrapBrowserError("ShowFrame|1")

    ' Remember which is the currently selected frame
    mstrCurrentFrame = pstrFrame

    ' Disable tree for enter/edit pages
    If StrComp(mstrCurrentFrame, "MAIN", vbTextCompare) = 0 Then
        Tree_SetState(False)
    Else
        Tree_SetState(True)
    End If

    Call TrapBrowserError("ShowFrame|2")

    Call SetFrameTitle()
    Call TrapBrowserError("ShowFrame|3")

End Sub
'--------------------------------------------------------------------------------------------------------------------------

Sub SetFrameTitle()
'****************************************************************************
'PURPOSE:
'   This subroutine sets the title of the window by getting the text from
'   the useroptions xml based upon the window name.
'****************************************************************************
    On Error Resume Next
    Dim strName
    Dim strTitle
    Dim strPolicyNumber
    Dim strPrimaryInsured

'=== IMG_4458 ===
'*****************************************************************
'PURPOSE:
'   This subroutine sets the title of the window by getting the text from
'   the useroptions xml based upon the window name.
'*****************************************************************
    On Error Resume Next
    Dim strName
    Dim strTitle
    Dim strPolicyNumber
    Dim strPrimaryInsured
    Dim intStart
    Dim strUsrOpt

    strName = window.name
    intStart = InStr(1, strName, mstrPolicyID)
    If intStart > 0 Then
        strName = Left(strName, intStart - 1)
        strPolicyNumber = mstrPolicyNumber
        strPrimaryInsured = mstrPrimaryInsured
    End If

    strTitle = UserValue(LCase(strName),"windowtitle")
    If Len(strTitle) > 0 Then
        If StrComp(LCase(strName), "policy", vbTextCompare) = 0 And UserOption("useinsuredname", "T", strUsrOpt) Then
            'Recheck for value (default needs to be disabled)
            If StrComp(strUsrOpt, "T", vbTextCompare) = 0 Then
                window.document.title = strTitle & strPolicyNumber & " - " & strPrimaryInsured
            Else
                window.document.title = strTitle & strPolicyNumber
            End If
        Else
            window.document.title = strTitle & strPolicyNumber
        End If
    End If
  Call TrapBrowserError("SetFrameTitle|1")

End Sub
'------------------------------------------------------------------------

Sub RefreshTree()
    Dim objDoc
    On Error Resume Next
    Set objDoc = document.frames("tree")

'=== IMG_4459 ===
    Sub RefreshTree()
        Dim objDoc
        On Error Resume Next
        Set objDoc = document.frames("tree")
        Call objDoc.Build_Tree("POL|POL|0|", "LOADTREE")
        Set objDoc = Nothing
        Call TrapBrowserError ("RefreshTree|1")
    End Sub


'------------------------------------------------------------------------


Sub DeleteAction(ByVal pstrNodeKey, ByVal pstrAction)
'*****************************************************************************
'PURPOSE:
'  This subroutine calls the asp page that deletes the specified node from
'  the policy.  If the return value of result is Success, then the node
'    is deleted from the tree.
' **** Special Code is contained herein that deletes addional nodes
' **** Depending upon the conditions.

'*****************************************************************************
On Error Resume Next

    Dim objResponse                    ' XML document to hold the xml of the response

    Dim objNode                        ' node within ("/navigate") from response

    Dim strQueryString
    Dim objDoc
    Dim objFrame

    Dim objTreeNode
    Dim objParentNode
    Dim intStart
    Dim intEnd
    Dim intCount
    Dim strStateCode
    Dim blnStateFound

    Dim strLOB
    Dim strLevel
    Dim strNEXPNUM

'=== IMG_4460 ===
        Dim strNEXPNUM
        Dim strNPOLPED
        Dim strPGMTYP
        Dim strNodeKey
        Dim strNSEGNUM
        Dim strJUR
        Dim strMessage
        Dim strNSTANUM
        Dim strNLOCNUM
        Dim strNCOVNUM

        Set objParentNode = Nothing

        ' Create querystring
        strQueryString = "?object=DELETE" & _
                                            "&nodekey=" & Escape(SetExpiredNumber(pstrNodeKey)) & _
                                            "&action=" & pstrAction & _
                                            "&userid=" & mstrUserID & _
                                            "&policyid=" & mstrPolicyID & _
                                            "&diagnosticmode=" & mstrDiagnosticMode

    Call TrapBrowserError("DeleteAction|1")

    Set objResponse = CreateObject("MSXML2.DOMDocument.6.0")
    Call TrapBrowserError("DeleteAction|2")

    With objResponse
        .async = False
        .load "../../system/ASP/XmlServercall.aspx" & strQueryString
        Call TrapBrowserError("DeleteAction|3")

        ' If there are results...
        If Not TrapXMLParseError(objResponse, "DeleteAction|3") Then
            ' Check for any return errors
            Call TrapXMLReturnErrors(objResponse, "DeleteAction|4")

            Set objNode = .selectSingleNode("//results")

            If left(UCase(GetNodeText(objNode, "status", "")),5) = "ERROR" Then
                strMessage = mid(GetNodeText(objNode, "status", ""),7)
                If left(UCase(strMessage),5) = "BATCH" Then
                    strMessage = mid(strMessage,7)
                    Set mxmlBatchEdits = CreateObject("MSXML2.DOMDocument.6.0")
                    With mxmlBatchEdits

'=== IMG_4461 ===
                End With
                Call ShowBatchEdits("")
                Call TrapBrowserError("DeleteAction|4a")
            Else
                strMessage = replace(strMessage, "*lt*", "<")
                strMessage = replace(strMessage, "*gt*", ">")
                Call ShowUserMessage(strMessage, "ERROR", 1)
                Call TrapBrowserError("DeleteAction|4b")
            End If

        ElseIf UCase(GetNodeText(objNode, "status", "")) = "SUCCESS" Then
            ' Delete the node from the tree
            Set objDoc = document.frames("tree")

            strNodeKey = ""
            strLOB = GetStringField(pstrNodeKey, 1, "|")
            strLevel = GetStringField(pstrNodeKey, 2, "|")
            strNEXPNUM = GetStringField(pstrNodeKey, 3, "|")
            strNPOLPED = "0"
            strPGMTYP = strLOB

            ' Additional Coverages Nodekey
            ' LOB | SPCLVL |     NEXPNUM | NPOLPED | PRGTYP |

            ' BOP   | SPCLVL |  0 | 0 | ISO      |
            ' KRM   | SPCLVL |  0 | 0 | KRM      |
            ' LIA   | SPCLVL |  0 | 0 | LIA      |
            ' PRP   | SPCLVL |  0 | 0 | PRP      |
            ' CAU   | SPCLVL |  0 | 0 | CAU      |

            ' Remove the specified node
            objDoc.Remove_TreeNode pstrNodeKey, ""

            Select Case UCase (strLOB)
                Case "BOP"

                    If StrComp(strLevel, "COV", vbTextCompare) = 0 then
                        strPGMTYP = GetStringField(pstrNodeKey, 4, "|")
                        If StrComp(strPGMTYP, "PFL", vbTextCompare) = 0 then
                            strNCOVNUM = GetStringField(pstrNodeKey, 10, "|")
                            If StrComp(strNCOVNUM, "50", vbTextCompare) = 0 then
                                strNSTANUM = GetStringField(pstrNodeKey, 6, "|")
                                strNLOCNUM = GetStringField(pstrNodeKey, 7, "|")

'=== IMG_4462 ===
                        strNLOCNUM = GetStringField(pstrNodeKey, 7, "|")
                        strNodeKey = "BOP|LOC|" & strNEXPNUM & "|" & strPGMTYP & "|" & strNPOLPED & "|" & strNSTANUM & "|" & strNLOCNUM & "|"
                        Call objDoc.Build_Tree(strNodeKey, "LOADBRANCH")
                    End If
                End If
            End If

            If StrComp(strLevel, "LOC", vbTextCompare) = 0 Or _
               StrComp(strLevel, "STA", vbTextCompare) = 0 Or _
               StrComp(strLevel, "BLD", vbTextCompare) = 0 Then
                ' Deleting a BOP Location, Refresh the Addl Coverages Branch
                strNPOLPED = GetStringField(pstrNodeKey, 5, "|")
                strPGMTYP = GetStringField(pstrNodeKey, 4, "|")
                strNodeKey = strLOB & "|SPCLVL|" & strNEXPNUM & "|" & strNPOLPED & "|" & strPGMTYP & "|"
                Call objDoc.Build_Tree ( strNodeKey, "LOADBRANCH" )
                Call objDoc.Remove_TreeNodeIfNoChildren(strNodeKey)
            End If

        Case "KRM"

            If StrComp(strLevel, "CLS", vbTextCompare) = 0 Then
                ' Deleting a KRM Location, Refresh the Addl Coverages Branch
                strNodeKey = strLOB & "|SPCLVL|" & strNEXPNUM & "|" & strNPOLPED & "|" & strPGMTYP & "|"
                Call objDoc.Build_Tree ( strNodeKey, "LOADBRANCH" )
                Call objDoc.Remove_TreeNodeIfNoChildren(strNodeKey)
            End If

        Case "LIA"

            If StrComp(strLevel, "LOC", vbTextCompare) = 0 Then
                ' Deleting a LIA Location, Refresh the Addl Coverages Branch
                strNPOLPED = GetStringField(pstrNodeKey, 4, "|")
                strNodeKey = strLOB & "|SPCLVL|" & strNEXPNUM & "|" & strNPOLPED & "|" & strPGMTYP & "|"
                Call objDoc.Build_Tree ( strNodeKey, "LOADBRANCH" )
                Call objDoc.Remove_TreeNodeIfNoChildren(strNodeKey)
            End If

        Case "PRP"

            If StrComp(strLevel, "LOC", vbTextCompare) = 0 Or StrComp(strLevel, "BLD", vbTextCompare) = 0 Then
                ' Deleting a PRP Location, Refresh the Addl Coverages Branch
                strNodeKey = strLOB & "|SPCLVL|" & strNEXPNUM & "|" & strNPOLPED & "|" & strPGMTYP & "|"
                Call objDoc.Build_Tree ( strNodeKey, "LOADBRANCH" )

'=== IMG_4463 ===
                Call objDoc.Build_Tree ( strNodeKey, "LOADBRANCH" )
                Call objDoc.Remove_TreeNodeIfNoChildren(strNodeKey)
            End If

            If StrComp(strLevel, "LOC", vbTextCompare) = 0 Or StrComp(strLevel, "BLD", vbTextCompare) = 0 Or _
               StrComp(strLevel, "COV", vbTextCompare) = 0 Then
                ' Deleting a PRP Location, Building, Coverage. Refresh the Blanket Branch
                strNodeKey = strLOB & "|BKTLVL|" & strNEXPNUM & "|"
                Call objDoc.Build_Tree ( strNodeKey, "LOADBRANCH" )
                Call objDoc.Remove_TreeNodeIfNoChildren(strNodeKey)
            End If

        Case "CAU"

            If StrComp(strLevel, "LOC", vbTextCompare) = 0 Or StrComp(strLevel, "STA", vbTextCompare) = 0 Then
                ' Deleting a CAU State or Location, Refresh the Addl Coverages Branch
                strNPOLPED = GetStringField(pstrNodeKey, 4, "|")
                strNodeKey = strLOB & "|SPCLVL|" & strNEXPNUM & "|" & strNPOLPED & "|" & strPGMTYP & "|"
                Call objDoc.Build_Tree ( strNodeKey, "LOADBRANCH" )
                Call objDoc.Remove_TreeNodeIfNoChildren(strNodeKey)
            End If

        Case "PAU"

            If StrComp(strLevel, "LOC", vbTextCompare) = 0 Or StrComp(strLevel, "STA", vbTextCompare) = 0 Then
                ' Deleting a PAU State or Location, Refresh the Addl Coverages Branch
                strNPOLPED = GetStringField(pstrNodeKey, 5, "|")
                strPGMTYP = GetStringField(pstrNodeKey, 4, "|")
                strNodeKey = strLOB & "|SPCLVL|" & strNEXPNUM & "|" & strNPOLPED & "|" & strPGMTYP & "|"
                Call objDoc.Build_Tree ( strNodeKey, "LOADBRANCH" )
                Call objDoc.Remove_TreeNodeIfNoChildren(strNodeKey)
            End If

        Case "INM"

            'strNodeKey = "INM|POL|" & strNEXPNUM & "|"
            'Call objDoc.Build_Tree ( strNodeKey, "LOADBRANCH" )

            ' 1.      If deleting an inm State node... Delete any other nodes of the same state.
            If StrComp( pstrAction, "DELETESTATE", vbTextCompare) = 0 Then
                'This is the node being deleted
                strStateCode = GetStringField(pstrNodeKey, 4, "|")
                Set objParentNode = objDoc.GetTreeNode("INM|POL|0|")
                If Not objParentNode Is Nothing Then

'=== IMG_4464 ===
                If Not objParentNode Is Nothing Then
                    If objParentNode.children > 0 Then
                        ' Loop through coverage nodes from the bottom up using the
                        ' tree object nodes collection.  This allows the nodes to be deleted as they
                        ' are found.
                        Set objTreeNode = objParentNode.child
                        intEnd = objTreeNode.index
                        Set objTreeNode = objTreeNode.lastSibling
                        intStart = objTreeNode.index
                        For intCount = intStart to intEnd Step -1
                            Set objTreeNode = objDoc.objTree.nodes.item(intCount)
                            If Not objTreeNode Is Nothing Then
                            If StrComp(GetStringField(objTreeNode.key, 4, "|"),strStateCode, vbTextCompare) = 0 Then
                                ' 4.      Remove any other coverages for that state.
                                objDoc.Remove_TreeNode objTreeNode.Key, ""
                            End If
                            End If
                        Next
                    End If
                    ' objParentNode.children > 0
                End If
                    ' Not objParentNode Is Nothing
            End If
                ' StrComp( pstrAction, "DELETESTATE", vbTextCompare) = 0

            ' 2.      If deleting an inm cov node... If this is the last cov for the state...
            '            Refresh the tree to add the state node back
        If StrComp( pstrAction, "DELETE", vbTextCompare) = 0 Then
            'This is the node being deleted
            strStateCode = GetStringField(pstrNodeKey, 4, "|")
            Set objParentNode = objDoc.GetTreeNode("INM|POL|0|")
            If Not objParentNode Is Nothing Then
                blnStateFound = False
                If objParentNode.children > 0 Then
                    ' Loop through coverage nodes looking for the same state
                    Set objTreeNode = objParentNode.child
                    Do While Not objTreeNode Is Nothing
                        If StrComp(GetStringField(objTreeNode.key, 4, "|"),strStateCode, vbTextCompare) = 0 Then
                            blnStateFound = True
                            Exit Do
                        End If
                        Set objTreeNode = objTreeNode.next
                    Loop

'=== IMG_4465 ===
                    Loop
                End If
                    ' objParentNode.children > 0
                If Not blnStateFound Then
                    strNodeKey = "INM|POL|" & strNEXPNUM & "|"
                    Call objDoc.Build_Tree ( strNodeKey, "LOADBRANCH" )
                End If
            End If
                ' Not objParentNode Is Nothing
        End If
            ' StrComp( pstrAction, "DELETE", vbTextCompare) = 0

        Case "WOR"
            If StrComp(strLevel, "STA", vbTextCompare) = 0 Then
                ' Deleting a WOR State, Refresh the Action Menu
                Call ClearActionMenus(pstrNodeKey)
                Call ExecuteAction("action", pstrNodekey, 90, "")
            End If

            If StrComp(strLevel, "LOC", vbTextCompare) = 0 Then
                strNSEGNUM = GetStringField(pstrNodeKey, 4, "|")
                strJUR = GetStringField(pstrNodeKey, 5, "|")
                strStateCode = GetStringField(pstrNodeKey, 6, "|")

                ' Deleting a WOR State node when no more Locations for that state, Refresh Branch
                strNodeKey = strLOB & "|STA|" & strNEXPNUM & "|" & strNSEGNUM & "|" & strJUR & "|" & strStateCode & "|"
                Call objDoc.Build_Tree ( strNodeKey, "LOADBRANCH" )
                Call objDoc.Remove_TreeNodeIfNoChildren(strNodeKey)
            End If

        Case Else

    End Select

    '------ If deleting a location within a lob and the location address will be deleted --------------------
    '        refresh the policy location node in the tree
    If InStr(UnEscapeTextValueForXML(objResponse.xml), "refreshpolicylocation' value='T'") > 0 Then
        Call objDoc.Build_Tree("POL|LOC|0|", "LOADTREE")
    End If

    '------ If Deleting a line of business --------------
    '     Clear the action menu and Diagnostic menu
    If StrComp(strLevel, "POL", vbTextCompare) = 0 Then

'=== IMG_4466 ===
                Case Else

            End Select

            '------ If deleting a location within a lob and the location address will be deleted --------------------
            '        refresh the policy location node in the tree
            If InStr(UnEscapeTextValueForXML(objResponse.xml), "refreshpolicylocation' value='T'") > 0 Then
                Call objDoc.Build_Tree("POL|LOC|0|", "LOADTREE")
            End If

            '------ If Deleting a line of business --------------
            '     Clear the action menu and Diagnostic menu
            If StrComp(strLevel, "POL", vbTextCompare) = 0 Then
                Call ClearActionMenus(pstrNodeKey)
                Call SessionXML_ClearItem("diagnostics")
                Set objFrame = document.all("DIAGNOSTICS")
                If Not objFrame Is Nothing Then
                    objFrame.src = "../../system/htm/loading.htm"
                    Set objFrame = Nothing
                End If
            End If
            '------------------------------------------------------------------------

            'Set rated flag to indicate new status.
            GlobalVars.mblnPolicyRated = False
        End If
            'UCase(GetNodeText(objNode, "status", "")) = "SUCCESS"

        End If
            'TrapXMLParseError(objResponse, "DeleteAction|3")
    End With

    Call TrapBrowserError("DeleteAction|5")

    Set objDoc = Nothing
    Set objNode = Nothing
    Set objResponse = Nothing
    Set objTreeNode = Nothing
    Set objParentNode = Nothing

End Sub
'------------------------------------------------------------------------

'=== IMG_4467 ===
Sub CheckForAsynchProcess(ByVal pstrNodeKey, ByVal pstrAction, ByRef pblnProgressBar)
'*****************************************************************************
'PURPOSE:
'  This subroutine calls the asp page that checks to see if an asynchronous process is running
'*****************************************************************************
On Error Resume Next

    Dim objResponse                    ' XML document to hold the xml of the response

    Dim objNode

                        ' node within ("/navigate") from response

    Dim strQueryString

    ' Assume no asynchronous process is already running
    pblnProgressBar = False

    ' Create querystring
    strQueryString = "?object=CHECKASYNCH" & _

                                        "&nodekey=" & Escape(SetExpiredNumber(pstrNodeKey)) & _
                                        "&action=" & pstrAction & _
                                        "&userid=" & mstrUserID & _
                                        "&policyid=" & mstrPolicyID & _
                                        "&diagnosticmode=" & mstrDiagnosticMode

    Call TrapBrowserError("CheckForAsynchProcess|1")

    Set objResponse = CreateObject("MSXML2.DOMDocument.6.0")
    Call TrapBrowserError("CheckForAsynchProcess|2")

    With objResponse
        .async = False
        .load "../../system/ASP/xmlCheckAsynch.asp" & strQueryString
        '.load "../../system/ASP/xmlDelete.asp" & strQueryString
        Call TrapBrowserError("CheckForAsynchProcess|3")

        ' If there are results...
        If Not TrapXMLParseError(objResponse, "CheckForAsynchProcess|3") Then
            ' Check for any return errors
            Call TrapXMLReturnErrors(objResponse, "CheckForAsynchProcess|4")

            Set objNode = .selectSingleNode("//results")

            ' check for asynchronous process that is already running

'=== IMG_4468 ===
            Set objNode = .selectSingleNode("//results")

            ' check for asynchronous process that is already running
            If Not objNode Is Nothing Then
                If StrComp(objNode.Text, "ASYNCHPROGRESSBAR", vbTextCompare) = 0 Then
                    pblnProgressBar = True
                    Exit Sub
                End If
            End If
        End If
    End With

    Call TrapBrowserError("CheckForAsynchProcess|5")

    Set objNode = Nothing
    Set objResponse = Nothing

End Sub
'------------------------------------------------------------------------------------------------

Sub ExecuteAction(ByVal pstrAction, ByVal pstrNodeKey, ByVal pintTab, ByVal pstrXMLDetail)
'*****************************************************************************
'PURPOSE:
'   This subroutine retrieves the url and frame location from "cycling" based
'   upon the input parameters.
'   If the frame is MAIN: The url is assigned and the page is shown.
'   If the frame is anything else: The current url of the frame is compared
'   to the new url.  If they are the same the src property is not reassinged.
'   This causes the page to not be downloaded again. Rather, the "RefreshPage"
'   method is called to update anything required. (added tree nodes, etc.)
'-------------------------------------------------------------------------------

'NOTE:  The pintTab parameter may be used for a variety of purposes.
'               -1        loads the page in the specified frame but does not show
'                          the frame.  Use for preloading action menus
'               90-99   loads the page even if the page is already loaded.
'                          Use to refresh an action menu.
'                          For pages that do not go into the MAIN frame, if they
'                          are already loaded, this sub attempts to call the
'                          RefreshPage sub on that page passing pintTab as a parameter.
'                          The RefreshPage sub takes a single parameter (pintTab).
'                          This may be used to perform any page specific actions
'                          when showing a page that is already loaded.  ie. setting

'=== IMG_4469 ===
'                          when showing a page that is already loaded.  ie. setting
'                          the tab (0,1,2...) or updating lists dependent upon the tree.
'                          The RefreshPage sub on the page being called must be
'                          contained in a script with id="RefreshPage"
'*****************************************************************************
On Error Resume Next

    Dim objResponse

    Dim objNode                            ' XML document to hold the xml of the response

    Dim strURL                             ' node within ("/navigate") from response

    Dim strURLNoQueryString                ' New url as specified by the cycling component

    Dim strFrame                           ' URL with no Query String attached to it.

    Dim strNewNodeKey                      ' Frame to place new url - frameid.src = url

    Dim objFrame                           ' NodeKey returned by XmlCycling.aspx (NodeKey we are navigating to).

    Dim strQueryString                     ' Reference used to determine if frame specified by strFrame exists
    Dim objDoc

    Dim objScript                          ' Reference to requested page to run script

    Dim lngReturn                          ' Reference used to determine if "RefreshPage" script exists on page being requested

                                            ' MsgBox return value

    Dim blnProgressBar                     ' Checks for long running asynchronous process

    Dim blnAudit                           ' Checks for auditable indicator - if there is one the force the page to reload

    mlngTimeStartBrowserRequest = GetTimeMilliseconds()
                                            ' Set the starting time for the browser request
    mlngTimeEndBrowserRequest = 0
                                            ' Reset the ending time for the browser request
    mlngTimeEndBrowserProcessing = 0
                                            ' Reset the ending time for the browser processing
    mlngTimeBOProcessing = 0
                                            ' Reset the ending time for the BO processing

'=== IMG_4470 ===
        mlngTimeBOProcessing = 0                    ' Reset the ending time for the browser processing

                                                      ' Reset the ending time for the BO processing

        blnProgressBar = False

        'The reason for UnEscaping the passed parameter is to make sure when it is
        'escaped later in a querystring value, that it doesn't become escaped twice.
        'Note that this is effectively equivalent to what happens when a querystring value
        'that had been escaped is read from the request.querystring object - it is
        '"unescaped" by the request object.  Also, the only consequence to "unescaping" a
        'non-escaped parameter is if the parameter had "%" characters within it that
        'would equate to a valid hex character (like "%34" would turn into "4").
        pstrXMLDetail = UnEscape(pstrXMLDetail)

        'This value is initialized to avoid values from being used incorrectly.
        mstrReturnValue = ""

        'Development/Debug - Show the querystring in a message box if the needed.
        If mblnNavigationMessages Then

            lngReturn = MsgBox("nodekey            " & vbTab & SetExpiredNumber(pstrNodeKey) & vbCrLf & _
                        "action              " & vbTab & pstrAction & vbCrLf & _
                        "userid              " & vbTab & mstrUserID & vbCrLf & _
                        "policyid            " & vbTab & mstrPolicyID & vbCrLf & _
                        "diagnosticmode      " & vbTab & mstrDiagnosticMode & vbCrLf & _
                        "tab                 " & vbTab & Cstr(pintTab) & vbCrLf & _
                        "returntype          " & vbTab & "XML" & vbCrLf & _
                        "debug               " & vbTab & Cstr(mblnDeveloperMessages) & vbCrLf & _
                        "mstrReturnValue     " & vbTab & mstrReturnValue & vbCrLf & _
                        "mstrXMLDetail (original)" & Replace(mstrXMLDetail,"<",vbCrLf & vbTab & "<",1) & vbCrLf & vbCrLf & _
                        "pstrXMLDetail (new)" & Replace(pstrXMLDetail,"<",vbCrLf & vbTab & "<",1),vbOKOnly+vbInformation,"Cycling Querystring (" & window.location.host & ")")

        End If

        'Reset the mstrXMLDetail global variable from the pstrXMLDetail that was passed
        'into this subroutine.  The assumption being made is that if there is a value
        'in the passed variable, then it should replace the global variable.  This means
        'that the component that builds the xml details string is responsible for
        'maintaining the string.  In other words, if the xml details string is not
        'correct here, then the error is in the component that manipulated it.
        If Trim(pstrXMLDetail) <> "" Then
            mstrXMLDetail = pstrXMLDetail

'=== IMG_4471 ===
        mstrXMLDetail = pstrXMLDetail
    End If

    'see if we are in a recovery mode from the asynch progress bar.  If so other steps belwo will
    'determine what needs to be done.   It is best to check here because when the progress bar is called agfain
    'and finishes, we still need to make decisions based on if teh intial call was a restart.
    Call CheckForAsynchProcess(SetExpiredNumber(pstrNodeKey), "CHECKASYNCH", blnProgressBar)

    ' Handle special cases here
    If InStr( 1, pstrAction, "DELETE", vbTextCompare) = 1 Then
    '   Case "DELETE", "DELETESTATE"
        ' Request confirmation of delete
        If Not blnProgressBar Then
            lngReturn = ShowUserMessage ( "Are you sure that you want to permanently delete the selected item and any associated items?", "WARNING", 2 )
            If lngReturn = 1 Then
                Call DeleteAction(SetExpiredNumber(pstrNodeKey), pstrAction)
                ' After deletion, call the action menu for the current line of business.
                ' For Deletion of entire line of business, nodekey will begin with POL.
                ' In this case, bring up the Line of Business action page
                If StrComp(GetStringField(pstrNodeKey,2,"|"), "POL", vbTextCompare) = 0 Then
                    pstrNodeKey = "POL|LOBLVL|0|"
                    pintTab = 99
                End If
                pstrAction = "action"
            Else
                If InStr(1,document.all("MAIN").src, "loading.htm", vbTextCompare) = 0 Then
                    document.all("MAIN").src = "../../system/htm/loading.htm"
                End If
                Exit Sub
            End If
        End If
    End If

    If StrComp(pstrAction, "ACTION", vbTextCompare) = 0 Then
    '   Case "ACTION"
        'For actions of "ACTION", if the page is already loaded, show and refresh it.
        'Unless a special case applies. -1 or 90-99, then skip this and handle below
        'as a normal page request.
        If Not (pintTab = -1 Or (pintTab >= 90 And pintTab <= 99)) Then

            'Get the frame for the specified action page
            If StrComp(Left(pstrNodeKey,10), "POL|LOBLVL", vbTextCompare) = 0 Then
                strFrame = "LOB"

'=== IMG_4472 ===
            strFrame = "LOB"
                'exception - LOB action page is associated with a node that has POL,
        Else
            strFrame = GetStringField(pstrNodeKey,1,"|")
            If StrComp(strFrame, "BOP", vbTextCompare) = 0 Then
                strFrame = GetActionMenuNameException(pstrNodeKey)
            End If
        End If

        ' GetFrameReference creates a new frame if strFrame does not exist.
        Set objFrame = GetFrameReference(strFrame)
        'Set objFrame = document.all(strFrame)

        If Not objFrame Is Nothing Then
            'force page to reload if transaction is an audit
            blnAudit = False
            If SessionXML_GetItem ("transactionid",strValue) Then
                If StrComp(strValue,"7",vbTextCompare) = 0 Then
                    blnAudit = True
                End If
            End If
            If Not (Right(objFrame.src,9) = "blank.htm" Or Right(objFrame.src,11) = "loading.htm" Or blnAudit) Then
                Call ShowFrame(strFrame)
                Call RefreshCurrentPage (pstrAction, pstrNodeKey, pintTab, pstrXMLDetail)
                If InStr(1,document.all("MAIN").src, "loading.htm", vbTextCompare) = 0 Then
                    document.all("MAIN").src = "../../system/htm/loading.htm"
                End If
                Exit Sub
            End If
        End If
    End If
End If
' Create querystring
strQueryString = "?nodekey=" & Escape(SetExpiredNumber(pstrNodeKey)) & _
                            "&action=" & Escape(pstrAction) & _
                            "&userid=" & Escape(mstrUserID) & _
                            "&policyid=" & Escape(mstrPolicyID) & _
                            "&diagnosticmode=" & Escape(mstrDiagnosticMode) & _
                            "&tab=" & Escape(pintTab) & _
                            "&xmldetail=" & Escape(mstrXMLDetail) & _
                            "&returntype=XML" & _
                            "&debug=" & Cstr(mblnDeveloperMessages)

'=== IMG_4473 ===
    Call TrapBrowserError("ExecuteAction|1")

    Set objResponse = CreateObject("MSXML2.DOMDocument.6.0")
    Call TrapBrowserError("ExecuteAction|2")

    With objResponse
        .async = False
        .load "XmlCycling.aspx" & strQueryString
    End With
    Call TrapBrowserError("ExecuteAction|3")

    ' If there are results...
    If Not TrapXMLParseError(objResponse, "ExecuteAction|3") Then
        ' Check for any return errors
        Call TrapXMLReturnErrors(objResponse, "ExecuteAction|4")

        Set objNode = objResponse.selectSingleNode("//result")

        strQueryString = GetNodeText(objNode, "querystring","")
        strQueryString = urlDecodeJS(strQueryString)

        mstrXMLDetail = GetNodeText(objNode, "xmldetail","")
        mstrXMLDetail = URLDecodeJS(mstrXMLDetail)

        mstrDiagnosticMode = URLDecodeJS(GetNodeText(objNode, "diagnosticmode", "0"))

        strURL = GetNodeText(objNode, "url","")
        strURL = URLDecodeJS(strURL)

        strNewNodeKey = GetQueryStrSubStrWithValue(strQueryString, "NodeKey")
        strNewNodeKey = Mid(strNewNodeKey, InStr(strNewNodeKey, "=") + 1, (Len(strNewNodeKey) - InStr(strNewNodeKey, "=")))
        strNewNodeKey = URLDecodeJS(strNewNodeKey)

        strFrame = Ucase(GetNodeText(objNode, "frame", ""))

        If mblnNavigationMessages Then
            MsgBox strFrame & vbCrLf & vbCrLf & strURL & vbCrLf & vbCrLf & Unescape(strQueryString) & vbCrLf & vbCrLf & Unescape(mstrXMLDetail)
        End If

        strURLNoQueryString = strURL
        strURL = strURL & strQueryString

'=== IMG_4474 ===
strURLNoQueryString = strURL
strURL = strURL & strQueryString

'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'NOTE: The main frame needs to be cleared.
'           This eliminates flashing of old content when another page
'           is called for the main frame.  The main frame should not be cleared
'           if the page being called is a modal since cancelling the modal
'           then leaves the loading.htm in the main frame
'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If UCase(strFrame) <> "MODAL" And UCase(strFrame) <> "NEWWINDOW" Then
    document.all("MAIN").src = "../../system/htm/loading.htm"
End If

Call TrapBrowserError("ExecuteAction|6")

' Initialize these to prevent loop
mstrNextAction_Action              = ""
mstrNextAction_NodeKey             = ""
mstrNextAction_Tab                 = ""
mstrNextAction_XMLDetail           = ""
mblnNextAction_DeferNavigation = False
' Determine if the new page should be shown as modal, in a frame or new window.
Select Case UCase(strFrame)
    Case "NOTCONVERTED"
        Call ShowUserMessage ( UserValue("usermessage_v2conversion","message"), "ERROR", "1" )

    Case "MODAL", "MODELESS"

        ' Open a modal dialog window

        ' Open the URL passed to the browser via the querystring
        ' "ModalURL" in a modal dialog window
        ' **CODE REQUIRED**
        Dim intHeight
        Dim intWidth

        ' Look for the size of the modal dialog
        ' Set the sizes
        intHeight = GetNodeText(objNode, "height", "500")
        intWidth = GetNodeText(objNode, "width", "600")

'=== IMG_4475 ===
        ' Finally, build the querystring values for the URL
        ' NOTE: Add the modal qs value if not there
        If InStr(1, strURL, "modal=1", 1) = 0 Then
            strURL = strURL & "&modal=1"
        End If

        ' Inidicate to browser commands that the modal was launched here
        ' and next navigation should be deferred until modal closes.
        mblnNextAction_DeferNavigation = True

        ' Put it all together and bring up the modal window
        If strFrame = "MODAL" Then
            window.showModalDialog (strURL), window, ("dialogHeight:" & intHeight & "px; dialogWidth:" & intWidth & "px; status:no; " & "Scroll:no")
        ElseIf strFrame = "MODELESS" Then
            window.showModelessDialog (strURL), window, ("dialogHeight:" & intHeight & "px; dialogWidth:" & intWidth & "px; status:no")
        End If
        Call TrapBrowserError("ExecuteAction|8")

        'Reset navigation flag
        mblnNextAction_DeferNavigation = False

        If Len(mstrNextAction_Action) > 0   And Len(mstrNextAction_NodeKey) > 0 Then
            Call ExecuteAction(mstrNextAction_Action, mstrNextAction_NodeKey   , mstrNextAction_Tab, mstrNextAction_XMLDetail)
        End If

        'If this is an asynchronous progress bar recovery, do not call batch edits again
        If Not blnProgressBar Then
            'this will launch a new window if the modal generated messages for display in mxmlBatchEdits
            Call ShowBatchEdits("MODAL")
        End if

    Case "NEWWINDOW"
        Dim strWindowOptions
        Dim strWindowName
        Dim blnSingleWindow

                                    'don't add the policy number to the window name if true

        blnSingleWindow = False

        strWindowName = GetNodeText(objNode, "name", "policy")

'=== IMG_4476 ===
strWindowName = GetNodeText(objNode, "name", "policy")

strWindowOptions = "" & _
    "channelmode="      & GetNodeText(objNode, "channelmode",      "no")         & _
    ",height="          & GetNodeText(objNode, "height",           "690")        & _
    ",width="           & GetNodeText(objNode, "width",            "1015")       & _
    ",directories="     & GetNodeText(objNode, "directories",      "no")         & _
    ",fullscreen="      & GetNodeText(objNode, "fullscreen",       "no")         & _
    ",left="            & GetNodeText(objNode, "left",             "0")          & _
    ",location="        & GetNodeText(objNode, "location",         "no")         & _
    ",menubar="         & GetNodeText(objNode, "menubar",          "no")         & _
    ",resizable="       & GetNodeText(objNode, "resizable",        "yes")        & _
    ",scrollbars="      & GetNodeText(objNode, "scrollbars",       "yes")        & _
    ",status="          & GetNodeText(objNode, "status",           "yes")        & _
    ",titlebar="        & GetNodeText(objNode, "titlebar",         "yes")        & _
    ",toolbar="         & GetNodeText(objNode, "toolbar",          "no")         & _
    ",top="             & GetNodeText(objNode, "top",              "0")          & _
strWindowOptions

If StrComp( GetNodeText(objNode, "UseExistingQueryString", ""), "no", vbTextCompare) = 0 Then
    ' Do not add extra info into Query string.
    ' Extract InsuredAccountNum and PolicyNum from Query String

    Dim strOriginalQueryString
    Dim strTempQueryString

    strOriginalQueryString = strQueryString
    strQueryString = "?"

    strTempQueryString = ""
    strTempQueryString = GetQueryStrSubStrWithValue(strOriginalQueryString, "InsuredAccountNum")
    If StrComp( strTempQueryString, "", vbTextCompare) <> 0 Then
        ' A Key Value is returned
        strQueryString = strQueryString & strTempQueryString
    End If

    strTempQueryString = ""
    strTempQueryString = GetQueryStrSubStrWithValue(strOriginalQueryString, "PolicyNum")
    If StrComp( strTempQueryString, "", vbTextCompare) <> 0 Then
        ' A Key Value is returned
        strQueryString = strQueryString & "&" & strTempQueryString
    End If

'=== IMG_4477 ===
        strTempQueryString = GetQueryStrSubStrWithValue(strOriginalQueryString, "PolicyPremium")
        If StrComp( strTempQueryString, "", vbTextCompare) <> 0 Then
            ' A Key Value is returned
            strQueryString = strQueryString & "&" & strTempQueryString
        End If

        strURL = strURLNoQueryString & strQueryString
    Else
        strURL = strURL & "&transaction=" & mstrTransactionType
    End If

    If mblnNavigationMessages Then
        MsgBox strURL & vbCrLf & strWindowOptions
    End If

    'Exception for security window.  Do not add the policy number
    If CLng(mstrPolicyID) > 0 Then
        If StrComp(strWindowName, "security", vbTextCompare) = 0 Or _
        StrComp(strWindowName, "summarymessages", vbTextCompare) = 0 OR _
            StrComp(strWindowName, "library", vbTextCompare) = 0 Or _
                StrComp(strWindowName, "batchprint", vbtextcompare) = 0 Then
                    blnSingleWindow = True
        End If
        If Not blnSingleWindow Then strWindowName = strWindowName & mstrPolicyID
    End If
    Call OpenNewWindow(strURL, strWindowName, strWindowOptions)

Case "HIDDEN"
    Set objFrame = GetFrameReference(strFrame)
    objFrame.src = strURL
Case Else

    ' BOP Exception - Add the Program type to the frame name to allow
    ' multiple program types to exist
    If StrComp(strFrame, "BOP", vbTextCompare) = 0 Then
        strFrame = GetActionMenuNameException(pstrNodeKey)
    End If

    ' Set the src of the specified from the URL
    Set objFrame = GetFrameReference(strFrame)
                'document.all(strFrame)
                ' Select the required frame

'=== IMG_4478 ===
    If objFrame Is Nothing  Then
        ' Make sure the specifed frame exists
        strFrame = "MAIN"
            ' If not, select MAIN
        Set objFrame = document.all(strFrame)
    End If
    ' Compare the page that is currently in the frame with the new page (ignore querystring)
    ' If it does not match, set the new page to the src property.
    ' Unless pintTab is 90-99. This means reload the page regardless of current value.
    If RemoveQueryString(objFrame.src) <> RemoveQueryString(strURL) Or (pintTab >= 90 And pintTab <= 99) Or CLng(pintTab) = -1 Then
        objFrame.src = strURL
            ' If the url has changed, update it

        ' Setting the Tab Number to -1 allows loading the page without displaying it
        If CLng(pintTab) <> -1 Then
            Call ShowFrame(strFrame)
        End If
    Else
        ' Page is already loaded
        ' Call the refresh method If it exists
        Call ShowFrame(strFrame)
        Call RefreshSelectedPage(strFrame, pstrAction, pstrNodeKey, pintTab, pstrXMLDetail)
    End If

    Set objFrame = Nothing
End Select

Set objNode = Nothing
End If

'Update buttons in the toolbar menu
Call UpdateToolBar
Call TrapBrowserError("ExecuteAction|9")

' Restore the policy id to the original value.
' It may have been changed for navigation with a browser command.
' Names for new policy windows are created using the updated
' policy id.
mstrPolicyID = document.body.getAttribute ( "policyid" ) & ""

If Len(mstrBatchEditWindowDisplayed) Then
    Call window.setTimeout("FocusBatchEditWindow(""" & mstrBatchEditWindowDisplayed & """)", 500)

'=== IMG_4479 ===
        mstrPolicyID = document.body.getAttribute ( "policyid" ) & ""

        If Len(mstrBatchEditWindowDisplayed) Then
            Call window.setTimeout("FocusBatchEditWindow(""" & mstrBatchEditWindowDisplayed & """)", 500)
            mstrBatchEditWindowDisplayed = ""
        End If

        Call TrapBrowserError("ExecuteAction|end")
        Set objResponse = Nothing

    End Sub
    '--------------------------------------------------------------------------

    Function GetQueryStrSubStrWithValue( pstrQueryString, pstrSubStrKeyName )
        On Error Resume Next

        Dim strSubStrWithValue
        Dim lngStartIndex
        Dim lngAmpersandIndex
        Dim strTempString

        ' Initialize variables to empty string
        GetQueryStrSubStrWithValue = vbNullString
        strSubStrWithValue = vbNullString
        strTempString = pstrQueryString

        pstrSubStrKeyName = pstrSubStrKeyName & vbNullString

        ' Determine position of Key Name
        lngStartIndex = InStr(pstrQueryString, pstrSubStrKeyName)

        If lngStartIndex = 0 Then
            ' Key is not present, Send back Empty
            SubStrWithValue = ""
        Else
            ' Get Index of following Ampersand
            lngAmpersandIndex = InStr(lngStartIndex, pstrQueryString, "&", vbTextCompare)

            If lngAmpersandIndex = 0 Then
                ' End of string is reached.
                strSubStrWithValue = Mid(pstrQueryString, lngStartIndex)
            Else
                ' Get string from part of QueryString

'=== IMG_4480 ===
            ' Get string from part of QueryString
            strSubStrWithValue = Mid(pstrQueryString, lngStartIndex, (lngAmpersandIndex - lngStartIndex))
        End If
    End If

    GetQueryStrSubStrWithValue = strSubStrWithValue
    Call TrapBrowserError("GetQueryStrSubStrWithValue|1")
End Function

'-----------------------------------------------------------------------------


Sub FocusBatchEditWindow(ByVal batchEditType)
    On Error Resume Next

    Dim objWindow

    If Not mdicChildWindows Is Nothing Then
        If mdicChildWindows.Exists("batcheditdisplay" & batchEditType & Cstr(mstrPolicyID)) Then
            Set objWindow = mdicChildWindows.Item("batcheditdisplay" & batchEditType & Cstr(mstrPolicyID))
            If Not objWindow Is Nothing Then
                If Not objWindow.closed Then
                    objWindow.focus
                End If
            End If
        End If
    End If

    Set objWindow = Nothing
    Call TrapBrowserError("FocusBatchEditWindow")
End Sub


Function GetActionMenuNameException( pstrNodeKey )
'*****************************************************************
    'Get the frame name for the specified action page.  The first element of the
    'nodekey specifies the name of the frame for the action menu page ( with the
    'following exceptions.)
    'exception - BOP lines are further specified by the 4th or 5th element in addition
                'to the first.  The 4th element will be used unless the 2nd element is
                'SPC, in which case, the 5th element will be used.  (BOPISO)
                ' BOP|POL|0|ISO|0|
                ' BOP|LOC|0|ISO|0|48|1|
                ' BOP|SPC|0|0|ISO|... (special coverages uses 5th element for program type)

'=== IMG_4481 ===
                ' BOP|SPCLVL|0|0|ISO|...
'*****************************************************************
    Dim strFrame
    On Error Resume Next
    strFrame = GetStringField(pstrNodeKey,1,"|")

    If StrComp(strFrame, "BOP", vbTextCompare) = 0 Then
        If StrComp(Left(GetStringField(pstrNodeKey,2,"|"),3),"SPC",vbTextCompare) = 0 Then
            strFrame = strFrame & GetStringField(pstrNodeKey,5,"|")
        Else
            strFrame = strFrame & GetStringField(pstrNodeKey,4,"|")
        End If
    End If

    GetActionMenuNameException = strFrame
    Call TrapBrowserError("GetActionMenuNameException|1")
End Function
'-----------------------------------------------------------------------------


Function GetFrameReference(pstrFrame)
'*****************************************************************
' The function looks for the frame with id of pstrFrame.
' If it is found, a reference to it is returned.
' If not found, a new frame is created in the frameset "fraMain"
' This allows any number of business lines or program types with
' any names to be used without the need to have predefined frames.
'*****************************************************************
    Dim objNewFrame
    Dim objFrame
    On Error Resume Next

    Set objFrame = document.all(pstrFrame)
    If Not objFrame Is Nothing Then
        Set GetFrameReference = objFrame
    Else
        Set objFrame = document.all("action")
        Set objNewFrame = objFrame.cloneNode(True)
        objNewFrame.id = pstrFrame
        fraMain.insertBefore(objNewFrame)
        Set GetFrameReference = document.all(pstrFrame)
    End If

'=== IMG_4482 ===
    Set objFrame = Nothing
    Set objNewFrame = Nothing
    Call TrapBrowserError("GetFrameReference|1")

End Function
'--------------------------------------------------------------------------------------

Sub UpdateToolBar
'************************************************************************
    'As conditions change,
    'Call the script on the menu page to update any button states
'************************************************************************
    Dim objDoc
    Dim objScript
    On Error Resume Next
    'Update buttons in the toolbar menu
    If Not mblnSearchPage Then
        'does not apply to search page.
        Set objDoc = document.frames("menu")
        If Not objDoc Is Nothing Then
            Set objScript = objDoc.document.scripts("Menu_ISLLSYS_20010101")
            If Not (objScript is Nothing) Then
                Set objScript = Nothing
                Call objDoc.UpdateToolBarButtons
                Set objDoc = Nothing
            End If
        End If
    End If
    Call TrapBrowserError("UpdateToolBar|1")

End Sub
'--------------------------------------------------------------------------------------

Function RefreshSelectedPage(ByVal pstrFrame, ByVal pstrAction, ByVal pstrNodeKey, ByVal pintTab, ByVal pstrXMLDetail)
'****************************************************************************
    ' Action menus that are contained within frames that are hidden
    ' from view until needed may need to be refreshed with the current
    ' tree data or policy conditions.  This function attempts to find a
    ' script named "RefreshPage" on the page in the specifed frame.
    ' If it is found, the Sub RefreshPage is executed.
'****************************************************************************

'=== IMG_4483 ===
        Dim objScript
        Dim objDoc

        On Error Resume Next

        RefreshSelectedPage = False

        'Use the current frame if none is supplied
        If Len(pstrFrame) = 0 Then pstrFrame = mstrCurrentFrame

        ' Call the refresh method If it exists
        Set objDoc = document.all(pstrFrame)
        If Not objDoc Is Nothing Then
            Set objDoc = objDoc.contentWindow
            If Not objDoc Is Nothing Then
                Set objScript = objDoc.document.scripts("RefreshPage")
                If Not (objScript is Nothing) Then
                    Set objScript = Nothing
                    objDoc.RefreshPage pstrAction, pstrNodeKey, pintTab, pstrXMLDetail
                    RefreshSelectedPage = True
                    Set objDoc = Nothing
                    Call TrapBrowserError("RefreshSelectedPage|1")
                End If
            End If
        End If
        Call TrapBrowserError("RefreshSelectedPage|2")
    End Function
    '--------------------------------------------------------------------------------------

    Sub RefreshCurrentPage (ByVal pstrAction, ByVal pstrNodeKey, ByVal pintTab, ByVal pstrXMLDetail)
    '****************************************************************************
        'This sub is called by other pages (rating modeless window) to update
        'any items on the change of some status.
    '****************************************************************************
        On Error Resume Next
        Call RefreshSelectedPage(mstrCurrentFrame, pstrAction, pstrNodeKey, pintTab, pstrXMLDetail)
        Call TrapBrowserError("RefreshCurrentPage|1")
    End Sub
    '--------------------------------------------------------------------------------------

    Function RemoveQueryString(ByVal pstrURL)
    '****************************************************************************

'=== IMG_4484 ===
    '--------------------------------------------------------------------------------------

    Function RemoveQueryString(ByVal pstrURL)
    '************************************************************************************
    'PURPOSE:
    '  This function removes the querystring from a url
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    'NOTE:  This is used to allow comparisons between the src (url) of a frame
    '              and a new url to see if they are the same.  Querystrings may vary
    '              depending upon how the page was called.
    '************************************************************************************
    On Error Resume Next

        Dim strTemp                    ' Working copy of url

        Dim lngEndOfURL                ' Position of the question mark

        ' Initialize variables to empty string
        RemoveQueryString = vbNullString
        strTemp = pstrURL & vbNullString

        ' Determine position of "?"
        lngEndOfURL = InStr(strTemp, "?")

        If lngEndOfURL = 0 Then
            lngEndOfURL = Len(strTemp)
                ' No querystring, use entire url
        Else
            lngEndOfURL = lngEndOfURL - 1
                ' Move pointer back 1 to exclude "?"
        End If

        strTemp = Left(strTemp, lngEndOfURL)
            ' Strip off querystring

        RemoveQueryString = strTemp
            ' Return value
        Call TrapBrowserError("RemoveQueryString|1")

    End Function

    '--------------------------------------------------------------------------------------

'=== IMG_4485 ===
Function SessionXML_SetItem(ByVal pstrName, ByVal pstrValue)
'****************************************************************************
'PURPOSE:
'
'   **NEEDS PURPOSE**
'   **NEEDS ERROR HANDLING**
'   **mstrXMLDetail SHOULD BE RENAMED TO mstrSessionXML EVERYWHERE IN FILE**

'****************************************************************************

  On Error Resume Next

  Dim strXSL
  Dim nodItem
  Dim nodAttribute
  Dim xmlSessionXML

    Const strProcedureName = "SessionXML_SetItem"

  ' Assume failure
  SessionXML_SetItem = False

  ' Load the xml string into the xml object.
  Set xmlSessionXML = CreateObject("MSXML2.DOMDocument.6.0")
  xmlSessionXML.async = False
  mstrXMLDetail = Decompress(mstrXMLDetail)
  If xmlSessionXML.loadXML(mstrXMLDetail) = False Then
    Exit Function
  End If

    ' Prevent incorrect characters from corrupting the xml
    Dim strValue
    strValue =  Replace(pstrValue,"'","#39;")

  ' Add the item if it is not already there, otherwise just change the value.
  strXSL = "//item[@name='" & pstrName & "']"
  Set nodItem = xmlSessionXML.selectSingleNode(strXSL)
  If nodItem Is Nothing Then
    Set nodItem = xmlSessionXML.createElement("item")

    Set nodAttribute = xmlSessionXML.createAttribute("name")

'=== IMG_4486 ===
    Set nodAttribute = xmlSessionXML.createAttribute("name")
    nodAttribute.Value = pstrName
    Call nodItem.Attributes.setNamedItem(nodAttribute)

    Set nodAttribute = xmlSessionXML.createAttribute("value")
    nodAttribute.Value = strValue
    Call nodItem.Attributes.setNamedItem(nodAttribute)

    xmlSessionXML.documentElement.appendChild nodItem

    Set nodAttribute = Nothing
  Else
    nodItem.Attributes.getNamedItem("value").nodeValue = strValue
  End If
  Set nodItem = Nothing

  ' Reset the xml string.
  mstrXMLDetail = xmlSessionXML.xml

  ' Clean up the xml string:
  '   Replace double quotes with single quotes.
  '   Remove carriage returns and line feeds.
  mstrXMLDetail = Replace(mstrXMLDetail, Chr(34), "'")
  mstrXMLDetail = Replace(mstrXMLDetail, Chr(10), "")
  mstrXMLDetail = Replace(mstrXMLDetail, Chr(13), "")

  ' Success
  SessionXML_SetItem = True

  Call TrapBrowserError("SessionXML_SetItem|1")
  Set xmlSessionXML = Nothing
End Function

'--------------------------------------------------------------------------------------

Function SessionXML_GetItem(ByVal pstrName, ByRef pstrValue)
'****************************************************************************
'PURPOSE:
'
'   **NEEDS PURPOSE**
'   **NEEDS ERROR HANDLING**
'   **mstrXMLDetail SHOULD BE RENAMED TO mstrSessionXML EVERYWHERE IN FILE**
'

'=== IMG_4487 ===
'****************************************************************************
    On Error Resume Next

  Dim strXSL
  Dim nodItem
  Dim xmlSessionXML

    Const strProcedureName = "SessionXML_GetItem"

  ' Assume failure
  SessionXML_GetItem = False

  ' Initialize the return value.
  pstrValue = ""

  ' Load the xml string into the xml object.
  Set xmlSessionXML = CreateObject("MSXML2.DOMDocument.6.0")
  xmlSessionXML.async = false
  mstrXMLDetail = Decompress(mstrXMLDetail)
  If xmlSessionXML.loadXML(mstrXMLDetail) = False Then
    Exit Function
  End If

  ' Get the value of the item element that matches the passed name.
  strXSL = "//item[@name='" & pstrName & "']"
  Set nodItem = xmlSessionXML.selectSingleNode(strXSL)
  If nodItem Is Nothing Then
    Exit Function
  Else
    pstrValue = nodItem.Attributes.getNamedItem("value").nodeValue
    Set nodItem = Nothing
  End If

    ' Remove encoded characters
    pstrValue =  Replace(pstrValue,"#39;","'")

  ' Success
  SessionXML_GetItem = True

  Call TrapBrowserError("SessionXML_GetItem|1")
  Set xmlSessionXML = Nothing
End Function

'=== IMG_4488 ===
    End Function

    '--------------------------------------------------------------------------------------

    Function SessionXML_ClearItem(ByVal pstrName)
    '****************************************************************************
    'PURPOSE:
    '
    '   **NEEDS PURPOSE**
    '   **NEEDS ERROR HANDLING**
    '   **mstrXMLDetail SHOULD BE RENAMED TO mstrSessionXML EVERYWHERE IN FILE**
    '
    '****************************************************************************
      On Error Resume Next

    Dim strXSL
    Dim nodItem
    Dim xmlSessionXML

      Const strProcedureName = "SessionXML_ClearItem"

    ' Assume failure
    SessionXML_ClearItem = False

    ' Load the xml string into the xml object.
    Set xmlSessionXML = CreateObject("MSXML2.DOMDocument.6.0")
    xmlSessionXML.async = false
    If xmlSessionXML.loadXML(mstrXMLDetail) = False Then
      Exit Function
    End If

    ' Remove the item element that matches the passed name.
    strXSL = "//item[@name='" & pstrName & "']"
    Set nodItem = xmlSessionXML.selectSingleNode(strXSL)
    If nodItem Is Nothing Then
      Exit Function
    Else
      xmlSessionXML.documentElement.removeChild nodItem
      Set nodItem = Nothing
    End If

    ' Reset the xml string.
    mstrXMLDetail = xmlSessionXML.xml

'=== IMG_4489 ===
    Set nodItem = xmlSessionXML.selectSingleNode(strXSL)
    If nodItem Is Nothing Then
      Exit Function
    Else
      xmlSessionXML.documentElement.removeChild nodItem
      Set nodItem = Nothing
    End If

    ' Reset the xml string.
    mstrXMLDetail = xmlSessionXML.xml

    ' Clean up the xml string:
    '   Replace double quotes with single quotes.
    '   Remove carriage returns and line feeds.
    mstrXMLDetail = Replace(mstrXMLDetail, Chr(34), "'")
    mstrXMLDetail = Replace(mstrXMLDetail, Chr(10), "")
    mstrXMLDetail = Replace(mstrXMLDetail, Chr(13), "")

    ' Success
    SessionXML_ClearItem = True

    Call TrapBrowserError("SessionXML_ClearItem|1")
    Set xmlSessionXML = Nothing
  End Function
  '--------------------------------------------------------------------------------------

  Function UserOption(ByVal pstrName, ByVal pstrDesiredValue, ByRef pstrActualValue)
  '****************************************************************************
  'PURPOSE:
  ' Returns True or False indicatating if the user option is available.
  '   This is primarily used to disable features.  Therefore if the option
  '   is not present, it is assumed to be allowed.
  '   If the option is present in the xml, the value is compared to the
  ' parameter pstrDesiredValue to allow a comparison to a specific value.
  ' The actual value is returned byRef to allow additional checks. It will
  '   be an empty string if the option is not found.
  '****************************************************************************
    On Error Resume Next

  Dim strXSL
  Dim nodItem
  Dim xmlUserOptionsXML

'=== IMG_4490 ===
    Dim strXSL
    Dim nodItem
    Dim xmlUserOptionsXML

    ' Assume allowed
    UserOption = True
    pstrActualValue = ""

    ' Load the xml string into the xml object.
    Set xmlUserOptionsXML = CreateObject("MSXML2.DOMDocument.6.0")
    xmlUserOptionsXML.async = false
    If xmlUserOptionsXML.load(xdiUserOptions.xmlDocument) = False Then
      Call TrapBrowserError("UserOption|1")
      Exit Function
    End If

    ' Get the value of the item element that matches the passed name.
    strXSL = "//options/option[@name='" & pstrName & "']"
    Set nodItem = xmlUserOptionsXML.selectSingleNode(strXSL)
    If nodItem Is Nothing Then
      Call TrapBrowserError("UserOption|2")
      Exit Function
    Else
          'Set the ByRef parameter to the actual value
          pstrActualValue = nodItem.Attributes.getNamedItem("value").nodeValue
          'Indicate if the value matches the requested value
      If StrComp(pstrDesiredValue, pstrActualValue, vbTextCompare) <> 0 Then
              UserOption = False
              Set nodItem = Nothing
      End If
    End If
    Call TrapBrowserError("UserOption|3")
    Set xmlUserOptionsXML = Nothing
  End Function
  '--------------------------------------------------------------------------------------

  Function UserValue(ByVal pstrValueName, ByVal pstrGroup)
  '****************************************************************************
  'PURPOSE: Retrieves the user value (some text) from the user
  '  options xml where name = pstrValueName, in group = pstrGroup
  '****************************************************************************
    On Error Resume Next

'=== IMG_4491 ===
    ' options xml where name = pstrValueName, in group = pstrGroup
    '****************************************************************************
      On Error Resume Next

    Dim objNode
    Dim xmlUserValues
    Dim strSearch

      UserValue = ""
    ' Load the xml string into the xml object.
    Set xmlUserValues = CreateObject("MSXML2.DOMDocument.6.0")
    xmlUserValues.async = false
    If xmlUserValues.load(xdiUserOptions.xmlDocument) Then

        ' Get the value of the item element that matches the passed name.
        strSearch = "//uservalues/group[@name = """ & pstrGroup & """]/uservalue[@name = """ & pstrValueName & """]"

        Set objNode = xmlUserValues.selectSingleNode( strSearch )
        If Not objNode Is Nothing Then
            UserValue = GetNamedAttribute(objNode,"value",False,"")
        End If
        Set objNode = Nothing
        Set xmlUserValues = Nothing
    End If
    Call TrapBrowserError("UserValue|1")
  End Function
  '--------------------------------------------------------------------------------------

  Function mblnInquiryMode
  '****************************************************************************
  '   Returns  True if Inquiry = "T", otherwise returns False.
  '****************************************************************************
    Dim strInquiry
    On Error Resume Next
    strInquiry = "F"
    mblnInquiryMode = False

    If SessionXML_GetItem ("inquiry",strInquiry) Then
        If StrComp(strInquiry,"T",vbTextCompare) = 0 Then   mblnInquiryMode = True
    End If

    Call TrapBrowserError("mblnInquiryMode|1")
  End Function

'=== IMG_4492 ===
    End Function
    '--------------------------------------------------------------------------------------

    Function mblnExposureActive()
    '****************************************************************************
    ' Returns  True if Edit or View of Exposures is allowed.
    '****************************************************************************
        Dim strValue
        On Error Resume Next
        strValue = ""
        mblnExposureActive = False

            '1-- Quote
            '2-- Renewal
            '3-- Amendements
            '6-- Rewrites
            '7-- Audits
            '8-- Amendement Quote
            '9-- Renewal Quote
            '12-- Non-renewal
            '13-- Rescind Non-renewal

        If SessionXML_GetItem ("transactionid",strValue) Then
            Select Case strValue
                Case "1", "2", "3", "6", "7", "8", "9", "12" ,"13"
                    mblnExposureActive = True
                Case Else
                    mblnExposureActive = False
            End Select
        End If

        Call TrapBrowserError("mblnExposureActive|1")
    End Function
    '--------------------------------------------------------------------------------------

    Function mblnReadOnly
    '****************************************************************************
    '   Returns  True if Read only condition exists, otherwise returns False.
    ' The current conditions for Read only mode include:
    ' transactionid = 4 or 5, or inquiry = T
    '****************************************************************************
        Dim strValue
        On Error Resume Next

'=== IMG_4493 ===
'  transactionid = 4 or 5, or inquiry = T
'****************************************************************************
    Dim strValue
    On Error Resume Next
    strValue = ""
    mblnReadOnly = False

    If SessionXML_GetItem ("transactionid",strValue) Then
        If StrComp(strValue,"4",vbTextCompare) = 0 Or StrComp(strValue,"5",vbTextCompare) = 0 or _
            StrComp(strValue,"12",vbTextCompare) = 0 Or StrComp(strValue,"13",vbTextCompare) = 0 or _
            StrComp(strValue,"11",vbTextCompare) = 0 Then
            mblnReadOnly = True
        End If
    End If

    'added code because of similar check in pZStdFcn
    If SessionXML_GetItem ("transactionid",strValue) Then
        If StrComp(strValue,"7",vbTextCompare) = 0 Then
            If SessionXML_GetItem ("comploc",strValue) Then
                mblnReadOnly = True
                If SessionXML_GetItem ("bopauditable",strValue) Then
                    If strcomp(strvalue, "T", vbTextCompare) = 0 Then
                        mblnReadOnly = False
                    End If
                ElseIf SessionXML_GetItem ("liaauditable",strValue) Then
                    If strcomp(strvalue, "T", vbTextCompare) = 0 Then
                        mblnReadOnly = False
                    End If
                ElseIf SessionXML_GetItem ("worauditable",strValue) Then
                    If strcomp(strvalue, "T", vbTextCompare) = 0 Then
                        mblnReadOnly = False
                    End If
                End If
            End If
        End If
    End If

    Call TrapBrowserError("mblnReadOnly|1")
End Function
'--------------------------------------------------------------------------------------

Function SelectedNodeKey()
'****************************************************************************

'=== IMG_4494 ===
Function SelectedNodeKey()
'*******************************************************************************
' Returns the key of the selected tree node
'*******************************************************************************
    Dim objDoc
    On Error Resume Next

    SelectedNodeKey = ""

    Set objDoc = document.frames("tree")

    If Not objDoc Is Nothing Then
        SelectedNodeKey = document.frames("tree").SelectedNodeKey
        Set objDoc = Nothing
    End If

    Call TrapBrowserError("SelectedNodeKey|1")

End Function
'--------------------------------------------------------------------------------

Function PathDescription(ByVal pstrNodeKey, ByVal pintStartLevel, ByVal pintEndLevel)
'*******************************************************************************
    'This function returns the text of the tree nodes starting at the node with the
    'key of strNodeKey and moving up the branch till the level of intEndLevel (default=1).
    'If intStartLevel is a value other than 0, then the text for nodes greater
    'than intStartLevel will not be included.

    'Example: BUSINESSOWNERS  WI - Loc#1  Bld #1 - SHOE STORE

    ' This example could have been obtained from:
    ' 1. the building node with default intStartLevel
    '   2. the coverage node with intStartLevel = 3
'*******************************************************************************

    Dim objDoc

    On Error Resume Next

    Set objDoc = document.frames("tree")

'=== IMG_4495 ===
        On Error Resume Next
        Set objDoc = document.frames("tree")
        If Not objDoc Is Nothing Then
            'Make sure the page is there

            Set objTree = objDoc.window.document.all("objTree")

            If Not objTree Is Nothing Then
                'Make sure the tree is loaded
                objDoc.Tree_SetState(pblnState)
                    'Set the tree to the new state.
                Set objTree = Nothing
            End If

            'Update buttons in the toolbar menu
            Call UpdateToolBar

            Call TrapBrowserError("Tree_SetState|1")

            Set objDoc = Nothing

        End If
    End Sub
    '--------------------------------------------------------------------------------

    Sub OpenNewWindow(ByVal pstrURL, ByVal pstrWindowName, ByVal pstrWindowOptions)
    '*******************************************************************************
    ' Opens new windows by Sub ExecuteAction if the frame name
    ' returned by cycling is "newwindow".
    ' If the window requested is already open, set focus to it.
    '*******************************************************************************
        Dim objWindow
        Dim blnOpenNew
        Dim blnOpened
        Dim strBlankModelessPageName


        On Error Resume Next

        blnOpenNew = False
        blnOpened = False
        Set objWindow = Nothing

'=== IMG_4496 ===
    blnOpenNew = False
    blnOpened = False
    Set objWindow = Nothing

    If mblnPolicyOpen(pstrWindowName) Then blnOpened = True
        Call TrapBrowserError("OpenNewWindow|1")

    If InStr(1, pstrWindowName,"policy", vbTextCompare) > 0 And blnOpened Then
        'This is a policy window that is already open. set focus to window
            Set objWindow = mdicChildWindows.Item(CStr(pstrWindowName))
            Call TrapBrowserError("OpenNewWindow|2")

            objWindow.focus
            Call TrapBrowserError("OpenNewWindow|3")
    Else

        Set objWindow = window.open (pstrURL, pstrWindowName, pstrWindowOptions)
        strBlankModelessPageName = "BlankModelessPage"
        If Not blnOpened Then
            ' Add window reference to dictionary.
            If Not objWindow Is Nothing Then
                ' Add reference to new window if
                ' This window is the search window and the new window is a policy window
                '       window.name = "V3Galileo" and pstrWindowName = "policy..."
                '       ( this prevents admin windows from being added to search window references)
                ' Or This window is any window where window.name <> "V3Galileo" or V3Admin.
                '       ( this adds all child windows to a policy and admin windows - to be closed when closing the parent window.)
                If (StrComp(window.name, "V3Galileo", vbTextCompare) = 0 And StrComp(Left(pstrWindowName,6),"policy", vbTextCompare) = 0) _
                    Or (StrComp(window.name, "V3Galileo", vbTextCompare) <> 0 And  StrComp(window.name, "V3Admin", vbTextCompare) <> 0 ) Then
                    ' Check to see if this page needs to be shown as an independent Modeless page.
                    ' If yes, then do not store its reference in parent widnow. This would prevent
                    ' this new window to not be closed when parent window is closed.
                    If (StrComp(Left(pstrWindowName, Len(strBlankModelessPageName)), strBlankModelessPageName, vbTextCompare) <> 0) Then
                        mdicChildWindows.Add CStr(pstrWindowName), objWindow
                        Call TrapBrowserError("OpenNewWindow|5")
                    End If
                Else

                    'Load NonPolicyWindows dictionary for logout feature
                    Call LoadNonPolicyWindowReferences(CStr(pstrWindowName), objWindow)
                    Call TrapBrowserError("OpenNewWindow|6")

                End If
            End If
        End If

'=== IMG_4497 ===
        End If

        If (StrComp(Left(pstrWindowName, Len(strBlankModelessPageName)), strBlankModelessPageName, vbTextCompare) = 0) Then
            If Not objWindow Is Nothing Then
                If Not objWindow.closed Then
                    mblnDoNotSetFocusToParent = true
                End If
            End If
        End If
    End If
    Call TrapBrowserError("OpenNewWindow|7")
    Set objWindow = Nothing
End Sub
'--------------------------------------------------------------------------------


Sub BlankModelessWindowSetFocus(ByVal pstrWindowName)
    On Error Resume Next
    Dim objWindow

    If Not mdicBlankModelessWindows Is Nothing Then
        If mdicBlankModelessWindows.Exists(CStr(pstrWindowName)) Then
            'Set objWindow = mdicChildWindows.Item(CStr(pstrWindowName))
            If Not mdicChildWindows.Item(CStr(pstrWindowName)) Is Nothing Then
                If Not mdicChildWindows.Item(CStr(pstrWindowName)).closed Then
                    mdicChildWindows.Item(CStr(pstrWindowName)).focus
                End If

                ' Remove reference for Dictionary
                mdicBlankModelessWindows.Remove(CStr(pstrWindowName))
            End If
        End If
    End If

    Set objWindow = Nothing
    Call TrapBrowserError("BlankModelessWindowSetFocus|1")
End Sub
'--------------------------------------------------------------------------------

Function mblnPolicyOpen(ByVal pstrKey)
'*******************************************************************************
' Support function used to determine if a policy window is open.
' If the policy id is found as a key in mdicChildWindows, and
' the window is still open, this function returns true.

'=== IMG_4498 ===
    ' the window is still open, this function returns true.
'*******************************************************************************
    Dim objWindow

    On Error Resume Next
    'Default - Assume policy is not open
    mblnPolicyOpen = False

    'Create the dictionary it not already done.
    If mdicChildWindows Is Nothing Then
        Set mdicChildWindows = CreateObject("Scripting.Dictionary")
        Call TrapBrowserError("mblnPolicyOpen|1")
    End If
    If mdicChildWindows.count > 0 Then
        If mdicChildWindows.Exists(CStr(pstrKey)) Then
            Call TrapBrowserError("mblnPolicyOpen|2")
            'The policy has been opened already...
            Set objWindow = mdicChildWindows.Item(CStr(pstrKey))
            Call TrapBrowserError("mblnPolicyOpen|3")
            'Check if it is still open.
            If objWindow.closed Then
                Call TrapBrowserError("mblnPolicyOpen|4")
                'Remove the erroneous entry.
                mdicChildWindows.Remove(CStr(pstrKey))
                Call TrapBrowserError("mblnPolicyOpen|5")
            Else
                'policy is open!
                mblnPolicyOpen = True
            End If
        End If
    End If
    Call TrapBrowserError("mblnPolicyOpen|6")
    Set objWindow = Nothing
End Function
'--------------------------------------------------------------------------------

Function IsExternalWindowOpen(ByVal pstrKey)
'*******************************************************************************
' Support function used to determine if an external window is open.
'*******************************************************************************
    Dim objWindow

    On Error Resume Next

'=== IMG_4499 ===
    On Error Resume Next
    'Default - Assume window is not open
    IsExternalWindowOpen = False

    If StrComp(Left(window.name,6), "policy", vbTextCompare) = 0 Then
        'Create the dictionary it not already done.
        If mobjParentWindow.mdicExternalWindows Is Nothing Then
            Set mobjParentWindow.mdicExternalWindows = CreateObject("Scripting.Dictionary")
            Call TrapBrowserError("IsExternalWindowOpen|1")
        End If
        If mobjParentWindow.mdicExternalWindows.count > 0 Then
            If mobjParentWindow.mdicExternalWindows.Exists(CStr(pstrKey)) Then
                Call TrapBrowserError("IsExternalWindowOpen|2")
                'The window has been opened already...
                Set objWindow = mobjParentWindow.mdicExternalWindows.Item(CStr(pstrKey))
                Call TrapBrowserError("IsExternalWindowOpen|3")
                'Check if it is still open.
                If objWindow.closed Then
                    Call TrapBrowserError("IsExternalWindowOpen|4")
                    'Remove the erroneous entry.
                    mobjParentWindow.mdicExternalWindows.Remove(CStr(pstrKey))
                    Call TrapBrowserError("IsExternalWindowOpen|5")
                Else
                    'window is open!
                    IsExternalWindowOpen = True
                End If
            End If
        End If
    Else
        'Create the dictionary it not already done.
        If mdicExternalWindows Is Nothing Then
            Set mdicExternalWindows = CreateObject("Scripting.Dictionary")
            Call TrapBrowserError("IsExternalWindowOpen|1")
        End If
        If mdicExternalWindows.count > 0 Then
            If mdicExternalWindows.Exists(CStr(pstrKey)) Then
                Call TrapBrowserError("IsExternalWindowOpen|2")
                'The window has been opened already...
                Set objWindow = mdicExternalWindows.Item(CStr(pstrKey))
                Call TrapBrowserError("IsExternalWindowOpen|3")
                'Check if it is still open.
                If objWindow.closed Then
                    Call TrapBrowserError("IsExternalWindowOpen|4")

'=== IMG_4500 ===
    On Error Resume Next
    'Default - Assume window is not open
    IsExternalWindowOpen = False

    If StrComp(Left(window.name,6), "policy", vbTextCompare) = 0 Then
        'Create the dictionary it not already done.
        If mobjParentWindow.mdicExternalWindows Is Nothing Then
            Set mobjParentWindow.mdicExternalWindows = CreateObject("Scripting.Dictionary")
            Call TrapBrowserError("IsExternalWindowOpen|1")
        End If
        If mobjParentWindow.mdicExternalWindows.count > 0 Then
            If mobjParentWindow.mdicExternalWindows.Exists(CStr(pstrKey)) Then
                Call TrapBrowserError("IsExternalWindowOpen|2")
                'The window has been opened already...
                Set objWindow = mobjParentWindow.mdicExternalWindows.Item(CStr(pstrKey))
                Call TrapBrowserError("IsExternalWindowOpen|3")
                'Check if it is still open.
                If objWindow.closed Then
                    Call TrapBrowserError("IsExternalWindowOpen|4")
                    'Remove the erroneous entry.
                    mobjParentWindow.mdicExternalWindows.Remove(CStr(pstrKey))
                    Call TrapBrowserError("IsExternalWindowOpen|5")
                Else
                    'window is open!
                    IsExternalWindowOpen = True
                End If
            End If
        End If
    Else
        'Create the dictionary it not already done.
        If mdicExternalWindows Is Nothing Then
            Set mdicExternalWindows = CreateObject("Scripting.Dictionary")
            Call TrapBrowserError("IsExternalWindowOpen|1")
        End If
        If mdicExternalWindows.count > 0 Then
            If mdicExternalWindows.Exists(CStr(pstrKey)) Then
                Call TrapBrowserError("IsExternalWindowOpen|2")
                'The window has been opened already...
                Set objWindow = mdicExternalWindows.Item(CStr(pstrKey))
                Call TrapBrowserError("IsExternalWindowOpen|3")
                'Check if it is still open.
                If objWindow.closed Then
                    Call TrapBrowserError("IsExternalWindowOpen|4")

'=== IMG_4501 ===
                Call TrapBrowserError("IsExternalWindowOpen|3")
                'Check if it is still open.
                If objWindow.closed Then
                    Call TrapBrowserError("IsExternalWindowOpen|4")
                    'Remove the erroneous entry.
                    mdicExternalWindows.Remove(CStr(pstrKey))
                    Call TrapBrowserError("IsExternalWindowOpen|5")
                Else
                    'window is open!
                    IsExternalWindowOpen = True
                End If
            End If
        End If
    End If
    Call TrapBrowserError("IsExternalWindowOpen|6")
    Set objWindow = Nothing
End Function
'------------------------------------------------------------------------------------------

Function Tree_IsNodeValid(ByVal pstrNodeKey)
'*****************************************************************************
' Returns True if the tree node with key pstrNodeKey is found
'*****************************************************************************
    Dim objDoc
    Tree_IsNodeValid = False

    On Error Resume Next

    Set objDoc = document.frames("tree")

    If Not objDoc Is Nothing Then
        Tree_IsNodeValid = objDoc.Tree_IsNodeValid(pstrNodeKey)
        Set objDoc = Nothing
    End If
    Call TrapBrowserError("Tree_IsNodeValid|1")

End Function
'------------------------------------------------------------------------------------------

Function Tree_SelectNode(ByVal pstrNodeKey)
'*****************************************************************************
    'Selects the tree node with key pstrNodeKey.
    'Returns true if the node is found.

'=== IMG_4502 ===
    'Returns true if the node is found.
'*****************************************************************************
    Dim objDoc
    On Error Resume Next
    'Default
    Tree_SelectNode = False

    Set objDoc = document.frames("tree")

        If Not objDoc Is Nothing Then
            Tree_SelectNode = objDoc.Tree_SelectNode(CStr(pstrNodeKey))
            Set objDoc = Nothing
        End If
    Call TrapBrowserError("Tree_SelectNode|1")

End Function
'------------------------------------------------------------------------------------------

Function SetExpiredNumber(ByVal pstrNodeKey)
'*****************************************************************************
    'This function replaces the third item in the node key with the current
    'value of mstrExpiredNumber.  The node key is assumed to be in the form:
    '  (lob)|(second value)|(expired number)|(additional values...)
    ' The first field should always be 3 characters.
    ' There should always by at least three "|" characters. ie: POL|POLLVL|0|
'*****************************************************************************
    Dim intCount
    Dim strTempString
    Dim intStart
    Dim intEnd

    On Error Resume Next

    strTempString = pstrNodeKey
    intStart = InStr(1,strTempString,"|")
        'position of first  "|"
    intStart = InStr(intStart + 1,strTempString,"|")
        'position of second "|"
    intEnd = InStr(intStart + 1,strTempString,"|")
        'position of third  "|"

    'If the second "|" is past where the first "|" should be and
    'the third "|" is past where the second "|" is...

'=== IMG_4503 ===
    'the third "|" is past where the second "|" is...
    ' update the field, otherwise, use the nodekey as is.
    If intStart > 4 And intEnd > intStart Then
        strTempString = Left(strTempString,intStart) & Cstr(mstrExpiredNumber) & Right(strTempString,Len(strTempString) - intEnd + 1)
    End If

    SetExpiredNumber = strTempString
    Call TrapBrowserError("SetExpiredNumber|1")

End Function
'------------------------------------------------------------------------------------------

Sub RefreshSearchPageLists()
'*****************************************************************************
'Name:           RefreshSearchPageLists
'Purpose:        This sub refreshes the WIP Queue on the search page as the result
'                 of some action that affects the contents of the list.
'*****************************************************************************
    On Error Resume Next

    Dim objWindow

    ' If this code is in the search page, set the objWindow object
    ' to this page, otherwise, the search window is the parent window.
    ' The search window has a name of "V3Galileo"
    ' All other pages are named "Policy####" where #### is the PolicyID.
    If StrComp(Left(window.name,6), "policy", vbTextCompare) = 0 Then
        Set objWindow = mobjParentWindow
    ElseIf StrComp(window.name, "V3Galileo", vbTextCompare) = 0 Then
        Set objWindow = window
    Else
        Call TrapBrowserError("RefreshSearchPageLists|1")
        Exit Sub
    End If


    If Not objWindow Is Nothing Then
        If Not objWindow.closed Then
            '--indicate that the WIP should be refreshed
            Dim objFrame
            Set objFrame = objWindow.Frames("start")
            if Not IsEmpty(objFrame) then
                With    objFrame

'=== IMG_4504 ===
        End If

        If Not objWindow Is Nothing Then
            If Not objWindow.closed Then
                '--indicate that the WIP should be refreshed
                Dim objFrame
                Set objFrame = objWindow.Frames("start")
                if Not IsEmpty(objFrame) then
                    With    objFrame
                        .ClearPolicySearchList
                        .mblnRefreshWIP = True
                        .WIPQueueRetrieve (False)

                        Call TrapBrowserError("RefreshSearchPageLists|2")
                    End With
                Else
                    Err.Clear
                End If
            End If
        End If
        Set objWindow = Nothing
        Call TrapBrowserError("RefreshSearchPageLists|3")
End Sub
'------------------------------------------------------------------------------------------

Sub window_onbeforeunload
'*****************************************************************************
    'This routine alerts the user when attempting to close the window.
    'It this is the search window, it checks the open policy window.  If any are
    'found, the user is alerted to this fact.
    'If this is a policy window, the state of the tree is checked.  It the tree is
    'disabled, the user is alerted to the fact that the page should
'*****************************************************************************

    Dim objWindow
    Dim intCount
    Dim intCountTemp
    Dim arrWindows
    Dim arrWindowsTemp
    Dim arrKeys
    Dim blnOpenWindows

    Dim arrNonPolWindows

'=== IMG_4505 ===
                '--indicate that the WIP should be refreshed
                Dim objFrame
                Set objFrame = objWindow.Frames("start")
                if Not IsEmpty(objFrame) then
                    With    objFrame
                        .ClearPolicySearchList
                        .mblnRefreshWIP = True
                        .WIPQueueRetrieve (False)

                        Call TrapBrowserError("RefreshSearchPageLists|2")
                    End With
                Else
                    Err.Clear
                End If
            End If
        End If
        Set objWindow = Nothing
        Call TrapBrowserError("RefreshSearchPageLists|3")
End Sub
'------------------------------------------------------------------------------------------

Sub window_onbeforeunload
'*****************************************************************************
    'This routine alerts the user when attempting to close the window.
    'It this is the search window, it checks the open policy window.  If any are
    'found, the user is alerted to this fact.
    'If this is a policy window, the state of the tree is checked.  It the tree is
    'disabled, the user is alerted to the fact that the page should
'*****************************************************************************
    Dim objWindow
    Dim intCount
    Dim intCountTemp
    Dim arrWindows
    Dim arrWindowsTemp
    Dim arrKeys
    Dim blnOpenWindows

    Dim arrNonPolWindows
    Dim arrNonPolWindowsTemp
    Dim arrKeysNonPol
    Dim intCountNonPolTemp

'=== IMG_4506 ===
Dim arrKeysNonPol
Dim intCountNonPolTemp


On Error Resume Next

blnOpenWindows = False

If StrComp(window.name, "v3Galileo", vbTextCompare) = 0 Then
    'This is the start page.
    'Check for open policy window.
    'If there are open policy windows, pass the policy window references to them.
    'This will allow any new search page to know which policies are open.
    If Not mdicChildWindows Is Nothing Then
        arrWindows = mdicChildWindows.Items
        For intCount = 0 To mdicChildWindows.Count - 1
            Set objWindow = arrWindows(intCount)
            If Not objWindow.closed Then
                'Make sure the correct page is still in the child window.
                Set objTemp = objWindow.document.all("fraMain")
                If Err.number = -2147024891 Then
                    Set objTemp = Nothing
                    Err.Clear
                End If
                If Not objTemp Is Nothing Then
                    'Policy windows still open, pass the references of child windows.
                    arrKeys = mdicChildWindows.Keys
                    arrWindowsTemp = mdicChildWindows.Items
                    'Set objWindow.mdicChildWindows = Nothing
                    For intCountTemp = 0 To mdicChildWindows.Count - 1
                        objWindow.LoadWindowReferences arrKeys(intCountTemp), arrWindowsTemp(intCountTemp)
                    Next
                    blnOpenWindows = True
                End If
            End If
        Next
    End If
    If Not mdicNonPolicyChildWindows Is Nothing Then
        arrNonPolWindows = mdicNonPolicyChildWindows.Items
        For intCount = 0 To mdicNonPolicyChildWindows.Count - 1
            Set objWindow = arrNonPolWindows(intCount)
            If Not objWindow.closed Then
                'Make sure the correct page is still in the child window.

'=== IMG_4507 ===
        'Make sure the correct page is still in the child window.
        Set objTemp = objWindow.document.all("fraMain")
        If Err.number = -2147024891 Then
            Set objTemp = Nothing
            Err.Clear
        End If
        If Not objTemp Is Nothing Then
            'Non Policy windows still open, pass the references of child windows.
            arrKeysNonPol = mdicNonPolicyChildWindows.Keys
            arrNonPolWindowsTemp = mdicNonPolicyChildWindows.Items
            'Set objWindow.mdicChildWindows = Nothing
            For intCountNonPolTemp = 0 To mdicNonPolicyChildWindows.Count - 1
                objWindow.LoadNonPolicyWindowReferences arrKeysNonPol(intCountNonPolTemp), arrNonPolWindowsTemp(intCountNonPolTemp)
            Next
            blnOpenWindows = True
        End If
    End If
Next
End If

If blnOpenWindows And Not mblnLogout Then
    window.event.returnValue = "Home page should remain open until all policy windows are closed."
End If

Set objWindow = Nothing

Else
    'This is a policy window.
    'Check for changed data
    '// Warn before closing anytime data is changed

    Dim objDoc
    Dim objScript
    Dim blnEEDataChanged
Dim blnIgnoreChanges


blnIgnoreChanges = False
    Set objDoc = document.frames(mstrCurrentFrame)
    If Not objDoc Is Nothing Then
        Set objScript = objDoc.document.scripts("eebrowser")
        If Not (objScript is Nothing) Then

'=== IMG_4508 ===
            If Not (objScript is Nothing) Then
                Set objScript = Nothing
                blnEEDataChanged = objDoc.mblnEEDataChanged
            If Not objDoc.mxmlDoc.selectSingleNode("//page[@ignorechanges=""T""]") Is Nothing Then
                blnIgnoreChanges = True
            End If
            Set objDoc = Nothing
                End If
            End If

        If (mblnDataChanged Or blnEEDataChanged) And Not blnIgnoreChanges And Not mblnLogout Then
            If strcomp(mstrAction, "MSG", vbTextCompare) <> 0 Then
                window.event.returnValue = "This page is being closed before completion of the current operation.  Data may be lost if you continue."
            End If
        End If
        'Refresh the WIP in the event any items shown there have changed.
        Call RefreshSearchPageLists()
    End If
    Call TrapBrowserError("window_onbeforeunload|1")
End Sub
'--------------------------------------------------------------------------------------

Sub window_onunload
'****************************************************************************
' Close child windows if this is a policy window.
' Then set focus to the parent window.
'****************************************************************************

    Dim arrWindows
    Dim intCount
    Dim objWindow
    Dim arrKeys
    Dim strWindowName
    Dim objDoc
    Dim objScript

    On Error Resume Next
    'Close the child windows of this policy
    'do not close other policy windows if the a replacement search window was needed.

    If Not mdicChildWindows Is Nothing Then
        arrWindows = mdicChildWindows.Items
        arrKeys = mdicChildWindows.Keys

'=== IMG_4509 ===
    If Not mdicChildWindows Is Nothing Then
        arrWindows = mdicChildWindows.Items
        arrKeys = mdicChildWindows.Keys

        For intCount = 0 To mdicChildWindows.Count - 1
            Set objWindow = arrWindows(intCount)
            If Not objWindow Is Nothing Then
                strWindowName = arrKeys(intCount)
                    'objWindow.name

                If Not objWindow.closed Then
                    If StrComp(Left(strWindowName,6), "policy", vbTextCompare) <> 0 Then
                        objWindow.close
                    End If
                End If
                Set objWindow = Nothing
            End If
        Next
    End If

    ' Call the Cancel routines if an EE page is present
    '--------------------------------------------------

    If StrComp(mstrCurrentFrame, "main", vbTextCompare) = 0 Then
        Set objDoc = document.all(mstrCurrentFrame)
        If Not objDoc Is Nothing Then
            Set objDoc = objDoc.contentWindow
            If Not objDoc Is Nothing Then

                With objDoc
                    Set objScript = .document.scripts("eebrowser")
                    If Not (objScript is Nothing) Then
                        Set objScript = Nothing
                        .mblnEEDataChanged = False
                        mblnDataChanged = False
                        mblnRatingDataChanged = False
                        If Not .mblnNavButtonClicked Then
                            If .dtaCancel.enabled = True And .dtaCancel.style.visibility = "visible" Then
                                Set .mobjAQSMain = window
                                .marrEEData(1) = "CANCEL"
                                    'Set the matchode
                                .marrEEData(5) = "1"
                                    'Set post-process indicator

'=== IMG_4510 ===
                        'Set post-process indicator
                    If Not mblnPolicyDiscard  Then
                        Call .CallServer( .document.all("dtaCancel"), False)
                    End If
                    Call RefreshSearchPageLists
                End If
                End If
            Set objDoc = Nothing
        End If
    End With

        End If
    End If
End If
'--------------------------------------------------

    'This routine attempts to set focus to the page that opened it.
    If Not mobjParentWindow Is Nothing Then
        If mblnDoNotSetFocusToParent = false Then
            If Not mobjParentWindow.closed Then
                mobjParentWindow.focus
            End If
        End If
    End If

    Call TrapBrowserError("window_onunload|1")
    'Clean up
    Set mobjParentWindow = Nothing
    Set mdicChildWindows = Nothing
    Set mdicNonPolicyChildWindows = Nothing
    Set mdicExternalWindows = Nothing
    Set mxmlBatchEdits = Nothing
    Set mxmlStyle = Nothing
    Set mxmlProcessor = Nothing

End Sub
'--------------------------------------------------------------------------------------

Sub ProgressBarTime_SetValue(mstrText)
'****************************************************************************
' Support routine to set the timing for a progress modal
'****************************************************************************

    On Error Resume Next

'=== IMG_4511 ===
    On Error Resume Next
    If Not mvntDebugWindow Is Nothing Then
        If mobjAQSMain.mvntDebugWindow.ShowTiming Then
            mvntDebugWindow.ShowData (vbCrLf & "Progress: " & vbTab & mstrText & vbCrLf)
        End If
    End If
    Err.Clear

End Sub
'--------------------------------------------------------------------------------------

Sub UpdateActionMenuItems()
'****************************************************************************
' As any line of business is added or removed, the dropdown
' action menu list must be updated.
'****************************************************************************
    Dim objDoc
    On Error Resume Next
    'Update dropdown menus in the toolbar
    If Not mblnSearchPage Then
        'does not apply to search page.
        Set objDoc = document.frames("menu")
        If Not objDoc Is Nothing Then
            objDoc.UpdateActionMenuItems()
            Set objDoc = Nothing
        End If
    End If
    Call TrapBrowserError("UpdateActionMenuItems|1")
End Sub
'--------------------------------------------------------------------------------------

Function ShowUserMessage (ByVal strMessage, ByVal strType, ByVal intButtons)
'****************************************************************************
' Uses the UserMessage class to show a message
'****************************************************************************
    Dim objMessageBox
    On Error Resume Next
    Set objMessageBox = New UserMessage
    objMessageBox.show strMessage, strType, intButtons
    ShowUserMessage = objMessageBox.RetValue
    Set objMessageBox = Nothing
    Call TrapBrowserError("ShowUserMessage|1")
End Function

'=== IMG_4512 ===
    On Error Resume Next
    If Not mvntDebugWindow Is Nothing Then
        If mobjAQSMain.mvntDebugWindow.ShowTiming Then
            mvntDebugWindow.ShowData (vbCrLf & "Progress: " & vbTab & mstrText & vbCrLf)
        End If
    End If
    Err.Clear

End Sub
'--------------------------------------------------------------------------------------

Sub UpdateActionMenuItems()
'****************************************************************************
' As any line of business is added or removed, the dropdown
' action menu list must be updated.
'****************************************************************************
    Dim objDoc
    On Error Resume Next
    'Update dropdown menus in the toolbar
    If Not mblnSearchPage Then
        'does not apply to search page.
        Set objDoc = document.frames("menu")
        If Not objDoc Is Nothing Then
            objDoc.UpdateActionMenuItems()
            Set objDoc = Nothing
        End If
    End If
    Call TrapBrowserError("UpdateActionMenuItems|1")
End Sub
'--------------------------------------------------------------------------------------

Function ShowUserMessage (ByVal strMessage, ByVal strType, ByVal intButtons)
'****************************************************************************
' Uses the UserMessage class to show a message
'****************************************************************************
    Dim objMessageBox
    On Error Resume Next
    Set objMessageBox = New UserMessage
    objMessageBox.show strMessage, strType, intButtons
    ShowUserMessage = objMessageBox.RetValue
    Set objMessageBox = Nothing
    Call TrapBrowserError("ShowUserMessage|1")
End Function

'=== IMG_4513 ===
End Function
'--------------------------------------------------------------------------------------

Sub SetNextAction(ByVal pstrAction, ByVal pstrNodeKey, ByVal pintTab, ByVal pstrXMLDetail)
'****************************************************************************
' Takes the values from the browser command NAVIGATE_CYCLING and
' stores them as module level variable for use by ExecuteAction to call
' ExecuteAction ( yes ExecuteAction) to perform the next navigation to
' allow the modal to close before launching the next page/modal.

' pstrAction = .marrSessionInformation(4) & "|" & strMatchCode,
'   pstrNodeKey = strNodeKey,
'   pintTab = intTab,
'   pstrXMLDetail = Escape(.marrSessionInformation(6))
'****************************************************************************

    mstrNextAction_Action                  = pstrAction
    mstrNextAction_NodeKey                 = pstrNodeKey
    mstrNextAction_Tab                     = pintTab
    mstrNextAction_XMLDetail               = pstrXMLDetail

End Sub
'--------------------------------------------------------------------------------------

Sub GetCyclingValues (ByVal pstrAction, ByVal pstrNodeKey, ByVal pintTab, ByVal pstrXMLDetail, ByRef pstrFrame, ByRef pstrURL, ByRef pstrModalSize)
'****************************************************************************
'PURPOSE:
'‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
'****************************************************************************
On Error Resume Next

    Dim objResponse

    Dim objNode                                    ' XML document to hold the xml of the response

    Dim strURL                                     ' node within ("/navigate") from response

    Dim strQueryString                             ' New url as specified by the cycling component

    'The reason for UnEscaping the passed parameter is to make sure when it is
    'escaped later in a querystring value, that it doesn't become escaped twice.
    'Note that this is effectively equivalent to what happens when a querystring value
    'that had been escaped is read from the request.querystring object - it is

'=== IMG_4514 ===
    'The reason for UnEscaping the passed parameter is to make sure when it is
    'escaped later in a querystring value, that it doesn't become escaped twice.
    'Note that this is effectively equivalent to what happens when a querystring valu
    'that had been escaped is read from the request.querystring object - it is
    '"unescaped" by the request object. Also, the only consequence to "unescaping" a
    'non-escaped parameter is if the parameter had "%" characters within it that
    'would equate to a valid hex character (like "%34" would turn into "4").
    pstrXMLDetail = UnEscape(pstrXMLDetail)
    'With mobjAQSMain
    ' Create querystring
    strQueryString = "?nodekey=" & Escape(SetExpiredNumber(pstrNodeKey)) & _
                            "&action=" & Escape(pstrAction) & _
                            "&userid=" & Escape(mstrUserID) & _
                            "&policyid=" & Escape(mstrPolicyID) & _
                            "&diagnosticmode=" & Escape(mstrDiagnosticMode) & _
                            "&tab=" & Escape(pintTab) & _
                            "&xmldetail=" & Escape(mstrXMLDetail) & _
                            "&returntype=XML" & _
                            "&debug=" & Cstr(mblnDeveloperMessages)
    'End With
    Call TrapBrowserError("GetCyclingValues|1")

    Set objResponse = CreateObject("MSXML2.DOMDocument.6.0")
    Call TrapBrowserError("GetCyclingValues|2")

    With objResponse
        .async = False
        .load "XmlCycling.aspx" & strQueryString
    End With
    Call TrapBrowserError("GetCyclingValues|3")

    ' If there are results...
    If Not TrapXMLParseError(objResponse, "GetCyclingValues|3") Then
        ' Check for any return errors
        Call TrapXMLReturnErrors(objResponse, "GetCyclingValues|4")

        Set objNode = objResponse.selectSingleNode("//result")

        strQueryString = URLDecodeJS(GetNodeText(objNode, "querystring",""))

        strURL = URLDecodeJS(GetNodeText(objNode, "url",""))

        pstrFrame = Ucase(GetNodeText(objNode, "frame",""))

'=== IMG_4515 ===
    strURL = URLDecodeJS(GetNodeText(objNode, "url",""))

    pstrFrame = Ucase(GetNodeText(objNode, "frame",""))

    pstrURL = strURL & strQueryString

    pstrModalSize = GetNodeText(objNode, "height", "") & "," & GetNodeText(objNode, "width", "")
    If StrComp(pstrModalSize, ",", vbTextCompare) = 0 Then
        pstrModalSize = ""
    End If

    End If

    Call TrapBrowserError("GetCyclingValues|6")

    Set objNode = Nothing
    Set objResponse = Nothing

End Sub
'--------------------------------------------------------------------------------------

'****************************************************************************
'****************************************************************************
'Functions moved from EEBrowser.asp
'****************************************************************************
'****************************************************************************
'--------------------------------------------------------------------------------------

Sub ApplySecurityPolicy(strFieldMatchCode, objCallingWindow)
'****************************************************************************
'****************************************************************************
    Dim strProgramType
    Dim strPageMatchCode
    Dim nodPageMatchCode
    Dim nodSecurity
    Dim strVisible
    Dim strDisabled
    Dim strSecurityPath
    Dim objControl
    Dim colControls
    Dim objTempControl

'=== IMG_4516 ===
    Dim objTempControl
    Dim strTempID
    Dim strQuery
    Dim objNodes
    Dim intCount
    Dim objNode

    On Error Resume Next

    strProgramType = ""

    With objCallingWindow
        'strProgramType = GetStringField(.marrSessionInformation(3), 1,"|") & GetStringField(.marrSessionInformation(3), 4,"|")
        strProgramType = GetActionMenuNameException(.marrSessionInformation(3), 1,"|") & GetStringField(.marrSessionInformation(3), 4,"|")
        '// Need page matchcode
        Set nodPageMatchCode = .mxmlDoc.selectSingleNode("//page[@matchcode]")
        If Not nodPageMatchCode Is Nothing Then
            strPageMatchCode = nodPageMatchCode.attributes.getNamedItem("matchcode").value
        End If
    End With

    '// Get the disabled and visible properties from the security XML
    strSecurityPath = "//permissions/lob[@mc='" & strProgramType & "']/pag[@mc='" & strPageMatchCode & "']/obj[@mc='" & strFieldMatchCode & "']"
    Set nodSecurity = mxmlSecurity.selectSingleNode(strSecurityPath)
    Call TrapBrowserError("ApplySecurityPolicy|1")
    If Not nodSecurity Is Nothing Then
        strVisible = nodSecurity.attributes.getNamedItem("vis").value
        strDisabled = nodSecurity.attributes.getNamedItem("dis").value
        Call TrapBrowserError("ApplySecurityPolicy|2")

        If StrComp("tab",Left(strFieldMatchCode,3),vbTextCompare) = 0 Then
            If StrComp(strVisible,"F",vbTextCompare) = 0 Then
                With objCallingWindow
                    If Not .mxmlDoc Is Nothing Then
                        strQuery = "//control[@tab=""" & strFieldMatchCode & """]"
                        Set objNodes = .mxmlDoc.selectnodes(strQuery)
                        Call TrapBrowserError("ApplySecurityPolicy|3")
                        For intCount = 1 To objNodes.length
                            Set objNode = objNodes(intCount-1).attributes.getNamedItem("required")
                            If Not objNode Is Nothing Then
                                objNode.nodevalue = "0"
                            End If
                            Call TrapBrowserError("ApplySecurityPolicy|4")

'=== IMG_4517 ===
                    Call TrapBrowserError("ApplySecurityPolicy|4")
                Next
            End If
        End With
    End If

    Set objControl = objCallingWindow.document.all("tabstrip")
    If Not objControl Is Nothing Then
        If Len(strVisible) > 0 Then
            objControl.visibility strFieldMatchCode, strVisible
            Call TrapBrowserError("ApplySecurityPolicy|5")
        End If
        If Len(strDisabled) > 0 Then
            objControl.disabled strFieldMatchCode, strDisabled
            Call TrapBrowserError("ApplySecurityPolicy|6")
        End If
    End If
ElseIf StrComp("div",Left(strFieldMatchCode,3),vbTextCompare) = 0 Then
    '// Get the div and then loop through elements within div to apply security individually
    Set colControls = objCallingWindow.document.all(strFieldMatchCode).all
    If StrComp("F",strVisible,vbTextCompare) = 0 Then
        For x = 0 to colControls.length - 1
            strTempID = colControls.item(x).id
            'MsgBox(strTempID)
            If StrComp("dta",Left(strTempID,3),vbTextCompare) = 0 Then
                Set objTempControl = colControls.item(x)
                If Len(strVisible) > 0 Then
                    If StrComp(GetControlAttribute(objTempControl,"VISIBLE"), "T", vbTextCompare) = 0 Then
                        Call SetControlAttribute(objTempControl, "", "VISIBLE", strVisible, objCallingWindow)
                    End If
                End If
                If Len(strDisabled) > 0 Then
                    If StrComp(GetControlAttribute(objTempControl,"DISABLED"), "F", vbTextCompare) = 0 Then
                        Call SetControlAttribute(objTempControl, "", "DISABLED", strDisabled, objCallingWindow)
                    End If
                End If
                Set objTempControl = Nothing
            ElseIf StrComp("lbl",Left(strTempID,3),vbTextCompare) = 0 Then
                Set objTempControl = colControls.item(x)
                objTempControl.style.visibility = "hidden"
                Set objTempControl = Nothing
            End If
        Next

'=== IMG_4518 ===
Next
'   MsgBox(strFieldMatchCode)
'   objCallingWindow.document.all(strFieldMatchCode).all.style.visibility = "hidden"
    'objTempControl.style.visibility = "hidden"
Else

    Call TrapBrowserError("ApplySecurityPolicy|7")
    For x = 0 to colControls.length - 1
        strTempID = colControls.item(x).id
        If StrComp("dta",Left(strTempID,3),vbTextCompare) = 0 Then
            Set objTempControl = colControls.item(x)
            If Len(strVisible) > 0 Then
                If StrComp(GetControlAttribute(objTempControl,"VISIBLE"), "T", vbTextCompare) = 0 Then
                    Call SetControlAttribute(objTempControl, "","VISIBLE", strVisible, objCallingWindow)
                End If
            End If
            If Len(strDisabled) > 0 Then
                If StrComp(GetControlAttribute(objTempControl,"DISABLED"), "F", vbTextCompare) = 0 Then
                    Call SetControlAttribute(objTempControl, "","DISABLED", strDisabled, objCallingWindow)
                    ' Add the SecDis attribute if control is disabled by Security
                End If
                If StrComp(strDisabled, "T", vbTextCompare) = 0 Then
                    Call objTempControl.setAttribute ("SecDis", "T")
                End If
            End If
            Set objTempControl = Nothing
        End If
    Next
End If
Else

    Set objControl = objCallingWindow.document.all("dta" & strFieldMatchCode)
    If Not objControl Is Nothing Then
        If Len(strVisible) > 0 Then
            If StrComp(GetControlAttribute(objControl,"VISIBLE"), "T", vbTextCompare) = 0 Then
                Call SetControlAttribute(objControl, "", "VISIBLE", strVisible, objCallingWindow)
            End If
        'End If
        If Len(strDisabled) > 0 Then
            If StrComp(GetControlAttribute(objControl,"DISABLED"), "F", vbTextCompare) = 0 Then
                Call SetControlAttribute(objControl, "", "DISABLED", strDisabled, objCallingWindow)
                ' Add the SecDis attribute if control is disabled by Security
            End If
            If StrComp(strDisabled, "T", vbTextCompare) = 0 Then

'=== IMG_4519 ===
            If StrComp(strDisabled, "T", vbTextCompare) = 0 Then
                Call objControl.setAttribute ("SecDis", "T")
            End If
        End If
    End If
End If
Call TrapBrowserError("ApplySecurityPolicy|8")
End Sub
'------------------------------------------------------------------------------------------------

Sub ButtonOnClickHandler (ByRef objCallingWindow)
    '**************************************************************************************
    ' PURPOSE:
    ' This subroutine is the OnClick handler for various buttons.
    ' If the button has a related control definded in the xml page data,
    ' then the value/data from that control is added to the EEData array
    ' for post processing. ( Call .CallServer )
    ' In the case where the related control is XMLLIST, the special
    ' handler for XMLLIST is called.
    '
    '**************************************************************************************

Dim objControl
Dim objRelatedControl
Dim objNode
Dim blnCallServer                          'Used to prevent server call in special cases

Dim strTemp
Dim blnCheckRating                         'Used to identify controls that affect rating

    On Error Resume Next

    blnCallServer = True
    blnCheckRating = True

    With objCallingWindow
        Set objControl = .event.srcElement

        ' Determine if the button clicked has a related control...
        ' If it does, this is the item that holds the data/value (to post process/ save)
        ' Otherwise, simply post process the button
        Set objNode = .mxmlDoc.selectSingleNode("//control [@matchcode = """ & objControl.name & """ and @relatedcontrol]")

'=== IMG_4520 ===
    ' If it does, this is the item that holds the data/value (to post process/ save)
    ' Otherwise, simply post process the button
    Set objNode = .mxmlDoc.selectSingleNode("//control [@matchcode = """ & objControl.name & """ and @relatedcontrol]")

    If Not objNode Is Nothing Then
        ' there is a related control, find it and get the value
        Set objRelatedControl = .document.all( "dta" & objNode.attributes.getNamedItem("relatedcontrol").nodeValue )

        If objRelatedControl Is Nothing Then
            ' The related control may be a data island
            Set objRelatedControl = .document.all( objNode.attributes.getNamedItem("relatedcontrol").nodeValue )
        End If

        If Not objRelatedControl Is Nothing Then
            ' For buttons related to xmllist the behavior, set the action property of the list to the action property of the button.
            Select Case UCase(   objRelatedControl.tagName )

                Case "XMLLIST"
                    blnCallServer = False
                    objRelatedControl.action = objControl.action
                    Call ListButtonOnClick ( objRelatedControl.id, objCallingWindow )

                Case Else
                    Call SetArrayData ( objRelatedControl, objCallingWindow )

            End Select

        End If
    Else
        'Not objNode Is Nothing ( no related control exists )
        ' If no related control exists, check for a related function.
        Set objNode = .mxmlDoc.selectSingleNode("//control [@matchcode = """ & objControl.name & """ and @relatedfunction]")
        If Not objNode Is Nothing Then
            Execute (".marrEEData(2) = ." & objNode.attributes.getNamedItem("relatedfunction").nodeValue & "()")
        End If
    End If

    If blnCallServer Then
        '--Setup the EEData array & call the server--
        .marrEEData(1) = objControl.name
            'Set the matchode
        .marrEEData(5) = "1"

'=== IMG_4521 ===
    End With
        ' objCallingWindow

    Call TrapBrowserError("ButtonOnClickHandler|1")

    'Clean up
    Set objNode = Nothing
    Set objControl = Nothing
    Set objRelatedControl = Nothing

End Sub
'------------------------------------------------------------------------------------------------

Sub CalendarButtonOnClick(ByRef objCallingWindow)
    '**************************************************************************************
    'PURPOSE:
    'This subroutine is the OnClick handler for ALL calendar buttons. Every
    'calendar button is associated with exactly one date control. This routine
    'intializes a module-level variable (mvntRtnValue) with the value of the
    'associated date control, then opens a modal dialog window with a month-
    'view calendar. After returning, if the date was changed then the new
    'value is written back to the associated date control.
    '
    '**************************************************************************************
    On Error Resume Next

    Dim objDateControl

                                                    'Reference to the date control associated with the
                                                    'calendar button the user pressed.

    With objCallingWindow
        '--Get a reference to the correct date control and set focus there--
        Set objDateControl = .document.all("dta" & .event.srcElement.name)
            Call TrapBrowserError("EEBrowser|CalendarButtonOnClick|1")
        'Do not respond to the button event if the calendar control is disabled
        If Not objDateControl.isDisabled Then

            '--Move the initial value of the date control into the module-level var so--
            '--the modal dialog window can get access to it.
            '-- Get the date value before setting focus to the control. The control has
            '-- a problem and the value is cleared the first time the control gets focus.

'=== IMG_4522 ===
        '--Check to see if the date was changed in the modal dialog--
        If CStr(.mvntRtnValue) <> CStr(GetControlValue(objDateControl)) Then
            'The data was changed, so update the "real" date control.
            Call SetControlValue(objDateControl,"",.mvntRtnValue,"L", objCallingWindow)
            Call CheckRequiredIndicators("",objCallingWindow)
        End If
    End If
    End With
        'objCallingWindow

    Call TrapBrowserError("EEBrowser|CalendarButtonOnClick|3")
    '--Clean Up--
    Set objDateControl = Nothing

End Sub
'------------------------------------------------------------------------------------------------

Function CheckRequiredIndicators(ByRef strControlList,ByRef objCallingWindow)
    '**************************************************************************************
    'PURPOSE:
    'This function will cycle through ALL tags on the page, looking for
    '"OBJECT", "INPUT", "RADIOBUTTON", "SELECT", or "TEXTAREA" tags with
    'a Required attribute of "1":Required for Entry. When found, the control's
    'value is interrogated to determine if there is a value present. If ANY are
    'found WITHOUT a value, this function returns back a "FALSE" and the strControlList
    'parameter will be filled with a listing of the labels of the errant controls.
    'If ALL Required Level "1" controls have a value, then "TRUE" is returned and
    'the strControlList parameter is returned empty.
    '
    '------------------------------------------------------------------------------------
    'UPDATE: 03/14/2002, mcb
    ' Complete rewrite.  It was due.
    '
    On Error Resume Next

    Dim blnSuccess

                                                            'Boolean falg indicating TRUE if all required fields have data,
                                                            'or FALSE if at least one required control doesn't have data.

    Dim strUsrOptCheckStatus
    Dim strTransactionid

    Dim blnUsrOptCheckStatusStart                          'Boolean to indicate User Option Status Check

'=== IMG_4523 ===
    Dim blnUsrOptCheckStatusStart                          'Boolean to indicate User Option Status Check
                                                            'and Start action

    strControlList = ""                                    'Clear the list parameter

    blnSuccess = True                                      'Assume success

    With objCallingWindow

        blnSuccess = CheckSpecifiedIndicator (strControlList, "required", "1", objCallingWindow)

        '--Make sure the [Ok] Button is enabled if all level 1 fields        --
        '--have data, else make sure it is disabled if there is at least--
        '--one required="1" control that does not contain data.               --

        '--Enable/Disable the [Next] button based on        --
        '--the blnSuccess var. This will effectively        --
        '--disable the [Next] button IF there is an XMLLIST control with        --
        '--a required="1" attribute, and there are NO rows in the XMLLIST.--
        '--Note: If the [Next] button isn't appropriate for the current        --
        '--screen, it will have been marked as hidden by "window_onload"        --
        '--routine.

        If blnSuccess Then
            ' set up variables for "check status" edits
            Call UserOption("checkstatus", "T", strUsrOptCheckStatus)
            Call SessionXML_GetItem ("transactionid", strTransactionid)
            If (StrComp(strUsrOptCheckStatus, "T", vbTextCompare) = 0 _
                and mstrAction = "START") Then
                    blnUsrOptCheckStatusStart = True
            Else
                    blnUsrOptCheckStatusStart = False
            End If

            ' check for edits for check status, when new business or quote (enable OK)
            If blnUsrOptCheckStatusStart Then
                ' If new business or quote, or a transfer
                If ((StrComp(strTransactionid, "1", vbTextCompare) = 0 _
                    And (.document.all("dtaPolicyAction").Text = "Update" _
                        Or .document.all("dtaPolicyAction").Text = "Delete" _
                        Or .document.all("dtaPolicyAction").Text = "Copy" _
                        Or .document.all("dtaPolicyAction").Text = "Transfer")) _
                    Or .document.all("dtaPolicyAction").Text = "Transfer") Then

'=== IMG_4524 ===
                Or .document.all("dtaPolicyAction").Text = "Transfer") Then
                    Call SetControlAttribute(.document.all("dtaOK"), "", "DISABLED", "F", objCallingWindow)
                Else
                    ' If not a check status with OK was done
                    If Not SessionXML_GetItem ("policystatuscheck","T") Then
                        Call SetControlAttribute(.document.all("dtaOK"), "", "DISABLED", "T", objCallingWindow)
                    Else
                        ' else enable OK
                        Call SetControlAttribute(.document.all("dtaOK"), "", "DISABLED", "F", objCallingWindow)
                    End if
                End If
            Else
                ' No edits for check status  - all required fields entered
                Call SetControlAttribute(.document.all("dtaOK"), "", "DISABLED", "F", objCallingWindow)
            End If

            Call SetControlAttribute(.document.all("dtaNEXT"), "", "DISABLED", "F", objCallingWindow)
'           Call SetControlAttribute(.document.all("dtaBACK"), "", "DISABLED", "F", objCallingWindow)
            Call TrapBrowserError("EEBrowser|CheckRequiredIndicators|3")
        Else
            'blnSuccess = False
            Call SetControlAttribute(.document.all("dtaOK"), "", "DISABLED", "T", objCallingWindow)
            Call SetControlAttribute(.document.all("dtaNEXT"), "", "DISABLED", "T", objCallingWindow)
'           Call SetControlAttribute(.document.all("dtaBACK"), "", "DISABLED", "T", objCallingWindow)
            Call TrapBrowserError("EEBrowser|CheckRequiredIndicators|5")
        End If
        'blnSuccess

    End With
        'objCallingWindow

    '--Set the return value--
    CheckRequiredIndicators = blnSuccess

End Function
'------------------------------------------------------------------------------------------------

Function CheckSpecifiedIndicator(ByRef strControlList, ByVal strIndicator, _
                                        ByVal strIndicatorValue, ByRef objCallingWindow)
    '**************************************************************************************
    'PURPOSE:
    'This function will cycle through ALL tags on the page, looking for
    '"OBJECT", "INPUT", "RADIOBUTTON", "SELECT", or "TEXTAREA" tags with

'=== IMG_4525 ===
    '"OBJECT", "INPUT", "RADIOBUTTON", "SELECT", or "TEXTAREA" tags with
    'an attribute of <strIndicator> with a value of <strIndicatorValue>.
    'When found, the control's value is interrogated to determine if there
    'is a value present. If ANY are found WITHOUT a value, this function returns
    'back a "FALSE" and the strControlList parameter will be filled with
    'a listing of the labels of the errant controls.
    'If ALL controls with an attribute of <strIndicator> with a value of
    '<strIndicatorValue> have a value, then "TRUE" is returned and
    'the strControlList parameter is returned empty.
    '
    '------------------------------------------------------------------------------------
    'UPDATE: 02/12/2003, mcb
    ' Another rewrite and rename.  This function replaces the guts of the
    ' CheckRequiredIndicators funtion to make it generic.  The required value
    ' becomes a parameter to allow other criteria to be checked.
    '    Specifically, fields required for valid searches on lookup pages.
    '
    'UPDATE: 03/14/2002, mcb
    ' Complete rewrite.  It was due.
    '**************************************************************************************
    On Error Resume Next

    Dim objControls

    Dim objLabel                                           'Handle to ALL tags in the HTML document.

    Dim colXMLLists                                        'Handle to label for data control

    Dim intIndex                                           'Collection of XMLLIST controls that are required.

    Dim blnSuccess                                         'Counter var.

                                                            'Boolean falg indicating TRUE if all required fields have data,
                                                            'or FALSE if at least one required control doesn't have data.

    Dim blnUpdateList                                      'Boolean flag indicating the control should be added to the list
                                                            'of offending controls where validation failed.

    strControlList = ""                                    'Clear the list parameter

    blnSuccess = True                                      'Assume success

    blnUpdateList = False                                  'Reset Flag

'=== IMG_4526 ===
                                        'Reset Flag

    With objCallingWindow
        Set objControls = .document.all

        For intIndex = 0 To objControls.length - 1
        If Not IsNull(objControls(intIndex).getAttribute(strIndicator)) Then
        If StrComp (objControls(intIndex).getAttribute(strIndicator), strIndicatorValue, vbTextCompare ) = 0 Then
                If StrComp(GetControlAttribute(objControls(intIndex), "VISIBLE"), "T", vbTextCompare) = 0 Then
                ' At this point, the control is visible and required

                    Select Case UCase(objControls(intIndex).tagname)

                        Case "SELECT"
                                            If objControls(intIndex).size = 1 Then
                                                ' Select tag as a drop down list - an item must be selected.
                                                If objControls(intIndex).selectedIndex = -1 Then
                                                    blnSuccess = False
                                                    blnUpdateList = True
                                                End If
                                            Else
                                                ' Select tag as a listbox - There must be an item in the list, but does not need to be selected.
                                                If objControls(intIndex).options.length = 0 Then
                                                    blnSuccess = False
                                                    blnUpdateList = True
                                                End If
                                            End If

                        Case "OBJECT"
                                    ' check date controls for valid dates to reject "_/_/_, " and tree controls for selected items
                                    '--Protoview Date/Time Control--
                                    If  StrComp(objControls(intIndex).classid, "CLSID:CC696B63-4159-11D0-BDCB-0020A90B183A", vbTextCompare) = 0 Then
                                        If Not IsDate(GetControlValue(objControls(intIndex))) Then
                                            blnSuccess = False
                                                'Mark our flag as failed
                                            blnUpdateList = True
                                        End If
                                    '--Sheridan Tree Control--
                                    ElseIf StrComp(objControls(intIndex).classid, "CLSID:1C203F13-95AD-11D0-A84B-00A0247B735B", vbTextCompare) = 0 Then
                                        ' calling page must contain the function mblnTreeItemSelected()
                                        If Not .mblnTreeItemSelected Then
                                            blnSuccess = False
                                                'Mark our flag as failed

'=== IMG_4527 ===
                                            blnUpdateList = True
                                        End If
                                    '--IE8 Tree Control--
                                    ElseIf StrComp(objControls(intIndex).classid, "../../SYSTEM/WINCONTROLS/AQSCONTROLLIBRARY1.DLL#AQSCONTROLLIBRARY.TREEVIEW", vbTextCompare)«?»
                                        ' calling page must contain the function mblnTreeItemSelected()
                                        If Not .mblnTreeItemSelected Then
                                            blnSuccess = False
                                                'Mark our flag as failed
                                            blnUpdateList = True
                                        End If
                                    End If

                        Case "INPUT","RADIOBUTTON","TEXTAREA","COMBO","KPCOMBO","DIV"
                                            If Not IsNull(objControls(intIndex).getAttribute("iscalendar")) Then
                                                If Not objCallingWindow.CheckDate(objCallingWindow.FormatDate(GetControlValue(objControls(intIndex)))) Then
                                                    blnSuccess = False
                                                    blnUpdateList = True
                                                End If
                                            Else
                                                If Len(Trim(GetControlValue(objControls(intIndex)))) = 0 Then
                                                    '--The value is empty, so add this to the return list--
                                                    '--and indicate failure.
                                                    blnSuccess = False
                                                        'Mark our flag as failed
                                                    blnUpdateList = True
                                                End If
                                            End If
                                            'IfGetControlValue(objControls(intIndex)) = ""

                        Case  "XMLLIST", "IMDBXMLLIST"
                                            If objControls(intIndex).RowCount < 1 Then
                                                blnSuccess = False
                                                    'Mark our flag as failed
                                                blnUpdateList = True
                                            End If
                                            'GetControlValue(colXMLLists(intIndex)) = ""
                        Case "IBUTTON"
                                            If Not objControls(intIndex).ClickedOnce Then
                                                blnSuccess = False
                                                blnUpdateList = True
                                            End If
                    End Select

'=== IMG_4528 ===
                    End Select
                        'UCase(objControls(intIndex).tagname)

                    ' Before next item, update the list if this control failed the test
                            '--Add this control's label text to the returned string--
                            '--listing all the controls that failed.    If needed.  --
                        If blnUpdateList Then
                            Set objLabel = .document.all("lbl" & objControls(intIndex).name)
                            ' Make sure there is a label
                            If Not objLabel Is Nothing Then
                                If Len(strControlList) = 0 Then
                                    'This is the first label to go into the string.
                                    strControlList = objLabel.innertext
                                        Call TrapBrowserError("EEBrowser|CheckSpecifiedIndicator|1")
                                Else
                                    'Len(strControlList) <> 0
                                    'This is the 2nd or greater label to go into the string.
                                    strControlList = strControlList & ", " & objLabel.innertext
                                        Call TrapBrowserError("EEBrowser|CheckSpecifiedIndicator|2")
                                End If
                                    'Len(strControlList) = 0
                            End If
                        End If
                            'blnUpdateList
                        blnUpdateList = False
                            'Reset Flag

                End If
                    'StrComp(GetControlAttribute(objControls(intIndex), "VISIBLE"), "T", vbTextCompare) = 0
            End If
                'StrComp (objControls(intIndex).getAttribute(strIndicator),"1",vbTextCompare ) = 0
        End If
            'Not IsNull(objControls(intIndex).getAttribute(strIndicator))
        Next
            'intIndex

    End With
        'objCallingWindow

    '--Set the return value--
    CheckSpecifiedIndicator = blnSuccess

    '--Clean Up--

'=== IMG_4529 ===
    Set objControls = Nothing
    Set objLabel = Nothing
    Set colXMLLists = Nothing

    Call TrapBrowserError("EEBrowser|CheckSpecifiedIndicator|end")

End Function
'--------------------------------------------------------------------------------------


Sub ExecuteBrowserCommands(ByRef objControl, ByRef objCallingWindow)
    '**************************************************************************************
    'PURPOSE:
    'This subroutine is responsible for responding to commands from the server
    'that were returned as a response to the CallServer.  The array of commands
    'returned from the server will be iterated through until all the browser
    'commands have been executed.
    '
    'PARAMETERS:
    'objControl: An object reference to the "calling" screen control
    '
    '**************************************************************************************
    On Error Resume Next

    Dim objTempControl

                                    'Generic object variable, used for getting reference.

    Dim blnTempControl
    Dim objLabel

                                    'Handle to a selected control's label - so it's text
                                    'can be modified

    Dim objDoc

                                    'Reference to another page for running external scripts.

    Dim objOption

                                    'Instance of a generic <SELECT id=select1 name=select1> OPTION.

    Dim strURL

                                    'String that holds a URL for later use.

    Dim intRtnCount

                                    'Integer used to hold the count of array "rows" returned
                                    'in mxmlBrowserCtl() from the server.

    Dim intCount

    Dim intIndex

                                    'Generic integer counter.

'=== IMG_4530 ===
    Dim intCount
                                                    'in mxmlBrowserCtl() from the server.

    Dim intIndex
                                                    'Generic integer counter.

    Dim strQS
                                                    'Integer used to vary the starting index when loading a
                                                    'combo box with items.

    Dim intResponseFilter
                                                    'The querystring portion of the URL.

    Dim objMessageBox
                                                    'The button pressed in response to a DISPLAY_QUESTION
                                                    'browser command.

    Dim strProgramType,strPageMatchCode

    Dim blnSecDisabled, blnSecVisible
                                                    ' used for functional security

                                                    ' used for functional security

    Dim objListXML
    Dim objItems
    Dim strShowZeroText

    Dim objCalls
    ' Local variables to hold values for each command as it executes
    Dim strVerb
    Dim strNoun
    Dim strAddInf
    Dim strResFil

    With objCallingWindow
        '--Spin thru the returned Browser Control xml and respond to ALL commands--
        '--from the server
        '-- check for browser commands xml

        If Not .mxmlBrowserCtl Is Nothing And Not IsEmpty(.mxmlBrowserCtl) Then

            ' Get all nodes named <call>
            Set objCalls = .mxmlBrowserCtl.selectNodes("//call")

            For intRtnCount = 0 To objCalls.length - 1

                strVerb =              UnEscapeTextValueForXML(objCalls(intRtnCount).attributes.GetNamedItem("verb").nodeValue)
                strNoun =              UnEscapeTextValueForXML(objCalls(intRtnCount).attributes.GetNamedItem("noun").nodeValue)

'=== IMG_4531 ===
                strNoun =              UnEscapeTextValueForXML(objCalls(intRtnCount).attributes.GetNamedItem("noun").nodeValue)
                strAddInf = UnEscapeTextValueForXML(objCalls(intRtnCount).attributes.GetNamedItem("addinf").nodeValue)
                strResFil = UnEscapeTextValueForXML(objCalls(intRtnCount).attributes.GetNamedItem("resfil").nodeValue)

                ' Debug code - Write the browser commands to the debug window if it is open.
                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands||1")
                If Not mvntDebugWindow Is Nothing Then
                    If mobjAQSMain.mvntDebugWindow.ShowBrowserCommands Then
                        mvntDebugWindow.ShowData (vbCrLf & strVerb & vbTab & "(" & strNoun & ") - (" & strAddInf & ") - (" & strResFil & ")")
                    End If
                End If
                Err.Clear

                If .mblnDoBrowserCommands Then
                    'If we should be executing browser commands
                    '--Execute the current browser command if a "global" command OR is a current Response Filter command--
                    If CStr(strResFil) = "" Or CStr(strResFil) = CStr(intResponseFilter) Then
                    Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|1")
                    Select Case UCase(strVerb)
                        'Look at the return verb.
                        Case "ADD_LISTITEM"
                            '=====Adds an item to the specified SELECT/COMBO control===
                            '--Get a handle to the select control specified by the server--
                            Set objTempControl = .document.all("dta" & strNoun)
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|ADD_LISTITEM|1")

                            If Not objTempControl Is Nothing Then
                                '--HTML <SELECT id=select1 name=select1> Tag--
                                If UCase(objTempControl.tagname) = "SELECT" Then
                                    Set objOption = .document.createElement("OPTION")
                                    objOption.text = strAddInf
                                    objOption.value = ""
                                    objTempControl.add(objOption)
                                        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|ADD_LISTITEM|2")
                                End If
                                    'UCase(objTempControl.tagname) = "SELECT"

                                '--COMBO Behavior--
                                If UCase(objTempControl.tagname) = "COMBO" or UCase(objTempControl.tagname) = "KPCOMBO" Then
                                    objOption.add strAddInf, ""
                                    ' Force selection of list item
                                    If Len( objOption.text ) > 0 Then objOption.text = objOption.text
                                    objOption.setwidth()

'=== IMG_4532 ===
                    objOption.setwidth()
                        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|ADD_LISTITEM|2")
                    End If
                        'UCase(objTempControl.tagname) = "COMBO" or UCase(objTempControl.tagname) = "KPCOMBO"

                            End If
                                'Not objTempControl Is Nothing

                            Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|ADD_LISTITEM|3")
                            '===========================================

                        Case "CALL_SERVER"
                            '=====Calls the server based on the current matchcode and specified call type=====
                            '*********************************************************************
                            'NOTE: It is ASSUMED that this browser command will ONLY be used when the
                            'result of this call to the server will be a NAVIGATE or NAVIGATE_CYCLING
                            'browser command and will be the last browser command. It will be VERY EASY
                            'to get unintended results or errors if the current page is not replaced
                            'with the above mentioned navigation commands AND if this command isn't the
                            'last browser command. The reason for this is, when the server is called here
                            'the original mxmlBrowserCtl doc will be cleared and filled with new commands
                            'from the 2nd server call. After the 2nd call is completed,the FIRST call to
                            'this function (ExecuteBrowserCommands) will need to finish execution. When
                            'it does, it will pick up from where it was in the original mxmlBrowserCtl
                            'doc. If we were not at the last element in the original mxmlBrowserCtl
                            'doc, the next element will be attempted to be read and may not exist OR
                            'if it does exist, will not be a command that the 1st call should execute
                            '(since it is from the 2nd call to the server). If all this sounds confusing,
                            'then you have read it correctly and should ONLY USE THIS COMMAND JUDICIOUSLY!
                            '*********************************************************************

                            .marrEEData(5) = strAddInf
                                'Set the action to the specified call type

                            ' If a control name is specified, change the control
                            If Len(strNoun) > 0 Then
                                Set objTempControl = .document.all("dta" & strNoun)
                                .marrEEData(1) = strNoun
                            Else
                                Set objTempControl = objControl
                            End If

                            Call SetArrayData(objTempControl, objCallingWindow)

'=== IMG_4533 ===
                            End If

                            Call SetArrayData(objTempControl, objCallingWindow)

                            Call .CallServer(objTempControl, False)

                            '*********************************************************************
                            ' Abort any additional server calls.
                            '*********************************************************************
                            .mblnCallServer = False
                            If Err.number = 438 Then
                                Err.Clear
                            End If
                            Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|CALL_SERVER|1")

                        Case "CLEAR_ACTIONMENU"
                            '=====Clear all/specified action menus=====
                            Call ClearActionMenus(strNoun)

                        Case "CLEAR_COMBO"
                            '=====Clear a combo box control of ALL list items=====
                            '--Get a handle to the listbox object specified by the server--
                            Set objTempControl = .document.all("dta" & strNoun)
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|CLEAR_COMBO|1")

                            If Not objTempControl Is Nothing Then
                                '--ProtoView Combo--
                                If UCase(objTempControl.tagname) = "OBJECT" Then
                                    If UCase(objTempControl.classid) = "CLSID:0FAA926E-2AF4-11D3-9995-00A0CC3A27A9" Then
                                        objTempControl.clear
                                            'delete the current list items
                                    End If
                                        'objTempControl.classid = "clsid:0FAA926E-2AF4-11D3-9995-00A0CC3A27A9"
                                End If
                                    'objTempControl.tagname = "OBJECT"

                                '--COMBO behavior--
                                If UCase(objTempControl.tagname) = "COMBO" or UCase(objTempControl.tagname) = "COMBO" Then
                                    objTempControl.clear
                                        'delete the current list items
                                End If
                                    'UCase(objTempControl.tagname) = "COMBO" or UCase(objTempControl.tagname) = "COMBO"

'=== IMG_4534 ===
                                    'delete the current list items
                            End If
                                'UCase(objTempControl.tagname) = "COMBO" or UCase(objTempControl.tagname) = "COMBO"

                                '--SELECT Tag--
                                If StrComp(objTempControl.tagname, "SELECT", vbTextCompare) = 0 Then
                                    For intCount = 1 To objTempControl.options.length
                                        objTempControl.remove(0)
                                    Next
                                End If
                                    'objTempControl.tagname = "SELECT"
                            End If

                            '===========================================
                        Case "CLEAR_SESSIONXML_ITEM"

                            Call SessionXML_ClearItem(strNoun)

                        Case "CLOSE_MODAL"
                            '=====Closes an open modal dialog window===
                            '** NOTE: This should only be used within a modal dialog window, since  **
                            '** it will close the current browser window.                            **
                            Dim objParentWindow

                            Set objParentWindow = .window.dialogArguments
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|CLOSE_MODAL|1")

                            ' Prevent the Cancel from being called in case this action
                            ' is called from something other than a Nav button
                            .mblnNavButtonClicked = True

                            'Pass back:
                            '1) The button that was pressed (OK,CANCEL,NEXT)
                            '2) The second element in the browser command (the name of the value in element 3?)
                            '3) The third element in the browser command (the data named in element 2?)
                            objParentWindow.mstrReturnValue = .marrEEData(1) & "," & _
                                                                                    strNoun & "," & _
                                                                                    strAddInf

                            Set objParentWindow = Nothing
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|CLOSE_MODAL|2")
                            .close
                            '===========================================

'=== IMG_4535 ===
                            Set objParentWindow = Nothing
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|CLOSE_MODAL|2")
                            .close
                            '===========================================

                        Case "DELETE_LISTITEM"
                            '=====Deletes an item from the specified SELECT control===
                            '--Get a handle to the select control specified by the server--
                            Set objTempControl = .document.all("dta" & strNoun)
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|DELETE_LISTITEM|1")

                            If Not objTempControl Is Nothing Then
                                For intIndex = 0 To objTempControl.options.length - 1
                                    If UCase(strAddInf) = UCase(objTempControl.options(intIndex).text) Then
                                        objTempControl.remove(intIndex)
                                        Exit For
                                    End If
                                Next
                                    'intIndex
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|DELETE_LISTITEM|2")
                            End If
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|DELETE_LISTITEM|3")
                            '===========================================

                        Case "DISPLAY_ERROR"
                            '=====Display a message to the user========
                            .ShowUserMessage strAddInf, "ERROR", 1
                            '********** Removed - The following 2 lines have been removed. ********************
                            '********** Their functionallity has been superceded by the onfocushandler.********
                            '   .mstrErrorMatchcode = .marrEEData(1)     'Set the name of the error control
                            '   .mblnCallServer = False                                'Turn off pre-processing until focus is
                                                                                        'back at the error control control

                            ' Set focus on the offending control, unless it was the ok button,
                            ' which may have started a page level validate.
                            'If StrComp(objControl.name, "OK", vbTextCompare) = 0 Or _
                            '   StrComp(objControl.name, "NEXT", vbTextCompare) = 0 Or _
                            '   StrComp(objControl.name, "BACK", vbTextCompare) = 0 Then

                            If StrComp(objControl.name, "OK", vbTextCompare) = 0 Or _
                               StrComp(objControl.name, "NEXT", vbTextCompare) = 0 THEN

                                Call SetControlFocus("CANCEL", objCallingWindow)
                                .mstrPreviousMatchcode = "tabstrip"

'=== IMG_4536 ===
                               StrComp(objControl.name, "NEXT", vbTextCompare) = 0 THEN

                                Call SetControlFocus("CANCEL", objCallingWindow)
                                .mstrPreviousMatchcode = "tabstrip"
                            Else
                                Call SetControlFocus(objControl.name, objCallingWindow)
                            End If
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|DISPLAY_ERROR|1")
                            '===========================================

                        Case "DISPLAY_MESSAGE"
                            '=====Display a message to the user========
                            'Since this browser command is used by client unique pages that may not contain
                            'all the controls that are on a base page, this check for the existence of the
                            'control prevents messages that do not apply.
                            blnTempControl = True
                            If Len(strNoun) <> 0 Then
                                If Not IsNumeric(strNoun) Then
                                    'Ignore leftover numbers from msgbox days.
                                    Set objTempControl = .document.all("dta" & strNoun)
                                        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|DISPLAY_MESSAGE|1")

                                    If objTempControl Is Nothing Then
                                        'if the control with the matchcode is not found...
                                        blnTempControl = False
                                    End If
                                End If
                            End If

                            'If the control is on the page...
                            If blnTempControl Then

                                'If the second field in strAddInf has a value, use it as the "type" of message.  This
                                'allows the DISPLAY_MESSAGE case to be used for WARNINGS or ERRORS.
                                Dim strType
                                strType = GetStringField(strAddInf,2,"##")
                                If Len(strType) = 0 Then
                                    strType = "WARNING"
                                End If

                                .ShowUserMessage GetStringField(strAddInf,1,"##"), strType, 1
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|DISPLAY_MESSAGE|2")

'=== IMG_4537 ===
                                .ShowUserMessage GetStringField(strAddInf,1,"##"), strType, 1
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|DISPLAY_MESSAGE|2")

                            End If
                            '===========================================

                        Case "DISPLAY_INFORMATION"
                            '=====Display an informational message to the user========
                            window.showModalDialog "../../system/asp/InfMsg_ISLLSYS_20010101.asp", Replace(strAddInf, "&", "&amp;"), "dialogHeight:305px; dialogWidth:400px; st«?»

                        Case "DISPLAY_TAXCITY_INFORMATION"
                            '=====Display an informational message to the user========
                            window.showModalDialog "../../system/asp/InfTaxCity_ISLLSYS_20110101.asp", Replace(strAddInf, "&", "&amp;"), "dialogHeight:500px; dialogWidth:650px«?»

                        Case "DISPLAY_QUESTION"
                            '=====Display a question to the user========
                            'The response to the question via a message box CAN alter the execution of
                            'the remaining browser commands by use of element 4 in the command array.
                            intResponseFilter = .ShowUserMessage (strAddInf,"WARNING",2)
                            '===========================================

                        Case "EXECUTE_CALLS"
                            '=====Run browser procedures of type strNoun========
                            Call RunXMLBrowserProcedures (strNoun, objCallingWindow)
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|EXECUTE_CALLS|1")
                            '===========================================

                        Case "LOAD_COMBOS"
                        '====================================================================
                        '   --- Used when you need to load multiple combos during the same post-process
                        '   xml take the format
                        '   <list>
                        '       <item value="" text=""/>
                        '   </list>
                        '====================================================================

                            Set objTempControl = .document.all("dta" & strNoun)
                            Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|LOAD_COMBOS|1")

                            If Not objTempControl Is Nothing Then
                                objTempControl.clear

'=== IMG_4538 ===
                            '====================================================================

                            Set objTempControl = .document.all("dta" & strNoun)
                            Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|LOAD_COMBOS|1")

                            If Not objTempControl Is Nothing Then
                                objTempControl.clear
                                Set objListXML = CreateObject("MSXML2.DOMDocument.6.0")
                                objListXML.async = false
                                objListXML.loadXML strAddInf
                                Set objItems = objListXML.selectNodes("//item")

                                strShowZeroText = ShowZeroText(objTempControl)
                                If Len(strShowZeroText) > 0 Then
                                    '--Add the text of showzero (typically "NONE") to the first element in the list--
                                    objControl.add strShowZeroText,""
                                    intIndex = 1
                                        'Start adding additional items at location 1 in the combo box
                                Else
                                    intIndex = 0
                                        'Start adding additional items at location 0 in the combo box
                                End If
                                intCount = 0
                                For intCount = 0 to objItems.length - 1
                                    objTempControl.add objItems.item(intCount).attributes.getNamedItem("text").nodeValue, objItems.item(intCount).attributes.getNamedItem("valu«?»
                                Next

                                Set objItems = Nothing
                                Set objListXML = Nothing

                                ' Force selection of list item
                                If Len( objTempControl.text ) > 0 Then objTempControl.text = objTempControl.text
                                objTempControl.setwidth()
                                Call TrapBrowserError("ExecuteBrowserCommands|LOAD_COMBOS|2")

                            End If

                        Case "LOAD_COMBO", "LOAD_COMBO2"

                            '--Get a handle to the listbox object specified by the server--
                            Set objTempControl = .document.all("dta" & strNoun)
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|LOAD_COMBO|1")

'=== IMG_4539 ===
                            '--Get a handle to the listbox object specified by the server--
                            Set objTempControl = .document.all("dta" & strNoun)
                                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|LOAD_COMBO|1")

                            If Not objTempControl Is Nothing Then

                                Select Case UCase(objTempControl.tagName)

                                    '--COMBO behavior Load Routine--
                                    Case "COMBO", "KPCOMBO"
                                        objTempControl.clear
                                            'delete the current list items

                                        '--Next add the new list items to the combo box--
                                        strShowZeroText = ShowZeroText(objTempControl)
                                        If Len(strShowZeroText) > 0 Then
                                                'Add the text of showzero (typically "NONE") to the first element in the list
                                            objControl.add strShowZeroText,""
                                            intIndex = 1
                                                'Start adding additional items at location 1 in the combo box
                                        Else
                                            intIndex = 0
                                                'Start adding additional items at location 0 in the combo box
                                        End If

                                        For intCount = 1 To Ubound(.marrListItems)
                                            objTempControl.add GetStringField(.marrListItems(intCount),1,"|"), GetStringField(.marrListItems(intCount),2,"|")
                                        Next
                                        ' Force selection of list item
                                        If Len( objTempControl.text ) > 0 Then objTempControl.text = objTempControl.text
                                        objTempControl.setwidth()


                                    '-------<SELECT id=select1 name=select1> tag Load Routine--------
                                    Case "SELECT"
                                        'Delete any current list items
                                        For intCount = 1 To objTempControl.options.length
                                            objTempControl.remove(0)
                                        Next

                                        For intCount = 1 To Ubound(.marrListItems)
                                            Set objOption = .document.createElement("OPTION")
                                            objOption.text = GetStringField(.marrListItems(intCount),1,"|")

'=== IMG_4540 ===
                objOption.text = GetStringField(.marrListItems(intCount),1,"|")
                objOption.value = GetStringField(.marrListItems(intCount),2,"|")
                objTempControl.add ( objOption )
            Next

        End Select
            ' UCase(objTempControl.tagName)
    End If
        'Not objTempControl Is Nothing
    '===================================================

Case "LOAD_XMLDOCUMENT"
    '=====Put xml into data island on calling page
    ' strNoun data island name
    ' strAddInf xml string

    strAddInf = Replace(strAddInf,Chr(34),"'")
    strAddInf = Replace(strAddInf,Chr(10),"")
    strAddInf = Replace(strAddInf,Chr(12),"")

    Execute strNoun & ".loadXML " & Chr(34) & strAddInf & Chr(34)

        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|LOAD_XMLDOCUMENT|1")
    '===================================================

Case "LOAD_XMLLIST"

    ' strNoun   xmllist name (include . in front if list on calling window
    ' strAddInf xml string

    strAddInf = Replace(strAddInf,Chr(34),"'")
    strAddInf = Replace(strAddInf,Chr(10),"")

    strAddInf = Replace(strAddInf,Chr(12),"")

    Execute strNoun & ".xmlData = " & Chr(34) & strAddInf & Chr(34)

    Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|LOAD_XMLLIST|1")
    '===================================================
Case "OPEN_WINDOW"

    window.open strAddInf, strNoun, "channelmode=no,directories=no,fullscreen=no,height=550,location=no,menubar=no," & _

'=== IMG_4541 ===
    window.open strAddInf, strNoun, "channelmode=no,directories=no,fullscreen=no,height=550,location=no,menubar=no," & _
        "resizable=yes,scrollbars=no,status=no,titlebar=no,toolbar=no,width=750"
    Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|OPEN_WINDOW|1")

Case "NAVIGATE"
    '=====Navigate to a new page===================
    strURL = strAddInf
    window.navigate(strURL)
    .mblnDoBrowserCommands = False

                        'Don't allow anymore browser commands to be executed
    Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|NAVIGATE|1")
    '===================================================

Case "NAVIGATE_CYCLING"
    '=====Navigate to the cycling page=========
    'Navigate by calling the ShowPage function located in
    'the AQSMain.asp file (the main frame page).
    Dim strMatchCode
    Dim strNodeKey
    Dim intTab

    ' If NAVIGATE_CYCLING is called with a sting in the strAddInf field, it may be used to navigate
    ' directly to the specified action/nodekey without regard to marrEEData and marrSessionInformation.
    ' This allows this browser command to be executed from non eebrowser pages.
    '   strAddInf = "ACTION##POL|LOBLVL|0|##90##"  --translates to--> ExecuteAction ("ACTION", "POL|LOBLVL|0|", "90", "")
    If Len(strAddInf) > 0 And InStr(1, strAddInf, "##") > 0 Then
        Call ExecuteAction (GetStringField(strAddInf,1,"##"), GetStringField(strAddInf,2,"##"), GetStringField(strAddInf,3,"##"), GetStringField(strAdd‹?›
    Else
        '--Check to see if the current control is an XMLLIST. If so, use the--
        '--VALUE of the control instead of the MATCHCODE so we can tell        --
        '--cycling which button was pressed in the XMLLIST rather than the   --
        '--matchcode assigned to the XMLLIST object.     --

        If IsObject(objControl) Then
            If UCase(objControl.tagname) = "XMLLIST" Then
                strMatchCode = UCase(GetControlValue(objControl))
                'If the action is ADD, then use the parent NodeKey
                If strMatchCode = "ADD" Then
                    strNodeKey = .marrSessionInformation(3)
                Else
                    If InStr(1,.marrEEData(3),"|",vbTextCompare) > 0 Then
                        strNodeKey = .marrEEData(3)
                    Else

'=== IMG_4542 ===
Else
    strNodeKey = .marrSessionInformation(3)
End If
'strNodeKey = .marrEEData(3)
End If
Else
    If InStr(1,.marrEEData(3),"|",vbTextCompare) > 0 Then
        strNodeKey = .marrEEData(3)
    Else
        strNodeKey = .marrSessionInformation(3)
    End If
    strMatchCode = .marrEEData(1)
End If

' Look for an alternate nodekey (use it, clear it)
If Len(.marrEEData(11)) > 0 Then
    strNodeKey = .marrEEData(11)
    .marrEEData(11) = ""
End If

End If


' If this is a page refresh due to a rate level change then open the page
' on the same tab that the user was on.
intTab = 0
If StrComp(strMatchCode, "RLVUPDATE", vbTextCompare) = 0 Then
    If Not objCallingWindow.all("tabstrip") Is Nothing Then
        intTab = .tabstrip.SelectedTab
    End If
End If

If .mblnModal And mblnNextAction_DeferNavigation Then
    ' This is a modal calling for the next action, wait till it closes before calling the next page.
    Call SetNextAction(.marrSessionInformation(4) & "|" & strMatchCode,strNodeKey,intTab,Escape(.marrSessionInformation(6)))
Else
    'Do not allow any more browser commands to be executed
    If Not objCallingWindow.closed Then
        .mblnDoBrowserCommands = False
    End If
    ' move on
    Call ExecuteAction(.marrSessionInformation(4) & "|" & strMatchCode,strNodeKey,intTab,Escape(.marrSessionInformation(6)))
End If

'=== IMG_4543 ===
                End If
                ' move on
                Call ExecuteAction(.marrSessionInformation(4) & "|" & strMatchCode,strNodeKey,intTab,Escape(.marrSessionInformation(6)))
            End If

        End If
        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|NAVIGATE_CYCLING|1")
        '=============================================

    Case "UTILITY_NAVIGATE_CYCLING"
        '=====Navigate to the cycling page==========
        'Navigate by calling the ShowPage function located in
        'the AQSMain.asp file (the main frame page).

            If IsObject(objControl) Then
                If UCase(objControl.tagname) = "XMLLIST" Then
                    strMatchCode = UCase(GetControlValue(objControl))
                    'If the action is ADD, then use the parent NodeKey
                    strNodeKey = .marrSessionInformation(3)
                Else
                    strNodeKey = .marrSessionInformation(3)
                    strMatchCode = .marrEEData(1)
                End If
            End If

            intTab = 0

            If .mblnModal And mblnNextAction_DeferNavigation Then
                ' This is a modal calling for the next action, wait till it closes before calling the next page.
                Call SetNextAction(.marrSessionInformation(4) & "|" & strMatchCode,strNodeKey,intTab,Escape(.marrSessionInformation(6)))
            Else
                'Do not allow any more browser commands to be executed
                If Not objCallingWindow.closed  Then
                    .mblnDoBrowserCommands = False
                End If
                ' move on
                Call ExecuteAction(.marrSessionInformation(4) & "|" & strMatchCode,strNodeKey,intTab,Escape(.marrSessionInformation(6)))
            End If

        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|UTILITY_NAVIGATE_CYCLING|1")

    Case "NAVIGATE_PARENTWINDOW"
        '=====Navigate to the parent window and close this window=====

'=== IMG_4544 ===
        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|UTILITY_NAVIGATE_CYCLING|1")

    Case "NAVIGATE_PARENTWINDOW"
        '=====Navigate to the parent window and close this window=====
        .mblnDoBrowserCommands = False

                                    'Don't allow anymore browser commands to be executed

        If StrComp(Left(me.name,6), "policy", vbTextCompare) = 0 Then
            mblnDataChanged = False
            mblnRatingDataChanged = False

                                    'clear the data changed indicator - this prevents the
                                    'message cautioning the user about loosing data.

            Dim objScript
            ' Set the datachanged indicator to false on the page in the current frame if it has eebrowser script.
            ' In the event that a modal has issued the NAVIGATE_PARENTWINDOW command, the page that
            ' launched the modal may appear to have changed data.  This is the case when changing status to
            ' incomplete.
            Set objDoc = document.all(mstrCurrentFrame)
            If Not objDoc Is Nothing Then
                Set objDoc = objDoc.contentWindow
                If Not objDoc Is Nothing Then
                    Set objScript = objDoc.document.scripts("eebrowser")
                    If Not (objScript is Nothing) Then
                        Set objScript = Nothing
                        objDoc.mblnEEDataChanged = False
                        Set objDoc = Nothing
                    End If
                End If
            End If
            .mblnClosing = True
            me.close
                'close this window if it is a policy window
        End If


        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|NAVIGATE_PARENTWINDOW|1")
        '=============================================

    Case "OPEN_MODAL"
        '=====Open a modal dialog window===========
        'Open the URL passed to the browser via the querystring
        '"ModalURL" in a modal dialog window.
        Dim intHeight
        Dim intWidth
        Dim strFrame

'=== IMG_4545 ===
        Case "OPEN_MODAL"
            '=====Open a modal dialog window===========
            'Open the URL passed to the browser via the querystring
            '"ModalURL" in a modal dialog window.
            Dim intHeight
            Dim intWidth
            Dim strFrame
            Dim strModalSize
            Dim strModalURL

            '--Log the starting time & reset the ending times of the request--
            mlngTimeStartModalRequest = GetTimeMilliseconds()
                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|OPEN_MODAL|1")
            mlngTimeEndModalRequest = 0
                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|OPEN_MODAL|2")

            '--First, check for an action passed with the browser command--
            If Len(strNoun) > 0 Then

                ' If marrEEData(3) is not a nodekey, use .marrSessionInformation(3)
                If InStr(1,.marrEEData(3),"|",vbTextCompare) > 0 Then
                    strNodeKey = .marrEEData(3)
                Else
                  strNodeKey = .marrSessionInformation(3)
                End If
                ' Look for an alternate nodekey (use it, clear it)
                If Len(.marrEEData(11)) > 0 Then
                    strNodeKey = .marrEEData(11)
                    .marrEEData(11) = ""
                End If


                Call GetCyclingValues (strNoun, strNodeKey, 1, .marrSessionInformation(6), strFrame, strModalURL, strModalSize)
                strModalURL = strModalURL & "&modal=1"

            '--Otherwise, check for a defined URL passed via a querystring--
            ElseIf Len(.mstrModalURL) > 0 Then

                strModalURL = .mstrModalURL
                strModalSize = .mstrModalSize

                If strAddInf = "PRESERVE NODEKEY" Or UCase(.marrEEData(5)) = "ADD" Then
                  strNodeKey = .marrSessionInformation(3)

'=== IMG_4546 ===
                strModalSize = .mstrModalSize

                If strAddInf = "PRESERVE NODEKEY" Or UCase(.marrEEData(5)) = "ADD" Then
                  strNodeKey = .marrSessionInformation(3)
                Else
                    strNodeKey = .marrEEData(3)
                End If
                ' Look for an alternate nodekey (use it, clear it)
                If Len(.marrEEData(11)) > 0 Then
                    strNodeKey = .marrEEData(11)
                    .marrEEData(11) = ""
                End If

                strQS = "?userid="        & .marrSessionInformation(1) & _
                        "&policyid="      & .marrSessionInformation(2) & _
                        "&nodekey="       & strNodeKey & _
                        "&action="        & UCase(.marrEEData(5)) & _
                        "&diagnosticmode="& .marrSessionInformation(5) & _
                        "&xmlfile="       & .mstrModalXML & _
                        "&modal=1"        & _
                        "&xmldetail="     & Escape(.marrSessionInformation(6))

                strModalURL = strModalURL & strQS

            End If

            '--Next, look for the size of the modal dialog--
            If Len(strModalSize) > 0 Then
                '--Set the sizes--
                intHeight = GetStringField(strModalSize,1,",")
                intWidth = GetStringField(strModalSize,2,",")

            Else
                'mstrModalSize = ""
                '--OR, set the default sizes--
                intHeight = 200
                intWidth = 300
            End If
                'mstrModalSize <> ""

            If strModalURL <> "" Then

                '--Finally, build the querystring values for the URL--

'=== IMG_4547 ===
            If strModalURL <> "" Then

                '--Finally, build the querystring values for the URL--
                'NOTE: the nodekey querstring value is being "blindly" set
                'from the 3rd element in marrEEData which SHOULD have the value
                'properly set as a result of a button click event of the XMLList
                'behavior component OR the double click of a coverage list control.

                'Get the value

                '--Put it all together and bring up the modal window--
                .showModalDialog (strModalURL),window,("dialogHeight:" & intHeight & "px; dialogWidth:" & intWidth & "px; status:no; " & "scroll:no")

                'Need to set focus to something after coming back from the modal,
                'Otherwise, if the user does not go directly to this page,
                'but to another window, an error will occur when this page gets focus.
                If .dtaCancel.enabled Then
                    .dtaCancel.focus
                End If
                Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|OPEN_MODAL|3")
            End If
                'mstrModalURL <> ""
        '=============================================

    Case "RATE"
        '===Starts Rating===
        Dim objMenu
        Set objMenu = window.frames("menu")
        objMenu.RatePolicy()
        Set objMenu = Nothing
        ' Exit because rating call execute action making the objCallingWindow unavailable
        Exit Sub

    Case "REFRESH_LIST", "REFRESH_LIST_PARENT"
        '===Reload the XML Document for the docXSLList===
        '===Data Island.
        Dim objRequest
        Dim strXML

        Select Case strVerb
            Case "REFRESH_LIST_PARENT"
                Set objDoc = window.frames("main")

'=== IMG_4548 ===
            Set objDoc = window.frames("main")
        Case "REFRESH_LIST"
            Set objDoc = objCallingWindow
        End Select

        Set objRequest =  CreateObject("MSXML2.XMLHTTP.6.0")
        strURL = objDoc.mstrXMLHttpPath & "system/asp/XmlServercall.aspx?object=RefreshList"
        strQS =  "&userid="        & objDoc.marrSessionInformation(1) & _
                    "&policyid="      & objDoc.marrSessionInformation(2) & _
                        "&nodekey="       & objDoc.marrSessionInformation(3) & _
                        "&action="        & objDoc.marrSessionInformation(4) & _
                        "&diagnosticmode=" & objDoc.marrSessionInformation(5) & _
                        "&xmllist="       & Escape(objDoc.mstrXMLList) & _
                        "&xmldetail="        & Escape(Compress(objDoc.marrSessionInformation(6)))
        strURL = strURL & strQS
        objRequest.open "POST", strURL, False
        objRequest.setRequestHeader "Content-Type", "text/xml-SOAP"
        objRequest.setRequestHeader "MessageType", "Call"
        objRequest.Send ("<aqs/>")

        '// Check for errors
        'if recovery from async don't check list
        Call CheckForAsynchProcess(SetExpiredNumber(pstrNodeKey), "CHECKASYNCH", blnProgressBar)
        If Not blnProgressBar then

            If Not TrapXMLParseError(objRequest.responseXML, "ExecuteBrowserCommands|REFRESH_LIST") Then
                If Not  TrapXMLReturnErrors(objRequest.responseXML, "ExecuteBrowserCommands|REFRESH_LIST") Then
                    strXML = objRequest.responseXML.selectSingleNode("//results/list").xml & ""
                    objDoc.dtaXMLLIST.XMLData = strXML
                End If
            End If

        End if
        '=============================================

    Case "REFRESH_SEARCHPAGELISTS"
        '===Refresh both search lists on the start page: Policy Search & WIP Queue===
        RefreshSearchPageLists

    Case "SET_ATTRIBUTE", "SET_ATTRIBUTE_PARENT"
        '=====sets the specified attribute===
        '--Get a handle to the control specified by the server--
        Select Case strVerb

'=== IMG_4549 ===
        Select Case strVerb
            Case "SET_ATTRIBUTE_PARENT"
                Set objDoc = window.frames("main")
            Case "SET_ATTRIBUTE"
                Set objDoc = objCallingWindow
        End Select

            Set objTempControl = objDoc.document.all("dta" & strNoun)
            If Not objTempControl Is Nothing Then
        Call objTempControl.setAttribute(Split(strAddInf,"##")(0), Split(strAddInf,"##")(1))
        Set objTempControl = Nothing
    End If

            Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_ATTRIBUTE")
            '=============================================

    Case "SET_CONTROLATTRIBUTE"
        '=====sets the specified control attribute===
            '--Get a handle to the control specified by the server--
            Set objTempControl = .document.all("dta" & strNoun)
            Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_CONTROLATTRIBUTE")
            Call SetControlAttribute( objTempControl,strNoun,Split(strAddInf,"##")(0),Split(strAddInf,"##")(1),objCallingWindow)
        '=============================================

    Case "SET_DISABLED", "SET_DISABLED_PARENT"
        '=====Make a control disabled/enabled======

        '// Added for functional security
        blnSecDisabled = true
        blnSecVisible = false
        strProgramType=""
        strPageMatchCode=""
        With objCallingWindow
            strProgramType = GetActionMenuNameException(.marrSessionInformation(3))
            Set nodPageMatchCode = .mxmlDoc.selectSingleNode("//page")
            If Not nodPageMatchCode Is Nothing Then
                strPageMatchCode = nodPageMatchCode.attributes.getNamedItem("matchcode").value
            End If
            Set nodPageMatchCode = Nothing
            Call GetSecurityValues(strProgramType,strPageMatchCode,strNoun,blnSecDisabled,blnSecVisible)
        End With
        '// End add for functional security

        If Not blnSecDisabled Then

'=== IMG_4550 ===
                If Not blnSecDisabled Then

                    Select Case strVerb
                        Case "SET_DISABLED_PARENT"
                            Set objDoc = window.frames("main")
                        Case "SET_DISABLED"
                            Set objDoc = objCallingWindow
                    End Select

                    Set objTempControl = objDoc.document.all("dta" & strNoun)
                    Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_DISABLED|1")
                    Call SetControlAttribute(objTempControl, strNoun, "DISABLED", UCase(strAddInf), objDoc)

                End If
                '=============================================

    Case "SET_FOCUS"
        '=====Set focus to a control================
        Call SetControlFocus(strNoun,objCallingWindow)
        '=============================================

    Case "SET_LABELTEXT"
        '=====Set the L value of a control===========
        'Get a handle to the object
        Set objTempControl = .document.all("lbl" & strNoun)
            Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_LABELTEXT|1")
        Call SetControlValue(objTempControl,"",strAddInf,"L",objCallingWindow)
        '=============================================

    Case "SET_LISTINDEX"
        '=====Set the X value of a control===========
        'Get a handle to the object
        Set objTempControl = .document.all("dta" & strNoun)
            Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_LISTINDEX|1")
        Call SetControlValue(objTempControl,strNoun,strAddInf,"X",objCallingWindow)
        '=============================================

    Case "SET_REQUIRED", "SET_REQUIRED_PARENT"

        '=====Make a control required/not required=====
        Select Case strVerb
            Case "SET_REQUIRED_PARENT"
                Set objDoc = window.frames("main")

'=== IMG_4551 ===
            Set objDoc = window.frames("main")
            Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_DISABLED_PARENT|1")
            Set objTempControl = objDoc.document.all("dta" & strNoun)
        Case "SET_REQUIRED"
            Set objTempControl = .document.all("dta" & strNoun)
        End Select

        If Not objTempControl Is Nothing Then
            Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_REQUIRED|1")
            Call SetControlAttribute(objTempControl, strNoun, "REQUIRED", UCase(strAddInf), objCallingWindow)

            '// Code to handle resetting label (removing of *)
            '--Get a handle to  control's label (if any)--
            Select Case strVerb
                Case "SET_REQUIRED_PARENT"
                    Set objLabel = objDoc.document.all("lbl" & strNoun)
                Case "SET_REQUIRED"
                    Set objLabel = .document.all("lbl" & strNoun)
            End Select
            Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_REQUIRED|2")

            If Not objLabel Is Nothing Then
                If StrComp(strVerb, "SET_REQUIRED_PARENT", vbTextCompare) = 0 Then
                    If StrComp(Trim(strAddInf), "1", vbTextCompare) = 0 Then
                        If StrComp(Left(objLabel.innertext,1), "*", vbTextCompare) <> 0 Then
                            objLabel.innertext = "*" & objLabel.innertext
                            objLabel.style.color = mhexRequiredLabelColor
                            objLabel.style.fontWeight = "bold"
                        End If
                    Else
                        If StrComp(Left(objLabel.innertext,1), "*", vbTextCompare) = 0 Then
                            objLabel.innertext = Mid(objLabel.innertext,2)
                            objLabel.style.color = "#000000"
                            objLabel.style.fontWeight = "normal"
                        End If
                    End If
                Else
                    If Left(objLabel.innertext,1) = "*" Then
                        objLabel.innertext = Mid(objLabel.innertext,2)
                    End If
                End If

                objLabel.innerHTML = objLabel.innertext

'=== IMG_4552 ===
                objLabel.innerHTML = objLabel.innertext
                '--Clean Up--
                Set objLabel = Nothing
            End If
            '// End Code to handle resetting label (removing of *)

            Call SetRequiredIndicator(objTempControl, objCallingWindow)
            Call CheckRequiredIndicators("",objCallingWindow)
        End If
        '=============================================

    Case "SET_TEXT"
        '=====Set the L value of a control===========
        'Get a handle to the object
        Set objTempControl = .document.all("dta" & strNoun)
        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_TEXT|1")
        Call SetControlValue(objTempControl,strNoun,strAddInf,"L",objCallingWindow)
        '=============================================

    Case "SET_TEXT_PARENT"
        '=====Set the L value of a control on the parent page===========
        'Get a handle to the object

        Set objDoc = window.frames("main")
        'Set objDoc = .dialogArguments
        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_TEXT_PARENT|1")

        Set objTempControl = objDoc.document.all("dta" & strNoun)
        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_TEXT_PARENT|3")
        Call SetControlValue(objTempControl,strNoun,strAddInf,"L",objCallingWindow)
        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_TEXT_PARENT|4")
        '=============================================

    Case "SET_VARIABLE"
        '=====Set a module-level variable in AQSMain=====
        'This uses the Execute Statement to run a constructed line of code. An
        'example of this is:
        '           Execute "mobjAQSMain.blnPolicyRated=False"
        '
        'This would set the "blnPolicyRated" variable in AQSMain to "False".
        'Note: There appears to be no errors generated if a non-existing variable
        'is assigned in this manner - so we are not testing for the existance
        'before executing.
        'Note 2: This routine does not explicitly place quotes around the value to

'=== IMG_4553 ===
        'Note: There appears to be no errors generated if a non-existing variable
        'is assigned in this manner - so we are not testing for the existance
        'before executing.
        'Note 2: This routine does not explicitly place quotes around the value to
        'be assiged, otherwise this would not allow the setting of a numeric or boolean
        'value. Therefore, if you need to set a string expression, you MUST include the
        'quotes around the value using chr(34) or some other method.

        ' Exception: change  mblnPolicyRated to GlobalVars.mblnPolicyRated
        If StrComp(strNoun, "mblnPolicyRated", vbTextCompare) = 0 Then
            Execute strNoun & "=" & strAddInf
                'Temporary
            strNoun = "GlobalVars." & strNoun
        End If

        Execute strNoun & "=" & strAddInf
        'If InStr(strNoun, "mblnClientIssueAllowed") > 0 Then
        If InStr(strNoun, "GlobalVars") > 0 Then
          ' get the lobAction menu page xml
          Dim lobPage
          Set lobPage = mobjAQSMain.frames("LOB")
          If Not lobPage Is Nothing Then
            If Not lobPage.document.scripts.namedItem("SubmitAndIssueScript") Is Nothing Then
                Call lobPage.UpdateSubmitAndIssueButtons()
            End If
            Set lobPage = Nothing
          End If
        End If

        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_VARIABLE|1")
        '=============================================

    Case "SET_VISIBILITY", "SET_VISIBILITY_PARENT"
        '=====Make a control visible/invisible=====

        Select Case strVerb
            Case "SET_VISIBILITY_PARENT"
                Set objDoc = window.frames("main")
            Case "SET_VISIBILITY"
                Set objDoc = objCallingWindow
        End Select

        '// Added for functional security

'=== IMG_4554 ===
Call GetSecurityValues(strProgramType,strPageMatchCode,strNoun,blnSecDisabled,blnSecVisible)
End With
'// End add for functional security

Set objTempControl = objDoc.document.all("dta" & strNoun)
Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SET_VISIBILITY|1")
If blnSecVisible Then
    Call SetControlAttribute(objTempControl, strNoun, "VISIBLE", UCase(strAddInf), objDoc)
End If
'==========================================
              Case "SHOW_EDITS"
Set mxmlBatchEdits = CreateObject("MSXML2.DOMDocument.6.0")
With mxmlBatchEdits
  .async = false
  .LoadXML strAddInf
End With
Call ShowBatchEdits(strNoun)
Call TrapBrowserError("ExecuteBrowserCommands|SHOW_EDITS")
Case "SHOW_PROGRESS"

              '=====Open a modal dialog window which starts an async process, then returns xml doc===========
              'Open the ShowProgress.asp page in a modal dialog window with the querystring as built below.
              'Include the array element strAddInf for additional query string values.

              'strAddInf  should contain:

              '   &object      = [ name in case statement in XmlServercall.aspx]
              '   &function    = [ text to identify process to user and timing label]

              'Clear previous return values
              Set .mxmlResults = Nothing
                  Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SHOW_PROGRESS|1.1")

              'Set up querystring
              strQS = "?userid="                    & .marrSessionInformation(1) & _
                        "&policyid="                  & .marrSessionInformation(2) & _
                        "&nodekey="                   & .marrSessionInformation(3) & _
                        "&action="                    & .marrSessionInformation(4) & _
                        "&diagnosticmode="  & .marrSessionInformation(5) & _
                        "&xmldetail="                 & Escape(.marrSessionInformation(6)) & _
                        "&modal=1"                    & _
                        "&returntype=xml"      & _
                        strAddInf
                  Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SHOW_PROGRESS|1.2")

'=== IMG_4555 ===
    Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SHOW_PROGRESS|1.2")

    '--Put it all together and bring up the progress modal window--

    .showModalDialog "../../system/asp/showprogress.asp" & strQS, objCallingWindow, "dialogHeight:80px; dialogWidth:420px; status:no"
        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SHOW_PROGRESS|1.3")

    'Here is where we must decide what to do with the information returned by the page called.
    'This first attempt to use this does not return any data.  Only success or failure of the call.
    'Therefore, if any error occurs, abort further processing of browser commands.
    Dim blnAbort
    'assume failure in the event the user closes the progress modal.
    blnAbort = True

    If Not .mxmlResults Is Nothing Then
        'Upon completion, check for a parse error.
        If Not TrapXMLParseError(.mxmlResults, "EEBrowser|ExecuteBrowserCommands|SHOW_PROGRESS|2") Then
            'Now chech for runtime errors that occured on the server call page
            If Not TrapXMLReturnErrors(.mxmlResults, "EEBrowser|ExecuteBrowserCommands|SHOW_PROGRESS|3") Then
                blnAbort = False
            End If
        End If
    Else

        Err.Raise vbObjectError + 5002,"",""
        Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SHOW_PROGRESS|4")
    End If

    'Clear return values
    Set .mxmlResults = Nothing

    'Need to set focus to something after coming back from the modal,
    'Otherwise, if the user does not go directly to this page,
    'but to another window, an error will occur when this page gets focus.
    .dtaCancel.focus

    'If any error occured processing the progress modal, abort browser command processing.
    If blnAbort Then Exit For

    Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|SHOW_PROGRESS|5")
'==========================================

              Case "CLICK_BUTTON"
              '=====Simulate clicking an info button============

'=== IMG_4556 ===
'==========================================

              Case "CLICK_BUTTON"
              '=====Simulate clicking an info button============
              'Get a handle to the object
              Call InfoButtonOnClick ( "dta" & strNoun , objCallingWindow )
                  Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|CLICK_BUTTON|1")
              '==========================================

              Case "UPDATE_TREENODETEXT", "UPDATE_TREENODEKEY", "REMOVE_TREENODE", "BUILD_TREE","UPDATE_TREENODEIMAGE"
              '=====Update the tree as required=====
              Set objDoc = document.frames("tree")

              Select Case strVerb
                  Case "UPDATE_TREENODETEXT"
                      Call objDoc.UPDATE_TREENODETEXT ( Escape(strNoun) , Escape(strAddInf) )
                      '==========================================
                  Case "UPDATE_TREENODEKEY"
                      Call objDoc.UPDATE_TREENODEKEY ( Escape(strNoun) , Escape(strAddInf) )
                      '==========================================
                  Case "REMOVE_TREENODE"
                      Call objDoc.REMOVE_TREENODE ( Escape(strNoun) , Escape(strAddInf) )
                      '==========================================
                  Case "BUILD_TREE"
                      Call objDoc.BUILD_TREE ( Escape(strNoun) , Escape(strAddInf) )
                      '==========================================
                  Case "UPDATE_TREENODEIMAGE"
                      Call objDoc.UPDATE_TREENODEIMAGE ( Escape(strNoun) , Escape(strAddInf) )
                      '==========================================
              End Select
              Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|TREENODECOMMANDS|1|" & strVerb)
              '==========================================

        End Select
              'UCase(strVerb)
    End If
              'CStr(strResFil) = "" OR CStr(strResFil) = CStr(intResponseFilter)
End If
    'mblnDoBrowserCommands

Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|2")

'--Clean up the generic objects everytime through the loop--

'=== IMG_4557 ===
              'CStr(strResFil) = "" OR CStr(strResFil) = CStr(intResponseFilter)
    End If
          'mblnDoBrowserCommands

    Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|2")

    '--Clean up the generic objects everytime through the loop--
    Set objTempControl  = Nothing
    Set objDoc                     = Nothing
    Set objOption                  = Nothing

Next
          'intRtnCount = 0 To objCalls.length - 1
    End If
          'Not .mxmlBrowserCtl Is Nothing And Not IsEmpty(.mxmlBrowserCtl)

    If Not objCallingWindow.closed  Then
        ' Make sure the calling window is still there and not replaced by the loading.htm page.
        If Not objCallingWindow.document.scripts("eebrowser") Is Nothing Then
        .mblnDoBrowserCommands = True
              'Allow browser commands to be executed again.
        Set .mxmlBrowserCtl = Nothing
        End If

        Call ShowConversionReport

    End If
    End With
          'objCallingWindow

    Call TrapBrowserError("EEBrowser|ExecuteBrowserCommands|3")

End Sub
'------------------------------------------------------------------------------

Sub FillCallArray(ByVal strMatchcode, ByVal strPrePostType, ByRef objCallingWindow)
    '*****************************************************************************
    'PURPOSE:
    'This subroutine queries the XML Data Island, included in the page, for
    'either Page-Level or MatchCode-Level subroutine calls used by the server
    'to either pre-process or post-process a mactchcode or the page.  If any
    'requested "calls" are found in the XML file, they will be inserted into the
    'module-level marrServerCalls() array, which is later passed to the server.

'=== IMG_4558 ===
'------------------------------------------------------------------------------

Sub FillCallArray(ByVal strMatchcode, ByVal strPrePostType, ByRef objCallingWindow)
    '*****************************************************************************
    'PURPOSE:
    'This subroutine queries the XML Data Island, included in the page, for
    'either Page-Level or MatchCode-Level subroutine calls used by the server
    'to either pre-process or post-process a mactchcode or the page.  If any
    'requested "calls" are found in the XML file, they will be inserted into the
    'module-level marrServerCalls() array, which is later passed to the server.
    '

    'PARAMETERS:
    '  strMatchcode: The name of the matchcode being sent to the server. If no
    '                matchcode, then we are looking for Page-Level calls.
    '
    'strPrePostType: If a matchcode, a "0" or "1" will indicate a "Pre" or "Post"
    '                process respectively. If a Page-Level call, then this
    '                indicates an "Entry", "Edit", "Save", "Cancel", or "Next"
    '                type of call.
    '
    '*****************************************************************************

    On Error Resume Next

    Dim objNodes

                                        'The object holding the results of the query.

    Dim objNamedNodeMap

                                        'An object allowing access to the attribute-level tags
                                        'of an XML node.
    Dim strQuery

                                        'The query string used in the XML query.
    Dim intCount

                                        'Generic loop counter.

    '--Condition the in-coming parameters--
    If strMatchcode = "" Then strMatchcode = "page"

    Select Case strPrePostType
        Case "0"
            strPrePostType = "pre"
        Case "1"
            strPrePostType = "post"
        Case Else
            strPrePostType = LCase(strPrePostType)
    End Select

'=== IMG_4559 ===
              strPrePostType = "post"
          Case Else
              strPrePostType = LCase(strPrePostType)
    End Select

    With objCallingWindow
        If Not .mxmlDoc Is Nothing Then
          '--Build the XSL query string--
          'Handle the component-level routine calls where strPrePostType is:
          '"Pre", "Post"
          strQuery = "//control[@matchcode=""" & strMatchcode & """]/calls[@type=""" & strPrePostType & """]/call"
          'sample query: //control[@matchcode="LPOLNUM"]/calls[@type="post"]/call

          '--Find all the control nodes in the XMLDI--
          Set objNodes = .mxmlDoc.selectnodes(strQuery)
              Call TrapBrowserError("EEBrowser|FillCallArray|1")

          '--Redim the server calls array and fill by spinning through the returned nodes--
          'Redim marrServerCalls(objNodes.length,2)
          Call .ReDimBrowserArray(objNodes.length,2,"marrServerCalls")
              Call TrapBrowserError("EEBrowser|FillCallArray|2")

          For intCount = 1 To objNodes.length
              Set objNamedNodeMap = objNodes(intCount-1).attributes
                  Call TrapBrowserError("EEBrowser|FillCallArray|3")

              .marrServerCalls(intCount,1) = objNamedNodeMap.getNamedItem("project").nodevalue & "." & objNamedNodeMap.getNamedItem("class").nodevalue
              .marrServerCalls(intCount,2) = objNamedNodeMap.getNamedItem("subroutine").nodevalue
          Next
              'intCount = 0 to objNodes.length - 1
        End If
              'Not mxmlDoc Is Nothing
    End With
          'objCallingWindow

    Call TrapBrowserError("EEBrowser|FillCallArray|4")
    '--Clean Up--
    Set objNodes                   = Nothing
    Set objNamedNodeMap = Nothing

End Sub
'------------------------------------------------------------------------------

'=== IMG_4560 ===
    End Sub
'------------------------------------------------------------------------------

Sub FillComboList(ByRef objControl, ByRef objCallingWindow)
    '*****************************************************************************
    '*****************************************************************************
    'Holder for the text of the value attribute.
    Dim strValue
    'Generic reference to <Item> nodes for a combo box control within the XML, via an XML query.
    Dim objListItems
    'Generic integer counter spinning through the list items for a combo box
    Dim intItemCount
    'Generic object reference to all attributes within a ListItems node.
    Dim objNamedNodeMapLI
    'A flag representing the value of the LimitToList HTML attribute for a single combo box control
    Dim blnLimitToList
    Dim strShowZeroText

        On Error Resume Next
            If UCase(objControl.tagname) = "COMBO" or UCase(objControl.tagname) = "KPCOMBO" Then
                  '--AQS Combo Box Behavior--

                  '--Since we are dealing with a combobox control, we need to look--
                  '--for any <item> nodes to use for the list

                                                                                                                                --

                  If Not objCallingWindow.mxmlDoc.selectSingleNode("//control[@matchcode=""" & objControl.name & """]//option") Is Nothing Then

                        Set objListItems = objCallingWindow.mxmlDoc.selectSingleNode ("//control[@matchcode=""" & objControl.name & """]//options")
                        objControl.add objListItems.xml,""

                  Else

                        Set objListItems = objCallingWindow.mxmlDoc.selectnodes("//control[@matchcode=""" & objControl.name & """]//item")

                  objControl.clear
                        'delete any current list items

                  'Next add the new list items to the combo box
                  strShowZeroText = ShowZeroText(objControl)
                  If Len(strShowZeroText) > 0 Then
                      'Add the text of showzero (typically "NONE") to the first element in the list
                      objControl.add strShowZeroText,""

'=== IMG_4561 ===
    strShowZeroText = ShowZeroText(objControl)
    If Len(strShowZeroText) > 0 Then
        'Add the text of showzero (typically "NONE") to the first element in the list
        objControl.add strShowZeroText,""
    End If

    'Add the rest of the list items
    For intItemCount = 0 To objListItems.length - 1
        '--Get the "value" attribute of the listitem xml node--
        Set objNamedNodeMapLI = objListItems(intItemCount).attributes

        If Not objNamedNodeMapLI.getNamedItem("value") Is Nothing Then
            strValue = objNamedNodeMapLI.getNamedItem("value").nodevalue
        Else
            strValue = ""
        End If

        objControl.add objListItems(intItemCount).text, strValue
    Next
        'intItemCount = 0 To objListItems.length - 1

              End If


              If Len(objControl.text) > 0 Then objControl.text = objControl.text
              ' Special method to manage the list appearance. (width, position, length)
              ' this eliminate the need to do this for every .Add and waste time.
              objControl.setWidth()

        End If
              'UCase(objControl.tagname) = "COMBO" or UCase(objControl.tagname) = "KPCOMBO"
    Call TrapBrowserError ("FillComboList|1")
End Sub
'------------------------------------------------------------------------------

Sub FillSelectList(ByRef objControl, ByRef objNodes, ByVal strRelatedList, ByRef objCallingWindow)
    '*****************************************************************************
    '*****************************************************************************

    Dim blnAddOption

                                        'Boolean used to indicate the result of test to include
                                        'Options for select list

'=== IMG_4562 ===
Sub FillSelectList(ByRef objControl, ByRef objNodes, ByVal strRelatedList, ByRef objCallingWindow)
    '*****************************************************************************
    '*****************************************************************************

    Dim blnAddOption

                                        'Boolean used to indicate the result of test to include
                                        'Options for select list

    Dim strMultiSelect

                                        'allow multiple coverages in a "selected" list from the available list

    Dim objTestNodes

                                        'Holder for selected options when checking to add available
                                        'in a select list

    Dim objListItems

                                        'collection of item elements from objNodes to be added to the select tag.

    Dim objOption

                                        'Option element created to be added to select tag.

    Dim intItemCount

                                        'Generic integer counter spinning through the list

    Dim objNamedNodeMapLI
    Dim objListItemsTest
    Dim strShowZeroText
    Dim intMaxAllowed

    On Error Resume Next

    '--Since we are dealing with a select tag, we need to look--
    '--for any <item> nodes to use for the list (options)                                                    --

    Set objListItemsTest = objNodes.selectSingleNode("//control[@matchcode=""" & objControl.name & """]/listitems/option")
    If objListItemsTest Is Nothing Then
        Set objListItems = objNodes.selectnodes("//control[@matchcode=""" & objControl.name & """]//item")

        'Delete any current list items
        For intItemCount = 1 To objControl.options.length
            objControl.remove(0)
        next

        'Next add the new list items to the combo box
        strShowZeroText = ShowZeroText(objControl)
        If Len(strShowZeroText) > 0 Then
            'Add the text of showzero (typically "NONE") to the first element in the list
            Set objOption = objCallingWindow.document.createElement("OPTION")
            objOption.text = strShowZeroText

'=== IMG_4563 ===
    If Len(strShowZeroText) > 0 Then
        'Add the text of showzero (typically "NONE") to the first element in the list
        Set objOption = objCallingWindow.document.createElement("OPTION")
        objOption.text = strShowZeroText
        objOption.id = LCase(strShowZeroText)
        objControl.add(objOption)
    End If

    'Add the rest of the list items
    For intItemCount = 0 To objListItems.length - 1
        blnAddOption = True

        If Len(strRelatedList) > 0 Then

            If Not objListItems(intItemCount).attributes.getNamedItem("multiselect") Is Nothing Then
                strMultiSelect = objListItems(intItemCount).attributes.getNamedItem("multiselect").nodeValue

                If StrComp(strMultiSelect,"NO",vbTextCompare) = 0 Then
                    intMaxAllowed = 1
                ElseIf IsNumeric(strMultiSelect) Then
                    intMaxAllowed = CInt(strMultiSelect)
                Else
                    intMaxAllowed = 0
                End If

                If intMaxAllowed > 0 Then
                    'Use page xml dataisland instead of mxmlDoc.  xdiPageData reflects changes made by coverage selection/removal pages.
                    Set objTestNodes = objCallingWindow.xdiPageData.selectnodes("//control[@matchcode=""" & strRelatedList & """]/listitems/item[@covcode =""" & objListItems(i<?>
                    If Not objTestNodes Is Nothing Then
                        If objTestNodes.length => intMaxAllowed Then
                            'Item is in Selected list, and not needed in the available list.  Do not add it here.
                            blnAddOption = False
                        End If
                        'objTestNodes.length => intMaxAllowed
                    End If
                    'objTestNode Is Nothing
                End If
                'intMaxAllowed > 0
            End If
            ' Not objNamedNodeMap.getNamedItem("multiselect") Is Nothing

        End If
        'Len(strRelatedList) > 0

'=== IMG_4564 ===
                ' Not objNamedNodeMap.getNamedItem("multiselect") Is Nothing

            End If
                'Len(strRelatedList) > 0

            If blnAddOption Then
                Set objOption = objCallingWindow.document.createElement("OPTION")
                objOption.text = objListItems(intItemCount).text

                '--Get the "value" attribute of the listitem xml node--
                Set objNamedNodeMapLI = objListItems(intItemCount).attributes
                If Not objNamedNodeMapLI.getNamedItem("value") Is Nothing Then
                    objOption.value = objNamedNodeMapLI.getNamedItem("value").nodevalue
                Else
                    objOption.value = ""
                End If

                If Not objListItems(intItemCount).attributes.getNamedItem("covcode") Is Nothing Then
                    objOption.id = objListItems(intItemCount).attributes.getNamedItem("covcode").nodeValue
                End If

                '--See if the list item option should be selected--
                If Not objNamedNodeMapLI.getNamedItem("selected") Is Nothing Then
                    If objNamedNodeMapLI.getNamedItem("selected").nodevalue = "T" Then
                        objOption.selected = True
                        'Set to false. refresh list may then be done without initial items being re-selected.
                        objNamedNodeMapLI.getNamedItem("selected").nodevalue = "F"
                    End If
                End If
                '--Add option to the select control--
                objControl.add(objOption)
            End If
        Next
            'intItemCount = 0 To objListItems.length - 1

        Call TrapBrowserError("FillSelectList|1")

        Set objTestNodes = Nothing
        Set objOption = Nothing
        Set objNamedNodeMapLI = Nothing
    End If
End Sub

'=== IMG_4565 ===
    '------------------------------------------------------------------

    Sub FocusFirstControl(ByRef objCallingWindow)
        '*****************************************************************************
        'PURPOSE:
        'This subroutine will cycle through the XML data island looking for the first
        'occurance of a <control> tag with an attribute of "firstcontrol". If none
        'are found, NO FOCUS WILL BE SET. If more than <control> tag is found with
        'the "firstcontrol" attribute, the first control will be selected, and
        'focus will be set to it.
        '
        '*****************************************************************************

        On Error Resume Next

        Dim objNodes
                                            'Generic object reference to nodes returned from an
                                            'XML query.

        '------------------------------------------------------------------
        'Note: mxmlDoc is a module-level XML document that was set in the
        'window_onload event.
        '------------------------------------------------------------------

        With objCallingWindow
          '--Find all <control> nodes that have the "firstcontrol" attribute--
          Set objNodes = .mxmlDoc.selectsinglenode("//control[@firstcontrol = '']")
          If SelectControlFocus(objNodes, objCallingWindow) = "T" Then Exit Sub
          Set objNodes = .mxmlDoc.selectsinglenode("//control[@firstcontrol = '1']")
          If SelectControlFocus(objNodes, objCallingWindow) = "T" Then Exit Sub
          Set objNodes = .mxmlDoc.selectsinglenode("//control[@firstcontrol = '2']")
          If SelectControlFocus(objNodes, objCallingWindow) = "T"  Then Exit Sub
          ' No firstcontrol found
          'Call objCallingWindow.document.body.focus()
        End With
            'objCallingWindow

        Call TrapBrowserError("EEBrowser|FocusFirstControl|1")

        '--Clean Up--
        Set objNodes                       = Nothing

    End Sub
    '------------------------------------------------------------------

    Function SelectControlFocus(ByRef objNodes, ByRef objCallingWindow)

'=== IMG_4566 ===
Function SelectControlFocus(ByRef objNodes, ByRef objCallingWindow)
'******************************************************************************
'PURPOSE:
'This subroutine will cycle through the XML data island looking for the first
'occurance of a <control> tag with an attribute of "firstcontrol". If none
'are found, NO FOCUS WILL BE SET. If more than <control> tag is found with
'the "firstcontrol" attribute, the first control will be selected, and
'focus will be set to it.
'
'******************************************************************************

On Error Resume Next

Dim objNamedNodeMap                    'Generic object reference to all attributes within a
                                        'node in objNodes.

Dim objNode                            'Object reference to a single XML attribute node
                                        'within objNamedNodeMap.

Dim objControl                         'Generic reference to an HTML control.

Dim strValue
Dim strMatchCode

'--Initialize the function value--
SelectControlFocus = ""
With objCallingWindow
  '--set focus to the appropriate control--
  If not objNodes is nothing then
    Set objNamedNodeMap = objNodes.attributes
    Set objNode = objNamedNodeMap.getNamedItem("matchcode")
    strMatchCode = objNode.value
    If objNamedNodeMap.getNamedItem("disabled").value = "F" then
      SelectControlFocus = "T"
      '--Get a handle to the "first control"--
      Set objControl = .document.all("dta" & objNode.nodevalue)
         Call TrapBrowserError("EEBrowser|SelectControlFocus|2")

      '--Set the module-level initial value & previous matchcode values--
      '--then set focus to the "first control".
      If Not objControl Is Nothing Then
         Call TrapBrowserError("EEBrowser|SelectControlFocus|3")
       .mvntInitialValue = GetControlValue(objControl)
       .mstrPreviousMatchcode = objControl.name

'=== IMG_4567 ===
    .mstrPreviousMatchcode = objControl.name
      Call SetControlFocus(objControl.name,objCallingWindow)
    'SetControlFocus sets these values. However, when setting focus to the
    'first control these do not apply. Reset these values to default state.
    mblnFocusChanged = False
    mstrFocusChangedTo = ""
      Call TrapBrowserError("EEBrowser|SelectControlFocus|4")
  End If
       'Not objControl Is Nothing
  End if
End If
       'not objNodes is nothing

  .mblnRespondTabClick = True
       'Allow the code to respond to clicks on the tabstrip behavior

End With
    'objCallingWindow
Call TrapBrowserError("EEBrowser|SelectControlFocus|5")

'--Clean Up--
Set objNamedNodeMap = Nothing
Set objNode = Nothing
Set objControl = Nothing

End Function

'------------------------------------------------------------------------------

Function GetControlAttribute(ByRef objControl, ByVal strAttribute)
'******************************************************************************
'PURPOSE:
'The purpose of this subroutine is to get an attribute value of the control
'referenced in the parameter. This should be the ONLY way to get an
'attribute value of a control, so as to keep the code as generic as possible.
'
'Since many HTML , Behavior and ActiveX controls have different methods of
'getting an attribute, it is best to specifically specify each control type
'and its appropriate method to set the desired attribute.
'
'------------------------------------------------------------------------------
'NOTE: The only attributes supported are;
        - "VISIBLE", Boolean, returned values "T"/"F"/""

'=== IMG_4568 ===
        - "VISIBLE", Boolean, returned values "T"/"F"/""
        - "DISABLED", Boolean, returned values "T"/"F"/""

    Since these attribute directly affect either standard HTML or ActiveX
    attributes (or properties), these attributes are not required to be
    included in the HTML before manipulating them. However, if ANY USER
    DEFINED or CUSTOM attributes are adjusted in the future, they MUST BE
    present in the HTML BEFORE they can be manipulated with this routine.
'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'
'PARAMETERS:
'  objControl: An object reference to the desired control.
'strAttribute: The attribute name to get.
'
'******************************************************************************
On Error Resume Next

Dim blnBooleanAttribute                'Flag indicating the attribute is a boolean type.

'--Assume an empty string for a returned value--
GetControlAttribute = ""

'--Condition the in-coming parameters--
strAttribute = UCase(strAttribute)
Call TrapBrowserError("EEBrowser|GetControlAttribute|1")

With objControl
    Select Case UCase(.tagname)
        Case "OBJECT"
            Select Case UCase(.classid)
                Case "CLSID:CC696B63-4159-11D0-BDCB-0020A90B183A","CLSID:C2000000-FFFF-1100-8200-000000000004","CLSID:1C203F13-95AD-11D0-A84B-00A0247B735B"
                    '--Protoview Date/Time, Numeric Control OR Tree control--
                    Select Case strAttribute
                    Case "VISIBLE"
                        Select Case UCase(.style.visibility)
                        Case "VISIBLE"
                            GetControlAttribute = "T"
                        Case "HIDDEN"
                            GetControlAttribute = "F"
                        End Select
                            'UCase(.style.visibility)

'=== IMG_4569 ===
                    Case "VISIBLE"
                        GetControlAttribute = "T"
                    Case "HIDDEN"
                        GetControlAttribute = "F"
                    End Select
                        'UCase(.style.visibility)

                Case "DISABLED"
                    If Not .enabled Then
                        GetControlAttribute = "T"
                    Else
                        GetControlAttribute = "F"
                    End If
                        'Not .enabled
            End Select
                'strAttribute
        Case "../../SYSTEM/WINCONTROLS/AQSCONTROLLIBRARY1.DLL#AQSCONTROLLIBRARY.TREEVIEW"
            '--*** IE8 Tree Control ***--
            Select Case strAttribute
            Case "VISIBLE"
                Select Case UCase(.style.visibility)
                Case "VISIBLE"
                    GetControlAttribute = "T"
                Case "HIDDEN"
                    GetControlAttribute = "F"
                End Select
                    'UCase(.style.visibility)

            Case "DISABLED"
                If Not .enabled Then
                    GetControlAttribute = "T"
                Else
                    GetControlAttribute = "F"
                End If
                    'Not .enabled
            End Select

    End Select
        'UCase(.tagname)

    Case "RADIOBUTTON", "COMBO", "KPCOMBO", "IBUTTON", "ICHECKBOX"
        Select Case strAttribute
            Case "VISIBLE"

'=== IMG_4570 ===
        Case "RADIOBUTTON", "COMBO", "KPCOMBO", "IBUTTON", "ICHECKBOX"
        Select Case strAttribute
            Case "VISIBLE"
                Select Case UCase(.style.visibility)
                    Case "VISIBLE"
                        GetControlAttribute = "T"
                    Case "HIDDEN"
                        GetControlAttribute = "F"
                End Select
                    'UCase(.style.visibility)

            Case "DISABLED"
                If Not .enabled Then
                    GetControlAttribute = "T"
                Else
                    GetControlAttribute = "F"
                End If
                    'Not .enabled
        End Select
            'strAttribute

    Case "XMLLIST", "INPUT", "SELECT", "TEXTAREA", "DIV", "IMDBXMLLIST", "TD"

        Select Case strAttribute
            Case "VISIBLE"
                Select Case UCase(.style.visibility)
                    Case "VISIBLE"
                        GetControlAttribute = "T"
                    Case "HIDDEN"
                        GetControlAttribute = "F"
                End Select
                    'UCase(.style.visibility)

            Case "DISABLED"
                If .disabled Then
                    GetControlAttribute = "T"
                Else
                    GetControlAttribute = "F"
                End If
                    '.disabled
        End Select
            'strAttribute

'=== IMG_4571 ===
                    End If
                        '.disabled
                End Select
                    'strAttribute
        End Select
            'UCase(.tagname)
    End With
        'objControl
    Call TrapBrowserError("EEBrowser|GetControlAttribute|2")
End Function
'------------------------------------------------------------------------------

Function GetControlValue(ByRef objControl)
'******************************************************************************
'PURPOSE:
'The purpose of this function is to return the current "L" or "Text" value
'of the control referenced in the parameter. This should be the ONLY way to
'reference the current "Text" value of a control, so as to keep the code as
'generic as possible.
'
'Since many HTML and ActiveX controls have a different "value property",
'it is best to specifically specify each control type and it's appropriate
'property.
'
'PARAMETERS:
'objControl: An object reference to a control
'
'******************************************************************************
On Error Resume Next

Dim vntValue                           'The current value of the desired control.

If Not objControl Is Nothing Then
    '--Get the appropriate value for the type of control--
    Select Case UCase(objControl.tagname)
        Case "OBJECT"
            Select Case UCase(objControl.classid)
                Case "CLSID:CC696B63-4159-11D0-BDCB-0020A90B183A"
                    '--Protoview Date/Time Control--
                    vntValue = objControl.datestring
                        'Returns the date as string w/no time
                    'vntValue = objControl.value    'Returns a date

'=== IMG_4572 ===
            Case "OBJECT"
                Select Case UCase(objControl.classid)
                    Case "CLSID:CC696B63-4159-11D0-BDCB-0020A90B183A"
                        '--Protoview Date/Time Control--
                        vntValue = objControl.datestring
                            'Returns the date as string w/no time
                        'vntValue = objControl.value    'Returns a date
                        If Not IsDate(vntValue) Then
                            vntValue = vbNullString
                        End If
                    Case "CLSID:C2000000-FFFF-1100-8200-000000000004"
                        '--Protoview Numeric Control--
                        vntValue = objControl.text
                            'Returns the "L" variable

                    Case "CLSID:1C203F13-95AD-11D0-A84B-00A0247B735B"
                        '--Sheridan Tree Control--
                        ' In order for the tree control to work with CheckRequiredIndicators, this
                        ' function must return some value.  A subsequent check verifies the
                        ' actual tree data.
                        vntValue = "tree"

                    Case "../../SYSTEM/WINCONTROLS/AQSCONTROLLIBRARY1.DLL#AQSCONTROLLIBRARY.TREEVIEW"
                        '--*** IE8 Tree Control ***--
                        ' In order for the tree control to work with CheckRequiredIndicators, this
                        ' function must return some value.  A subsequent check verifies the
                        ' actual tree data.
                        vntValue = "tree"
                End Select
                    'objControl.classid

        Case "DIV"
            vntValue = objControl.innerText
                'Returns the "L" variable

        Case "RADIOBUTTON", "IBUTTON"
            vntValue = objControl.value
                'Returns the "L" variable

        Case "ICHECKBOX"
            If objControl.checked Then
                vntValue = "YES"
                    'Returns the "L" variable

'=== IMG_4573 ===
        Case "ICHECKBOX"
            If objControl.checked Then
                vntValue = "YES"
                    'Returns the "L" variable
            Else
                vntValue = "NO"
                    'Returns the "L" variable
            End If

        Case "XMLLIST"
            vntValue = objControl.action
                'Returns the "L" variable

        Case "COMBO", "KPCOMBO"
            vntValue = objControl.text
                'Returns the "L" variable

        Case "INPUT"
            Select Case UCase(objControl.type)
                Case "TEXT","PASSWORD","BUTTON","SUBMIT", "HIDDEN","FILE"
                    vntValue = objControl.value
                        'Returns the "L" variable

                Case "CHECKBOX"
                    If objControl.checked Then
                        vntValue = "YES"
                            'Returns the "L" variable
                    Else
                        vntValue = "NO"
                            'Returns the "L" variable
                    End If

                Case "RADIO"
                    '--NOTE: We are not using this control and instead using the RADIOBUTTON--
                    '--behavior control.
            End Select
                'UCase(objControl.type)

        Case "SELECT"
            'NOTE:This routine ASSUMES there is only one selected option in a list. Multiple
            'selections will not cause any problems - just the first selected option will be
            'returned. (tww 10/17/2000)
            If objControl.selectedIndex <> -1 Then

'=== IMG_4574 ===
                'UCase(objControl.type)

        Case "SELECT"
            'NOTE:This routine ASSUMES there is only one selected option in a list. Multiple
            'selections will not cause any problems - just the first selected option will be
            'returned. (tww 10/17/2000)
            If objControl.selectedIndex <> -1 Then
                'At least one option is selected...
                vntValue = objControl.options(objControl.selectedIndex).text
                    'Returns the "L" variable
            Else
                'No options are selected...
                vntValue = ""
            End If
                'objControl.selectedIndex <> -1

        Case "TEXTAREA"
            vntValue = objControl.value
                'Returns the "L" variable

    End Select
        'UCase(objControl.tagname)

    GetControlValue = vntValue
    Call TrapBrowserError("EEBrowser|GetControlValue|1")

End If

End Function
'------------------------------------------------------------------------------
Sub GetSecurityValues(ByVal strCategoryMatchCode,ByVal strPageMatchCode,ByVal strObjectMatchCode, ByRef blnSecDisabled, ByRef blnSecVisible)
'******************************************************************************
'******************************************************************************
    Dim strSecurityPath
    On Error Resume Next

    '// Assume that the default is visible and not disabled
    blnSecDisabled = false
    blnSecVisible = true
    strSecurityPath = "//permissions/lob[@mc='" & strCategoryMatchCode & "']/pag[@mc='" & strPageMatchCode & "']/obj[@mc='" & strObjectMatchCode & "']"
    Call SecurityValues_Read(strSecurityPath, blnSecDisabled, blnSecVisible)

End Sub

'=== IMG_4575 ===
End Sub

'------------------------------------------------------------------------------

Sub GetSecurityValuesWithExistCheck(ByVal strCategoryMatchCode,ByVal strPageMatchCode,ByVal strObjectMatchCode, ByRef blnSecDisabled, ByRef blnSecVisible)
'******************************************************************************
'******************************************************************************
    Dim strSecurityPath
    On Error Resume Next

    '// Assume that the default is visible and not disabled
    blnSecDisabled = true
    blnSecVisible = false
    strSecurityPath = "//permissions/lob[@mc='" & strCategoryMatchCode & "']/pag[@mc='" & strPageMatchCode & "']/obj[@mc='" & strObjectMatchCode & "']"
    Call SecurityValues_Read(strSecurityPath, blnSecDisabled, blnSecVisible)

End Sub
'------------------------------------------------------------------------------

Sub GetSecurityValues_DefaultDisabled(ByVal strCategoryMatchCode,ByVal strPageMatchCode,ByVal strObjectMatchCode, ByRef blnSecDisabled, ByRef blnSecVisible)
'******************************************************************************
'******************************************************************************
    Dim strSecurityPath
    On Error Resume Next

    '// Assume that the default is invisible and disabled
    blnSecDisabled = True
    blnSecVisible = False
    strSecurityPath = "//permissions/lob[@mc='" & strCategoryMatchCode & "']/pag[@mc='" & strPageMatchCode & "']/obj[@mc='" & strObjectMatchCode & "']"
    Call SecurityValues_Read(strSecurityPath, blnSecDisabled, blnSecVisible)

End Sub
'------------------------------------------------------------------------------

Sub SecurityValues_Read(ByVal strSecurityPath, ByRef blnSecDisabled, ByRef blnSecVisible)
'******************************************************************************
'******************************************************************************
    Dim nodSecurity, strVisible,strDisabled
    On Error Resume Next

    Set nodSecurity = mxmlSecurity.selectSingleNode(strSecurityPath)
    Call TrapBrowserError("SecurityValues_Read|1")
    If Not nodSecurity Is Nothing Then
        strVisible = nodSecurity.attributes.getNamedItem("vis").value

'=== IMG_4576 ===
Sub SecurityValues_Read(ByVal strSecurityPath, ByRef blnSecDisabled, ByRef blnSecVisible)
'******************************************************************************
'******************************************************************************
    Dim nodSecurity, strVisible,strDisabled
    On Error Resume Next

    Set nodSecurity = mxmlSecurity.selectSingleNode(strSecurityPath)
    Call TrapBrowserError("SecurityValues_Read|1")
    If Not nodSecurity Is Nothing Then
        strVisible = nodSecurity.attributes.getNamedItem("vis").value
        strDisabled = nodSecurity.attributes.getNamedItem("dis").value
        If strVisible = "T" Then blnSecVisible = true Else blnSecVisible = false
        If strDisabled = "T" Then blnSecDisabled = true Else blnSecDisabled = false
        Call TrapBrowserError("SecurityValues_Read|2")
        Set nodSecurity = Nothing
    End If
End Sub

'------------------------------------------------------------------------------

Sub GetXMLData(ByVal pstrFilter, ByRef objCallingWindow)
'******************************************************************************
'PURPOSE:
'This subroutine will go through the XML Data Island document, that was
'included with the ASP page this code supports, read the data and set the
'"text" or "listIndex" values of the appropriate controls. On controls that
'are combo boxes, the included list items in the XML will be inserted into
'the combo list before setting the appropriate value. Additionally, each
'matchcode (control) will be set enabled/diasabled and visible/invisible
'based on it's attributes in the XML data island.
'
'------------------------------------------------------------------------------
'NOTE: The XML data island, generically referred to later as "XMLDI", is
'assumed to have an id of "xdiPageData".
'------------------------------------------------------------------------------
'
'******************************************************************************
On Error Resume Next

Dim objNodes                           'Generic object reference to nodes returned from an
                                        'XML query.

Dim objNamedNodeMap                    'Generic object reference to all attributes within a

'=== IMG_4577 ===
On Error Resume Next

Dim objNodes                           'Generic object reference to nodes returned from an
                                        'XML query.

Dim objNamedNodeMap                    'Generic object reference to all attributes within a
                                        'node in objNodes.

Dim objNamedNodeMapLI                  'Generic object reference to all attributes within a
                                        'ListItems node.

Dim objNode                            'Object reference to a single XML attribute node
                                        'within objNamedNodeMap.

Dim objControl                         'Generic reference to an HTML control.

Dim objListItems                       'Generic reference to <Item> nodes for a combo box
                                        'control within the XML, via an XML query.

Dim objDoc                             'Reference to other pages for calling Subroutines

Dim intItemCount                       'Generic integer counter spinning through the list
                                        'items for a combo box.

Dim intCount                           'Generic integer counter.

Dim strText                            'Holder for the "TEXT" or "L" variable data specified in
                                        'the XML file for a single control.

Dim strValue                           'Holder for the text of the value attribute.

Dim strListIndex                       'Holder for the "ListIndex" or "X" variable data specified
                                        'in the XML file for a single control.

Dim blnLimitToList                     'A flag representing the value of the LimitToList HTML
                                        'attribute for a single combo box control.

Dim blnCutPaste
Dim objLabel                           'Handle to a selected control's label - so it's text
                                        'can be modified

Dim strFilter                          ' Used to select only control nodes required. ex. [@tab = 'billing']

'=== IMG_4578 ===
        Dim strItemXmlList
        Dim strItemAction
        Dim strItemText
        Dim strItemEvent
        Dim strActionList
        Dim objActionList

        Dim strUsrOpt                                          ' Action List vars
        Dim objdtaTB3


                                        ' Object representing the Rate Tab on the Menu frame – used to determine
        Dim objMenu                    ' whether the rate button (if it exists) should be enabled or not.
        Dim intFrameCount
        Dim strFrameName
        '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        'Note: mxmlDoc is a module-level XML document that was set in the
        'window_onload event.
        '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        With objCallingWindow
            '--Find all the control nodes in the XMLDI--
            blnCutPaste = False
            Call UserOption("cutpaste", "T", strUsrOpt)
            If StrComp(strUsrOpt, "T", vbTextCompare) = 0 Then
                blnCutPaste = True
            End If

            If Len(pstrFilter) > 0 Then
                strFilter = pstrFilter
            End If

            Set objNodes = .mxmlDoc.selectnodes("//control" & strFilter)
                Call TrapBrowserError("EEBrowser|GetXMLData|1")

            '--Spin through the returned nodes--
            For intCount = 0 To objNodes.length - 1

                blnLimitToList = True

                    'set/reset this flag (true is the default)

                '--Get the matchcode of the current xml node--
                Set objNamedNodeMap = objNodes(intCount).attributes

'=== IMG_4579 ===
        'set/reset this flag (true is the default)

        '--Get the matchcode of the current xml node--
        Set objNamedNodeMap = objNodes(intCount).attributes
        Set objNode = objNamedNodeMap.getNamedItem("matchcode")

    '--Get a handle to the matchcode's data control in the HTML page--
        Set objControl = .document.all("dta" & objNode.nodevalue)
        If Not objControl Is Nothing Then

        ' Handle the datecontrol for the IE ActiveX update (EOLA)
        If UCase(objControl.tagname) = "OBJECT" Then
            If StrComp(objControl.classid, "CLSID:CC696B63-4159-11D0-BDCB-0020A90B183A", vbTextCompare) = 0 Then
                Dim left, top, width, tabIndex, required, backColor, enabled, height, controlName, textValue
                controlName = "dta" & objNode.nodeValue
                Dim parent
                Set parent = .document.all(controlName).parentElement
                Dim currentControl
                Set currentControl = .document.all(controlName)
                left = Replace(currentControl.style.left, "px", vbNullString)
                top = Replace(currentControl.style.top, "px", vbNullString)
                width = Replace(currentControl.style.width, "px", vbNullString)
                tabIndex = currentControl.tabIndex
                required = currentControl.getAttribute("required")
                backColor = currentControl.getAttribute("backcolor")
                enabled = currentControl.getAttribute("enabled")
                height = Replace(currentControl.style.height, "px", vbNullString)
                If Not objNamedNodeMap.getNamedItem("text") Is Nothing Then
                    textValue = objNamedNodeMap.getNamedItem("text").nodevalue
                End If
                If IsDate(textValue) Then
                    If DateDiff("y", textValue, "12/31/1899") = 0 Then
                        textValue = "00/00/00"
                    End If
                End If
                Set currentControl = Nothing
                Dim newControl
                Set newControl = .document.createElement("object")
                newControl.id = controlName
                newControl.Name = objNode.nodeValue
                Call parent.removeChild(.document.all(controlName))
                Call parent.appendChild(newControl)
                .document.all(controlName).style.left = CStr(left)

'=== IMG_4580 ===
                newControl.Name = objNode.nodeValue
                Call parent.removeChild(.document.all(controlName))
                Call parent.appendChild(newControl)
                .document.all(controlName).style.left = CStr(left)
                .document.all(controlName).style.top = CStr(top)
                .document.all(controlName).width = CStr(width)
                .document.all(controlName).tabIndex = CStr(tabIndex)
                .document.all(controlName).style.height = "22"
                .document.all(controlName).style.position = "absolute"
                .document.all(controlName).classid= "clsid:CC696B63-4159-11D0-BDCB-0020A90B183A"
                .document.all(controlName).codebase = "../../System/CAB/pvdateedit.cab"
                .document.all(controlName).Enabled = enabled
                .document.all(controlName).BackColor = backColor
                Call .document.all(controlName).setAttribute("required", required)
                Call .document.all(controlName).setAttribute("disabled", "")
                Call .document.all(controlName).setAttribute("visible", "")
                Call .document.all(controlName).setAttribute("text", textValue)
                Call .document.all(controlName).setAttribute("firstdate", textValue)

                .document.all(controlName).datestring = textValue
                ' wire up the events
                Call .document.all(controlName).attachEvent("onfocus", .GetRefOnFocusHandler())
                Call .document.all(controlName).attachEvent("onkeyup", .GetRefOnKeyUpHandler())
                ' This call is required for multi-tab pages (controls don't render otherwise)
                Call .document.all(controlName).setActive()

                Set objControl = .document.all(controlName)
                Call TrapBrowserError("GetXmlData|DateControlRewriting|Finished")


            End If
        End If


        '///////////////////////////////////////////////////////////////////////
        '--Look for an HTML <SELECT id=select1 name=select1> tag--
        If UCase(objControl.tagname) = "SELECT" Then
            Dim strRelatedList
            strRelatedList = ""
            If Not objNamedNodeMap.getNamedItem("excludelist") Is Nothing Then
                'Need to exclude items in the selected list if appropriate
                strRelatedList = objNamedNodeMap.getNamedItem("excludelist").nodeValue

'=== IMG_4581 ===
                strRelatedList = objNamedNodeMap.getNamedItem("excludelist").nodeValue
            End If
            Call FillSelectList(objControl, objNode, strRelatedList, objCallingWindow)
        End If
            'UCase(objControl.tagname) = "SELECT"
        '///////////////////////////////////////////////////////////////////////

        '///////////////////////////////////////////////////////////////////////
        '--Look for an COMBO tag--
        If UCase(objControl.tagname) = "COMBO" or UCase(objControl.tagname) = "KPCOMBO" Then
            '--AQS Combo Box Behavior--
            'Test to see if the combobox is limited to the list and set the routine-level
            'flag. This will be used later to determine if the X(ListIndex) or L(Text)
            'variable should be used when setting the XMLDI data value of the combobox.

            'Defer loading the items until the user selects the control or the value
            'is set by the listindex(X)
            If objControl.LimitToList = "F" Then
                blnLimitToList = False
            End If

            If Not objNamedNodeMap.getNamedItem("ShowZero") Is Nothing Then
                ' Update the control with the Show Zero value from the xml
                objControl.setAttribute "ShowZero", objNamedNodeMap.getNamedItem("ShowZero").nodeValue
            End If

            If blnCutPaste Then
                If Not objNamedNodeMap.getNamedItem("CutPaste") Is Nothing Then
                    If StrComp(objNamedNodeMap.getNamedItem("CutPaste").nodeValue, "T", vbTextCompare) = 0 Then
                        objControl.CutPaste = True
                    Else
                        objControl.CutPaste = False
                    End If
                Else
                    objControl.CutPaste = False
                End If
            Else
                objControl.CutPaste = False
            End If

        End If
            'UCase(objControl.tagname) = "COMBO" or UCase(objControl.tagname) = "KPCOMBO"
        '///////////////////////////////////////////////////////////////////////

'=== IMG_4582 ===
        End If
            'UCase(objControl.tagname) = "COMBO" or UCase(objControl.tagname) = "KPCOMBO"
        '///////////////////////////////////////////////////////////////////////

        '///////////////////////////////////////////////////////////////////////
        '--Look for an XMLLIST <AQS:XMLLIST> tag--
        If UCase(objControl.tagname) = "XMLLIST" Then
            If Not objNodes(intCount).selectSingleNode("list") Is Nothing Then
                objControl.xmlData = objNodes(intCount).selectSingleNode("list").xml
            End If
        End If
            'UCase(objControl.tagname) = "XMLLIST"
        '///////////////////////////////////////////////////////////////////////

        '--Get the L(text) & X(listindex) variable values from the XMLDI for--
        '--the current control
        If Not objNamedNodeMap.getNamedItem("text") Is Nothing Then
            strText = objNamedNodeMap.getNamedItem("text").nodevalue
        Else
            strText = ""
        End If

        If Not objNamedNodeMap.getNamedItem("listindex") Is Nothing Then
            strListIndex = objNamedNodeMap.getNamedItem("listindex").nodevalue
        Else
            strListIndex = ""
        End If

        '--Set the appropriate control with the appropriate data--
        If Not blnLimitToList AND strListIndex = "0" Then
            'We must be on a combobox that is not limited to the list (the user
            'can and has entered custom text since the strListIndex = 0). So, we need
            'to send the "L" - "Text" value NOT the "X" - "ListIndex" var.
            Call SetControlValue(objControl, "", strText, "L", objCallingWindow)

        Else

            'blnLimitToList OR strListIndex <> "0"
            'All other cases, we'll send the "L" or the "X" based on which one has
            'a value (not an empty string).
            If strListIndex <> "" Then
                ' Need to load the list to set the x value
                Call FillComboList ( objControl, objCallingWindow )

'=== IMG_4583 ===
        End If
            'Not blnLimitToList AND strListIndex = "0"

        '--Now, set the disabled and visible settings and other attributes--
        '--of the control based on the settings from the XMLDI.                --
        Call SetControlAttribute(objControl, "", "DISABLED",objNamedNodeMap.getNamedItem("disabled").nodevalue, objCallingWindow)
        Call SetControlAttribute(objControl, "", "VISIBLE",objNamedNodeMap.getNamedItem("visible").nodevalue, objCallingWindow)
        If Not objNamedNodeMap.getNamedItem("required") Is Nothing Then
            Call SetControlAttribute(objControl, "", "REQUIRED",objNamedNodeMap.getNamedItem("required").nodevalue, objCallingWindow)
        End If
            'Not objNamedNodeMap.getNamedItem("required") Is Nothing

        ' Special code to fix data control problem.
        If UCase(objControl.tagname) = "OBJECT" Then

            If StrComp(objControl.classid, "CLSID:CC696B63-4159-11D0-BDCB-0020A90B183A", vbTextCompare) = 0 Then
                If IsDate(strText) Then
                    ' If the date is 12/31/1899, change it to 00/00/00
                    If DateDiff("y", strText, "12/31/1899") = 0 Then
                        strText = "00/00/00"
                        Call SetControlValue(objControl, "", strText, "L", objCallingWindow)
                    End If
                End If
                objCallingWindow.dateControlsInitializing = objCallingWindow.dateControlsInitializing + 1
                Call SetControlFocus(objControl.name, objCallingWindow)
                Call SetControlAttribute(objControl, "", "DISABLED","F", objCallingWindow)
                Call SetControlValue(objControl, "", strText, "L", objCallingWindow)
                Call SetControlFocus(objControl.name, objCallingWindow)
                Call SetControlAttribute(objControl, "", "DISABLED",objNamedNodeMap.getNamedItem("disabled").nodevalue, objCallingWindow)
                objCallingWindow.document.body.focus
            End If
        End If

        '--Special test for the IBUTTON behavior: Set the 'value'    --
        '--of the control if a 'value' attribute exists in the XML--
        '--DI otherwise set the 'value' to the 'text' attribute.    --
        If UCase(objControl.tagname) = "IBUTTON" Then
            If Not objNamedNodeMap.getNamedItem("value") Is Nothing Then
                strValue = objNamedNodeMap.getNamedItem("value").nodevalue
                Call SetControlValue(objControl, "", strValue, "V", objCallingWindow)
            Else
                Call SetControlValue(objControl, "", strText, "V", objCallingWindow)
            End If

'=== IMG_4584 ===
                Call SetControlValue(objControl, "", strValue, "V", objCallingWindow)
            Else
                Call SetControlValue(objControl, "", strText, "V", objCallingWindow)
            End If

            '--If the rate button has been added to the header buttons on --
            '--the current page, we must disable/enable it according to --
            '--whether the primary rate button (on the menu toolbar) --
            '--is disabled/enabled. --
            If StrComp(objControl.name, "RATE", vbBinaryCompare) = 0 Then
                For intFrameCount = 0 To window.parent.frames.length - 1
                    strFrameName = window.parent.frames(intFrameCount).name
                    If strFrameName = "MENU" Then
                        Exit For
                    End If
                Next
                Set objMenu = window.parent.frames(intFrameCount)
                If Not IsEmpty(objMenu) Then
                    Set objdtaTB3 = objMenu.document.all("dtaTB3")
                    If objdtaTB3.disabled Then
                        Call SetControlAttribute(objControl, "", "DISABLED","T", objCallingWindow)
                    Else
                        Call SetControlAttribute(objControl, "", "DISABLED","F", objCallingWindow)
                    End If
                End If
            End If

        End If
            'UCase(objControl.tagname) = "IBUTTON"

        Call SetRequiredIndicator(objControl, objCallingWindow)

        '// Code to handle visibility of labels
        If UCase(GetControlAttribute(objControl, "visible")) = "F" or UCase(GetControlAttribute(objControl, "visible")) = "FALSE" Then
            '--Get a handle to  control's label (if any)--
            Set objLabel = .document.all("lbl" & objControl.name)
            Call TrapBrowserError("EEBrowser|GetXMLData|2")
            objLabel.style.visibility = "hidden"
        End If
        '// End Code to handle visibility of labels

        '--Clean Up--
        Set objLabel = Nothing

'=== IMG_4585 ===
        Set objLabel = Nothing

        ' Add SecDis attribute if there is one
        If Not objNamedNodeMap.getNamedItem("SecDis") Is Nothing Then
            strValue = objNamedNodeMap.getNamedItem("SecDis").nodevalue
            Call objControl.SetAttribute("SecDis", strValue)
        End If

        If Not objNamedNodeMap.getNamedItem("AppDis") Is Nothing Then
            strValue = objNamedNodeMap.getNamedItem("AppDis").nodevalue
            Call objControl.SetAttribute("AppDis", strValue)
        End If

        Call ApplySecurityPolicy(objNode.nodeValue,objCallingWindow)
        Call TrapBrowserError("EEBrowser|GetXMLData|3")

        '-------------------------------------------------------------
        ' Notes related: add to the controls if they exist
        '-------------------------------------------------------------

        ' attachmentPolicyRowID
        If Not objNamedNodeMap.getNamedItem("attachmentPolicyRowId") Is Nothing Then
            objControl.setAttribute "attachmentPolicyRowId",objNamedNodeMap.getNamedItem("attachmentPolicyRowId").nodevalue
        End If
        ' noteMatchcode
        If Not objNamedNodeMap.getNamedItem("noteMatchcode") Is Nothing Then
            objControl.setAttribute "noteMatchcode",objNamedNodeMap.getNamedItem("noteMatchcode").nodevalue
        End If
        ' relatedNoteControls
        If Not objNamedNodeMap.getNamedItem("relatedNoteControls") Is Nothing Then
            objControl.setAttribute "relatedNoteControls",objNamedNodeMap.getNamedItem("relatedNoteControls").nodevalue
        End If
        ' Handle readonly
        If Not objNamedNodeMap.getNamedItem("readonly") Is Nothing Then
            Call SetControlAttribute(objControl, "", "READONLY",objNamedNodeMap.getNamedItem("readonly").nodevalue, objCallingWindow)
        End If
        ' noteLabel
        If Not objNamedNodeMap.getNamedItem("noteLabel") Is Nothing Then
            objControl.setAttribute "noteLabel",objNamedNodeMap.getNamedItem("noteLabel").nodevalue
        End If
        '-------------------------------------------------------------

    Else
        '// Control not found so this might need special case processing

'=== IMG_4586 ===
        Else
            '// Control not found so this might need special case processing

            ' look for actions to be added to an action list dropdown.
            If Not objNamedNodeMap.getNamedItem("actionlist") Is Nothing Then
                    '   matchcode="DELETE"
                    '   text="Delete"
                    '   actionlist="ACTIONLIST"
                    '   action="DELETE"
                    '   event="ListButtonClick"
                    '   listname="XMLLIST"
                    '   disabled="T"
                    '   visible="T"
                    '   SecDis=""

                strActionList = objNamedNodeMap.getNamedItem("actionlist").nodeValue

                strItemXmlList = objNamedNodeMap.getNamedItem("xmllist").nodeValue
                strItemAction = objNamedNodeMap.getNamedItem("action").nodeValue
                strItemText = objNamedNodeMap.getNamedItem("text").nodeValue
                strItemEvent = objNamedNodeMap.getNamedItem("event").nodeValue

                strItemDisabled = objNamedNodeMap.getNamedItem("disabled").nodeValue
                strItemVisible = objNamedNodeMap.getNamedItem("visible").nodeValue

                'GetNamedAttribute(objNode,"value",False,"")

                Set objActionList = .document.all("dta" & strActionList)
                If Not objActionList Is Nothing Then
                    objActionList.Add objNode.nodevalue, strItemText, strItemXmlList, _
                                                    strItemAction, strItemEvent, strItemDisabled, _
                                                    strItemVisible
                    'strMatchCode, strText, listname,   strAction, strEvent, strDisabled, strVisible

                Set objControl = .document.all("dta" & objNode.nodevalue)
                ' Add SecDis attribute if there is one
                If Not objNamedNodeMap.getNamedItem("SecDis") Is Nothing Then
                    strValue = objNamedNodeMap.getNamedItem("SecDis").nodevalue
                    Call objControl.SetAttribute("SecDis", strValue)
                End If

                If Not objNamedNodeMap.getNamedItem("AppDis") Is Nothing Then
                    strValue = objNamedNodeMap.getNamedItem("AppDis").nodevalue

'=== IMG_4587 ===
            If Not objNamedNodeMap.getNamedItem("SecDis") Is Nothing Then
                strValue = objNamedNodeMap.getNamedItem("SecDis").nodevalue
                Call objControl.SetAttribute("SecDis", strValue)
            End If

            If Not objNamedNodeMap.getNamedItem("AppDis") Is Nothing Then
                strValue = objNamedNodeMap.getNamedItem("AppDis").nodevalue
                Call objControl.SetAttribute("AppDis", strValue)
            End If

            Call ApplySecurityPolicy(objNode.nodeValue,objCallingWindow)
            Call TrapBrowserError("EEBrowser|GetXMLData|4")

        End If


        End If
            '// Control not found so this might be a tab that needs security

        If UCASE(Left(objNode.nodeValue,3)) = "TAB" Or UCASE(Left(objNode.nodeValue,3)) = "DIV" Then
            Call ApplySecurityPolicy(objNode.nodeValue, objCallingWindow)
            Call TrapBrowserError("EEBrowser|GetXMLData|5")
        End If
    End If
        'Not objControl Is nothing

Next
    'intCount = 0 to objNodes.length - 1

'--Get the business object elapsed time from the XML--
Set objNodes = .mxmlDoc.selectSinglenode("//page")
    Call TrapBrowserError("EEBrowser|GetXMLData|6")

If Not objNodes Is Nothing Then
    Set objNode = objNodes.attributes.getNamedItem("elapsedtime")
        Call TrapBrowserError("EEBrowser|GetXMLData|7")
    If Not objNode Is Nothing Then
        .mlngXMLElapsedTime = objNode.value
    End If
End If
    Call TrapBrowserError("EEBrowser|GetXMLData|8")

'=== IMG_4588 ===
        End If
        Call TrapBrowserError("EEBrowser|GetXMLData|8")


'--Look for tree nodes in the xml (XMLDI), add them to the tree. --
Set objNode = .mxmlDoc.selectSinglenode("//treenode [not (@omit)]")
    Call TrapBrowserError("EEBrowser|GetXMLData|9")

    If Not objNode Is Nothing Then
        If objNode.childNodes > 0 Then

            Set objDoc = window.parent.frames("tree")

            'load the tree with the new tree nodes
            Call objDoc.Build_Tree( escape(objNode.xml) , "ADDNODES")

            ' Remove the tree nodes
            Set objParent = objNode.parentNode
            Set objNode = objParent.removeChild (objNode)

            'Set focus to current page.  When items are added to the tree, the refreshpage routine
            'gets called which may set focus to some other page.
            .document.body.focus
            'work around for error 450
            If err.number = 450 Then
                err.clear
            Else
                Call TrapBrowserError("EEBrowser|GetXMLData|10")
            End If
        End If
    End If

Call RunXMLBrowserProcedures("browser_windowonload", objCallingWindow)

'Run tab-specific procedures if they exist
If InStr(1, pstrFilter, "@tab=", vbTextCompare) > 0 Then
    Call RunXMLBrowserProcedures("tab|matchcode=" & Split(pstrFilter, "'")(1), objCallingWindow)
End If

        'Get the collection of browser commands calls from the page xml and load them up as mxmlBrowserCtl
    Set objNodes = .mxmlDoc.selectSingleNode("//calls[@type=""browsercommand""][call]")
    If Not objNodes Is Nothing Then
        Set .mxmlBrowserCtl = CreateObject("MSXML2.DOMDocument.6.0")

'=== IMG_4589 ===
        Set .mxmlBrowserCtl = CreateObject("MSXML2.DOMDocument.6.0")
        .mxmlBrowserCtl.async = False
        .mxmlBrowserCtl.preserveWhiteSpace = False
        .mxmlBrowserCtl.loadXML objNodes.xml

        Call TrapBrowserError("EEBrowser|GetXMLData|11")
    'Have the browser run these commands
    Call ExecuteBrowserCommands("",objCallingWindow)
    If objCallingWindow Is Nothing Then
        Exit Sub
    End If

    ' Remove the browser commands
    Set objParent = objNodes.parentNode
    Set objNode = objParent.removeChild (objNodes)

    End If

End With
    'objCallingWindow


'--Clean Up--
Set objNodes                   = Nothing
Set objNamedNodeMap    = Nothing
Set objNamedNodeMapLI = Nothing
Set objNode                    = Nothing
Set objControl              = Nothing
Set objListItems            = Nothing
Set objDoc                     = Nothing
Set objParent                = Nothing
Call TrapBrowserError("EEBrowser|GetXMLData|13")
End Sub
'----------------------------------------------------------------------------------------

Sub SetRequiredIndicator(ByRef objControl, ByRef objCallingWindow)
    '****************************************************************************
    'PURPOSE: Add preceeding '*' to requird field labels
    '****************************************************************************
    On Error Resume Next

    'Handle to a selected control's label - so it's text can be modified
    Dim objLabel
    Dim strColor

'=== IMG_4590 ===
Dim strColor
Dim strWeight
'The prefix to apply to the selected control's label text.
Dim strLabelPrefix

With objCallingWindow
    '--Get a handle to  control's label (if any)--
    Set objLabel = .document.all("lbl" & objControl.name)
    Call TrapBrowserError("EEBrowser|SetRequiredIndicators|1")
    If Not objLabel Is Nothing Then
        '--We have a label for the control, look at it's Required attribute--

        Select Case objControl.getAttribute("Required") & ""

            Case "1"
                strLabelPrefix = "<span class=""clsRequiredMarker"">* </span>"
                strColor = mhexRequiredLabelColor
                strWeight = "bold"

            Case Else
                strLabelPrefix = ""
                strColor = "#000000"
                strWeight = "normal"

        End Select

        ' In either case, use disabled color if objControl is disabled.
        If GetControlAttribute(objControl, "disabled") = "T" Then
            strColor = mhexDisabledLabelColor
        End If

        'objControl.Required
        '-- add the prefix to the control's label.
        objLabel.innerHTML = strLabelPrefix & objLabel.innertext
        objLabel.style.color = strColor
        objLabel.style.fontWeight = strWeight
    End If
        'Not objLabel Is Nothing
End With
    'objCallingWindow

Call TrapBrowserError("EEBrowser|SetRequiredIndicators|2")

'=== IMG_4591 ===
    'objCallingWindow

    Call TrapBrowserError("EEBrowser|SetRequiredIndicators|2")

    '--Clean Up--
    Set objLabel = Nothing

End Sub
'------------------------------------------------------------------------------


Sub NoteButtonOnClick(ByVal strID, ByRef objCallingWindow)
    '****************************************************************************
    'PURPOSE:
    'This subroutine is the OnClick handler for ALL note buttons. Every
    'Note button is associated with one or more controls. This routine
    'will call the XML post-processing routines of the control associated with
    'the Note-button. The button used to call this routine has
    '   -- when associated with a single control the same name (matchcode) + _NOTE
    '        as it's associated control.
    '   --  when associated with multiple controls its name (matchcode) = TableName_MULTINOTE
    '****************************************************************************
    On Error Resume Next

    'Reference to the control
    Dim objControl
    Dim objRelatedControl
    Dim objRelatedControlLabel
    Dim strRelatedNoteControls
    Dim strRelatedNoteControl
    Dim arrRelatedNoteControls
    Dim strRelatedNoteControlsRowIds
    Dim strRelatedNoteControlsLabels

    'mblnCancelNavigation = True

    Call TrapBrowserError("Main|NoteButtonOnClick|1")
    With objCallingWindow
        Set objEventObject = .document.all(strID)

        strRelatedNoteControls = objEventObject.getAttribute("relatedNoteControls")

        Call TrapBrowserError("Main|NoteButtonOnClick|2")
        ' --- Does this button get/display the Notes for more than one datapoint ---

'=== IMG_4592 ===
    ' --- Does this button get/display the Notes for more than one datapoint ---
    If isNull(strRelatedNoteControls) then
        strRelatedNoteControls = vbnullstring
    Else

        arrRelatedNoteControls = Split(strRelatedNoteControls, "|")
        For Each strRelatedNoteControl In arrRelatedNoteControls
            ' get the related controls
            Set objRelatedControl = .document.all("dta" & strRelatedNoteControl)
            If Not objRelatedControl Is Nothing Then
                strRelatedNoteControlsRowIds = strRelatedNoteControlsRowIds & objRelatedControl.getAttribute("attachmentPolicyRowId") & "|"
            End if
            ' get the labels
            Set objRelatedControlLabel = .document.all("lbl" & strRelatedNoteControl)
            If Not objRelatedControlLabel Is Nothing Then
              If Len(objRelatedControlLabel.InnerText) > 0 Then
                strRelatedNoteControlsLabels = strRelatedNoteControlsLabels & objRelatedControlLabel.InnerText & "|"
              Else
                Set objRelatedControl = .document.all("dta" & strRelatedNoteControl)
                If Not objRelatedControl Is Nothing Then
                  strRelatedNoteControlsLabels = strRelatedNoteControlsLabels & objRelatedControl.getAttribute("noteLabel") & "|"
                End If
              End If
            End if
        Next
    End if

    Call TrapBrowserError("Main|NoteButtonOnClick|3")

    ' set these in the HTML
    If Len(strRelatedNoteControlsRowIds) > 0 Then
        strRelatedNoteControlsRowIds = Left(strRelatedNoteControlsRowIds, Len(strRelatedNoteControlsRowIds) - 1)
    End if

    ' set these in the HTML
    If Len(strRelatedNoteControlsLabels) > 0 Then
        strRelatedNoteControlsLabels = Left(strRelatedNoteControlsLabels, Len(strRelatedNoteControlsLabels) - 1)
    End if

    Call TrapBrowserError("Main|NoteButtonOnClick|4")

    '---Set Post Processing Vars---
    'Set the matchcode
    .marrEEData(1) = objEventObject.name

'=== IMG_4593 ===
    '---Set Post Processing Vars---
    'Set the matchcode
    .marrEEData(1) = objEventObject.name

    ' --- Nodekey
    .marrEEData(3) = .marrSessionInformation(3)

    ' --- RowIds of the controls
    .marrEEData(4) = strRelatedNoteControlsRowIds

    ' ---
    .marrEEData(5) = 1

    ' --- Set controls ---
    .marrEEData(6) = strRelatedNoteControls
    ' --- Set control labels ---
    .marrEEData(7) = strRelatedNoteControlsLabels

    Call .CallServer(objEventObject, False)
    Call TrapBrowserError("Main|NoteButtonOnClick|5")

End With

'--Clean Up--

Set objEventObject = Nothing
Set objRelatedControl = Nothing

Call TrapBrowserError("EEBrowser|NoteButtonOnClick|6")

End Sub
'------------------------------------------------------------------------------


Sub InfoButtonOnClick(ByVal strID, ByRef objCallingWindow)
    '****************************************************************************
    'PURPOSE:
    'This subroutine is the OnClick handler for ALL information buttons. Every
    'information button is associated with exactly one control. This routine
    'will call the XML post-processing routines of the control associated with
    'the info-button.
    '   The button used to call this routine has the same name (matchcode)
    ' as it's associated control.  This allows the user to select the button

'=== IMG_4594 ===
    'will call the XML post-processing routines of the control associated with
    'the info-button.
    '   The button used to call this routine has the same name (matchcode)
    ' as it's associated control.  This allows the user to select the button
    ' without forcing a post-process the associated control.
    '****************************************************************************
    On Error Resume Next

    Dim objControl

                                    'Reference to the  control associated with the
                                    'information button the user pressed.

    Dim strCallType
    Dim strLookupControl
    Dim objEventObject

    mblnCancelNavigation = True

    With objCallingWindow
        Set objEventObject = .document.all(strID)
        ' Determine the type of call based on the custom attribute
        ' of calltype assigned to the button.
        ' Default will be 1 (post-process)
        strCallType = objEventObject.getAttribute("calltype")
        strLookupControl = objEventObject.getAttribute("lookupfor")

        ' Look for a calltype value, if not found, or empty, set to "1"
        If IsNull(strCallType) Then strCallType = 1
        If Len(strCallType) = 0 Then strCallType = 1

        If IsNull(strLookupControl) Then
            Set objControl = objEventObject
        ElseIf Len(strLookupControl) = 0 Then
            Set objControl = objEventObject
        Else
            Set objControl = .document.all("dta" & strLookupControl)
        End If
            Call TrapBrowserError("EEBrowser|InfoButtonOnClick|1")

        '---Set Post Processing Vars---
        .marrEEData(1) = objControl.name
            'Set the matchcode
        .marrEEData(2) = objControl.value
            'Set the value

'=== IMG_4595 ===
            Call TrapBrowserError("EEBrowser|InfoButtonOnClick|1")

        '---Set Post Processing Vars---
        .marrEEData(1) = objControl.name
            'Set the matchcode
        .marrEEData(2) = objControl.value
            'Set the value
        .marrEEData(3) = .marrSessionInformation(3)
            ' Nodekey
        .marrEEData(5) = strCallType
            'Post-process indicator: 0=Pre-Process, 1=Post-Process

        Call .CallServer(objControl, False)
            Call TrapBrowserError("EEBrowser|InfoButtonOnClick|2")

        If strCallType <> "1" Then
            ' Post process the control associated with the info button
            ' if the call was something other than post-process
            .marrEEData(1) = objControl.name
                'Set the matchcode
            .marrEEData(5) = 1
                'Post-process indicator: 0=Pre-Process, 1=Post-Process
            Call SetArrayData (objControl, objCallingWindow)
            Call .CallServer(objControl, False)
                Call TrapBrowserError("EEBrowser|InfoButtonOnClick|3")

        End If
    End With
        'objCallingWindow

    '--Clean Up--
    Set objControl = Nothing
    Set objEventObject = Nothing

End Sub
'------------------------------------------------------------------------------


Sub ListButtonClick(ByVal strID, ByVal objCallingWindow)
    '****************************************************************************
    'PURPOSE:
    'This subroutine in called in response to the event fired by a button
    'associated with the xmllist behavior.
    'The button has a listname property and an action property.

'=== IMG_4596 ===
    End Sub
    '------------------------------------------------------------------------------


    Sub ListButtonClick(ByVal strID, ByVal objCallingWindow)
        '****************************************************************************
        'PURPOSE:
        'This subroutine in called in response to the event fired by a button
        'associated with the xmllist behavior.
        'The button has a listname property and an action property.
        'The action property of the xmllist object is updated and the ListButtonOnClick
        'routine is called for the list.
        '
        '****************************************************************************
        On Error Resume Next

        Dim objButton

        Dim objControl                             'Handle to the XMLLIST button that was clicked.

                                                    'Handle to the XMLLIST associated with the button.

    With objCallingWindow
        Set objButton = .document.all(strID)
            Call TrapBrowserError("EEBrowser|ListButtonClick|1")

        'Set objControl to the xmllist associated with the button
        Set objControl = .document.all("dta" & objButton.listname)
        'Update the action in the list.  That's where it is expected to be found.
        objControl.action = LCase(objButton.action)
            Call TrapBrowserError("EEBrowser|ListButtonClick|2")
        'Now call the routine to process the action.
        Call ListButtonOnClick(objControl.id, objCallingWindow)
            Call TrapBrowserError("EEBrowser|ListButtonClick|3")
    End With
        'objCallingWindow

    '--Clean Up--
    Set objButton = Nothing
    Set objControl = Nothing

End Sub
'------------------------------------------------------------------------------

'=== IMG_4597 ===
    End Sub
    '------------------------------------------------------------------------------


    Sub XMLListonItemSelected(ByVal strID, ByVal objCallingWindow)
        On Error Resume Next

        Dim objControl

        With objCallingWindow
            Set objControl = .document.all(strID)
            Call SetArrayData(objControl,objCallingWindow)
        End With
        Set objControl = Nothing

    End Sub
    '------------------------------------------------------------------------------


    Sub ListButtonOnClick(ByVal strID, ByVal objCallingWindow)
        '****************************************************************************
        'PURPOSE:
        'This subroutine in called in response to the event fired by the xmllist
        'behavior.  GetControlValue(objControl) returns the action required.
        '
        '****************************************************************************
        On Error Resume Next

        Dim objControl                             'Handle to the XMLLIST button that was clicked.

        Dim blnCallServer
        Dim objMessageBox
        Dim intRetValue
        Dim strAction
        Dim strMessage

        With objCallingWindow
            Set objControl = .document.all(strID)
                Call TrapBrowserError("EEBrowser|ListButtonOnClick|1")

                mstrReturnValue = ""
                    ' clear this to be sure not to use old values

                ' Look for an alternate delete message

'=== IMG_4598 ===
            mstrReturnValue = ""
                ' clear this to be sure not to use old values

            ' Look for an alternate delete message
            strMessage = objControl.getAttribute("DeleteMessage") & vbNullString
            If Len(strMessage) = 0 Then
                strMessage = "Are you sure you want to permanently delete the selected item and any associated items?"
            End If

            '---Set Post Processing Vars---
            .marrEEData(1) = objControl.name
                'Set the matchcode
            strAction = LCase(GetControlValue(objControl))
                'Post-process indicator: "add,edit,delete,etc."
            .marrEEData(5) = strAction

            blnCallServer = True
            '---Skip Call to Server if Delete Confirmation is not given------------
            If InStr(1, strAction, "delete") > 0 Then
                intRetValue = .ShowUserMessage (strMessage, "WARNING", 2)
                If intRetValue = 0 Then
                    blnCallServer = False
                End If
            End If

            If blnCallServer = True Then

                '// Execute any related function, used primarily to select extra items in the list
                Set objNode = .mxmlDoc.selectSingleNode("//control [@matchcode = """ & objControl.name & """ and @relatedfunction]")
                If Not objNode Is Nothing Then
                    Execute ("." & objNode.attributes.getNamedItem("relatedfunction").nodeValue & "()")
                End If


                Call SetArrayData(objControl,objCallingWindow)

                'Update the DataChanged indicator
                mblnDataChanged = True
                .mblnEEDataChanged = True

                mstrXMLDetail = Decompress(.marrSessionInformation(6))

                Call SessionXML_SetItem("datachanged", "T")

'=== IMG_4599 ===
            mstrXMLDetail = Decompress(.marrSessionInformation(6))

            Call SessionXML_SetItem("datachanged", "T")
            'Update with the entire XMLSession string
            .marrSessionInformation(6) = mstrXMLDetail

            Call .CallServer(objControl, True)

            Call TrapBrowserError("EEBrowser|ListButtonOnClick|2")
            'move focus to some control to force chechrequiredindicators to run.
            'This will update buttons if the last list item was deleted.
            If strAction = "delete" Then

                ' Find a button to put focus
                If Not .dtaCancel.disabled and .dtaCancel.style.visibility = "visible" Then
                    .dtaCancel.focus
                ElseIf Not .dtaOk.disabled and .dtaOk.style.visibility = "visible" Then
                    .dtaOk.focus
                ElseIf Not .dtaNext.disabled and .dtaNext.style.visibility = "visible" Then
                    .dtaNext.focus
                End If

            End If
            ' If the return value is next, do this routine again
            If StrComp(GetStringField ( mstrReturnValue, 1, ",") , "NEXT", vbTextCompare) = 0 Then
                Call ListButtonOnClick(strID, objCallingWindow)
            End If

        End If

    End With
        'objCallingWindow

    Call TrapBrowserError("EEBrowser|ListButtonOnClick|3")

    '--Clean Up--
    Set objControl = Nothing

End Sub
'--------------------------------------------------------------------------------

Sub NavButtonOnClick(ByRef objCallingWindow)

'=== IMG_4600 ===
            mstrXMLDetail = Decompress(.marrSessionInformation(6))

            Call SessionXML_SetItem("datachanged", "T")
            'Update with the entire XMLSession string
            .marrSessionInformation(6) = mstrXMLDetail

            Call .CallServer(objControl, True)

            Call TrapBrowserError("EEBrowser|ListButtonOnClick|2")
            'move focus to some control to force chechrequiredindicators to run.
            'This will update buttons if the last list item was deleted.
            If strAction = "delete" Then

                ' Find a button to put focus
                If Not .dtaCancel.disabled and .dtaCancel.style.visibility = "visible" Then
                    .dtaCancel.focus
                ElseIf Not .dtaOk.disabled and .dtaOk.style.visibility = "visible" Then
                    .dtaOk.focus
                ElseIf Not .dtaNext.disabled and .dtaNext.style.visibility = "visible" Then
                    .dtaNext.focus
                End If

            End If
            ' If the return value is next, do this routine again
            If StrComp(GetStringField ( mstrReturnValue, 1, ",") , "NEXT", vbTextCompare) = 0 Then
                Call ListButtonOnClick(strID, objCallingWindow)
            End If

        End If

    End With
        'objCallingWindow

    Call TrapBrowserError("EEBrowser|ListButtonOnClick|3")

    '--Clean Up--
    Set objControl = Nothing

End Sub
'--------------------------------------------------------------------------------

Sub NavButtonOnClick(ByRef objCallingWindow)

'=== IMG_4601 ===
    End Sub
'--------------------------------------------------------------------------------

Sub NavButtonOnClick(ByRef objCallingWindow)
    '****************************************************************************
    'PURPOSE:
    'This subroutine is the OnClick handler for ALL navigation buttons;
    '"Save", "Cancel", and "Next". Effectivley, all it does is set the pre/post
    'process indicator [marrEEData(5)] and calls the server.

    'The first routine in the server call function (CallServer) is to load
    'the marrServerCalls() array with the appropriate subroutine list from the
    'XML data island, based on the pre/post process indicator [marrEEData(5)].
    '
    '****************************************************************************

    On Error Resume Next

    Dim strFieldList
                                'String to hold a list of control labels of required controls
                                'that do not have values.

    Dim strBooleanFlag
    Dim objMessageBox
    Dim intRetValue
    Dim objControl
    Dim objNode
    Dim blnChangesRating
                                'related functions associated with the control can change rating data

    blnChangesRating = False
    With objCallingWindow
        Set objControl = .event.srcElement

'Update the DataChanged indicator
        If mblnInquiryMode Or mblnReadOnly Then
            mblnDataChanged = False
            .mblnEEDataChanged = False
        End If

        Select Case UCase(objControl.id)
            Case "DTAOK", "DTANEXT", "DTAOKSPECIAL"
                If Not CheckRequiredIndicators(strFieldList,objCallingWindow) Then
                    intRetValue = .ShowUserMessage ("This page cannot be saved because the following required data has not been entered: " & vbLf & strFieldList & ".", "WARNING", «?»

                    'Set focus to the cancel button if it is visible and not disabled.

'=== IMG_4602 ===
'Set focus to the cancel button if it is visible and not disabled.
If Not .dtaCancel.disabled and .dtaCancel.style.visibility = "visible" Then
    .dtaCancel.focus
End If
    'Not dtaCancel.disabled and dtaCancel.style.visibility = "visible"
    ' Reset the button flag
.mblnNavButtonClicked = True
Exit Sub
    'Don't call the server.
End If
    'Not CheckRequiredIndicators(strFieldList)

' ===========Get any data required to save on OK or Next ================
Dim objRelatedControl
' Determine if the button clicked has a related control...
' If it does, this is the item that holds the data/value (to post process/ save)
' Otherwise, simply post process the button
Set objNode = .mxmlDoc.selectSingleNode("//control [@matchcode = """ & objControl.name & """ and @relatedcontrol]")

If Not objNode Is Nothing Then
    ' there is a related control, find it and get the value
    Set objRelatedControl = .document.all( "dta" & objNode.attributes.getNamedItem("relatedcontrol").nodeValue )

    If objRelatedControl Is Nothing Then
        ' The related control may be a data island
        Set objRelatedControl = .document.all( objNode.attributes.getNamedItem("relatedcontrol").nodeValue )
    End If
    Set objNode = Nothing

    If Not objRelatedControl Is Nothing Then
        ' For buttons related to xmllist the behavior, set the action property of the list to the action property of the button.
        Call SetArrayData ( objRelatedControl, objCallingWindow )
        blnChangesRating = True
        Set objRelatedControl = Nothing
    End If
Else
    'Not objNode Is Nothing ( no related control exists )
    ' If no related control exists, check for a related function.
    Set objNode = .mxmlDoc.selectSingleNode("//control [@matchcode = """ & objControl.name & """ and @relatedfunction]")
    If Not objNode Is Nothing Then
        Execute (".marrEEData(2) = ." & objNode.attributes.getNamedItem("relatedfunction").nodeValue & "()")
        blnChangesRating = True
    End If

'=== IMG_4603 ===
    End If
End If
' ================================================

'--Update marrSessionInformation(6) - the XMLSession info with the--
'--DataChanged value.
If mblnDataChanged Or .mblnEEDataChanged Then strBooleanFlag = "T" Else strBooleanFlag = "F"

'Update the browser's Session XML var
mstrXMLDetail = .marrSessionInformation(6)
mstrXMLDetail = Decompress(mstrXMLDetail)

'Update the DataChanged indicator
If SessionXML_SetItem("datachanged",strBooleanFlag) Then
    'Update with the entire XMLSession string
    .marrSessionInformation(6) = mstrXMLDetail
End If

Case "DTACANCEL", "DTABACK"
    '// Call a related function
    Set objNode = .mxmlDoc.selectSingleNode("//control [@matchcode = """ & objControl.name & """ and @relatedfunction]")
    If Not objNode Is Nothing Then
        Execute (".marrEEData(2) = ." & objNode.attributes.getNamedItem("relatedfunction").nodeValue & "()")
    End If
    'Check to see if changes should be saved
    If mblnDataChanged Or .mblnEEDataChanged Then
        ' Check if the user should be prompted to save changes
        If Not .mxmlDoc.selectSingleNode("//page[@ignorechanges=""T""]") Is Nothing Then
            intRetValue = 1
                ' Simulate an OK button press
        Else
            'If data has changed on this form, then tell user data will be lost
            intRetValue = .ShowUserMessage("All Edited Information On This Page Will Be Lost If You Cancel." & vbLf & vbLf & "IS THAT OK?", "WARNING", 2)
        End If
            ' .mxmlDoc.selectSingleNode("page[ignorechanges=""T""]") Is Nothing

        If intRetValue = 0 Then
            Call TrapBrowserError("EEBrowser|NavButtonOnClick|1")
            .dtaCancel.focus()
            ' Reset the button flag
            .mblnNavButtonClicked = False
            Call TrapBrowserError("EEBrowser|NavButtonOnClick|1.1")
            Exit Sub

'=== IMG_4604 ===
        ' Reset the button flag
        .mblnNavButtonClicked = False
        Call TrapBrowserError("EEBrowser|NavButtonOnClick|1.1")
        Exit Sub
            'The user doesn't want to continue with the cancel operation.
    Else
        ' Reset the data changed flags to prevent further warning messages
        ' regarding losing data when closing windows.
        ' In the case of a modal, don't change these values, the parent
        ' page may still be using mblnDataChanged.
        If Not .mblnModal Then
            mblnDataChanged = False
            .mblnEEDataChanged = False
            mblnRatingDataChanged = False
        End If
    End If
        'intRetValue = 0
End If
    'mobjAQSMain.mblnDataChanged

End Select

Call TrapBrowserError("EEBrowser|NavButtonOnClick|2")

'--Setup the EEData array & call the server--
.marrEEData(1) = objControl.name
    'Set the matchode
.marrEEData(5) = "1"
    'Set post-process indicator

Call .CallServer(objControl, blnChangesRating)

Call TrapBrowserError("EEBrowser|NavButtonOnClick|3")

End With
    'objCallingWindow

Set objControl = Nothing
End Sub
'--------------------------------------------------------------------------

Sub OnFocusHandler(ByVal strID, ByRef objCallingWindow)
    '****************************************************************

'=== IMG_4605 ===
Sub OnFocusHandler(ByVal strID, ByRef objCallingWindow)
    '****************************************************************
    'PURPOSE:
    'This subroutine is responsible for handling the OnFocus events for ALL
    'data controls and the "Save", "Cancel", and "Next" command buttons. When
    'called, this routine determines if the previous control needs post-processing
    'and if the current control (the one who called this routine) needs
    'pre-processing, then calls the server as appropriate. Also the previous
    'control's "visual focus indicator" will be removed.
    '
    'One special case is a combo box post-process call. If the combo box doesn't
    'allow the entering of text (LimitToList="T") AND the user entered text not
    'found in the list, then a message is displayed and focus is placed back to
    'the offending combo box control.

    'PARAMETERS:
    'strID: The ID of the calling control.
    '
    '****************************************************************
    On Error Resume Next

    Dim objCurrentControl
                                                          'A handle to the current control (has focus) on the page.

    Dim objPreviousControl
                                                          'A handle to the previous control (lost focus) on the page.
                                                          'it's appearance.

    Dim vntCurrentValue
                                                          'The current value of the previous control.

    Dim objMessageBox
    Dim strOKDisabledStatus
                                                          'Used to remember the state of the OK button when this routine started.

    Dim objNode
    Dim textRange

    Dim blnUnicodeFound
    Dim objControlLabel
    Dim strMessage

    With objCallingWindow
        'mblnFocusChanged indicates if focus was changed to another control
        'by calling SetControlFocus before this routine is finished.

'=== IMG_4606 ===
    With objCallingWindow
        'mblnFocusChanged indicates if focus was changed to another control
        'by calling SetControlFocus before this routine is finished.
        mblnFocusChanged = False
        mblnResetInitialValue = False
        'Remember the state of the ok button to determine if it changed after CheckRequiredIndicators
        strOKDisabledStatus = GetControlAttribute(.dtaOK, "DISABLED")

        If .mblnPageLoaded Then

            If Left(strID,3) = "inf" Or Left(strID,3) = "cal" Then
                'If the current control is an information or calendar button,
                'then reference the associated date control instead of the button.
                Set objCurrentControl = .document.all("dta" & Right(strID,Len(strID)-3))
            Else
                'Get a reference to the control that called this event.
                Set objCurrentControl = .document.all(strID)


            ' Initialize the previous control
            Set objPreviousControl = .document.all("dta" & .mstrPreviousMatchcode)
            If objPreviousControl Is Nothing Then
                Set objPreviousControl = .document.all(.mstrPreviousMatchcode)
            End If

            ' If no previous control is found, make it the same as the current control.
            ' This allows controls not conforming to the "matchcode" naming conventions
            ' to initiate postprocessing
            If objPreviousControl Is Nothing Then
                Set objPreviousControl = objCurrentControl
            End If
            ' Not objPreviousControl Is Nothing
            mstrPreviousMatchcode = .mstrPreviousMatchcode

            Call TrapBrowserError("EEBrowser|OnFocusHandler|2")

            ' Special code to handle problem with date control.  The first time the date
            ' control (on a tab that is not the first one) gets focus, the data disapears.
            ' This writes the original value back into the date control.
            ' -- The first time only that is gets focus. !! --
            If Not IsNull(objCurrentControl.getAttribute ("firstdate")) Then
                If Len(objCurrentControl.getAttribute ("firstdate") ) > 0 Then

'=== IMG_4607 ===
                If Len(objCurrentControl.getAttribute ("firstdate") ) > 0 Then
                    Call SetControlValue(objCurrentControl, objCurrentControl.name, objCurrentControl.getAttribute ("firstdate"), "L", objCallingWindow)
                    objCurrentControl.setAttribute "firstdate", ""
                    objCallingWindow.mvntInitialValue = GetControlValue(objPreviousControl)
                End If
            End If

            'If Not IsNull(objCurrentControl.getAttribute("lookupfor")) Then
            If Len (objCurrentControl.getAttribute("lookupfor") & "") > 0 Then
                ' This is a lookup button, or related control that does work for some other control
                Set objCurrentControl = .document.all("dta" & objCurrentControl.getAttribute("lookupfor"))
            End If
        End If

        If Not IsNull(objCurrentControl.getAttribute("decimals")) Then
            Set textRange = objCurrentControl.createTextRange()
            If textRange.queryCommandState("Overwrite") Then
                Call textRange.execCommand("Overwrite", false, false)
            End If
        End If

        Call TrapBrowserError("EEBrowser|OnFocusHandler|1")

        'If Not IsEmpty(mstrPreviousMatchcode) Then
        If IsEmpty(objPreviousControl) Then
            Set objPreviousControl = objCurrentControl
        End If

        If .mstrPreviousMatchcode <> "" Then
            If objPreviousControl.name <> objCurrentControl.name Then
                Call TrapBrowserError("EEBrowser|OnFocusHandler|3")
                '--Get the current value of the previous control--
                vntCurrentValue = GetControlValue(objPreviousControl)

                Call TrapBrowserError("EEBrowser|OnFocusHandler|4")

                ' Debug code - Write the focus changes to the debug window if it is open.
                If Not mvntDebugWindow Is Nothing Then
                    If mobjAQSMain.mvntDebugWindow.ShowFocusChange Then
                        mvntDebugWindow.ShowData (vbCrLf & "PREV - " & _
                            objPreviousControl.name & "(" & .mvntInitialValue & ") - " & _

'=== IMG_4608 ===
        If Not mvntDebugWindow Is Nothing Then
            If mobjAQSMain.mvntDebugWindow.ShowFocusChange Then
                mvntDebugWindow.ShowData (vbCrLf & "PREV - " & _
                    objPreviousControl.name & "(" & .mvntInitialValue & ") - " & _
                    "(" & vntCurrentValue & ")" & _
                    vbCrLf & "CURR - " & objCurrentControl.name)
            End If
        End If
        Err.Clear

        '--Special test for the combo box control to see if the user typed in some text--
        '--which is not in the list when the control is limited to the list.
        If UCase(objPreviousControl.tagname) = "OBJECT" Then
            If UCase(objPreviousControl.classid) = "CLSID:0FAA926E-2AF4-11D3-9995-00A0CC3A27A9" Then
                If (objPreviousControl.LimitToList = "T") And (objPreviousControl.listindex < 0) Then
                    Call TrapBrowserError("EEBrowser|OnFocusHandler|6")
                    '--Send the user back to the control because they must select from an item in the list.--
                    .ShowUserMessage "You must select an item from the " & CleanText(.document.all("lbl" & objPreviousControl.name).innertext) & " list.", "WARNING", 1
                    Call SetControlFocus(objPreviousControl.name,objCallingWindow)
                    '--Clean Up--
                    Set objCurrentControl        = Nothing
                    Set objPreviousControl   = Nothing
                    Exit Sub
                End If
                '(objPreviousControl.LimitToList = "T") AND (objPreviousControl.listindex < 0)
            End If
            'objPreviousControl.classid = "clsid:0FAA926E-2AF4-11D3-9995-00A0CC3A27A9"
        End If
        'UCase(objPreviousControl.tagname) = "OBJECT"

        '--Initialize the PostProcess variable
        Dim blnPostProcess
        blnPostProcess = False

        '--Special case for new calendar control
        If StrComp(objCurrentControl.name,"cancel",vbTextCompare) <> 0 AND _
            StrComp(objCurrentControl.name,"back",vbTextCompare) <> 0 Then
            If UCase(objPreviousControl.tagname) = "INPUT" Then
                If Not IsNull(objPreviousControl.getAttribute("iscalendar")) Then
                    If UCase(objPreviousControl.iscalendar) = "T" Then
                        objPreviousControl.value = objCallingWindow.FormatDate(Trim(objPreviousControl.value))

'=== IMG_4609 ===
            If Not IsNull(objPreviousControl.getAttribute("iscalendar")) Then
                If UCase(objPreviousControl.iscalendar) = "T" Then
                    objPreviousControl.value = objCallingWindow.FormatDate(Trim(objPreviousControl.value))
                End If
            End If
        End If

        '--Check if the intial and current values of the previous control, if they are--
        '--different, then the control has been edited and we need to post-process it.--
        '--Also, check for vntCurrentValue = "" and postprocessblanks = "T"--
        If .mvntInitialValue <> vntCurrentValue And .mblnCallServer Then

            blnUnicodeFound = mobjAQSMain.detectUnicodeCharacters(Trim(vntCurrentValue))
            If blnUnicodeFound Then
                blnPostProcess = False
                Set objControlLabel = .document.all("lbl" & objPreviousControl.name)
                If Not objControlLabel Is Nothing Then
                    If Len(objControlLabel.InnerText) > 0 Then
                        strMessage = "Invalid characters present in " & objControlLabel.InnerText & " .Please review"
                        .ShowUserMessage strMessage, "ERROR", 1
                    Else
                        .ShowUserMessage "Invalid characters present. Please review.", "ERROR", 1
                    End If
                Else
                    .ShowUserMessage "Invalid characters present. Please review.", "ERROR", 1
                End If
                Call SetControlFocus(objPreviousControl.name,objCallingWindow)
                Call SetControlValue(objPreviousControl, "", strText, "L", objCallingWindow)
                .mvntInitialValue = GetControlValue(objPreviousControl)
            Else

                mstrXMLDetail = Decompress(mstrXMLDetail)

                Call SessionXML_SetItem("datachanged", "T")
                .marrSessionInformation(6) = mstrXMLDetail
                blnPostProcess = True
            End If
        Else

            If Len(Trim(vntCurrentValue)) = 0 Then
                If StrComp(objPreviousControl.getAttribute ("postprocessblanks") & "", "T", vbTextCompare) = 0 Then
                    blnPostProcess = True
                End If
            End If
        End If

'=== IMG_4610 ===
                End If
            End If

            If blnPostProcess Then
                Call TrapBrowserError("EEBrowser|OnFocusHandler|7")

                '--Move the data from the control requiring post-process to marrEEData()--
                Call SetArrayData(objPreviousControl, objCallingWindow)

                '--Set the application-level flags indicating data has changed on the page--
                mblnDataChanged = True
                '--Set the page-level flag indicating data has changed on the page--
                .mblnEEDataChanged = True

                'Prevent postprocessing of controls if cancel button is selected.
                'This allows users to cancel without fixing bad data.
                If StrComp(objCurrentControl.name,"cancel",vbTextCompare) <> 0 and _
                    StrComp(objCurrentControl.name,"back",vbTextCompare) <> 0 Then
                    '--Post Processing Routine--
                    .marrEEData(1) = objPreviousControl.name
                        'Set the matchcode
                    .marrEEData(5) = 1
                        'Post-process indicator: 0=Pre-Process, 1=Post-Process
                    '// Execute any related function, used primarily to grab extra data
                    Set objNode = .mxmlDoc.selectSingleNode("//control [@matchcode = """ & objCurrentControl.name & """ and @relatedfunction]")
                    If Not objNode Is Nothing Then
                        Execute ("Call ." & objNode.attributes.getNamedItem("relatedfunction").nodeValue & "()")
                    End If
                    Call TrapBrowserError("EEBrowser|OnFocusHandler|8")


                    ' Debug code - Write the Server call data to the debug window if it is open.
                    If Not mvntDebugWindow Is Nothing Then
                        If mobjAQSMain.mvntDebugWindow.ShowServerCalls Then
                            mvntDebugWindow.ShowData (vbCrLf & "Initial - " & "(" & .mvntInitialValue & ")" & _
                                vbCrLf & "Current - " & "(" & vntCurrentValue & ")")
                        End If
                    End If
            Err.Clear


            'Get the initial value to pass to the server component

'=== IMG_4611 ===
                'Get the initial value to pass to the server component

                Call .CallServer(objPreviousControl, True)

            End If

        End If
            'mvntInitialValue <> vntCurrentValue

        End If
            'objPreviousControl.name <> objCurrentControl.name

    End If
        'mstrPreviousMatchcode <> ""

    '--------------- Handle Change of Focus and Value of Previous Control. --------
    '
    ' If validation occured on the previous control where focus was set back to it (SetControlFocus),
    ' the variable mstrFocusChangedTo will be the same as objPreviousControl.name.  In this case,
    ' we do not want to PreProcess the current (or next) control.
    ' If focus was set to the previous control because the data was invalid, the initial value is
    ' set to "*" to force post processing. (otherwise the new initial value will be the invalid data
    ' and be equal to the current value.)
    ' If in addition to setting focus back to the previous control, the value of the previous control
    ' was set by a browser command with SetControlValue, mblnResetInitialValue will be true.  In this
    ' case, it is assumed that the value is correct and no post processing will be required.
    ' The initial value will then be handled normally.
    '
    '---------------------------------------------------------------------------

    If Len(mstrFocusChangedTo) > 0 Then
        If StrComp(mstrFocusChangedTo, objCurrentControl.name, vbTextCompare) <> 0 Then
            'Remove "focus appearance" from objCurrentControl
            Call SetControlValue(objCurrentControl, "", GetControlValue(objCurrentControl), "L", objCallingWindow)
        End If
    End If
    Call TrapBrowserError("EEBrowser|OnFocusHandler|9")

    If StrComp(objCurrentControl.name, "cancel", vbTextCompare) <> 0 and _
        StrComp(objCurrentControl.name, "back", vbTextCompare) <> 0 Then

        If StrComp(mstrFocusChangedTo, objPreviousControl.name, vbTextCompare) <> 0 Then

'=== IMG_4612 ===
        StrComp(objCurrentControl.name, "back", vbTextCompare) <> 0 Then

            If StrComp(mstrFocusChangedTo, objPreviousControl.name, vbTextCompare) <> 0 Then

                ' If the current control was disabled as a result of the post-process of the previous control,
                ' In this case, focus is set back to the previous control.  This is not done for objects (activeX controls) because they seem to get focus even
                ' when disabled?  Also, it does not happen if focus was changed via a browser command - Len(mstrFocusChangedTo) <> 0.
                If GetControlAttribute(objCurrentControl, "disabled") = "T" And StrComp(objCurrentControl.tagName, "OBJECT", vbTextCompare) <> 0 And Len(mstrFocusChangedTo) =«?»
                    Call SetControlFocus(objPreviousControl.name, objCallingWindow)
                    .mvntInitialValue = GetControlValue(objPreviousControl)
                ' If the user causes a post-process of a field resulting in a user message and change in focus by clicking on a combo behavior,
                ' the combo list opens but may not close.  This ElseIf handles closing the list if needed.
                ElseIf (StrComp(objCurrentControl.tagName, "combo", vbTextCompare) = 0 or StrComp(objCurrentControl.tagName, "kpcombo", vbTextCompare) = 0) And Len(mstrFocusCh«?»
                    objCurrentControl.closelist
                    If Not mblnFocusChanged Then Call PreProcess(objCurrentControl, objCallingWindow)
                Else
                    If Not mblnFocusChanged And StrComp(objCurrentControl.Name, objPreviousControl.name, vbTextCompare) <> 0 Then
                        ' Skip the preprocess if the control is getting focus without losing focus to another control
                        ' This is the case with the combo control when the user clicks the list open and closed.
                        Call PreProcess(objCurrentControl, objCallingWindow)
                    End If
                End If
            Else

                If Not mblnResetInitialValue Then

                    ' Don't reset initial value for a button if focus is set back to it.
                    ' This will force post processing calls when they should not occur.
                    If StrComp(objCurrentControl.tagName, "button", vbTextCompare) <> 0 And StrComp(objCurrentControl.tagName, "ibutton", vbTextCompare) <> 0 Then
                        ' EOLA-related, to activate all of the date controls we must set focus to them to get the initial value into them but in the case where the date contro«?»
                        ' focus back to the previous control.  If the previous control was a date control, we shouldn't force the post-process to occur otherwise we get the ca«?»
                        If StrComp(objCurrentControl.tagName, "OBJECT", vbTextCompare) = 0 And GetControlAttribute(objCurrentControl, "disabled") = "T" Then
                            If UCase(objCurrentControl.classid) <> "CLSID:CC696B63-4159-11D0-BDCB-0020A90B183A" And UCase(objPreviousControl.classid) <> "CLSID:CC696B63-4159-1«?»
                                .mvntInitialValue = "*"
                            End If
                        Else
                            .mvntInitialValue = "*"
                        End If
                    End If

                ElseIf StrComp(mstrFocusChangedTo, objPreviousControl.name, vbTextCompare) = 0 Then
                    ' If the focus is moving back to the previous control, reset the initail value to force post-processing
                    .mvntInitialValue = "*"
                End If

'=== IMG_4613 ===
                    End If
                End If
                .mblnCallServer = True
            End If
        End If

        mstrFocusChangedTo = ""
        Call TrapBrowserError("EEBrowser|OnFocusHandler|10")
        '--------------------------------------------------------------------------------------------

        '--See if ALL Required Level 1 controls have data. If so,make  --
        '--sure the [Ok] and [Next] buttons are enabled as appropriate.--
        Call CheckRequiredIndicators("",objCallingWindow)

        'This code handles the condition where the user fills in the final required field that occurs
        'in the tab order just before the OK button. Since the ok button does not become enabled until
        'CheckRequiredIndicators is called, the user cannot tab directly to the ok button.  In this case,
        'focus is moved from the CANCEL button to the OK button.
        'The second case handles the event where the user deletes the data from a required field and tabs
        'to the OK button.  Since the OK button gets disabled, the image does not get updated correctly.
        'Focus is then moved to the CANCEL button.

        'If focus was not changed to some other control with SetControlFocus()

            '--CANCEL button
            'And the current control is the cancel button
            'And the OK button is enabled
            'And the OK was Disabled when this routine started,
            'Then set focus to the OK button.
            ' -- or
            ' set focus to the Next button if the Ok button
            ' is not visible.

            '--OK button
            'And the current control is the OK button
            'And the OK button is disabled
            'Then set focus to the CANCEL button.

        If Not mblnFocusChanged Then
            Select Case UCase(objCurrentControl.name)
                Case "CANCEL", "BACK"

                    If StrComp(strOKDisabledStatus, "T", vbTextCompare) = 0 Then

'=== IMG_4614 ===
Select Case UCase(objCurrentControl.name)
    Case "CANCEL", "BACK"

        If StrComp(strOKDisabledStatus, "T", vbTextCompare) = 0 Then

            If GetControlAttribute(.dtaOK, "disabled") = "F" _
                And GetControlAttribute(.dtaOK, "visible") = "T" Then

                    .dtaOK.focus

            ElseIf GetControlAttribute(.dtaNext, "disabled") = "F" _
                And GetControlAttribute(.dtaNext, "visible") = "T" Then

                    .dtaNext.focus
            End If
        End If
    Case "OK"
        If GetControlAttribute(.dtaOK, "disabled") = "T" Then
            .dtaCANCEL.focus
        End If
    End Select
End If

    End If
        'mblnPageLoaded
End With
    'objCallingWindow

Call TrapBrowserError("EEBrowser|OnFocusHandler|11")

'--Clean Up--
Set objCurrentControl      = Nothing
Set objPreviousControl = Nothing

End Sub
'------------------------------------------------------------------------------

Sub OnKeyPressHandler(ByVal strID, ByRef objCallingWindow)
'*****************************************************************************
'PURPOSE:
'This subroutine is responsible for handling the OnKeyPress events for ALL
'data controls.  When called, this routine determines if the value of the control
'has changed from nothing to something.  If this is the case then CheckRequiredIndicators

'=== IMG_4615 ===
'PURPOSE:
'This subroutine is responsible for handling the OnKeyPress events for ALL
'data controls. When called, this routine determines if the value of the control
'has changed from nothing to something.  If this is the case then CheckRequiredIndicators
'gets called.

'PARAMETERS:
'strID: The ID of the calling control.
'objCallingWindow: Reference to the Window that control is in
'*****************************************************************************
On Error Resume Next

Dim varCurrentValue
Dim blnOK
Dim objCurrentControl
Dim strAdditionalHandler

    With objCallingWindow

        blnOK = False
        If .document.all ( "dtaOK").enabled = True Then
            blnOK = True
        End If

        If .mblnPageLoaded Then
            If Left(strID,3) = "inf" Or Left(strID,3) = "cal" Then
                'If the current control is an information or calendar button,
                'then reference the associated date control instead of the button.
                Set objCurrentControl = .document.all("dta" & Right(strID,Len(strID)-3))
            Else
                'Get a reference to the control that called this event.
                Set objCurrentControl = .document.all(strID)
            End If
            Call TrapBrowserError("Main|OnKeyPressHandler|1")

            If Not IsNull(objCurrentControl.getAttribute("iscalendar")) Then
                ' Always recheck a required date control because length > 0 doesn't cut it
                Call CheckRequiredIndicators("", objCallingWindow)
            ElseIf Len(GetControlValue(objCurrentControl)) > 0 XOR blnOK Then
                ' If both conditions are true Or both conditions are false, no need to check.
                Call CheckRequiredIndicators("",objCallingWindow)
            End If

'=== IMG_4616 ===
' If both conditions are true Or both conditions are false, no need to check.
    Call CheckRequiredIndicators("",objCallingWindow)
End If

' ------------------------------

strAdditionalHandler = objCurrentControl.getAttribute("additionalkeyhandler") & ""
If Len(strAdditionalHandler) > 0 Then
    Execute "." & strAdditionalHandler
End If
' ------------------------------

    End If
        'mblnPageLoaded

    .marrEEData(1) = objCurrentControl.name
    Call SetArrayData(objCurrentControl, objCallingWindow)
    .marrEEData(5) = "keypress"
    Call .CallServer(objCurrentControl, False)
End With
    'objCallingWindow

Call TrapBrowserError("Main|OnKeyPressHandler|2")
'--Clean Up--
Set objCurrentControl       = Nothing

End Sub
'------------------------------------------------------------------------------

Sub OnKeyUpHandler(ByVal strID, ByRef objCallingWindow)
'*****************************************************************************
'PURPOSE:
'This subroutine is responsible for handling the OnKeyPress events for ALL
'data controls.  When called, this routine determines if the value of the control
'has changed from nothing to something.  If this is the case then CheckRequiredIndicators
'gets called.

'PARAMETERS:
'strID: The ID of the calling control.
'objCallingWindow: Reference to the Window that control is in
'*****************************************************************************
On Error Resume Next

Dim varCurrentValue
Dim blnOK

'=== IMG_4617 ===
On Error Resume Next

Dim varCurrentValue
Dim blnOK
Dim objCurrentControl
Dim strAdditionalHandler

    With objCallingWindow

        blnOK = False
        If .document.all ( "dtaOK").enabled = True Then
            blnOK = True
        End If

        If .mblnPageLoaded Then
            If Left(strID,3) = "inf" Or Left(strID,3) = "cal" Then
                'If the current control is an information or calendar button,
                'then reference the associated date control instead of the button.
                Set objCurrentControl = .document.all("dta" & Right(strID,Len(strID)-3))
            Else
                'Get a reference to the control that called this event.
                Set objCurrentControl = .document.all(strID)
            End If
            Call TrapBrowserError("Main|OnKeyUpHandler|1")

            If Not IsNull(objCurrentControl.getAttribute("iscalendar")) Then
                ' Always recheck a required date control because length > 0 doesn't cut it
                Call CheckRequiredIndicators("", objCallingWindow)
            ElseIf Len(GetControlValue(objCurrentControl)) > 0 XOR blnOK Then
                ' If both conditions are true Or both conditions are false, no need to check.
                Call CheckRequiredIndicators("",objCallingWindow)
            End If

            ' ------------------------------

            strAdditionalHandler = objCurrentControl.getAttribute("additionalkeyhandler") & ""
            If Len(strAdditionalHandler) > 0 Then
                Execute "." & strAdditionalHandler
            End If
            ' ------------------------------

        End If
            'mblnPageLoaded
    End With
        'objCallingWindow

'=== IMG_4618 ===
        End If
            'mblnPageLoaded
    End With
        'objCallingWindow

    Call TrapBrowserError("Main|OnKeyUpHandler|2")
    '--Clean Up--
    Set objCurrentControl        = Nothing

End Sub
'------------------------------------------------------------------------------

Sub OnTabClickHandler(ByRef objCallingWindow)
    '*****************************************************************************
    'PURPOSE:
    ' This subroutine is called when a tab in the TABSTRIP behavior
    ' is clicked.  The BuildTab routine is called in case the tab content
    ' is build dynamically.
    '*****************************************************************************
    On Error Resume Next

    Call BuildTab(objCallingWindow)
    Call TrapBrowserError("EEBrowser|OnTabClickHandler|1")

End Sub
'------------------------------------------------------------------------------

Sub PreProcess(ByRef objControl, ByRef objCallingWindow)
    '*****************************************************************************
    'PURPOSE:
    'The purpose of this subroutine is to take a control reference from the
    'OnFocusHandler routine and perform a pre-process call to the server
    'ONLY for combo box controls that have no list items, then to visually
    'mark all referenced controls so the user knows which control has focus.
    '
    'PARAMETERS:
    'objControl: An object reference to the control that called the
    '                    OnFocusHandler event.
    '
    '*****************************************************************************
    On Error Resume Next

    Dim objPreviousControl

'=== IMG_4619 ===
    Dim objPreviousControl
        'A handle to the previous control (lost focus) on the page.

    With objCallingWindow
        .marrEEData(1) = objControl.name
            'Set the current matchcode
        .marrEEData(5) = 0
            'Preprocess indicator: 0=Pre-Process, 1=Post-Process

        '--Call the server for a pre-process if it is ok to run the pre-process AND--
        '--the current control is a combo box AND it's list is empty.
        If .mblnCallServer Then

            ' Reset the initial value only if we have changed control names.
            Set objPreviousControl = .document.all("dta" & .mstrPreviousMatchcode)
            If objPreviousControl.name <> objControl.name Then
                .mvntInitialValue = GetControlValue(objControl)
            End If
            Set objPreviousControl  = Nothing

            '--ProtoView Combo Pre-Process--
            If UCase(objControl.tagname) = "OBJECT" Then
                If UCase(objControl.classid) = "CLSID:0FAA926E-2AF4-11D3-9995-00A0CC3A27A9" Then
                    '--Protoview Combo Box--
                    Call .CallServer(objControl, False)
                End If
            End If
                '(objPreviousControl.classid = "clsid:0FAA926E-2AF4-11D3-9995-00A0CC3A27A9")
                'UCase(objPreviousControl.tagname) = "OBJECT"

            '--COMBO Behavior Pre-Process--
            If UCase(objControl.tagname) = "COMBO" or UCase(objControl.tagname) = "KPCOMBO" Then
                Dim objNode
                ' If pre process calls exist, call the server,
                ' otherwise, if no items are in the combo list, fill the list from page xml data
                Set objNode = .mxmlDoc.selectSingleNode("//control[@matchcode=""" & objControl.name & """]/calls[ @type = 'pre' ]")

                If Not objNode Is Nothing Then
                    Call .CallServer(objControl, False)
                ElseIf objControl.listcount = 0 Then
                    Call FillComboList (objControl, objCallingWindow)
                End If

'=== IMG_4620 ===
            ElseIf objControl.listcount = 0 Then
                Call FillComboList (objControl, objCallingWindow)
            End If

            objControl.select
        End If
            'UCase(objPreviousControl.tagname) = "COMBO" or UCase(objControl.tagname) = "KPCOMBO"

        '--<SELECT> tag Pre-Process--
        If UCase(objControl.tagname) = "SELECT" Then
            Call .CallServer(objControl, True)
        End If
            'UCase(objPreviousControl.tagname) = "SELECT"

    End If
        'mblnCallServer

    If StrComp(.mstrPreviousMatchcode, objControl.name, vbTextCompare) <> 0 Then
        Call SetInitialValueData(objControl, objCallingWindow)
    End If

    '--Remember the current control as the previous control--
    .mstrPreviousMatchcode = objControl.name

    '--If we are at the "error" control, then reset the module-level flag.--
    '--NOTE: Then flag is set ONLY if the server requested the browser to--
    '--perform the "DISPLAY_ERROR" action (verb).
    If objControl.name = .mstrErrorMatchcode Then
        .mblnCallServer = True
            'reset the flag
    End If  'objControl.name = mstrErrorMatchcode
End With
    'objCallingWindow

Call TrapBrowserError("EEBrowser|PreProcess|4")

End Sub
'------------------------------------------------------------------------------

Sub RunXMLBrowserProcedures(ByRef strCallType, ByRef objCallingWindow)
'*****************************************************************************
'PURPOSE:
'This routine will perform and XSL query against the XML data island on the

'=== IMG_4621 ===
End Sub
'------------------------------------------------------------------------------

Sub RunXMLBrowserProcedures(ByRef strCallType, ByRef objCallingWindow)
    '*****************************************************************************
    'PURPOSE:
    'This routine will perform and XSL query against the XML data island on the
    'page and look for browser routines that should run of the type spcified by
    'the strCallType parameter. If any subroutines are found, they will be
    'executed by the browser in the order they appear in the XML DI.
    '
    'PARAMETERS:
    ' strCallType: Indicates the "type" attribute value of a <calls> tag
    '                for which to search the XML DI. Can be extended to
    '                        match on multiple attributes like the following
    '                        example ->
    '
    '                                tab|matchcode=tabins
    '
    '                In this example the first item is always matched to the
    '                type attribute and the additional search criteria of
    '                matchcode="tabins" would also be applied
    '
    '*****************************************************************************
    On Error Resume Next

    Dim objNodes
                                            'The nodes returned from the XPATH XML query.

    Dim objRoutineToCall
                                            'Handle to subroutine tag's attribute node.

    Dim strQuery
                                            'The query to execute.

    Dim intCount
                                            'Counter.

    Dim arrParms
                                            'Array of compound match parameters

    '--Build the XSL query string for the desired type of browser calls--
    If InStr(1, strCallType, "|", vbTextCompare) > 0 Then
        arrParms = Split(strCallType, "|")
        For intCount = 0 to UBound(arrParms)
            If intCount = 0 Then
                strQuery = "//calls[(@type='" & arrParms(intCount) & "')"
            Else

'=== IMG_4622 ===
            Else
                strQuery = strQuery & " and (@" & Split(arrParms(intCount), "=")(0) & _
                                "='" & Split(arrParms(intCount), "=")(1) & "')"
            End If
        Next
        strQuery = strQuery & "]/call"
        'sample query: //calls[(@type='tab') and (@matchcode='TABINS')]/call
    Else
        strQuery = "//calls[@type='" & strCallType & "']/call"
        'sample query: //calls[@type="browser_windowonload"]/call
    End If

    '--Find all the appropriate call nodes in the XMLDI--
    set objNodes = objCallingWindow.mxmlDoc.selectnodes(strQuery)
        Call TrapBrowserError("EEBrowser|RunXMLBrowserProcedures|1")

    '--Go through the call nodes and execute the specified subroutines--
    For intCount = 0 To objNodes.length - 1
        Set objRoutineToCall = objNodes(intCount).attributes.getNamedItem("subroutine")
            Call TrapBrowserError("EEBrowser|RunXMLBrowserProcedures|2")
        If Not objRoutineToCall Is Nothing Then
            '--This actually runs the specified subroutine--
            Execute "objCallingWindow." & objRoutineToCall.nodevalue
            Call TrapBrowserError("EEBrowser|RunXMLBrowserProcedures|3")
        End If
    Next
        'intCount = 0 to objNodes.length - 1

    Call TrapBrowserError("EEBrowser|RunXMLBrowserProcedures|4")

    '--Clean Up--
    Set objNodes              = Nothing
    Set objRoutineToCall      = Nothing

End Sub
'------------------------------------------------------------------------------

Sub SetArrayData(ByRef objControl, ByRef objCallingWindow)
    '*****************************************************************************
    'PURPOSE:
    'The purpose of the subroutine is to take the current data from the specified
    'control and place it into the appropriate marrEEData() array data elements
    'defined below in preparation for a call to the server.

'=== IMG_4623 ===
Sub SetArrayData(ByRef objControl, ByRef objCallingWindow)
    '*****************************************************************************
    'PURPOSE:
    'The purpose of the subroutine is to take the current data from the specified
    'control and place it into the appropriate marrEEData() array data elements
    'defined below in preparation for a call to the server.
    '
    '       marrEEData(2) - Data 1 - Generic data location, used for:
    '                               1) Textbox value (L var)
    '                               2) Text portion of listbox (L var)
    '                               3) Text portion of Checkbox - YES/NO (L var)
    '                               4) Text portion of RADIOBUTTON Behavior (L var)
    '                               5) Action portion of the XMLLIST behavior
    '                               6) Month portion of date
    '
    '       marrEEData(3) - Data 2 - Generic data location, used for:
    '                               1) Index of Listbox (X var)
    '                               2) Index of Checkbox (X var)
    '                               3) Index of RADIOBUTTON Behavior (X var)
    '                               4) Node Key of the selected row of the XMLLIST behavior
    '                               5) Day portion of date
    '                               6) List index of Combo (adjusted for "show zero")
    '                                       or Value of Combo if value is present
    '
    '       marrEEData(4) - Data 3 - Generic data location, used for:
    '                               1) Selected Nodes XML of the XMLLIST behavior
    '                               2) Year portion of date
    '                               3) Value of Combo
    '
    '       marrEEData(7) - Generic data location, used for:
    '                               1) List index of Combo (adjusted for "show zero")
    '
    'PARAMETERS:
    '       objControl: An object reference to the desired control
    '
    '*****************************************************************************
    Dim intOffset
    Dim arrDate

    On Error Resume Next

    '---Move the control's data into the appropriate data elements in marrEEData()---

'=== IMG_4624 ===
    On Error Resume Next

    '---Move the control's data into the appropriate data elements in marrEEData()---
    '---for zEntEdtCtl.
    With objCallingWindow

        .marrEEData(6) = vbNullString
            ' initialize - needs to be vbNullString if not date
        .marrEEData(11) = vbNullString

        Select Case UCase(objControl.tagname)
            Case "OBJECT"

                Select Case UCase(objControl.classid)
                    Case "CLSID:CC696B63-4159-11D0-BDCB-0020A90B183A"
                        '--Protoview Date/Time Control--
                        .marrEEData(2) = objControl.month
                        .marrEEData(3) = objControl.day
                        .marrEEData(4) = objControl.year
                        .marrEEData(6) = objControl.datestring
                        If Not IsDate(.marrEEData(6)) Then
                            .marrEEData(6) = vbNullString
                        End If

                    Case "CLSID:0FAA926E-2AF4-11D3-9995-00A0CC3A27A9"
                        'Not used
                        '--Protoview Combobox Control--
                        'NOTE: Listindex will be negative if user entered text.
                        .marrEEData(2) = GetControlValue(objControl)
                        If objControl.listindex < 0 Then
                            .marrEEData(3) = 0
                                'The user entered text, so ALWAYS assign "0" to the listindex
                        Else
                            If objControl.ShowZero = "T" Then
                                'If zero item is shown, we can use the listindex as-is.
                                .marrEEData(3) = objControl.listindex
                            Else
                                'objControl.ShowZero = "F"
                                'If the zero item is not shown, then we need to add one
                                'to the listindex to get the correct X variable setting.
                                .marrEEData(3) = objControl.listindex + 1
                            End If
                                'objControl.ShowZero = "T"

'=== IMG_4625 ===
                    'objControl.ShowZero = "T"
                End If
                    'objControl.listindex < 0

                .marrEEData(4) = ""

            Case "CLSID:C2000000-FFFF-1100-8000-000000000004"
                'Not used
                '--Protoview Mask Control--
                .marrEEData(2) = objControl.TextWithMask
                .marrEEData(3) = ""
                .marrEEData(4) = ""

            Case "CLSID:C2000000-FFFF-1100-8200-000000000004"
                'Not used
                '--Protoview Numeric Control--
                .marrEEData(2) = GetControlValue(objControl)
                .marrEEData(3) = ""
                .marrEEData(4) = ""

        End Select
            'objControl.classid

        Case "ICHECKBOX"
            'need to pass text and index (X & L vars)
            .marrEEData(2) = GetControlValue(objControl)
            If .marrEEData(2) = "YES" Then
                .marrEEData(3) = 1
            Else
                'objControl.value = "NO"
                .marrEEData(3) = 0
            End If
            .marrEEData(4) = ""

        Case "RADIOBUTTON"
            .marrEEData(2) = GetControlValue(objControl)
            .marrEEData(3) = objControl.selectedindex
            .marrEEData(4) = ""

        Case "XMLLIST"
            .marrEEData(2) = GetControlValue(objControl)
            If objControl.SelectedRowCount = 0 Then
                .marrEEData(3) = objControl.EmptyListNodeKey

'=== IMG_4626 ===
Case "XMLLIST"
    .marrEEData(2) = GetControlValue(objControl)
    If objControl.SelectedRowCount = 0 Then
        .marrEEData(3) = objControl.EmptyListNodeKey
        .marrEEData(4) = ""
    Else
        .marrEEData(3) = objControl.selectednodekey
        .marrEEData(4) = objControl.selectednodesxml
    End If
    '------------------------------------------------------------------------
    ' The nodekey for the list item should indicate the source of
    ' data it represents in the database.  This is important for
    ' Detail Change Tracking.  If the nodekey is simply a number,
    ' then the page nodekey will be used for navigation.
    '------------------------------------------------------------------------

    If InStr(1, .marrEEData(3),"|", vbTextCompare) > 0 Then
        .marrEEData(11) = .marrEEData(3)
            ' Alternate Page Nodekey
    End If


Case "COMBO", "KPCOMBO"
    'this next line actually gets the .text attribute of the combo control which is the literal text,
    'don't let this confuse you for later this case looks for the .value attribute which is the choice or list index
    'of the combo
    .marrEEData(2) = GetControlValue(objControl)

    ' marrEEData(3) - List index (adjusted for "show zero") unless Value is present.
    '                                          The value is sometimes used to indicate the position of the choice
    '                                          in the file when some items are not included in the list.
    ' marrEEData(4) - Always has the value
    ' marrEEData(7) - Always has the list index (adjusted for "show zero")

    intOffset = 0

    'If zero item is shown, we can use the listindex as-is.
    'If the zero item is not shown, then we need to add one
    'to the listindex to get the correct X variable setting.
    If objControl.ShowZero = "F" Then
        intOffset = 1
    End If

    ' this first condition is met if nothing is selected or the user has typed in their own entry in a combo
    ' that is not limitToList, so the .listindex in this first condition will always be -1

'=== IMG_4627 ===
' that is not limitToList, so the .listindex in this first condition will always be -1
If Len(objControl.value) = 0 Then
        .marrEEData(3) = objControl.listindex + intOffset
Else
        .marrEEData(3) = objControl.value
End If

.marrEEData(7) = objControl.listindex + intOffset
.marrEEData(4) = objControl.value

Case "INPUT"
    Select Case UCase(objControl.type)
        Case "TEXT"
            If Not IsNull(objControl.getAttribute("iscalendar")) Then
                If UCase(objControl.iscalendar) = "T" Then
                    .marrEEData(2) = GetControlValue(objControl)
                    If Len(.marrEEData(2)) > 0 Then
                        arrDate = Split(.marrEEData(2), "/")
                        If UBOUND(arrDate) < 2 then
                            objControl.value = .FormatDate(objControl.value)
                            .marrEEData(2) = GetControlValue(objControl)
                            arrDate = Split(.marrEEData(2), "/")
                        End If
                    .marrEEData(6) = .marrEEData(2)
                    .marrEEData(2) = arrDate(0)
                    .marrEEData(3) = arrDate(1)
                    .marrEEData(4) = arrDate(2)
                Else
                    .marrEEData(2) = ""
                    .marrEEData(3) = ""
                    .marrEEData(4) = ""
                    .marrEEData(6) = ""
                End If
            else
                .marrEEData(2) = GetControlValue(objControl)
                .marrEEData(3) = ""
                .marrEEData(4) = ""
            end if
        else
            .marrEEData(2) = GetControlValue(objControl)
            .marrEEData(3) = ""
            .marrEEData(4) = ""
        end if

'=== IMG_4628 ===
        else
            .marrEEData(2) = GetControlValue(objControl)
            .marrEEData(3) = ""
            .marrEEData(4) = ""
        end if
    else
        .marrEEData(2) = GetControlValue(objControl)
        .marrEEData(3) = ""
        .marrEEData(4) = ""
    end if
Case "PASSWORD", "FILE"
    .marrEEData(2) = GetControlValue(objControl)
    .marrEEData(3) = ""
    .marrEEData(4) = ""

Case "CHECKBOX"
    'need to pass text and index (X & L vars)
    .marrEEData(2) = GetControlValue(objControl)
    If .marrEEData(2) = "YES" Then
        .marrEEData(3) = 1
    Else
        'objControl.value = "NO"
        .marrEEData(3) = 0
    End If
    .marrEEData(4) = ""

Case "RADIO"
    'NOTE: We are not using this control and instead using the RADIOBUTTON
    'behavior control.

Case "BUTTON"
    '**CODE REQUIRED**

Case "SUBMIT"
    '**CODE REQUIRED**
End Select
    'UCase(objControl.type)

Case "SELECT"
    .marrEEData(2) = GetControlValue(objControl)

    If objControl.ShowZero = "T" Then
        'If zero item is shown, we can use the listindex as-is.

'=== IMG_4629 ===
        'If zero item is shown, we can use the listindex as-is.
        .marrEEData(3) = objControl.selectedIndex
    Else
        'objControl.ShowZero = "F"
        'If the zero item is not shown, then we need to add one
        'to the listindex to get the correct X variable setting.
        .marrEEData(3) = objControl.selectedIndex + 1
    End If
        'objControl.ShowZero = "T"
    ' Make sure there is something selected before attempting to get the value.
    If objControl.selectedIndex <> -1 Then .marrEEData(4) = objControl.options(objControl.selectedIndex).value

Case "TEXTAREA"
    .marrEEData(2) = GetControlValue(objControl)
    .marrEEData(3) = ""
    .marrEEData(4) = ""

Case "DIV"
    .marrEEData(2) = objControl.innerText
    .marrEEData(3) = objControl.innerHTML
    .marrEEData(4) = ""

Case "XML"
    .marrEEData(2) = objControl.xmlDocument.xml

    End Select
        'UCase(objControl.tagname)

    End With
        'objCallingWindow

    Call TrapBrowserError("EEBrowser|SetArrayData|1")

End Sub
'------------------------------------------------------------------------------

Sub SetInitialValueData(ByRef objControl, ByRef objCallingWindow)
    '*****************************************************************
    'PURPOSE:
    'The purpose of the subroutine is to take the current data from the specified
    'control and place it into the appropriate marrEEData() array data elements
    'defined below in preparation for a call to the server.  These values
    'are the initial values for the following postprocess.

'=== IMG_4630 ===
Sub SetInitialValueData(ByRef objControl, ByRef objCallingWindow)
    '*****************************************************************
    'PURPOSE:
    'The purpose of the subroutine is to take the current data from the specified
    'control and place it into the appropriate marrEEData() array data elements
    'defined below in preparation for a call to the server.  These values
    'are the initial values for the following postprocess.
    '
        marrEEData(9) - Data 1 - (L var)
        marrEEData(10) - Data 2 - (X var)
    '

    'PARAMETERS:
    '   objControl: An object reference to the desired control
    '
    '*****************************************************************
    Dim intOffset

    On Error Resume Next

    '---Move the control's data into the appropriate data elements in marrEEData()---
    '---for zEntEdtCtl.
    With objCallingWindow

        .marrEEData(9) = GetControlValue(objControl)
        .marrEEData(10) = vbNullString

        Select Case UCase(objControl.tagname)

        Case "ICHECKBOX"
            'need to pass text and index (X & L vars)
            If .marrEEData(9) = "YES" Then
                .marrEEData(10) = 1
            Else
                'objControl.value = "NO"
                .marrEEData(10) = 0
            End If

        Case "RADIOBUTTON"
            .marrEEData(10) = objControl.selectedindex

        Case "COMBO", "KPCOMBO"
            intOffset = 0
            'If zero item is shown, we can use the listindex as-is.

'=== IMG_4631 ===
    'If zero item is shown, we can use the listindex as-is.
    'If the zero item is not shown, then we need to add one
    'to the listindex to get the correct X variable setting.
    If objControl.ShowZero = "F" Then
        intOffset = 1
    End If

    If Len(objControl.value) = 0 Then
            .marrEEData(10) = objControl.listindex + intOffset
    Else
            .marrEEData(10) = objControl.value
    End If

Case "INPUT"
    Select Case UCase(objControl.type)

        Case "CHECKBOX"
            'need to pass text and index (X & L vars)
            If .marrEEData(9) = "YES" Then
                .marrEEData(10) = 1
            Else
                'objControl.value = "NO"
                .marrEEData(10) = 0
            End If

    End Select
        'UCase(objControl.type)

Case "SELECT"
    intOffset = 0
    'If zero item is shown, we can use the listindex as-is.
    'If the zero item is not shown, then we need to add one
    'to the listindex to get the correct X variable setting.
    If objControl.ShowZero = "F" Then
        intOffset = 1
    End If

    If objControl.selectedIndex <> -1 Then
        .marrEEData(10) = objControl.options(objControl.selectedIndex).value
        If Len(Trim(.marrEEData(10))) = 0 Then
            .marrEEData(10) = objControl.selectedIndex + intOffset
        End If
    End If

'=== IMG_4632 ===
            End If

        End Select
            'UCase(objControl.tagname)

    End With
        'objCallingWindow

    Call TrapBrowserError("EEBrowser|SetInitialValueData|1")

End Sub
'------------------------------------------------------------------------------

Sub SetControlAttribute(ByRef objControl, ByVal strMatchCode, ByVal strAttribute, ByVal vntValue, ByRef objCallingWindow)
    '*****************************************************************
    'PURPOSE:
    'The purpose of this subroutine is to set an attribute value of the control
    'referenced in the parameter. This should be the ONLY way to set an
    'attribute value of a control, so as to keep the code as generic as possible.
    '
    'Since many HTML and ActiveX controls have different methods of setting an
    'attribute, it is best to specifically specify each control type and it's
    'appropriate method to set the desired attribute.
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    '
    'NOTE: The only attributes supported are;
    '           - "VISIBLE", Boolean, acceptable values "T"/"F","Y"/"N","1"/"0","-1"/"0"
    '           - "DISABLED", Boolean, acceptable values "T"/"F","Y"/"N","1"/"0","-1"/"0"
    '
    '           Since these attribute directly affect either standard HTML or ActiveX
    '           attributes (or properties), these attributes are not required to be
    '           included in the HTML before manipulating them. However, if ANY USER
    '           DEFINED or CUSTOM attributes are adjusted in the future, they MUST BE
    '           present in the HTML BEFORE they can be manipulated with this routine.
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    '
    'PARAMETERS:
    '   objControl: An object reference to the desired control
    'strAttribute: The attribute name to set
    '     vntValue: The attribute value to set or assign to the control
    '
    '*****************************************************************
On Error Resume Next

'=== IMG_4633 ===
On Error Resume Next

'A handle to a related control, Like a calendar button with
'a date control, so we can apply the same attributes to it.
Dim objRelatedControl

Dim blnBooleanAttribute                    'Flag indicating the attribute is a boolean type.

Dim strOrigValue                           'The original value - not converted into a boolean value.
Dim objMenu
Dim strUsrOpt

'-- Get disabled color, first time only
If IsEmpty(mintDisabledBlue) Then
    Set objMenu = window.frames("menu")
    mintDisabledRed = Split(objMenu.mColorCtlDisabledDec, "|")(0)
    mintDisabledGreen = Split(objMenu.mColorCtlDisabledDec, "|")(1)
    mintDisabledBlue = Split(objMenu.mColorCtlDisabledDec, "|")(2)

    'if other background colors is needed for disabled fields.
    If mobjAqsMain.UserOption("disfldbackgroundcolor", "T", strUsrOpt) Then
        If StrComp(strUsrOpt, "T", vbTextCompare) = 0 Then
            mhexDisabledColor = objMenu.mColorCtlDisabledHexYellow
        Else
            mhexDisabledColor = objMenu.mColorCtlDisabledHex
        End if
    End If

    mhexDisabledLabelColor = objMenu.mColorCtlDisabledLabelHex
    mhexRequiredLabelColor = objMenu.mColorCtlRequiredLabelHex
    mhexComboLTLFalseColor = objMenu.mColorCtlComboLTLFalseHex
    mhexComboLTLTrueColor = objMenu.mColorCltComboLTLTrueHex
    mhexRequiredBackgroundColor = objMenu.mColorCtlRequiredBackgroundHex
    mintRequiredBackgroundRed = Split(objMenu.mColorCtlRequiredBackgroundDec, "|")(0)
    mintRequiredBackgroundGreen = Split(objMenu.mColorCtlRequiredBackgroundDec, "|")(1)
    mintRequiredBackgroundBlue = Split(objMenu.mColorCtlRequiredBackgroundDec, "|")(2)
    Set objMenu = Nothing
End If

'-- Get LTL highlighting setting, first time only
If IsEmpty(mblnEnableLTLHighlight) Then
    If UserOption("ltlhighlight", "T", strUsrOpt) Then
        'Recheck for value (default needs to be disabled)

'=== IMG_4634 ===
        'Recheck for value (default needs to be disabled)
        If StrComp(strUsrOpt, "T", vbTextCompare) = 0 Then
            mblnEnableLTLHighlight = True
        Else
            mblnEnableLTLHighlight = False
        End If
    Else
        mblnEnableLTLHighlight = False
    End If
End If

'-- Get required highlighting setting, first time only
If IsEmpty(mblnEnableRequiredHighlight) Then
    If UserOption("reqhighlight", "T", strUsrOpt) Then
        'Recheck for value (default needs to be disabled)
        If StrComp(strUsrOpt, "T", vbTextCompare) = 0 Then
            mblnEnableRequiredHighlight = True
        Else
            mblnEnableRequiredHighlight = False
        End If
    Else
        mblnEnableRequiredHighlight = False
    End If
End If

'--Condition the in-coming parameters--
strAttribute = UCase(strAttribute)
strOrigValue = vntValue

Select Case UCase(vntValue)
    Case "T","Y"
        'All boolean true conditions
        vntValue = True
        blnBooleanAttribute = True
    Case "F","N"
        'All boolean false conditions
        vntValue = False
        blnBooleanAttribute = True
    Case Else
        blnBooleanAttribute = False
End Select

Call TrapBrowserError("EEBrowser|SetControlAttribute|1")

'=== IMG_4635 ===
Call TrapBrowserError("EEBrowser|SetControlAttribute|1")

If Not objControl Is Nothing Then

    With objControl
        If blnBooleanAttribute Then
            '--Set the appropriate attribute for the type of control--
            Select Case UCase(.tagname)
                Case "OBJECT"
                    Select Case UCase(.classid)

                        Case "CLSID:1C203F13-95AD-11D0-A84B-00A0247B735B"
                            '--Tree Control--
                            Select Case strAttribute
                                Case "VISIBLE"
                                    If vntValue Then
                                        .style.visibility = "visible"
                                    Else
                                        .style.visibility = "hidden"
                                    End If
                                    Call TrapBrowserError("EEBrowser|SetControlAttribute|1.1")

                                Case "DISABLED"
                                    .enabled = Not vntValue
                            End Select

                    Case "../../SYSTEM/WINCONTROLS/AQSCONTROLLIBRARY1.DCL#AQSCONTROLLIBRARY.TREEVIEW"
                        '--***IE8 Tree Control ***--
                        Select Case strAttribute
                            Case "VISIBLE"
                                If vntValue Then
                                    .style.visibility = "visible"
                                Else
                                    .style.visibility = "hidden"
                                End If
                                Call TrapBrowserError("EEBrowser|SetControlAttribute|1.1")

                            Case "DISABLED"
                                .enabled = Not vntValue
                        End Select

                    Case "CLSID:CC696B63-4159-11D0-BDCB-0020A90B183A"
                        '--Protoview Date/Time Control--

'=== IMG_4636 ===
'--Protoview Date/Time Control--
Select Case strAttribute
    Case "VISIBLE"
        If vntValue Then
            .style.visibility = "visible"
        Else
            .style.visibility = "hidden"
        End If
        Call TrapBrowserError("EEBrowser|SetControlAttribute|2")

    Case "DISABLED"
        'EOLA fix:  the control that is being passed in can't be updated so create a temp one that can.
        Dim tempControl
        Set tempControl = objCallingWindow.document.all(objControl.id)
        tempControl.Enabled = Not vntValue

        'Look for a command button related to the date control
        'that is used for displaying a calendar behavior.  If found
        'set its DISABLED attribute to match the Date Control's.
        '***** KEEP THE CALENDAR BUTTON ENABLED - PREVENT THE SHOWMODAL INSTEAD.
        Set objRelatedControl = objCallingWindow.document.all("cal" & .name)
            Call TrapBrowserError("EEBrowser|SetControlAttribute|3.1")
        If Not objRelatedControl Is Nothing Then
            Call SetControlAttribute(objRelatedControl,"",strAttribute,strOrigValue,objCallingWindow)
        End If  'Not objRelatedControl Is Nothing

        Call TrapBrowserError("EEBrowser|SetControlAttribute|3.2")

        If vntValue Then
            tempControl.backcolor = RGB(mintDisabledRed, mintDisabledGreen, mintDisabledBlue)
        Else
            tempControl.backcolor = RGB(255, 255, 255)
        End If
        Call TrapBrowserError("EEBrowser|SetControlAttribute|3.3")

End Select
    'strAttribute

Case "CLSID:C2000000-FFFF-1100-8200-000000000004"
    '--Protoview Numeric Control--
    Select Case strAttribute
        Case "VISIBLE"
            If vntValue Then

'=== IMG_4637 ===
'--Protoview Numeric Control--
Select Case strAttribute
    Case "VISIBLE"
        If vntValue Then
            .style.visibility = "visible"
        Else
            .style.visibility = "hidden"
        End If
        Call TrapBrowserError("EEBrowser|SetControlAttribute|8")

    Case "DISABLED"
        .enabled = Not vntValue

        If vntValue Then
            'Set backcolor to pale yellow
            .backcolor = RGB(mintDisabledRed, mintDisabledGreen, mintDisabledBlue)
        Else
            'Set backcolor to white
            .backcolor = RGB(255, 255, 255)
        End If
        Call TrapBrowserError("EEBrowser|SetControlAttribute|9")
End Select
    'strAttribute
End Select
    '.classid

Case "RADIOBUTTON"
    Select Case strAttribute
        Case "VISIBLE"
            If vntValue Then
                .visible = true
            Else
                .visible = false
            End If
        Case "DISABLED"
            .enabled = Not vntValue
    End Select

Case "IBUTTON","TOOLBUTTON"
    Select Case strAttribute
        Case "VISIBLE"
            If vntValue Then
                .style.visibility = "visible"

'=== IMG_4638 ===
'  [no fenced code block found in transcript]

'=== IMG_4639 ===
'  [no fenced code block found in transcript]

'=== IMG_4640 ===
'  [no fenced code block found in transcript]

'=== IMG_4641 ===
'  [no fenced code block found in transcript]

'=== IMG_4642 ===
'  [no fenced code block found in transcript]

'=== IMG_4643 ===
'  [no fenced code block found in transcript]

'=== IMG_4644 ===
'  [no fenced code block found in transcript]

'=== IMG_4645 ===
'  [no fenced code block found in transcript]

'=== IMG_4646 ===
'  [no fenced code block found in transcript]

'=== IMG_4647 ===
'  [no fenced code block found in transcript]

'=== IMG_4648 ===
'  [no fenced code block found in transcript]

'=== IMG_4649 ===
'  [no fenced code block found in transcript]

'=== IMG_4650 ===
        Select Case strVarType
            Case "L"

                If vntValue = "YES" Then
                    objControl.checked = True
                        'Set based on the "L" variable
                Else
                    'vntValue = "NO"
                    objControl.checked = False
                        'Set based on the "L" variable
                End If

            Case "X"
                If vntValue = 1 Then
                    objControl.checked = True
                        'Set based on the "X" variable
                Else
                    objControl.checked = false
                        'Set based on the "X" variable
                End If
        End Select

    Case "RADIOBUTTON"
        Select Case strVarType
            Case "L"
                objControl.value = vntValue
                    'Sets the "L" variable
            Case "X"
                objControl.selectedindex = vntValue
                    'Sets the "X" variable
        End Select
            'strVarType

    Case "XMLLIST"
        'This method only has an affect if the XMLLIST behavior
        'is being loaded as the result of a transformation after
        'the page has been loaded.  Otherwise, the code would have been
        'executed when the window loaded.  An internal flag prevents
        'the code from executing more than once.

        objControl.Reset

    Case "COMBO", "KPCOMBO"
        Select Case strVarType

'=== IMG_4651 ===
                    objControl.listindex = vntValue
                Else
                    'objControl.ShowZero = "F"
                    'Since there is NO "real" zero element, we need to shift the
                    'index value down one to match the element in the combobox.
                    'Sets the "X" variable
                    objControl.listindex = vntValue - 1
                End If
        End Select
            'strVarType

    Case "IBUTTON"
        Select Case strVarType
            Case "L","X"
                'Sets the "L" variable
                objControl.text = vntValue
            Case "V"
                'Sets the "Value" property
                objControl.value = vntValue
        End Select
            'strVarType

    Case "INPUT"
        Select Case UCase(objControl.type)
            Case "TEXT", "PASSWORD", "BUTTON", "SUBMIT", "HIDDEN"
                If IsNull(objControl.getAttribute("decimals")) Or Trim(vntValue) = "" Then
                        If IsNull(objControl.getAttribute("iscalendar")) Then
                    If Trim(vntValue) = "00/00/0000" Then
                        vntValue = ""
                    End If
                            objControl.value = Trim(vntValue)
                            'Sets the "L" variable
                        Else
                            ' calendar control
                            If Not objCallingWindow.CheckDate(vntValue) Then
                                vntValue = ""
                            ElseIf Trim(vntValue) = "12/31/1899" OR Trim(vntValue) = "00/00/0000" Then
                                vntValue = ""
                            End If
                            objControl.value = vntValue
                    End If

                Else

'=== IMG_4652 ===
                            ElseIf Trim(vntValue) = "12/31/1899" OR Trim(vntValue) = "00/00/0000" Then
                                vntValue = ""
                            End If
                            objControl.value = vntValue
                    End If

                Else
                    '// numeric control
                    Dim intNumDecimals, intDecIndex, intCurDecimals, strToMask, intLoop
                    strToMask = Trim(vntValue)
                    intNumDecimals = objControl.decimals
                    intDecIndex = InStr(1,strToMask,".",vbTextCompare)

                    if Not intDecIndex = 0 Then
                        intCurDecimals = Len(strToMask) - intDecIndex
                    elseif intNumDecimals > 0  Then
                        strToMask = strToMask & "."
                    end if
                    '// Add trailing zeroes if intCurDecimals is less than intNumDecimals
                    if intCurDecimals < intNumDecimals Then
                        for intLoop = intCurDecimals to intNumDecimals - 1
                            strToMask = strToMask & "0"
                        next
                    end if
                    objControl.value = strToMask
                End If


            Case "CHECKBOX"
                Select Case strVarType
                    Case "L"
                        If vntValue = "YES" Then
                            objControl.checked = True
                                'Set based on the "L" variable
                        Else
                            'vntValue = "NO"
                            objControl.checked = False
                                'Set based on the "L" variable
                        End If

                    Case "X"
                        If vntValue = 1 Then
                            objControl.checked = True

'=== IMG_4653 ===
                    Case "X"
                        If vntValue = 1 Then
                            objControl.checked = True
                                'Set based on the "X" variable
                        Else
                            objControl.checked = false
                                'Set based on the "X" variable
                        End If
                End Select
                    'strVarType

            Case "RADIO"
                'NOTE: We are not using this control and instead using the RADIOBUTTON
                'behavior control.

        End Select
                'UCase(objControl.type)

    Case "SELECT"
        Select Case strVarType
            Case "L"
                'objControl.text = vntValue                    'Sets the "L" variable
                For intCount = 0 To objControl.options.length - 1
                    If objControl.options(intCount).text = vntValue Then
                        objControl.selectedIndex = intCount
                        Exit For
                    End If
                        'objControl.options(intCount).text = vntValue
                Next
                    'intCount

            Case "X"
                If objControl.ShowZero = "T" Then
                    'We can simply take the index value and use as-is since there

                    'is a "real" zero element.
                    objControl.selectedIndex = vntValue
                        'Sets the "X" variable
                Else
                    'objControl.ShowZero = "F"
                    'Since there is NO "real" zero element, we need to shift the
                    'index value down one to match the element in the combobox.

'=== IMG_4654 ===
            Case "X"
                If objControl.ShowZero = "T" Then
                    'We can simply take the index value and use as-is since there

                    'is a "real" zero element.
                    objControl.selectedIndex = vntValue
                        'Sets the "X" variable
                Else
                    'objControl.ShowZero = "F"
                    'Since there is NO "real" zero element, we need to shift the
                    'index value down one to match the element in the combobox.
                    objControl.selectedIndex = vntValue - 1
                        'Sets the "X" variable
                End If

        End Select
                'strVarType

    Case "DIV"
        objControl.innerText = ""

        '--prevent *s from being added multiple times
        If instr(1,vntValue, "*") > 0 AND instr(1,vntValue, "span") > 0 Then
            vntValue = replace(vntValue, "</span>*", "</span>")
        End If
        objControl.innerHTML = vntValue

    Case "TEXTAREA"
        objControl.value = vntValue
            'Sets the "L" variable

End Select
    'UCase(objControl.tagname)

'If the control that just lost focus is having its value changed by a browser command,
'need to reset the inital value indicator to prevent post processing.
If StrComp(mstrPreviousMatchcode, objControl.name, vbTextCompare) = 0 Then
    'this is used by the onfocushandler

'=== IMG_4655 ===
    'If the control that just lost focus is having its value changed by a browser command,
    'need to reset the inital value indicator to prevent post processing.
    If StrComp(mstrPreviousMatchcode, objControl.name, vbTextCompare) = 0 Then
        'this is used by the onfocushandler
        mblnResetInitialValue = True
    End If

        Call TrapBrowserError("EEBrowser|SetControlValue|1|" & objControl.id)
    End If

    If Len(strMatchCode) > 0 Then
        With objCallingWindow
            Set nodControl = .mxmlDoc.selectSingleNode("//control [ @matchcode = '" & strMatchCode & "']")
            If Not nodControl Is Nothing And Not IsEmpty(nodControl) Then
                If StrComp(strVarType, "L", vbTextCompare) = 0 Then
                    nodControl.attributes.getNamedItem("text").nodeValue = vntValue
                End If
            End If
        End With
        Call TrapBrowserError("EEBrowser|SetControlValue|2|" & strMatchCode)
    End If

End Sub
'----------------------------------------------------------------------------------------


Sub BuildTab(ByRef objCallingWindow)

    Dim intIndex
    Dim strMatchCode
    Dim strDebugText

    On Error Resume Next

    With objCallingWindow
        strMatchCode = .tabstrip.matchcode
        intIndex = CInt(.tabstrip.selectedTab)
        strDebugText = "[ tabnumber = " & CStr(intIndex) & " ] - [ matchcode = " & strMatchCode & " ]"

        If Len(intIndex) = 0 Then
            If mblnDebug Then window.status = "no index"
            Call TrapBrowserError("BuildTab|1.a")
            Exit Sub
        End If

'=== IMG_4656 ===
    End If

    If intIndex = 0 Then
        If mblnDebug Then window.status = strDebugText & " - no change"
        Call TrapBrowserError("BuildTab|1.b")
        Exit Sub
    End If

    If .divTab(intIndex) Is Nothing Then
        If mblnDebug Then window.status = strDebugText & " - is nothing"
        Call TrapBrowserError("BuildTab|1.c")
        Exit Sub
    End If

    If Len(.divTab(intIndex).innerHTML) > 0 Then
        If mblnDebug Then window.status = strDebugText & " - has content"
        Call TrapBrowserError("BuildTab|1.d")
        Exit Sub
    End If

    If Not .mxmlDoc Is Nothing Then
        If Len(.divTab(intIndex).innerHTML) = 0 Then
            Dim blnLoad
            ' Create XSL if necessary
            If mxmlStyle Is Nothing Then
                Set mxmlStyle = CreateObject("MSXML2.FreeThreadedDOMDocument.6.0")
                mxmlStyle.resolveExternals = True
                mxmlStyle.setProperty "AllowDocumentFunction", True
                mxmlStyle.async = False
                mxmlStyle.load "../../system/xsl/Controls_ISLLSYS_20010101.xsl"
                Call TrapBrowserError("BuildTab|2")
            End If

            ' create free threaded XML object
            Set xmlDoc = CreateObject("MSXML2.FreeThreadedDOMDocument.6.0")
            xmlDoc.async = False
            Call xmlDoc.loadXml(.mxmlDoc.xml)
            Call TrapBrowserError("BuildTab|3")

            ' Now create/load the Template object
            Set xmlTemplate = CreateObject("MSXML2.XSLTemplate.6.0")
            Set xmlTemplate.stylesheet = mxmlStyle
            Call TrapBrowserError("BuildTab|4")

'=== IMG_4657 ===
        Call TrapBrowserError("BuildTab|5")

        ' Load XML and transform
        xmlProcessor.input = xmlDoc
        xmlProcessor.transform
        Call TrapBrowserError("BuildTab|6")

        ' Load Tab DIV with transformed HTML
        .divTab(intIndex).innerHTML = xmlProcessor.output
        Call TrapBrowserError("BuildTab|7")

        If mblnDebug Then window.status = strDebugText & " - dynamic build"

        ' Load/Set the controls with the correct values and settings.
        Call GetXMLData("[@tab='" & strMatchCode & "']", objCallingWindow)
        Call TrapBrowserError("BuildTab|8")

        ' Clean up local objects
        Set xmlDoc = Nothing
        Set xmlTemplate = Nothing
        Set xmlProcessor = Nothing

            End If

        End If
        Call TrapBrowserError("BuildTab|9")

    End With
End Sub

Function UnEscapeTextValueForXML(ByVal strToEscape)
'****************************************************************************
'****************************************************************************
    UnEscapeTextValueForXML = Replace(Replace(Replace(Replace(strToEscape,"#http39;","'"),"#http60;","<"),"#http62;",">"),"#http38;","&")
End Function
'----------------------------------------------------------------------------------------

Function ShowZeroText(ByVal pobjControl)
'****************************************************************************
' This function provides the ability to control the "NONE" text when
' a combo needs to shown NONE.
' if the showzero attribute is T, "NONE" is used as the first item
' in the list.

'=== IMG_4658 ===
    Function ShowZeroText(ByVal pobjControl)
    '****************************************************************************
    ' This function provides the ability to control the "NONE" text when
    ' a combo needs to shown NONE.
    ' if the showzero attribute is T, "NONE" is used as the first item
    ' in the list.
    ' if the showzero attribute is something other than T or F the text
    ' is used as the first item in the list.
    '****************************************************************************
        Dim strText

        On Error Resume Next
        strText = UCase(pobjControl.getAttribute ("showzero") & "")

        Select Case strText
            Case "T"
                ShowZeroText = "NONE"
            Case "F"
                ShowZeroText = ""
            Case Else
                If StrComp(Left(strText, 7), "NOUCASE", vbTextCompare) = 0 Then
                    ShowZeroText = Mid(pobjControl.getAttribute ("showzero"),9)
                Else
                    ShowZeroText = strText
                End If
        End Select

        Call TrapBrowserError("ShowZeroText|1")
    End Function
    '----------------------------------------------------------------------------------------


Sub SetIconImages(pstrIcon)
    On Error Resume Next

    Dim objDoc
    On Error Resume Next
    Set objDoc = document.frames("TREENAV")
    Call objDoc.SetIconImage(pstrIcon)
    Set objDoc = Nothing
    Err.Clear

End Sub

'=== IMG_4659 ===
        Set objDoc = Nothing
        Err.Clear

    End Sub

'----------------------------------------------------------------------------------------

Function ClearXMLDetail(ByVal arrXMLDetail)

    On Error Resume Next

    Dim strXSL
    Dim nodItem
    Dim xmlSessionXML
    Dim x

    ' Assume failure
    ClearXMLDetail = False

    ' Load the xml string into the xml object.
    Set xmlSessionXML = CreateObject("MSXML2.DOMDocument.6.0")
    xmlSessionXML.async = False
    If xmlSessionXML.loadXML(mstrXMLDetail) = False Then
      Exit Function
    End If

    For x = 0 To Ubound(arrXMLDetail)
        strXSL = "//item[@name='" & arrXMLDetail(x) & "']"
        Set nodItem = xmlSessionXML.selectSingleNode(strXSL)
        If nodItem Is Nothing Then
          'Do Nothing
        Else
          xmlSessionXML.documentElement.removeChild nodItem
          Set nodItem = Nothing
        End If
    Next

    ' Reset the xml string.
    mstrXMLDetail = xmlSessionXML.xml

    ' Clean up mstrXMLDetail:
    ' Replace double quotes with single quotes.
    ' Remove carriage returns and line feeds.

'=== IMG_4660 ===
        If xmlSessionXML.loadXML(mstrXMLDetail) = False Then
          Exit Function
        End If

    For x = 0 To Ubound(arrXMLDetail)
        strXSL = "//item[@name='" & arrXMLDetail(x) & "']"
        Set nodItem = xmlSessionXML.selectSingleNode(strXSL)
        If nodItem Is Nothing Then
          'Do Nothing
        Else
          xmlSessionXML.documentElement.removeChild nodItem
          Set nodItem = Nothing
        End If
    Next

    ' Reset the xml string.
    mstrXMLDetail = xmlSessionXML.xml

    ' Clean up mstrXMLDetail:
    ' Replace double quotes with single quotes.
    ' Remove carriage returns and line feeds.

    mstrXMLDetail = Replace(mstrXMLDetail, Chr(34), "'")
    mstrXMLDetail = Replace(mstrXMLDetail, Chr(10), "")
    mstrXMLDetail = Replace(mstrXMLDetail, Chr(13), "")

    'Success
    ClearXMLDetail = True

    Call TrapASPError("ClearXMLDetail|1")
    Set xmlSessionXML = Nothing

End Function
