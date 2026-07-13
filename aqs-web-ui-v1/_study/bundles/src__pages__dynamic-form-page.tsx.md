# BUNDLE for src/pages/dynamic-form-page.tsx
# 11 photo fragment(s), ascending start-line order.


========== IMG_2895.md ==========
---
photo: IMG_2895.JPG
type: vscode-code
file: aqs-web-ui/src/pages/dynamic-form-page.tsx
lines: 1-34
orientation: 180
confidence: high
notes: New file (not dashboard.tsx). Tab "dynamic-form-page.tsx 9+", breadcrumb aqs-web-ui > src > pages > dynamic-form-page.tsx. Sharp photo, no ghosting. Explorer sidebar (pages/ folder expanded) shows many more files than earlier photos: dashboard.tsx, dynamic-form-page.tsx (selected), grid-config-example.tsx, legacy-page.tsx (has unsaved-changes dot "U"), lob-action-menu-page.tsx, LobGridExample.tsx (U), login.tsx, page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx (U), root.tsx, UltimateCoverPage.tsx, xsl-test.tsx (U), plus collapsed "providers" and "services" folders. hooks/ folder shows use-form-commit.ts, use-page-form.ts, use-required-field-validation..., use-smart-navigation.ts. lib/ shows grid-normalize.ts (U). Status bar: branch hitanshu/experimental*, 26 errors/0 warnings (down from 31 in the dashboard.tsx photos), No Solution, clock 5:22 PM 7/10/2026.
---
1: import { getItem } from '@utils/session-storage';
2: import { Suspense, useCallback, useMemo } from 'react';
3: import { Alert, Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
4: import { useLoaderData, useNavigation } from 'react-router';
5:
6: import { FormRenderer } from '@components/form-renderer';
7: import { useBrowserCommands } from '@hooks/use-browser-commands';
8: import { useFormCommit } from '@hooks/use-form-commit';
9: import { useFormMethods } from '@providers/form-provider';
10:
11: import type { PageBuildResponse } from '@services/page-build';
12: import type { BrowserCommand, CommitEventType, FormValues, NormalizedField } from '@/types';
13: import type { SessionInfo } from '@features/auth/services/auth';
14: import type { PageBuildButton } from '@utils/transform-pagebuild-response';
15:
16: export interface DynamicFormLoaderData {
17:   pageBuildData?: PageBuildResponse;
18:   normalizedFields: NormalizedField[];
19:   buttons: PageBuildButton[];
20:   browserCommands: BrowserCommand[];
21:   sessionInfo: SessionInfo;
22:   isPopup: boolean;
23:   xmlFilePath?: string;
24:   error?: string;
25: }
26:
27: const createInitialValues = (fields: NormalizedField[]): FormValues => {
28:   return fields.reduce<FormValues>((acc, field) => {
29:     acc[field.matchcode] =
30:       field.defaultValue !== undefined
31:         ? field.defaultValue
32:         : field.controlType === 'checkbox'
33:           ? false
34:           : '';


========== IMG_2896.md ==========
---
photo: IMG_2896.JPG
type: vscode-code
file: aqs-web-ui/src/pages/dynamic-form-page.tsx
lines: 9-39 (approximate for 33-39)
orientation: 180
confidence: high
notes: Same file/tab as IMG_2895 (dynamic-form-page.tsx), same scroll position, photographed with a scroll/motion ghosting artifact (every line duplicated ~2 lines apart), same content as IMG_2895 lines 9-32 (not re-verified here, see IMG_2895 for a clean reading of that range). CORRECTED using IMG_2897 (a later, sharp, non-ghosted photo of this exact same code at lines 27-49) as ground truth: lines 33-39 below are now the verified values from IMG_2897, replacing an earlier low-confidence reconstruction. Explorer sidebar same as IMG_2895. Status bar: 26 errors/0 warnings, No Solution, branch hitanshu/experimental*, clock 5:22 PM 7/10/2026.
---
9:  import { useFormMethods } from '@providers/form-provider';
... (lines 10-32 same as IMG_2895; see that transcript for a clean, non-ghosted reading)
33:           ? false
34:           : '';
35:      return acc;
36:    }, {});
37:  };
38:
39:  const FormPageFallback = () => {


========== IMG_2897.md ==========
---
photo: IMG_2897.JPG
type: vscode-code
file: aqs-web-ui/src/pages/dynamic-form-page.tsx
lines: 16-49
orientation: 180
confidence: high
notes: Continuation/scroll-down of the same dynamic-form-page.tsx tab seen in IMG_2895/2896. Sharp photo, no ghosting — this is the ground-truth source used to correct IMG_2896's line numbers for 33-39. Line 16 "export interface DynamicFormLoaderData {" acts as a sticky-scroll header; line 17 (pageBuildData?: PageBuildResponse;) is hidden behind it (gutter jumps 16 -> 18). Explorer sidebar unchanged from IMG_2895/2896 (dynamic-form-page.tsx selected in pages/). Status bar: 26 errors/0 warnings, No Solution, branch hitanshu/experimental*, clock 5:2x PM 7/10/2026 (partially cut off).
---
16:     export interface DynamicFormLoaderData {        [sticky-scroll header]
17⟪?⟫:   (hidden behind sticky header; per IMG_2895 this is: pageBuildData?: PageBuildResponse;)
18:       normalizedFields: NormalizedField[];
19:       buttons: PageBuildButton[];
20:       browserCommands: BrowserCommand[];
21:       sessionInfo: SessionInfo;
22:       isPopup: boolean;
23:       xmlFilePath?: string;
24:       error?: string;
25:     }
26:
27:     const createInitialValues = (fields: NormalizedField[]): FormValues => {
28:       return fields.reduce<FormValues>((acc, field) => {
29:         acc[field.matchcode] =
30:           field.defaultValue !== undefined
31:             ? field.defaultValue
32:             : field.controlType === 'checkbox'
33:               ? false
34:               : '';
35:         return acc;
36:       }, {});
37:     };
38:
39:     const FormPageFallback = () => {
40:       return (
41:         <Box className="flex min-h-[30vh] items-center justify-center" aria-live="polite">
42:           <CircularProgress size={30} />
43:         </Box>
44:       );
45:     };
46:
47:     /**
48:      * Generic PageBuild form renderer for all dynamic AQS entry/edit pages.
49:      * Renders normalized fields, executes server browser commands, and commits field changes via XMLServerCall.


========== IMG_2898.md ==========
---
photo: IMG_2898.JPG
type: vscode-code
file: aqs-web-ui/src/pages/dynamic-form-page.tsx
lines: 27-28 (sticky headers), 46-64
orientation: 180
confidence: medium
notes: Continuation/scroll-down of the same dynamic-form-page.tsx tab (IMG_2895-2897). Two sticky-scroll headers pinned at top: line 27 "const createInitialValues = (fields: NormalizedField[]): FormValues => {" and line 28 "return fields.reduce<FormValues>((acc, field) => {". Below that the frame has the same scroll/motion ghosting artifact as other photos in this session (lines duplicated ~2 apart) for content already captured cleanly in IMG_2897 (lines 33-49: end of createInitialValues, FormPageFallback, JSDoc comment) — not re-transcribed here, see IMG_2897. New content starting at line 51: `export default function DynamicFormPage() {` and its initial hooks/setup through line 64, reconstructed from the clearer/bold instances of each line cross-checked against gutter numbers; medium confidence due to residual ghosting overlap in this range. Explorer sidebar unchanged. Status bar: 26 errors/0 warnings, No Solution, branch hitanshu/experimental*.
---
27:     const createInitialValues = (fields: NormalizedField[]): FormValues => {     [sticky-scroll header]
28:       return fields.reduce<FormValues>((acc, field) => {                          [sticky-scroll header]
...
46:
47:     /**
48:      * Generic PageBuild form renderer for all dynamic AQS entry/edit pages.
49:      * Renders normalized fields, executes server browser commands, and commits field changes via XMLServerCall.
50:      */
51:     export default function DynamicFormPage() {
52:       const loaderData = useLoaderData() as DynamicFormLoaderData;
53:       const navigation = useNavigation();
54:       const formMethods = useFormMethods();
55:       // useBrowserCommands has built-in deduplication to prevent infinite loops
56:       const { executeCommands, isExecuting } = useBrowserCommands(loaderData.browserCommands);
57:
58:       const initialValues = useMemo(
59:         () => createInitialValues(loaderData.normalizedFields),
60⟪?⟫:      [loaderData.normalizedFields],
61⟪?⟫:    );
62⟪?⟫:
63⟪?⟫:      // For user input, we track changes via handleValuesChange callback
64⟪?⟫:      // For browser commands, we get latest RHF values directly via formMethods.getValues()


========== IMG_2899.md ==========
---
photo: IMG_2899.JPG
type: vscode-code
file: aqs-web-ui/src/pages/dynamic-form-page.tsx
lines: 51-55 (sticky headers), 56-84 (approximate for 74-84)
orientation: 180
confidence: medium
notes: Continuation/scroll-down of the same dynamic-form-page.tsx tab (IMG_2895-2898). Sticky-scroll headers pinned at top: line 51 "export default function DynamicFormPage() {", 52 "const loaderData = useLoaderData() as DynamicFormLoaderData;", 53 "const navigation = useNavigation();", 54 "const formMethods = useFormMethods();". Lines 56-73 are legible (cross-checking overlapping ghost/bold instances) and match/extend IMG_2898's tail. Lines roughly 77-81 are hidden behind further sticky-scroll header overlay in this particular screenshot (gutter jumps from 76 to 82), so the exact line numbers for several useFormCommit() call-argument properties (pageBuildData, sessionInfo, xmlFilePath, error, validationErrors, onCommandsExecuted) are uncertain — content itself is legible from overlapping fragments and presented in a plausible logical order, marked with ⟪?⟫. Explorer sidebar unchanged (dynamic-form-page.tsx selected in pages/). Status bar: 26 errors/0 warnings, No Solution, branch hitanshu/experimental*, clock 5:2x PM 7/10/2026.
---
51:     export default function DynamicFormPage() {                              [sticky-scroll header]
52:       const loaderData = useLoaderData() as DynamicFormLoaderData;            [sticky-scroll header]
53:       const navigation = useNavigation();                                    [sticky-scroll header]
54:       const formMethods = useFormMethods();                                  [sticky-scroll header]
55:       // useBrowserCommands has built-in deduplication to prevent infinite loops   [sticky-scroll header, per IMG_2898]
...
60:         [loaderData.normalizedFields],
61:       );
62:
63:       // For user input, we track changes via handleValuesChange callback
64:       // For browser commands, we get latest RHF values directly via formMethods.getValues()
65:       const handleValuesChange = useCallback((_nextValues: FormValues) => {
66:         // No-op: RHF manages state internally
67:         // We'll get values via formMethods.getValues() when needed
68:       }, []);
69:
70:       const {
71:         commitField,
72:         isCommitting,
73:         committingField,
74:         error: commitError,
75:         validationErrors,
76⟪?⟫:      } = useFormCommit({
77⟪?⟫:      pageBuildData: loaderData.pageBuildData,
78⟪?⟫:      sessionInfo: loaderData.sessionInfo,
79⟪?⟫:      xmlFilePath: loaderData.xmlFilePath,
80⟪?⟫:      onCommandsExecuted: executeCommands,
81⟪?⟫:
82⟪?⟫:      onCommands: executeCommands,
83:       });
84⟪?⟫:      pageBuildData: loaderData.pageBuildData,


========== IMG_2900.md ==========
---
photo: IMG_2900.JPG
type: vscode-code
file: aqs-web-ui/src/pages/dynamic-form-page.tsx
lines: 51-99
orientation: 180
confidence: low
notes: Photo has heavy double-exposure/motion-blur ghosting throughout (camera shake) — nearly every line appears twice, offset vertically by ~1-4 lines and slightly horizontally, making exact line-number attribution for lines 66-73 uncertain (best-effort reconstructed below; content itself is legible). Line 51 is a VS Code sticky-scroll header (pinned function signature). Explorer sidebar (AQS_WORKSPACE) shows: aqs-web-ui > src > hooks (use-form-commit.ts, use-page-form.ts, use-required-field-validation....ts, use-smart-navigation.ts), src > lib (grid-normalize.ts, "U" git-status badge), src > pages (dashboard.tsx, dynamic-form-page.tsx [active tab, "9+" unsaved changes], grid-config-example.tsx, legacy-page.tsx "U", lob-action-menu-page.tsx, LobGridExample.tsx "U", login.tsx, page-not-found.tsx, policy-details.tsx, PolicyInformationPage.tsx, prp-mlc-sum.tsx "U", root.tsx, UltimateCoverPage.tsx, xsl-test.tsx "U"), providers, services (collapsed). Only one tab open: dynamic-form-page.tsx (9+). Status bar: aqs-web-ui repo, branch "hitanshu/experimental*", "26 ⊗ 0 ⚠", "No Solution", Ln 1/Col 1, Tab Size 4, UTF-8, CRLF, TypeScript JSX, clock ~5:22, date 7/10. Faint overlapping ghost text near lines 66-74 appears to be comments from inside/near the handleValuesChange useCallback (something like "...we track changes via handleValuesChange callback", "...commands, we get latest RHF values directly via formMethods.getValues()", "...changes state internally", "...values via formMethods.getValues() when needed") — too blurred/overlapped to transcribe verbatim, flagged ⟪?⟫. A block (if(loaderData.error){ return(<div>...<Alert>...</Alert></div>); }) visually appears twice due to the double-exposure but is almost certainly a single block in the source, not duplicated code.
---
51	export default function DynamicFormPage() {
	  const handleValuesChange = useCallback((_nextValues: FormValues) => {
	    // ⟪? ghosted/illegible comment, ~"...we track changes via handleValuesChange callback"⟫
	    // ⟪? ghosted/illegible comment, ~"...commands, we get latest RHF values directly via formMethods.getValues()"⟫
	    // ⟪? ghosted/illegible comment, ~"...changes state internally"⟫
	    // ⟪? ghosted/illegible comment, ~"...values via formMethods.getValues() when needed"⟫
	  }, []);
⟪?~70⟫	  const {
⟪?~71⟫	    commitField,
⟪?~72⟫	    isCommitting,
⟪?~73⟫	    committingField,
74	    error: commitError,
75	    validationErrors,
76	  } = useFormCommit({
77	    pageBuildData: loaderData.pageBuildData,
78	    sessionInfo: loaderData.sessionInfo,
79	    formMethods,
80	    xmlFileName: loaderData.xmlFilePath,
81	    onCommands: executeCommands,
⟪?⟫	  });
⟪?⟫	  const handleCommitField = useCallback(
85	    async (matchcode: string, value: string | boolean, eventType: CommitEventType) => {
86	      console.log('COMMITTING_FIELD---000', { matchcode, value, eventType });
87	      await commitField(matchcode, value, eventType);
88	    },
89	    [commitField]
⟪?⟫	  );
92	  if (loaderData.error) {
93	    return (
94	      <div className="p-4 md:p-6" aria-live="assertive">
95	        <Alert severity="error">{loaderData.error}</Alert>
96	      </div>
97	    );
98	  }
99	  if (loaderData.normalizedFields.length === 0) {
	    return (


========== IMG_2901.md ==========
---
photo: IMG_2901.JPG
type: vscode-code
file: aqs-web-ui/src/pages/dynamic-form-page.tsx
lines: 51-109
orientation: 180
confidence: medium
notes: Same file/editor state as IMG_2900 (dynamic-form-page.tsx, tab "9+" unsaved), scrolled further down; photo again shows double-exposure/motion-blur ghosting (each line duplicated, offset ~1-3 lines) though less severe than IMG_2900, and the bottom portion (lines 98-109) is sharp/unambiguous. Line 51 is sticky-scroll pinned header. Sidebar/status bar identical to IMG_2900 (AQS_WORKSPACE explorer, branch hitanshu/experimental*, 26 errors/0 warnings, No Solution, TypeScript JSX, UTF-8, CRLF, Tab Size 4, clock ~5:22, 7/10). Lines 84-92 (handleCommitField useCallback body and the transition into "if (loaderData.error)") have uncertain exact line-number attribution due to ghosting — content is legible, numbering is best-effort (flagged with ⟪?⟫).
---
77	  } = useFormCommit({
78	    pageBuildData: loaderData.pageBuildData,
79	    sessionInfo: loaderData.sessionInfo,
80	    formMethods,
81	    xmlFileName: loaderData.xmlFilePath,
82	    onCommands: executeCommands,
83	  });
84	  const handleCommitField = useCallback(
85	    async (matchcode: string, value: string | boolean, eventType: CommitEventType) => {
⟪?86⟫	      console.log('COMMITTING_FIELD---000', { matchcode, value, eventType });
⟪?87⟫	      await commitField(matchcode, value, eventType);
⟪?88⟫	    },
⟪?89⟫	    [commitField]
⟪?90-92⟫	  );
93	  if (loaderData.error) {
94	    return (
95	      <div className="p-4 md:p-6" aria-live="assertive">
96	        <Alert severity="error">{loaderData.error}</Alert>
97	      </div>
98	    );
99	  }
100	  if (loaderData.normalizedFields.length === 0) {
101	    return (
102	      <div className="p-4 md:p-6" aria-live="polite">
103	        <Alert severity="warning">No form fields were provided for this page.</Alert>
104	      </div>
105	    );
106	  }
107	
108	  const isRouteLoading = navigation.state === 'loading';
109	  const showBusyBar = isRouteLoading || isExecuting || isCommitting;


========== IMG_2904.md ==========
---
photo: IMG_2904.JPG
type: vscode-code
file: aqs-web-ui/src/pages/dynamic-form-page.tsx
lines: 51,136-167
orientation: 180
confidence: high
notes: Same file/editor as prior photos (dynamic-form-page.tsx, tab "9+" unsaved), scrolled further down. This photo is sharp with no double-exposure/motion-blur ghosting, unlike IMG_2900-2903 — high confidence transcription. Line 51 is sticky-scroll pinned header ("export default function DynamicFormPage() {"). Explorer sidebar identical file list as before. Status bar: branch hitanshu/experimental*, 26 errors/0 warnings, No Solution, TypeScript JSX, UTF-8, CRLF, Tab Size 4, clock 5:22, date 7/10. Line 168 (next prop after committingField={committingField}) is cut off at the bottom edge of the frame, not visible.
---
51	export default function DynamicFormPage() {
136	              {commitError}
137	            </Alert>
138	          ) : null}
139	          {loaderData.isPopup ? (
140	            <Typography
141	              variant="body2"
142	              sx={{
143	                mb: 2,
144	                color: '#00205B',
145	                fontSize: '14px',
146	                backgroundColor: '#E9F1FF',
147	                padding: '6px',
148	                fontWeight: '600',
149	                display: 'inline-block',
150	              }}
151	            >
152	              {(transactionType as string) || ''}
153	            </Typography>
154	          ) : null}
155	          <div className="grid gap-5">
156	            <FormRenderer
157	              fields={loaderData.normalizedFields}
158	              buttons={loaderData.buttons}
159	              initialValues={initialValues}
160	              onValuesChange={handleValuesChange}
161	              onCommitField={handleCommitField}
162	              disabled={isCommitting}
163	              fieldsPerRow={2}
164	              responsive
165	              useReactHookForm={true}
166	              validationErrors={validationErrors}
167	              committingField={committingField}


========== IMG_2905.md ==========
---
photo: IMG_2905.JPG
type: vscode-code
file: aqs-web-ui/src/pages/dynamic-form-page.tsx
lines: 51,152-177
orientation: 180
confidence: medium
notes: Same file/editor as prior photos (dynamic-form-page.tsx, tab "9+" unsaved), scrolled to the end of the DynamicFormPage function (closing JSX/return). Photo has double-exposure/motion-blur ghosting (offset ~3-4 lines) through most of the frame; line numbers for 168-177 are reconstructed from JSX nesting structure (FormRenderer inside 4 nested divs inside Suspense inside return) cross-checked against the clean IMG_2904 anchor (committingField={committingField} confirmed at line 167) rather than read pixel-by-pixel. Lines 152-167 repeat content already captured cleanly in IMG_2904. This appears to be the end of the file/function (line 177 "}" closes DynamicFormPage; line 178 is blank/not visible).
---
152	              {(transactionType as string) || ''}
153	            </Typography>
154	          ) : null}
155	          <div className="grid gap-5">
156	            <FormRenderer
157	              fields={loaderData.normalizedFields}
158	              buttons={loaderData.buttons}
159	              initialValues={initialValues}
160	              onValuesChange={handleValuesChange}
161	              onCommitField={handleCommitField}
162	              disabled={isCommitting}
163	              fieldsPerRow={2}
164	              responsive
165	              useReactHookForm={true}
166	              validationErrors={validationErrors}
167	              committingField={committingField}
⟪?168⟫	              className="startForm"
⟪?169⟫	            />
⟪?170⟫	          </div>
⟪?171⟫	        </div>
⟪?172⟫	      </div>
⟪?173⟫	    </div>
174	  </Suspense>
⟪?⟫	
176	  );
177	}


