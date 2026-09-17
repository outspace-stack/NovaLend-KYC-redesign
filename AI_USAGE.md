# AI usage

AI was used to implement the designer-approved NovaLend screenshot flows as reusable HTML/CSS/JavaScript components, wire mock navigation and form state, implement hidden recovery routes, prepare public deployment, and perform browser-based checks.

## Sources and constraints

- Approved screen-overview images supplied by the designer were the primary visual source. The Figma connector failed and the browser could not load the file, so no Figma layer data was available.
- Three original marketing images supplied later replaced low-resolution crops, without image generation or visual redesign.
- Remaining screenshot crops cannot provide original-resolution photography/illustrations. This limitation is disclosed rather than represented as pixel-perfect.
- Text glyph icons in the initial implementation were replaced with local vector equivalents after the designer requested sharper visuals.
- The prototype uses local sample state only. No camera permission, banking API, biometric processing or identity submission is implemented.

## Recommendations corrected or constrained

- The designer specified implementation, not redesign. Existing copy and screen order were retained; no new lending or verification flow was added.
- Deferred actions return to an existing module screen and preserve the current step; AI did not invent approval or saved-to-server messaging.
- Selfie retake is available by activating the review photo, preserving the supplied two-button layout.
- Testing controls are query parameters and keyboard shortcuts, outside normal customer UI.
- The public reviewer guide explicitly distinguishes a design prototype from a real bank service.

## Human review still needed

Confirm fine typography/spacing against original Figma exports; supply high-resolution logo, avatar, sample ID, selfie and success artwork; confirm intended support/non-NovaLend module behavior. Any usability, accessibility compliance or conversion-impact conclusions need actual validation and are not established by this implementation.
