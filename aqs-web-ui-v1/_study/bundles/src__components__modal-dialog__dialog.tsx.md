# BUNDLE for src/components/modal-dialog/dialog.tsx
# 5 photo fragment(s), ascending start-line order.


========== IMG_2082.md ==========
---
photo: IMG_2082.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/dialog.tsx
lines: 97-168 (sticky scroll: 97,127,128; main view 138-168)
orientation: 0
confidence: high
notes: Sticky-scroll headers at top show enclosing scope lines 97 "const Dialog: React.FC<DialogProps> = ({", 127 "const fireAction = useCallback(", 128 "(action: DialogAction) => {" — these repeat real line numbers from earlier in file, not shown in main body. Line 151 comment "// for yesn..." is truncated at right edge by cursor/minimap overlay, rest illegible. Explorer sidebar shows aqs-web-ui/src/components tree: data-grid/ (data-grid-config-registry.ts, data-grid-normalize.ts, data-grid.tsx), modal-dialog/ (index.ts, modal-dialog.tsx, use-modal-actions.ts, use-modal-data.ts, use-modal-state.ts), tabView/ (TabPanel.tsx, TabView.tsx), action-buttons.tsx, button.tsx, buttons-renderer.tsx, checkbox.tsx, date.tsx, dialog.tsx (selected), error-boundary.tsx, field-renderer.tsx, footer.tsx, form-renderer.tsx. Tab bar: date.tsx (9+ problems) and dialog.tsx (9+ problems, active). Status bar: branch hitanshu/experimental*, 52 errors / 0 warnings, "No Solution". Breadcrumb: aqs-web-ui > src > components > dialog.tsx > ...
---
```
[sticky scroll header, repeats earlier lines]
97      const Dialog: React.FC<DialogProps> = ({
127         const fireAction = useCallback(
128             (action: DialogAction) => {

[main editor body]
138                     break;
139                 case 'cancel':
140                     onCancel?.();
141                     break;
142             }
143             if (closeOnAction) {
144                 onClose?.(`action:${action}`);
145             }
146         },
147         [onOk, onYes, onNo, onCancel, closeOnAction, onClose],
148     );
149
150     const defaultAction: DialogAction =
151         autoFocusButton ?? (dialogType === 'ok' ? 'ok' : dialogType === 'yesno' ? 'yes' : 'yes'); // for yesn⟪?⟫
152
153     const handleKeyDown: React.KeyboardEventHandler = (e) => {
154         if (e.key === 'Enter') {
155             e.stopPropagation();
156             e.preventDefault();
157             fireAction(defaultAction);
158         }
159         if (e.key === 'Escape' && !disableEscapeKeyDown) {
160             onClose?.('escapeKeyDown');
161         }
162     };
163
164     const handleBackdropClose: MuiDialogProps['onClose'] = (_e, reason) => {
165         if (reason === 'backdropClick' && disableBackdropClose) return;
166         if (reason === 'escapeKeyDown' && disableEscapeKeyDown) return;
167         onClose?.(reason as DialogCloseReason);
168     };
```


========== IMG_2083.md ==========
---
photo: IMG_2083.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/dialog.tsx
lines: 97 (sticky), main view 149-181
orientation: 0
confidence: high
notes: Same file/tab as IMG_2082, scrolled down slightly (overlaps lines 149-168 already captured in IMG_2082; new content is 169-181). Line 181 is the last visible line at the bottom edge of the editor viewport, showing only "]" (rest of that ternary chain, if any, is off-screen below — not illegible, just not shown). Sticky-scroll header shows only line 97 "const Dialog: React.FC<DialogProps> = ({" this time. Explorer sidebar unchanged from IMG_2082. Status bar: branch hitanshu/experimental*, 52 errors / 0 warnings, "No Solution".
---
```
[sticky scroll header]
97      const Dialog: React.FC<DialogProps> = ({

[main editor body]
149
150     const defaultAction: DialogAction =
151         autoFocusButton ?? (dialogType === 'ok' ? 'ok' : dialogType === 'yesno' ? 'yes' : 'yes'); // for yesn⟪?⟫
152
153     const handleKeyDown: React.KeyboardEventHandler = (e) => {
154         if (e.key === 'Enter') {
155             e.stopPropagation();
156             e.preventDefault();
157             fireAction(defaultAction);
158         }
159         if (e.key === 'Escape' && !disableEscapeKeyDown) {
160             onClose?.('escapeKeyDown');
161         }
162     };
163
164     const handleBackdropClose: MuiDialogProps['onClose'] = (_e, reason) => {
165         if (reason === 'backdropClick' && disableBackdropClose) return;
166         if (reason === 'escapeKeyDown' && disableEscapeKeyDown) return;
167         onClose?.(reason as DialogCloseReason);
168     };
169
170     const buttons: {
171         key: DialogAction;
172         label: string;
173         color?: 'primary' | 'inherit' | 'error' | 'warning';
174     }[] =
175         dialogType === 'ok'
176             ? [{ key: 'ok', label: okText, color: 'primary' }]
177             : dialogType === 'yesno'
178                 ? [
179                       { key: 'yes', label: yesText, color: 'primary' },
180                       { key: 'no', label: noText, color: 'inherit' },
181                   ]
```