========== IMG_2902.md ==========
---
photo: IMG_2902.JPG
type: vscode-code
file: aqs-web-ui/src/pages/dynamic-form-page.tsx
lines: 100-128
orientation: 180
confidence: medium
notes: Same file/editor as IMG_2900/2901 (dynamic-form-page.tsx, tab "9+" unsaved), scrolled further down. Photo again has double-exposure/motion-blur ghosting (duplicate offset text) especially in the top half (100-115); lines 116-128 are sharp and unambiguous. Line 51 sticky-scroll header still shows "export default function DynamicFormPage() {". Sidebar/status bar identical to prior two photos (branch hitanshu/experimental*, 26 errors/0 warnings, No Solution). Lines 100-109 repeat content already seen in IMG_2901 (user scrolled slightly further).
---
100	  if (loaderData.normalizedFields.length === 0) {
101	    return (
102	      <div className="p-4 md:p-6" aria-live="polite">
103	        <Alert severity="warning">No form fields were provided for this page.</Alert>
104	      </div>
105	    );
106	  }
107	
108	  const isRouteLoading = navigation.state === 'loading';
109	  const showBusyBar = isRouteLoading || isExecuting || isCommitting;
110	  const transactionType = getItem<Record<string, unknown>>(
111	    'aqs:global-variables',
112	    {},
113	  )?.mstrTransactionType;
114	
115	  return (
116	    <Suspense fallback={<FormPageFallback />}>
117	      <div className="grid grid-cols-4 gap-x-2 items-start w-full h-full">
118	        <div className="col-span-1 p-4! relative h-full bg-[#F9F7F0] min-h-216">
119	          <h1 className="text-[16px] font-semibold text-left text-[#00205B]">
120	            Policy Structure
121	          </h1>
122	          <h3 className="text-[12px] font-normal text-left text-[#00205B] mt-1">
123	            Policy
124	          </h3>
125	        </div>
126	        <div className="col-span-3">
127	          <div className="px-16! p-4!" aria-busy={showBusyBar}>
128	            <h1 className="text-[28px] font-semibold text-left text-[#00205B]">


========== IMG_2903.md ==========
---
photo: IMG_2903.JPG
type: vscode-code
file: aqs-web-ui/src/pages/dynamic-form-page.tsx
lines: 128-144
orientation: 180
confidence: low
notes: Same file/editor as prior photos (dynamic-form-page.tsx, tab "9+" unsaved), scrolled further down into the JSX return body. Heavy double-exposure/motion-blur ghosting throughout, worse than IMG_2902 — most lines from ~132 onward show two overlapping offset copies (offset ~3 lines) making exact line-number attribution unreliable; content below is transcribed in correct reading order with best-effort line numbers, several flagged ⟪?⟫. Sidebar/status bar same as prior photos (branch hitanshu/experimental*, 26 errors/0 warnings, No Solution). Lines 51 and 113-127 visible at top of frame repeat content already captured in IMG_2902 (const transactionType.../return/Suspense/grid/Policy Structure block).
---
128	          <h1 className="text-[28px] font-semibold text-left text-[#00205B]">
129	            Policy Start
130	          </h1>
131	          {showBusyBar && <LinearProgress sx={{ mb: 2 }} />}
⟪?132⟫	          {commitError ? (
⟪?133⟫	            <Alert severity="error" sx={{ mb: 2 }}>
⟪?134⟫	              {commitError}
⟪?135⟫	            </Alert>
⟪?136⟫	          ) : null}
⟪?137⟫	          {loaderData.isPopup ? (
⟪?138⟫	            null
⟪?139⟫	          ) : (
140	            <Typography
141	              variant="body2"
142	              sx={{
143	                mb: 2,
144	                color: '#00205B',
⟪?⟫	              }}
⟪?⟫	            >
⟪?⟫	              <Typography
⟪?⟫	                variant="body3"
⟪?⟫	                sx={{
⟪?⟫	                  fontSize: '14px',
⟪?⟫	                  backgroundColor: '#E9F1FF',
