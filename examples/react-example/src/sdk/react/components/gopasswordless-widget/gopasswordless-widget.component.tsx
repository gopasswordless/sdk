import React, { ReactNode, useState } from "react";
import { useGoPasswordlessContext } from "../../contexts";
import root from "react-shadow";
import { GoPasswordlessInputComponent } from "../input/input.component";
import { GoPasswordlessButtonComponent } from "../button/button.component";
import { VerificationCodeInput } from "../verification-code-input/verification-code-input.component";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../shadcn/ui/card";

const GoPasswordlessBaseComponent = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}): JSX.Element => {
  const { settings, token, currentScreen, logout } = useGoPasswordlessContext();

  return (
    <root.div>
      <style>
        {`
          /*
          ! tailwindcss v3.4.1 | MIT License | https://tailwindcss.com
          */
          
          /*
          1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
          2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
          */
          
          *,
          ::before,
          ::after {
            box-sizing: border-box;
            /* 1 */
            border-width: 0;
            /* 2 */
            border-style: solid;
            /* 2 */
            border-color: #e5e7eb;
            /* 2 */
          }
          
          ::before,
          ::after {
            --tw-content: '';
          }
          
          /*
          1. Use a consistent sensible line-height in all browsers.
          2. Prevent adjustments of font size after orientation changes in iOS.
          3. Use a more readable tab size.
          4. Use the user's configured \`sans\` font-family by default.
          5. Use the user's configured \`sans\` font-feature-settings by default.
          6. Use the user's configured \`sans\` font-variation-settings by default.
          7. Disable tap highlights on iOS
          */
          
          html,
          :host {
            line-height: 1.5;
            /* 1 */
            -webkit-text-size-adjust: 100%;
            /* 2 */
            /* 3 */
            tab-size: 4;
            /* 3 */
            font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            /* 4 */
            -webkit-font-feature-settings: normal;
                    font-feature-settings: normal;
            /* 5 */
            font-variation-settings: normal;
            /* 6 */
            -webkit-tap-highlight-color: transparent;
            /* 7 */
          }
          
          /*
          1. Remove the margin in all browsers.
          2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
          */
          
          body {
            margin: 0;
            /* 1 */
            line-height: inherit;
            /* 2 */
          }
          
          /*
          1. Add the correct height in Firefox.
          2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
          3. Ensure horizontal rules are visible by default.
          */
          
          hr {
            height: 0;
            /* 1 */
            color: inherit;
            /* 2 */
            border-top-width: 1px;
            /* 3 */
          }
          
          /*
          Add the correct text decoration in Chrome, Edge, and Safari.
          */
          
          abbr:where([title]) {
            -webkit-text-decoration: underline dotted;
                    text-decoration: underline dotted;
          }
          
          /*
          Remove the default font size and weight for headings.
          */
          
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-size: inherit;
            font-weight: inherit;
          }
          
          /*
          Reset links to optimize for opt-in styling instead of opt-out.
          */
          
          a {
            color: inherit;
            text-decoration: inherit;
          }
          
          /*
          Add the correct font weight in Edge and Safari.
          */
          
          b,
          strong {
            font-weight: bolder;
          }
          
          /*
          1. Use the user's configured \`mono\` font-family by default.
          2. Use the user's configured \`mono\` font-feature-settings by default.
          3. Use the user's configured \`mono\` font-variation-settings by default.
          4. Correct the odd \`em\` font sizing in all browsers.
          */
          
          code,
          kbd,
          samp,
          pre {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            /* 1 */
            -webkit-font-feature-settings: normal;
                    font-feature-settings: normal;
            /* 2 */
            font-variation-settings: normal;
            /* 3 */
            font-size: 1em;
            /* 4 */
          }
          
          /*
          Add the correct font size in all browsers.
          */
          
          small {
            font-size: 80%;
          }
          
          /*
          Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
          */
          
          sub,
          sup {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline;
          }
          
          sub {
            bottom: -0.25em;
          }
          
          sup {
            top: -0.5em;
          }
          
          /*
          1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
          2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
          3. Remove gaps between table borders by default.
          */
          
          table {
            text-indent: 0;
            /* 1 */
            border-color: inherit;
            /* 2 */
            border-collapse: collapse;
            /* 3 */
          }
          
          /*
          1. Change the font styles in all browsers.
          2. Remove the margin in Firefox and Safari.
          3. Remove default padding in all browsers.
          */
          
          button,
          input,
          optgroup,
          select,
          textarea {
            font-family: inherit;
            /* 1 */
            -webkit-font-feature-settings: inherit;
                    font-feature-settings: inherit;
            /* 1 */
            font-variation-settings: inherit;
            /* 1 */
            font-size: 100%;
            /* 1 */
            font-weight: inherit;
            /* 1 */
            line-height: inherit;
            /* 1 */
            color: inherit;
            /* 1 */
            margin: 0;
            /* 2 */
            padding: 0;
            /* 3 */
          }
          
          /*
          Remove the inheritance of text transform in Edge and Firefox.
          */
          
          button,
          select {
            text-transform: none;
          }
          
          /*
          1. Correct the inability to style clickable types in iOS and Safari.
          2. Remove default button styles.
          */
          
          button,
          [type='button'],
          [type='reset'],
          [type='submit'] {
            -webkit-appearance: button;
            /* 1 */
            background-color: transparent;
            /* 2 */
            background-image: none;
            /* 2 */
          }
          
          /*
          Use the modern Firefox focus style for all focusable elements.
          */
          
          :-moz-focusring {
            outline: auto;
          }
          
          /*
          Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
          */
          
          :-moz-ui-invalid {
            box-shadow: none;
          }
          
          /*
          Add the correct vertical alignment in Chrome and Firefox.
          */
          
          progress {
            vertical-align: baseline;
          }
          
          /*
          Correct the cursor style of increment and decrement buttons in Safari.
          */
          
          ::-webkit-inner-spin-button,
          ::-webkit-outer-spin-button {
            height: auto;
          }
          
          /*
          1. Correct the odd appearance in Chrome and Safari.
          2. Correct the outline style in Safari.
          */
          
          [type='search'] {
            -webkit-appearance: textfield;
            /* 1 */
            outline-offset: -2px;
            /* 2 */
          }
          
          /*
          Remove the inner padding in Chrome and Safari on macOS.
          */
          
          ::-webkit-search-decoration {
            -webkit-appearance: none;
          }
          
          /*
          1. Correct the inability to style clickable types in iOS and Safari.
          2. Change font properties to \`inherit\` in Safari.
          */
          
          ::-webkit-file-upload-button {
            -webkit-appearance: button;
            /* 1 */
            font: inherit;
            /* 2 */
          }
          
          /*
          Add the correct display in Chrome and Safari.
          */
          
          summary {
            display: list-item;
          }
          
          /*
          Removes the default spacing and border for appropriate elements.
          */
          
          blockquote,
          dl,
          dd,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          hr,
          figure,
          p,
          pre {
            margin: 0;
          }
          
          fieldset {
            margin: 0;
            padding: 0;
          }
          
          legend {
            padding: 0;
          }
          
          ol,
          ul,
          menu {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          
          /*
          Reset default styling for dialogs.
          */
          
          dialog {
            padding: 0;
          }
          
          /*
          Prevent resizing textareas horizontally by default.
          */
          
          textarea {
            resize: vertical;
          }
          
          /*
          1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
          2. Set the default placeholder color to the user's configured gray 400 color.
          */
          
          input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
            opacity: 1;
            /* 1 */
            color: #9ca3af;
            /* 2 */
          }
          
          input::placeholder,
          textarea::placeholder {
            opacity: 1;
            /* 1 */
            color: #9ca3af;
            /* 2 */
          }
          
          /*
          Set the default cursor for buttons.
          */
          
          button,
          [role="button"] {
            cursor: pointer;
          }
          
          /*
          Make sure disabled buttons don't get the pointer cursor.
          */
          
          :disabled {
            cursor: default;
          }
          
          /*
          1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
          2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
             This can trigger a poorly considered lint error in some tools but is included by design.
          */
          
          img,
          svg,
          video,
          canvas,
          audio,
          iframe,
          embed,
          object {
            display: block;
            /* 1 */
            vertical-align: middle;
            /* 2 */
          }
          
          /*
          Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
          */
          
          img,
          video {
            max-width: 100%;
            height: auto;
          }
          
          /* Make elements with the HTML hidden attribute stay hidden by default */
          
          [hidden] {
            display: none;
          }
          
          :root {
            --background: 0 0% 100%;
            --foreground: 222.2 47.4% 11.2%;
            --muted: 210 40% 96.1%;
            --muted-foreground: 215.4 16.3% 46.9%;
            --popover: 0 0% 100%;
            --popover-foreground: 222.2 47.4% 11.2%;
            --border: 214.3 31.8% 91.4%;
            --input: 214.3 31.8% 91.4%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 47.4% 11.2%;
            --primary: 222.2 47.4% 11.2%;
            --primary-foreground: 210 40% 98%;
            --secondary: 210 40% 96.1%;
            --secondary-foreground: 222.2 47.4% 11.2%;
            --accent: 210 40% 96.1%;
            --accent-foreground: 222.2 47.4% 11.2%;
            --destructive: 0 100% 50%;
            --destructive-foreground: 210 40% 98%;
            --ring: 215 20.2% 65.1%;
            --radius: 0.5rem;
          }
          
          .dark {
            --background: 224 71% 4%;
            --foreground: 213 31% 91%;
            --muted: 223 47% 11%;
            --muted-foreground: 215.4 16.3% 56.9%;
            --accent: 216 34% 17%;
            --accent-foreground: 210 40% 98%;
            --popover: 224 71% 4%;
            --popover-foreground: 215 20.2% 65.1%;
            --border: 216 34% 17%;
            --input: 216 34% 17%;
            --card: 224 71% 4%;
            --card-foreground: 213 31% 91%;
            --primary: 210 40% 98%;
            --primary-foreground: 222.2 47.4% 1.2%;
            --secondary: 222.2 47.4% 11.2%;
            --secondary-foreground: 210 40% 98%;
            --destructive: 0 63% 31%;
            --destructive-foreground: 210 40% 98%;
            --ring: 216 34% 17%;
            --radius: 0.5rem;
          }
          
          * {
            border-color: hsl(var(--border));
          }
          
          body {
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            -webkit-font-feature-settings: "rlig" 1, "calt" 1;
                    font-feature-settings: "rlig" 1, "calt" 1;
          }
          
          *, ::before, ::after {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x:  ;
            --tw-pan-y:  ;
            --tw-pinch-zoom:  ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position:  ;
            --tw-gradient-via-position:  ;
            --tw-gradient-to-position:  ;
            --tw-ordinal:  ;
            --tw-slashed-zero:  ;
            --tw-numeric-figure:  ;
            --tw-numeric-spacing:  ;
            --tw-numeric-fraction:  ;
            --tw-ring-inset:  ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgb(59 130 246 / 0.5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur:  ;
            --tw-brightness:  ;
            --tw-contrast:  ;
            --tw-grayscale:  ;
            --tw-hue-rotate:  ;
            --tw-invert:  ;
            --tw-saturate:  ;
            --tw-sepia:  ;
            --tw-drop-shadow:  ;
            --tw-backdrop-blur:  ;
            --tw-backdrop-brightness:  ;
            --tw-backdrop-contrast:  ;
            --tw-backdrop-grayscale:  ;
            --tw-backdrop-hue-rotate:  ;
            --tw-backdrop-invert:  ;
            --tw-backdrop-opacity:  ;
            --tw-backdrop-saturate:  ;
            --tw-backdrop-sepia:  ;
          }
          
          ::-webkit-backdrop {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x:  ;
            --tw-pan-y:  ;
            --tw-pinch-zoom:  ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position:  ;
            --tw-gradient-via-position:  ;
            --tw-gradient-to-position:  ;
            --tw-ordinal:  ;
            --tw-slashed-zero:  ;
            --tw-numeric-figure:  ;
            --tw-numeric-spacing:  ;
            --tw-numeric-fraction:  ;
            --tw-ring-inset:  ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgb(59 130 246 / 0.5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur:  ;
            --tw-brightness:  ;
            --tw-contrast:  ;
            --tw-grayscale:  ;
            --tw-hue-rotate:  ;
            --tw-invert:  ;
            --tw-saturate:  ;
            --tw-sepia:  ;
            --tw-drop-shadow:  ;
            --tw-backdrop-blur:  ;
            --tw-backdrop-brightness:  ;
            --tw-backdrop-contrast:  ;
            --tw-backdrop-grayscale:  ;
            --tw-backdrop-hue-rotate:  ;
            --tw-backdrop-invert:  ;
            --tw-backdrop-opacity:  ;
            --tw-backdrop-saturate:  ;
            --tw-backdrop-sepia:  ;
          }
          
          ::backdrop {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x:  ;
            --tw-pan-y:  ;
            --tw-pinch-zoom:  ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position:  ;
            --tw-gradient-via-position:  ;
            --tw-gradient-to-position:  ;
            --tw-ordinal:  ;
            --tw-slashed-zero:  ;
            --tw-numeric-figure:  ;
            --tw-numeric-spacing:  ;
            --tw-numeric-fraction:  ;
            --tw-ring-inset:  ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgb(59 130 246 / 0.5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur:  ;
            --tw-brightness:  ;
            --tw-contrast:  ;
            --tw-grayscale:  ;
            --tw-hue-rotate:  ;
            --tw-invert:  ;
            --tw-saturate:  ;
            --tw-sepia:  ;
            --tw-drop-shadow:  ;
            --tw-backdrop-blur:  ;
            --tw-backdrop-brightness:  ;
            --tw-backdrop-contrast:  ;
            --tw-backdrop-grayscale:  ;
            --tw-backdrop-hue-rotate:  ;
            --tw-backdrop-invert:  ;
            --tw-backdrop-opacity:  ;
            --tw-backdrop-saturate:  ;
            --tw-backdrop-sepia:  ;
          }
          
          .visible {
            visibility: visible;
          }
          
          .collapse {
            visibility: collapse;
          }
          
          .relative {
            position: relative;
          }
          
          .block {
            display: block;
          }
          
          .flex {
            display: flex;
          }
          
          .table {
            display: table;
          }
          
          .contents {
            display: contents;
          }
          
          .hidden {
            display: none;
          }
          
          .border-collapse {
            border-collapse: collapse;
          }
          
          .transform {
            -webkit-transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
                    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
          }
          
          .resize {
            resize: both;
          }
          
          .flex-col {
            flex-direction: column;
          }
          
          .items-center {
            align-items: center;
          }
          
          .space-y-1 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
          }
          
          .space-y-1\.5 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
          }
          
          .rounded-xl {
            border-radius: 0.75rem;
          }
          
          .border {
            border-width: 1px;
          }
          
          .bg-background {
            background-color: hsl(var(--background));
          }
          
          .bg-card {
            background-color: hsl(var(--card));
          }
          
          .p-6 {
            padding: 1.5rem;
          }
          
          .pt-0 {
            padding-top: 0px;
          }
          
          .text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          
          .font-semibold {
            font-weight: 600;
          }
          
          .leading-none {
            line-height: 1;
          }
          
          .tracking-tight {
            letter-spacing: -0.025em;
          }
          
          .text-card-foreground {
            color: hsl(var(--card-foreground));
          }
          
          .text-muted-foreground {
            color: hsl(var(--muted-foreground));
          }
          
          .underline {
            text-decoration-line: underline;
          }
          
          .shadow {
            --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
            --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
          }
          
          .outline {
            outline-style: solid;
          }
          
          @-webkit-keyframes enter {
            from {
              opacity: var(--tw-enter-opacity, 1);
              -webkit-transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
                      transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
            }
          }
          
          @keyframes enter {
            from {
              opacity: var(--tw-enter-opacity, 1);
              -webkit-transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
                      transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
            }
          }
          
          @-webkit-keyframes exit {
            to {
              opacity: var(--tw-exit-opacity, 1);
              -webkit-transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
                      transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
            }
          }
          
          @keyframes exit {
            to {
              opacity: var(--tw-exit-opacity, 1);
              -webkit-transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
                      transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
            }
          }
          
        `}
      </style>

      <Card>
        <CardHeader>
          <img
            className="GoPasswordlessLogo"
            src={settings.appLogo}
            alt={`${settings.appName} logo`}
            style={{ width: "80%" }}
          />
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          {currentScreen === "login" && (
            <p style={{ fontSize: "12px" }}>
              By logging in you agree to our{" "}
              <a href={settings.termsUrl} target="_blank" rel="noreferrer">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href={settings.privacyUrl} target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
              .
            </p>
          )}
          {token && (
            <GoPasswordlessButtonComponent onClick={logout} type="button">
              Logout
            </GoPasswordlessButtonComponent>
          )}
        </CardFooter>
      </Card>
    </root.div>
  );
};

export const GoPasswordlessWidgetComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  const {
    settings,
    currentScreen,
    error,
    loading,
    verify,
    loginOrRegister,
    resendCode,
  } = useGoPasswordlessContext();

  const handleLoginSubmit = () => {
    loginOrRegister({ username });
  };

  const handleVerifySubmit = () => {
    verify({ code: verificationCode });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (currentScreen === "login") {
        handleLoginSubmit();
      } else if (currentScreen === "verify") {
        handleVerifySubmit();
      }
    }
  };

  switch (currentScreen) {
    case "login":
      return (
        <GoPasswordlessBaseComponent>
          <GoPasswordlessInputComponent
            placeholder="Enter your email address"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyPress}
            error={error}
          />
          <GoPasswordlessButtonComponent
            onClick={handleLoginSubmit}
            type="button"
            loading={loading}
          >
            Continue
          </GoPasswordlessButtonComponent>
        </GoPasswordlessBaseComponent>
      );
    case "verify":
      return (
        <GoPasswordlessBaseComponent>
          <h3 style={{ fontWeight: "normal" }}>
            Verify your {settings.appName} account
          </h3>
          <VerificationCodeInput
            onChange={(code) => setVerificationCode(code)}
            onKeyDown={handleKeyPress}
            error={error}
          />
          <GoPasswordlessButtonComponent
            onClick={handleVerifySubmit}
            type="button"
            loading={loading}
          >
            Verify
          </GoPasswordlessButtonComponent>
          <p style={{ fontSize: "12px" }}>
            Didn't receive a code?{" "}
            <span className="GoPasswordlessLink" onClick={resendCode}>
              Resend
            </span>
          </p>
        </GoPasswordlessBaseComponent>
      );
    case "passkey":
      return (
        <GoPasswordlessBaseComponent>
          <h3 style={{ fontWeight: "normal" }}>Unlock your passkey</h3>
          <div
            style={{ display: "flex", gap: "20px", justifyContent: "center" }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 113 113"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="112.5" height="112.5" fill="none" />
              <path
                d="M33.6562 14.0625C34.9507 14.0625 36 15.1118 36 16.4062C36 17.7007 34.9507 18.75 33.6562 18.75H24.2812C20.398 18.75 17.25 21.898 17.25 25.7812V35.3022C17.25 36.5966 16.2007 37.6459 14.9062 37.6459C13.6118 37.6459 12.5625 36.5966 12.5625 35.3022V25.7812C12.5625 19.3092 17.8092 14.0625 24.2812 14.0625H33.6562ZM75.8438 18.75C74.5493 18.75 73.5 17.7007 73.5 16.4062C73.5 15.1118 74.5493 14.0625 75.8438 14.0625H85.2188C91.6908 14.0625 96.9375 19.3092 96.9375 25.7812V35.1562C96.9375 36.4507 95.8882 37.5 94.5938 37.5C93.2993 37.5 92.25 36.4507 92.25 35.1562V25.7812C92.25 21.898 89.102 18.75 85.2188 18.75H75.8438ZM92.25 77.3438C92.25 76.0493 93.2993 75 94.5938 75C95.8882 75 96.9375 76.0493 96.9375 77.3438V86.7188C96.9375 93.1908 91.6908 98.4375 85.2188 98.4375H75.8438C74.5493 98.4375 73.5 97.3882 73.5 96.0938C73.5 94.7993 74.5493 93.75 75.8438 93.75H85.2188C89.102 93.75 92.25 90.602 92.25 86.7188V77.3438ZM12.5625 77.3438C12.5625 76.0493 13.6118 75 14.9062 75C16.2007 75 17.25 76.0493 17.25 77.3438V86.7188C17.25 90.602 20.398 93.75 24.2812 93.75H33.6562C34.9507 93.75 36 94.7993 36 96.0938C36 97.3882 34.9507 98.4375 33.6562 98.4375H24.2812C17.8092 98.4375 12.5625 93.1908 12.5625 86.7188V77.3438ZM36 39.8438C36 38.5493 37.0493 37.5 38.3438 37.5C39.6382 37.5 40.6875 38.5493 40.6875 39.8438V44.5312C40.6875 45.8257 39.6382 46.875 38.3438 46.875C37.0493 46.875 36 45.8257 36 44.5312V39.8438ZM73.5 39.8438C73.5 38.5493 74.5493 37.5 75.8438 37.5C77.1382 37.5 78.1875 38.5493 78.1875 39.8438V44.5312C78.1875 45.8257 77.1382 46.875 75.8438 46.875C74.5493 46.875 73.5 45.8257 73.5 44.5312V39.8438ZM54.75 39.8438C54.75 38.5493 55.7993 37.5 57.0938 37.5C58.3882 37.5 59.4375 38.5493 59.4375 39.8438V58.5938C59.4375 62.477 56.2895 65.625 52.4062 65.625C51.1118 65.625 50.0625 64.5757 50.0625 63.2812C50.0625 61.9868 51.1118 60.9375 52.4062 60.9375C53.7007 60.9375 54.75 59.8882 54.75 58.5938V39.8438ZM36.4688 74.0625C35.6921 73.027 35.902 71.5579 36.9375 70.7812C37.973 70.0046 39.4421 70.2145 40.2187 71.25C44.4889 76.9435 49.2908 79.6875 54.75 79.6875C60.2092 79.6875 65.0111 76.9435 69.2812 71.25C70.0579 70.2145 71.527 70.0046 72.5625 70.7812C73.598 71.5579 73.8079 73.027 73.0312 74.0625C67.9264 80.8689 61.7908 84.375 54.75 84.375C47.7092 84.375 41.5736 80.8689 36.4688 74.0625Z"
                fill={settings.theme === "light" ? "black" : "white"}
              />
            </svg>
            <svg
              width="65"
              height="65"
              viewBox="0 0 98 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ padding: "8px" }}
            >
              <g clip-path="url(#clip0_71_595)">
                <rect
                  width="97.5"
                  height="97.5"
                  transform="translate(0.5)"
                  fill="none"
                />
                <path
                  d="M48.5618 43.0297C47.6859 43.2842 47.1802 44.1997 47.4331 45.0772C47.4777 45.2309 51.89 60.927 50.6754 95.7896C50.6423 96.7035 51.3563 97.4687 52.2685 97.4984C52.2883 97.5001 52.3081 97.5001 52.328 97.5001C53.2137 97.5001 53.9458 96.7977 53.9772 95.9053C55.2117 60.5172 50.796 44.8095 50.6093 44.1584C50.3565 43.2809 49.4426 42.7818 48.5618 43.0297Z"
                  fill={settings.theme === "light" ? "black" : "white"}
                />
                <path
                  d="M90.1157 27.2327C83.1154 10.6905 66.9863 0 49.0229 0C43.0951 0 37.3144 1.15845 31.8428 3.4423C28.812 4.70652 25.9481 6.21036 23.3304 7.91085C22.5652 8.40993 22.3471 9.43287 22.8445 10.198C23.3436 10.9632 24.3682 11.1813 25.1317 10.6839C27.5824 9.09079 30.2679 7.68115 33.1153 6.49295C38.1837 4.37601 43.5347 3.30514 49.0229 3.30514C65.6544 3.30514 80.5903 13.2024 87.07 28.5217C89.7637 34.8907 91.2196 46.6174 91.8476 53.0426C91.9319 53.8969 92.6491 54.5332 93.4903 54.5332C93.5431 54.5332 93.5977 54.5299 93.6539 54.5249C94.5611 54.4357 95.2255 53.6276 95.1362 52.7186C94.3479 44.6442 92.8375 33.6662 90.1157 27.2327Z"
                  fill={settings.theme === "light" ? "black" : "white"}
                />
                <path
                  d="M18.432 16.0481C19.0831 15.4086 19.0881 14.3609 18.4486 13.7114C17.809 13.0619 16.7629 13.0553 16.1118 13.6949C7.2243 22.4502 -1.62851 38.733 6.66408 66.5722C6.87727 67.291 7.53334 67.7538 8.24725 67.7538C8.40259 67.7538 8.56123 67.7306 8.71823 67.6844C9.59244 67.4249 10.0915 66.5044 9.83041 65.6302C3.63823 44.8376 6.6112 27.6938 18.432 16.0481Z"
                  fill={settings.theme === "light" ? "black" : "white"}
                />
                <path
                  d="M50.2919 9.9386C45.2351 9.74195 40.3137 10.6525 35.6617 12.5926C19.4566 19.3533 10.8401 37.173 15.621 54.0457C16.0986 55.733 16.5878 57.5277 16.8505 59.3158C17.4422 63.3629 17.4736 70.811 17.4736 82.6253C17.4736 83.5391 18.2123 84.2778 19.1261 84.2778C20.04 84.2778 20.7787 83.5391 20.7787 82.6253C20.7787 70.3004 20.7473 63.1183 20.121 58.8349C19.8301 56.8485 19.3096 54.9348 18.8006 53.1434C14.4758 37.8803 22.271 21.7578 36.9342 15.6416C41.145 13.8849 45.6251 13.0868 50.1746 13.2388C61.926 13.6618 75.2458 24.0202 79.2632 35.8608C82.7402 46.1051 82.7699 63.5579 82.3386 79.2755C82.3138 80.1877 83.0343 80.9479 83.9465 80.9727C84.8422 80.9562 85.6189 80.2803 85.6437 79.3647C86.0817 63.353 86.037 45.535 82.3931 34.7966C77.9031 21.5644 63.5026 10.4112 50.2919 9.9386Z"
                  fill={settings.theme === "light" ? "black" : "white"}
                />
                <path
                  d="M49.0227 19.8308C47.2263 19.8308 45.4383 20.0242 43.7047 20.4076C42.814 20.6042 42.2505 21.485 42.4471 22.3774C42.6438 23.2682 43.5147 23.8201 44.417 23.635C45.9159 23.3045 47.466 23.136 49.021 23.136C57.6689 23.136 65.436 28.2821 68.8056 36.2491C72.8214 45.7348 73.0841 60.96 72.157 87.5267C72.124 88.4389 72.8379 89.2057 73.7501 89.2355C73.7699 89.2371 73.7898 89.2371 73.8096 89.2371C74.6954 89.2371 75.4275 88.5348 75.4589 87.6424C76.424 60.0064 76.1298 45.0755 71.848 34.9601C67.9628 25.7701 59.0026 19.8308 49.0227 19.8308Z"
                  fill={settings.theme === "light" ? "black" : "white"}
                />
                <path
                  d="M36.7492 26.998C37.4961 26.4741 37.6779 25.4429 37.1524 24.696C36.6302 23.949 35.5973 23.7656 34.8504 24.2927C26.3396 30.2684 22.6412 41.7488 25.6538 52.8739C25.6885 52.9946 29.0432 65.2054 29.0432 84.2794C29.0432 85.1933 29.7819 85.932 30.6958 85.932C31.6097 85.932 32.3484 85.1933 32.3484 84.2794C32.3484 64.7576 28.9804 52.4972 28.84 51.9964C26.1942 42.2231 29.3737 32.1772 36.7492 26.998Z"
                  fill={settings.theme === "light" ? "black" : "white"}
                />
                <path
                  d="M65.3997 79.3333C65.4063 78.4195 64.6726 77.6758 63.7587 77.6692C63.7554 77.6692 63.7504 77.6692 63.7471 77.6692C62.8399 77.6692 62.1012 78.4013 62.0946 79.3102C62.0863 80.5529 62.1276 82.3674 62.1722 84.3274C62.2367 87.1781 62.3094 90.4089 62.2383 92.4861C62.2053 93.3984 62.9192 94.1635 63.8331 94.1932C63.8529 94.1949 63.8711 94.1949 63.8909 94.1949C64.7767 94.1949 65.5088 93.4926 65.5402 92.5985C65.6162 90.4287 65.5418 87.1467 65.4757 84.2514C65.4311 82.3311 65.3914 80.5513 65.3997 79.3333Z"
                  fill={settings.theme === "light" ? "black" : "white"}
                />
                <path
                  d="M49.0227 31.3988C47.2676 31.3988 45.5556 31.7425 43.9311 32.4201C37.4993 35.1039 34.3743 42.3603 36.6598 49.2994C37.9058 53.0822 38.9585 72.8849 38.9585 92.5423C38.9585 93.4561 39.6972 94.1948 40.6111 94.1948C41.525 94.1948 42.2636 93.4561 42.2636 92.5423C42.2636 74.8482 41.3217 52.8888 39.8013 48.2666C38.0595 42.9833 40.3847 37.4819 45.2052 35.4707C46.4232 34.9617 47.7072 34.7039 49.0227 34.7039C53.0136 34.7039 56.598 37.0803 58.1597 40.7689C61.2451 48.0716 62.1623 61.2921 62.387 71.0985C62.4085 71.9975 63.1439 72.7131 64.0396 72.7131C64.0511 72.7131 64.066 72.7131 64.0776 72.7131C64.9898 72.6916 65.712 71.9347 65.6921 71.0225C65.4591 60.9319 64.4924 47.2668 61.1972 39.47C59.1248 34.5668 54.3456 31.3988 49.0227 31.3988Z"
                  fill={settings.theme === "light" ? "black" : "white"}
                />
              </g>
              <defs>
                <clipPath id="clip0_71_595">
                  <rect
                    width="97.5"
                    height="97.5"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </GoPasswordlessBaseComponent>
      );
    case "complete":
      return (
        <GoPasswordlessBaseComponent>
          <p>You're now logged into {settings.appName}</p>
        </GoPasswordlessBaseComponent>
      );
    default:
      return <></>;
  }
};