========== IMG_2084.md ==========
---
photo: IMG_2084.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/dialog.tsx
lines: 97,153,161-192 (sticky: 97,153)
orientation: 0
confidence: high
notes: Same file/tab as IMG_2082/2083, scrolled further down. Sticky-scroll header shows lines 97 "const Dialog: React.FC<DialogProps> = ({" and 153 "const handleKeyDown: React.KeyboardEventHandler = (e) => {". New content beyond IMG_2083 is lines 182-192; line 192 is almost entirely obscured by the taskbar/status bar at the bottom of the screen — only the very top sliver of glyphs is visible, tentatively resembling "aria-labelledby={labelId}" but not legible enough to transcribe with confidence (marked ⟪?⟫). Explorer sidebar unchanged. Status bar: branch hitanshu/experimental*, 52 errors / 0 warnings, "No Solution".
---
```
[sticky scroll header]
97      const Dialog: React.FC<DialogProps> = ({
153         const handleKeyDown: React.KeyboardEventHandler = (e) => {

[main editor body]
161         }
162     };
163
164     const handleBackdropClose: MuiDialogProps['onClose'] = (_e, reason) => {
165         if (reason === 'backdropClick' && disableBackdropClose) return;
166         if (reason === 'escapeKeyDown' && disableEscapeKeyDown) return;
167         onClose?.(reason as DialogCloseReason);
168     };
169
170     const buttons: {
171         key: DialogAction;
172         label: string;
173         color?: 'primary' | 'inherit' | 'error' | 'warning';
174     }[] =
175         dialogType === 'ok'
176             ? [{ key: 'ok', label: okText, color: 'primary' }]
177             : dialogType === 'yesno'
178                 ? [
179                       { key: 'yes', label: yesText, color: 'primary' },
180                       { key: 'no', label: noText, color: 'inherit' },
181                   ]
182                 : [
183                       { key: 'yes', label: yesText, color: 'primary' },
184                       { key: 'no', label: noText, color: 'inherit' },
185                       { key: 'cancel', label: cancelText, color: 'inherit' },
186                   ];
187
188     return (
189         <MuiDialog
190             open={open}
191             onClose={handleBackdropClose}
192             ⟪?⟫ (mostly obscured by taskbar; tentatively "aria-labelledby={labelId}")
```


========== IMG_2088.md ==========
---
photo: IMG_2088.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/dialog.tsx
lines: 97 (sticky), main view 220-252
orientation: 0
confidence: high
notes: Same file/tab, scrolled ahead significantly from IMG_2084 (gap between 192 and 220 not captured in this set). Sticky-scroll header shows only line 97 "const Dialog: React.FC<DialogProps> = ({". Line 220 is partly clipped by the sticky-scroll widget's bottom divider (only top sliver of glyphs visible) — read as "aria-label='Close dialog'" with medium confidence (part of an IconButton props block, closes with `>` on line 225 and `<CloseRoundedIcon />` on 226). All red squiggly underlines are spellcheck/lint markers on JSX attribute words, not part of the code. Explorer sidebar unchanged. Status bar: branch hitanshu/experimental*, 52 errors / 0 warnings, "No Solution".
---
```
[sticky scroll header]
97      const Dialog: React.FC<DialogProps> = ({

[main editor body]
220                             aria-label='Close dialog' ⟪medium-confidence, partly clipped by sticky scroll divider⟫
221                             onClick={() => onClose?.('closeButton')}
222                             sx={{ position: 'absolute', right: 8, top: 8, color: Theme.colors.BRAND }}
223                             size="small"
224                         >
225
226                             <CloseRoundedIcon />
227                         </IconButton>
228                     )}
229                 </DialogTitle>
230
231                 <DialogContent id={descId}>
232                     {typeof message === 'string' ? (
233                         <Typography variant="body1" sx={{ mt: 0.5 }}>
234                             {message}
235                         </Typography>
236                     ) : (
237                         message
238                     )}
239                 </DialogContent>
240
241                 <DialogActions>
242                     {buttons.map((b) => (
243                         <Button
244                             key={b.key}
245                             autoFocus={b.key === defaultAction}
246                             color={b.color}
247                             variant={b.key === defaultAction ? 'primary' : 'text'}
248                             onClick={() => fireAction(b.key)}
249                         >
250                             {b.label}
251                         </Button>
252                     ))}
253                 </DialogActions>
```

Note: line numbering above follows the on-screen gutter exactly, verified via multiple cross-checked high-zoom crops (220 through 252 fully confirmed; the closing `</DialogActions>` tag is on line 253, visible only as a sliver at the very bottom edge of the screenshot, cut off by the taskbar).


========== IMG_2089.md ==========
---
photo: IMG_2089.JPG
type: vscode-code
file: aqs-web-ui/src/components/modal-dialog/dialog.tsx
lines: 97 (sticky), main view 236-260 (end of file)
orientation: 0
confidence: high
notes: Same file/tab as IMG_2082/2083/2084/2088, scrolled to the end of the file. Confirms line 253 is `</MuiDialog>` and line 252 is `</DialogActions>` (validates IMG_2088's reading). File ends at line 259 with the `export { Dialog };` statement; line 260 is a trailing blank line. Sticky-scroll header shows only line 97 "const Dialog: React.FC<DialogProps> = ({". Explorer sidebar unchanged (dialog.tsx selected, 9+ problems). Status bar: branch hitanshu/experimental*, 52 errors / 0 warnings, "No Solution".
---
```
[sticky scroll header]
97      const Dialog: React.FC<DialogProps> = ({

[main editor body]
236                 message
237             )}
238         </DialogContent>
239
240         <DialogActions>
241             {buttons.map((b) => (
242                 <Button
243                     key={b.key}
244                     autoFocus={b.key === defaultAction}
245                     color={b.color}
246                     variant={b.key === defaultAction ? 'primary' : 'text'}
247                     onClick={() => fireAction(b.key)}
248                 >
249                     {b.label}
250                 </Button>
251             ))}
252         </DialogActions>
253     </MuiDialog>
254     );
255 };
256
257 // ------------------------------------
258
259 export { Dialog };
260
```
