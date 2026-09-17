# NovaLend KYC Redesign

Product Designer Case Study — FirstBank Digital Factory

## Prototype

- [Public mobile prototype](https://outspace-stack.github.io/NovaLend-KYC-redesign/?state=splash)
- [Reviewer guide and error-state links](https://outspace-stack.github.io/NovaLend-KYC-redesign/reviewer-guide.html)
- [Figma design](https://www.figma.com/design/3KPWGfamBjHZW858YhjUb7/Novalend?node-id=76-7185)

A clickable implementation of the supplied approved mobile screens, not a production banking service. The mobile interface is centred at 390px on desktop and fills a phone viewport. It can be added to a phone’s home screen and supports offline access after its initial assets are cached. No real camera or identity API is called. Use fictional form entries only.

## Run locally

Node.js 18+; no dependency installation required:

```sh
npm run dev
```

Open http://127.0.0.1:4173 . `npm run check` validates JavaScript syntax. Serve over HTTPS (or localhost) for home-screen/offline features. GitHub Pages serves this static project from the main branch root.

## Happy path

Splash → Onboarding/Login → NovaPay Modules → NovaLend → Verify Your Identity → Confirm Your Details → Verify Your ID → Camera Permission → ID Camera Capture → Review Your ID → ID Verified → Take a Quick Selfie → Selfie Camera → Review Your Selfie → Verifying Your Identity → You're All Set. Final Continue returns to modules.

Manual fallback: Camera Permission or ID Camera → Enter Details Manually → ID Verified. ID type is one of National ID, Driver’s Licence, or Passport. Fields are required and future dates are rejected. Use fictional values, for example DEMO-123, Demo Reviewer, 1995-03-12.

## Hidden test routes

Append to the public prototype URL:

| Query | Recovery |
|---|---|
| `?state=id-capture-failed` | Try again → ID camera; manual entry fallback |
| `?state=camera-unavailable` | Manual ID entry |
| `?state=connection-interrupted` | Retry → affected stage; continue later |
| `?state=upload-failed` | Retry → affected stage; continue later |
| `?state=selfie-failed` | Retake selfie; continue later |
| `?state=manual` | Open manual form directly |
| `?state=splash` | Start the journey |

Alt+Shift+1–5 trigger the five errors during a flow without visible controls; Alt+Shift+R resets the demo. Keyboard-injected network errors retain whether the ID or selfie stage is being demonstrated. A direct error link defaults to ID upload.

Deferred actions reuse the module screen; selecting NovaLend resumes the deferred step. No unsupported confirmation screen is added. Session storage retains the mock form and navigation within this tab only. The selfie review photo doubles as the Retake control with an accessible name, avoiding an added visible CTA.

## Components

`components.js`: MobileShell, Header, ProgressIndicator, PrimaryButton, SecondaryButton, FormField, IDSelectionCard, ErrorState, CameraView, BottomActions.

`screens.js`: separate render functions for 22 screen states. `app.js`: navigation and mocked state. `style.css`: local typography, visual tokens and responsive mobile layout. `sw.js` and manifest: home-screen/offline experience. `reviewer-guide.html` is a separate reviewer document, never rendered below the application.

## Visual fidelity and scope

The original login, module and loan banner PNGs supplied by the designer are used unchanged. Remaining photographic/brand/illustration crops come from overview screenshots; they cannot be restored to original quality without source exports. Locally bundled Lucide vectors replace approximate text glyphs for line icons; they are equivalents, not recovered Figma vectors. Roboto is bundled locally. See assets/ licenses.

No unsupported banking products or operational claims are implemented. Other modules and Contact support have no provided destination, so no new flow is invented. Camera actions simulate capture using sample assets and never request device access. The illustrated ID remains the supplied sample irrespective of selected ID type. The customer copy reflects the supplied mockups, not verified product capabilities.

## Case-study deliverables

This repository currently contains the interactive prototype, reviewer guide and AI usage record. A full UX audit against the four original pain points, a usability-test plan, validated WCAG audit, and impact prediction against the 34% baseline require the original brief and separate design documentation; they are not claimed as completed here.
