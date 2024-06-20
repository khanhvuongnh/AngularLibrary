import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';
import { Block, Confirm, Loading, Notify, Report } from 'notiflix';

@Injectable({ providedIn: 'root' })
export class NgxNotiflixService {
  private okButton: string = '';
  private cancelButton: string = '';
  private loadingType: string = '';
  private loadingColor: string = '';
  private loadingSvgUrl: string = '';
  private fontFamily: string = '';

  private successColor: string = '#4caf50';
  private errorColor: string = '#f44336';
  private warningColor: string = '#ff9800';
  private infoColor: string = '#1e88e5';
  private textColor: string = '#ffffff';
  private messageFontSize: string = '16px';
  private titleFontSize: string = '20px';
  private duration: number = 500;
  private backOverlayColor: string = 'rgba(0,0,0,0.5)';
  private svgSize: string = '128px';
  private svgSmallSize: string = '64px';

  init = (custom?: NotiflixCustom): void => {
    this.okButton = custom?.okButton || 'OK';
    this.cancelButton = custom?.cancelButton || 'Cancel';
    this.loadingType = custom?.loadingType || 'standard';
    this.loadingColor = custom?.loadingColor || '#fff';
    this.loadingSvgUrl = custom?.loadingSvgUrl || '';
    this.fontFamily = custom?.fontFamily || 'sans-serif';

    Notify.init({
      ...custom?.notifyOptions,
      pauseOnHover: true,
      clickToClose: true,
      showOnlyTheLastOne: true,
      cssAnimation: true,
      cssAnimationDuration: this.duration,
      cssAnimationStyle: 'from-right',
      fontSize: this.messageFontSize,
      fontFamily: this.fontFamily,
      success: { notiflixIconColor: this.textColor, background: this.successColor, textColor: this.textColor },
      failure: { notiflixIconColor: this.textColor, background: this.errorColor, textColor: this.textColor },
      warning: { notiflixIconColor: this.textColor, background: this.warningColor, textColor: this.textColor },
      info: { notiflixIconColor: this.textColor, background: this.infoColor, textColor: this.textColor },
    });

    Confirm.init({
      ...custom?.confirmOptions,
      titleFontSize: this.titleFontSize,
      messageFontSize: this.messageFontSize,
      cssAnimation: true,
      cssAnimationDuration: this.duration,
      cssAnimationStyle: 'zoom',
      fontFamily: this.fontFamily,
    });

    Loading.init({
      ...custom?.loadingOptions,
      customSvgUrl: this.loadingSvgUrl,
      svgColor: this.loadingColor,
      svgSize: this.svgSize,
      cssAnimation: true,
      cssAnimationDuration: this.duration,
    });

    Report.init({
      ...custom?.reportOptions,
      fontFamily: this.fontFamily,
      cssAnimation: true,
      cssAnimationDuration: this.duration,
      cssAnimationStyle: 'zoom',
      messageFontSize: this.messageFontSize,
      titleFontSize: this.titleFontSize,
      svgSize: this.svgSmallSize,
      success: { backOverlayColor: this.backOverlayColor, buttonBackground: this.successColor, svgColor: this.successColor, titleColor: this.successColor },
      failure: { backOverlayColor: this.backOverlayColor, buttonBackground: this.errorColor, svgColor: this.errorColor, titleColor: this.errorColor },
      warning: { backOverlayColor: this.backOverlayColor, buttonBackground: this.warningColor, svgColor: this.warningColor, titleColor: this.warningColor },
      info: { backOverlayColor: this.backOverlayColor, buttonBackground: this.infoColor, svgColor: this.infoColor, titleColor: this.infoColor },
    });

    Block.init({
      ...custom?.blockOptions,
      svgSize: this.svgSize,
    });
  }

  /* --------------------------------- Notify --------------------------------- */

  notifySuccess = (message: string): void => {
    Notify.success(message);
  }

  notifyError = (message: string): void => {
    Notify.failure(message);
  }

  notifyWarning = (message: string): void => {
    Notify.warning(message);
  }

  notifyInfo = (message: string): void => {
    Notify.info(message);
  }

  /* --------------------------------- Confirm --------------------------------- */

