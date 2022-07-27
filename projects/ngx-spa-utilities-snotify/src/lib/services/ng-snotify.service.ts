import { Injectable } from '@angular/core';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class NgSnotifyService {
  protected buttonOK: string = 'OK';
  protected buttonCancel: string = 'Cancel';

  snotifyToastConfig: SnotifyToastConfig = {
    bodyMaxLength: 300,
    titleMaxLength: 100,
    backdrop: -1,
    position: SnotifyPosition.rightTop,
    timeout: 3000,
    showProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true
  };

  constructor(private snotifyService: SnotifyService) {
    this.setDefaults();
  }

  setDefaults() {
    this.snotifyService.setDefaults({
      global: {
        maxAtPosition: 3,
        maxOnScreen: 3,
        newOnTop: true,
        filterDuplicates: true
      }
    });
  }

  success(body: string, title: string, config?: SnotifyToastConfig) {
    this.snotifyService.success(body, title, { ...this.snotifyToastConfig, ...config });
  }

  info(body: string, title: string, config?: SnotifyToastConfig) {
    this.snotifyService.info(body, title, { ...this.snotifyToastConfig, ...config });
  }

  error(body: string, title: string, config?: SnotifyToastConfig) {
    this.snotifyService.error(body, title, { ...this.snotifyToastConfig, ...config });
  }

  warning(body: string, title: string, config?: SnotifyToastConfig) {
    this.snotifyService.warning(body, title, { ...this.snotifyToastConfig, ...config });
  }

  simple(body: string, title: string, config?: SnotifyToastConfig) {
    this.snotifyService.simple(body, title, { ...this.snotifyToastConfig, ...config });
  }

  confirm(body: string, title: string, okCallback: () => any, cancelCallBack?: () => any, config?: SnotifyToastConfig) {
    const _snotifyToastConfig = { ...this.snotifyToastConfig, ...config };
    _snotifyToastConfig.position = SnotifyPosition.centerCenter;
    _snotifyToastConfig.timeout = 0;
    _snotifyToastConfig.backdrop = 0.5;
    _snotifyToastConfig.closeOnClick = false;

    this.snotifyService.confirm(body, title, {
      ..._snotifyToastConfig,
      buttons: [
        {
          text: this.buttonOK,
          action: toast => {
            this.snotifyService.remove(toast.id);
            okCallback();
          },
          bold: true
        },
        {
          text: this.buttonCancel,
          action: toast => {
            this.snotifyService.remove(toast.id);
            if (typeof (cancelCallBack) === 'function') {
              cancelCallBack();
            }
          }
        }
      ]
    });
  }

  setConfirmButtons(ok: string, cancel: string) {
    this.buttonOK = ok;
    this.buttonCancel = cancel;
  }

  clear() {
    this.snotifyService.clear();
  }
}
