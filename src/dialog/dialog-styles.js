/**
 * ダイアログのCSSスタイルを追加する
 */
export function addDialogStyles() {
  const styles = `
        #td-mute-dialog.td-dialog-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-color: rgba(0, 0, 0, 0.5) !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            z-index: 10000 !important;
        }

        #td-mute-dialog .td-dialog-container {
            background: #15202b !important;
            border: 1px solid #38444d !important;
            border-radius: 8px !important;
            min-width: 450px !important;
            max-width: 550px !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
        }

        .td-dialog-container .td-dialog-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 16px 20px !important;
            border-bottom: 1px solid #38444d !important;
        }

        .td-dialog-container .td-dialog-title {
            color: #fff !important;
            margin: 0 !important;
            font-size: 18px !important;
            font-weight: 600 !important;
        }

        .td-dialog-container .td-dialog-close {
            background: none !important;
            border: none !important;
            color: #8b98a5 !important;
            font-size: 24px !important;
            cursor: pointer !important;
            padding: 0 !important;
            width: 32px !important;
            height: 32px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            outline: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
        }

        .td-dialog-container .td-dialog-close:hover {
            color: #fff !important;
        }

        .td-dialog-container .td-dialog-tabs {
            display: flex !important;
            background: #192734 !important;
            padding: 0 !important;
            margin: 0 !important;
            position: relative !important;
            border-radius: 0 !important;
        }

        .td-dialog-container .td-dialog-tab {
            flex: 1 !important;
            padding: 14px 20px 12px 20px !important;
            background: #192734 !important;
            border: none !important;
            color: #8b98a5 !important;
            cursor: pointer !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            position: relative !important;
            transition: all 0.2s ease !important;
            border-top: 1px solid #38444d !important;
            border-right: 1px solid #38444d !important;
            margin-right: -1px !important;
            z-index: 1 !important;
            border-radius: 0 !important;
            outline: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
        }

        .td-dialog-container .td-dialog-tab:last-child {
            border-right: none !important;
        }

        .td-dialog-container .td-dialog-tab.active {
            background: #15202b !important;
            color: #1d9bf0 !important;
            border-bottom: 1px solid #15202b !important;
            z-index: 2 !important;
            margin-bottom: -1px !important;
        }

        .td-dialog-container .td-dialog-tab:hover:not(.active) {
            background: #1c2732 !important;
            color: #fff !important;
        }

        .td-dialog-container .td-dialog-tab:first-child {
            border-left: 1px solid #38444d !important;
        }

        .td-dialog-container .td-dialog-tab.active:first-child {
            border-left: 1px solid #38444d !important;
        }

        .td-dialog-container .td-dialog-body {
            padding: 20px !important;
            border-top: 1px solid #38444d !important;
            margin-top: -1px !important;
        }

        .td-dialog-container .td-dialog-message {
            color: #8b98a5 !important;
            margin: 0 0 16px 0 !important;
            font-size: 14px !important;
            line-height: 1.4 !important;
        }

        .td-dialog-container .td-dialog-input {
            width: 100% !important;
            padding: 12px !important;
            background: #192734 !important;
            border: 1px solid #38444d !important;
            border-radius: 6px !important;
            color: #fff !important;
            font-size: 16px !important;
            outline: none !important;
            box-sizing: border-box !important;
            font-family: inherit !important;
        }

        .td-dialog-container .td-dialog-input:focus {
            border-color: #1d9bf0 !important;
        }

        .td-dialog-container .td-dialog-footer {
            display: flex !important;
            justify-content: flex-end !important;
            gap: 12px !important;
            padding: 16px 20px !important;
            border-top: 1px solid #38444d !important;
        }

        .td-dialog-container .td-dialog-cancel,
        .td-dialog-container .td-dialog-confirm {
            padding: 8px 16px !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            border: none !important;
            min-width: 80px !important;
            outline: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
            font-family: inherit !important;
        }

        .td-dialog-container .td-dialog-cancel {
            background: transparent !important;
            color: #8b98a5 !important;
            border: 1px solid #38444d !important;
        }

        .td-dialog-container .td-dialog-cancel:hover {
            background: #1c2732 !important;
        }

        .td-dialog-container .td-dialog-confirm {
            background: #1d9bf0 !important;
            color: #fff !important;
        }

        .td-dialog-container .td-dialog-confirm:hover {
            background: #1a8cd8 !important;
        }

        .td-dialog-container .td-dialog-confirm:disabled {
            background: #3c4043 !important;
            color: #5f6368 !important;
            cursor: not-allowed !important;
        }

        .td-dialog-container .tab-content {
            display: none !important;
        }

        .td-dialog-container .tab-content.active {
            display: block !important;
        }
    `

  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}