  confirmSuccess = (title: string, message: string, okButtonCallback: () => void, cancelButtonCallback?: () => void): void => {
    Confirm.show(title, message, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.successColor,
      okButtonBackground: this.successColor,
    });
  }

  confirmError = (title: string, message: string, okButtonCallback: () => void, cancelButtonCallback?: () => void): void => {
    Confirm.show(title, message, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.errorColor,
      okButtonBackground: this.errorColor,
    });
  }

  confirmWarning = (title: string, message: string, okButtonCallback: () => void, cancelButtonCallback?: () => void): void => {
    Confirm.show(title, message, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.warningColor,
      okButtonBackground: this.warningColor,
    });
  }

  confirmInfo = (title: string, message: string, okButtonCallback: () => void, cancelButtonCallback?: () => void): void => {
    Confirm.show(title, message, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.infoColor,
      okButtonBackground: this.infoColor,
    });
  }

  /* ----------------------------------- Ask ---------------------------------- */

  askSuccess = (title: string, question: string, answer: string, okButtonCallback?: () => void, cancelButtonCallback?: () => void): void => {
    Confirm.ask(title, question, answer, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.successColor,
      okButtonBackground: this.successColor,
    });
  }

  askError = (title: string, question: string, answer: string, okButtonCallback?: () => void, cancelButtonCallback?: () => void): void => {
    Confirm.ask(title, question, answer, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.errorColor,
      okButtonBackground: this.errorColor,
    });
  }

  askWarning = (title: string, question: string, answer: string, okButtonCallback?: () => void, cancelButtonCallback?: () => void): void => {
    Confirm.ask(title, question, answer, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.warningColor,
      okButtonBackground: this.warningColor,
    });
  }

  askInfo = (title: string, question: string, answer: string, okButtonCallback?: () => void, cancelButtonCallback?: () => void): void => {
    Confirm.ask(title, question, answer, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.infoColor,
      okButtonBackground: this.infoColor,
    });
  }

  /* ---------------------------------- Promt --------------------------------- */

  promptSuccess = (title: string, question: string, defaultAnswer: string, okButtonCallback?: (clientAnswer: string) => void, cancelButtonCallback?: (clientAnswer: string) => void): void => {
    Confirm.prompt(title, question, defaultAnswer, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.successColor,
      okButtonBackground: this.successColor,
    });
  }

  promptError = (title: string, question: string, defaultAnswer: string, okButtonCallback?: (clientAnswer: string) => void, cancelButtonCallback?: (clientAnswer: string) => void): void => {
    Confirm.prompt(title, question, defaultAnswer, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.errorColor,
      okButtonBackground: this.errorColor,
    });
  }

  promptWarning = (title: string, question: string, defaultAnswer: string, okButtonCallback?: (clientAnswer: string) => void, cancelButtonCallback?: (clientAnswer: string) => void): void => {
    Confirm.prompt(title, question, defaultAnswer, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.warningColor,
      okButtonBackground: this.warningColor,
    });
  }

  promptInfo = (title: string, question: string, defaultAnswer: string, okButtonCallback?: (clientAnswer: string) => void, cancelButtonCallback?: (clientAnswer: string) => void): void => {
    Confirm.prompt(title, question, defaultAnswer, this.okButton, this.cancelButton, okButtonCallback, cancelButtonCallback, {
      titleColor: this.infoColor,
      okButtonBackground: this.infoColor,
    });
  }

  /* --------------------------------- Loading --------------------------------- */

  showLoading = (): void => {
    switch (this.loadingType) {
      case 'hourglass':
        Loading.hourglass();
        break;

      case 'circle':
        Loading.circle();
        break;

      case 'arrows':
        Loading.arrows();
        break;

      case 'dots':
        Loading.dots();
        break;

      case 'pulse':
        Loading.pulse();
        break;

      case 'custom':
        Loading.custom();
        break;

      default:
        Loading.standard();
        break;
    }
  }

  hideLoading = (): void => {
    Loading.remove();
  }

  /* --------------------------------- Report --------------------------------- */

  reportSuccess = (title: string, message: string, callback?: () => void): void => {
    Report.success(title, message, this.okButton, callback);
  }

  reportError = (title: string, message: string, callback?: () => void): void => {
    Report.failure(title, message, this.okButton, callback);
  }

  reportInfo = (title: string, message: string, callback?: () => void): void => {
    Report.info(title, message, this.okButton, callback);
  }

  reportWarning = (title: string, message: string, callback?: () => void): void => {
    Report.warning(title, message, this.okButton, callback);
  }

  /* ---------------------------------- Block --------------------------------- */

  showBlock = (el: string | HTMLElement[] | NodeListOf<HTMLElement>): void => {
    switch (this.loadingType) {
      case 'hourglass':
        Block.hourglass(el);
        break;

      case 'circle':
        Block.circle(el);
        break;

      case 'arrows':
        Block.arrows(el);
        break;

      case 'dots':
        Block.dots(el);
        break;

      case 'pulse':
        Block.pulse(el);
        break;

      default:
        Block.standard(el);
        break;
    }
  }

  hideBlock = (el: string | HTMLElement[] | NodeListOf<HTMLElement>): void => {
    Block.remove(el);
  }
}

export interface NotiflixCustom {
  okButton?: string;
  cancelButton?: string;
  loadingSvgUrl?: string;
  loadingType?: 'standard' | 'hourglass' | 'circle' | 'arrows' | 'dots' | 'pulse' | 'custom';
  loadingColor?: string;
  fontFamily?: string;
  notifyOptions?: Notiflix.INotifyOptions;
  confirmOptions?: Notiflix.IConfirmOptions;
  loadingOptions?: Notiflix.ILoadingOptions;
  reportOptions?: Notiflix.IReportOptions;
  blockOptions?: Notiflix.IBlockOptions;
}