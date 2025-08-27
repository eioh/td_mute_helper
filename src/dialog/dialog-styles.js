/**
 * ダイアログのCSSスタイルを追加する
 */
export function addDialogStyles() {
  const styles = `
        .td-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }

        .td-dialog-container {
            background: #15202b;
            border: 1px solid #38444d;
            border-radius: 8px;
            min-width: 400px;
            max-width: 500px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .td-dialog-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid #38444d;
        }

        .td-dialog-title {
            color: #fff;
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }

        .td-dialog-close {
            background: none;
            border: none;
            color: #8b98a5;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .td-dialog-close:hover {
            color: #fff;
        }

        .td-dialog-body {
            padding: 20px;
        }

        .td-dialog-message {
            color: #8b98a5;
            margin: 0 0 16px 0;
            font-size: 14px;
        }

        .td-dialog-input {
            width: 100%;
            padding: 12px;
            background: #192734;
            border: 1px solid #38444d;
            border-radius: 6px;
            color: #fff;
            font-size: 16px;
            outline: none;
            box-sizing: border-box;
        }

        .td-dialog-input:focus {
            border-color: #1d9bf0;
        }

        .td-dialog-footer {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            padding: 16px 20px;
            border-top: 1px solid #38444d;
        }

        .td-dialog-cancel, .td-dialog-confirm {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            min-width: 80px;
        }

        .td-dialog-cancel {
            background: transparent;
            color: #8b98a5;
            border: 1px solid #38444d;
        }

        .td-dialog-cancel:hover {
            background: #1c2732;
        }

        .td-dialog-confirm {
            background: #1d9bf0;
            color: #fff;
        }

        .td-dialog-confirm:hover {
            background: #1a8cd8;
        }

        .td-dialog-confirm:disabled {
            background: #3c4043;
            color: #5f6368;
            cursor: not-allowed;
        }
    `

  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}