import { readFileSync } from "fs";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";

const rglr = readFileSync(
  `${__dirname}/../_fonts/Satoshi-Regular.woff2`
).toString("base64");

const bold = readFileSync(`${__dirname}/../_fonts/Satoshi-Bold.woff2`).toString(
  "base64"
);
const black = readFileSync(
  `${__dirname}/../_fonts/Satoshi-Black.woff2`
).toString("base64");

function getCss(r: string, g: string, b: string) {
  return `
    @font-face {
        font-family: 'Satoshi-Regular';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Satoshi-Bold';
        font-style:  normal;
        font-weight: black;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Satoshi-Black';
        font-style:  normal;
        font-weight: black;
        src: url(data:font/woff2;charset=utf-8;base64,${black}) format('woff2');
    }

    body {
      padding: 0;
      margin: 0;
    }

    .main-container {
      background-color: white;
      width: 2048px;
      height: 1075px;
    }
    .top-container {
      width: 100%;
      height: calc(70% - 10px);
      background-color: rgba(${r}, ${g}, ${b}, 0.085);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .ath-logo-container {
      position: absolute;
      right: 100px;
      top: 70px;
    }
    .ath-logo {
      height: 150px;
      width: 150px;
    }
    .asset-logo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .bottom-container {
      width: 100%;
      height: calc(30% - 10px);
      background-color: rgba(${r}, ${g}, ${b}, 0.185);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .bottom-container-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 1024px;
      text-align: center;
    }
    .coloured-line {
      width: 100%;
      height: 20px;
      background-color: rgba(${r}, ${g}, ${b}, 1);
    }
    .asset-symbol {
      font-family: Satoshi-Black;
      font-size: 160px;
      line-height: 180px;
      margin: 0;
      margin-top: 32px;
      padding: 0;
    }
    .asset-ath {
      font-family: Satoshi-Black;
      font-size: 150px;
      margin: 0;
      padding: 0;
      max-width: 1024px;
      padding-bottom: 24px;
    }
    .asset-name {
      font-family: Satoshi-Bold;
      color: #666666;
      font-size: 72px;
      line-height: 72px;
      margin: 0;
      padding: 0;
    }
}`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { ath, assetSymbol, assetName, r, g, b, image } = parsedReq;
  return `
  <!DOCTYPE html>
  <html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(r, g, b)}
    </style>
    <body class="main-container">
      <div class="ath-logo-container">
        <img src="https://ath.ooo/images/ath-tp.png" class="ath-logo" />
      </div>
      <div class="top-container">
        <div class="asset-logo-container">
          <img
            class="asset-logo"
            alt="${sanitizeHtml(assetName)} logo"
            src="${image}"
            width="250"
            height="250"
          />
          <div class="bottom-container-content">
            <div class="asset-symbol">${sanitizeHtml(assetSymbol)}</div>
            <div class="asset-name">${sanitizeHtml(assetName)}</div>
          </div>
        </div>
      </div>
      <div class="coloured-line"></div>
      <div class="bottom-container">
        <div class="asset-ath">$${sanitizeHtml(ath)}</div>
      </div>
    </body>
  </html>`;
}
